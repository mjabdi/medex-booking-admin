import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import dateformat from "dateformat";
import BookService from "../services/BookService";

import CircularProgress from "@material-ui/core/CircularProgress";
import GlobalState from "../../GlobalState";
import BookingDialog from "../BookingDialog";
import NewBookingDialog from "../NewBookingDialog";
import { CalendarColors } from "./colors";
import clsx from "clsx";

import NewGPDialog from "../../GP/NewBookingDialog";
import NewGynaeDialog from "../../Gynae/NewBookingDialog";
import NewSTDDialog from "../../STD/NewBookingDialog";
import NewBloodDialog from "../../Blood/NewBookingDialog";
import NewDermaDialog from "../../Derma/NewBookingDialog";
import NewScreeningDialog from "../../Screening/NewBookingDialog";
import NewCorporateDialog from "../../Corporate/NewBookingDialog";


const useStyles = makeStyles((theme) => ({
  Container: {
    width: "100%",
    height: "50px",
    position: "relative",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "flex-start",
    justifyItems: "flex-start",
    paddingLeft: "10px",
  },

  ContainerPast: {
    width: "100%",
    paddingTop: "50px",
    position: "relative",
    backgroundColor: "#fafafa",
  },

  DayLabel: {
    position: "absolute",
    top: "5px",
    right: "5px",
    color: "#555",
    fontSize: "1rem",
  },

  DayLabelDisabled: {
    position: "absolute",
    top: "5px",
    right: "5px",
    color: "#ddd",
    fontSize: "1rem",
  },

  LoadingProgress: {
    position: "absolute",
    top: "10%",
    left: "40%",
  },

  BookingCountGauge: {
    position: "absolute",
    bottom: "5%",
    left: "8%",
    width: "85%",
    height: "8%",
  },

  bookingBox: {
    display: "flex",
    marginRight: "10px",
    marginTop: "5px",
    padding: "7px",
    maxWidth: "150px",
    overflowX: "hidden",
    // border: "1px solid #eee",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#ebedf7",
    color: "#3f51b5",
    boxShadow: "2px 4px #fafafa",

    "&:hover": {
      background: "#3f51b5",
      color: "#ebedf7",
    },
  },

  bookingBoxNew: {
    display: "flex",
    marginRight: "10px",
    marginTop: "5px",
    padding: "10px",
    maxWidth: "150px",
    overflowX: "hidden",
    border: "1px solid #ddd",
    color: "#ccc",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#fff",

    boxShadow: "2px 4px #fafafa",
    transition: "all 0.5s ease",
    borderRadius: "4px",

    "&:hover": {
      background: "#fff",
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },
  },

  bookingBoxSampleTaken: {
    display: "flex",
    marginRight: "10px",
    marginTop: "5px",
    padding: "7px",
    maxWidth: "150px",
    overflowX: "hidden",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#0066cc",
    color: "#eee",
    boxShadow: "2px 4px #fafafa",

    "&:hover": {
      background: "#0059b3",
      color: "#fafafa",
    },
  },

  bookingBoxPositive: {
    display: "flex",
    marginRight: "10px",
    marginTop: "5px",
    padding: "7px",
    maxWidth: "150px",
    overflowX: "hidden",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#d40b0b",
    color: "#fff2f2",
    boxShadow: "2px 4px #fafafa",

    "&:hover": {
      background: "#bf0000",
      color: "#fff",
    },
  },

  bookingBoxReportSent: {
    display: "flex",
    marginRight: "10px",
    marginTop: "5px",
    padding: "7px",
    maxWidth: "150px",
    overflowX: "hidden",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#009900",
    color: "#eee",
    boxShadow: "2px 4px #fafafa",

    "&:hover": {
      background: "#006e00",
      color: "#fafafa",
    },
  },

  BookingBorderPCR: {
    border: "4px solid",
    borderColor: CalendarColors.PCR_COLOR,
  },

  BookingBorderGynae: {
    border: "4px solid",
    borderColor: CalendarColors.GYNAE_COLOR,
  },

  BookingBorderGP: {
    border: "4px solid",
    borderColor: CalendarColors.GP_COLOR,
  },

  BookingBorderSTD: {
    border: "4px solid",
    borderColor: CalendarColors.STD_COLOR,
  },
  BookingBorderBlood: {
    border: "4px solid",
    borderColor: CalendarColors.BLOOD_COLOR,
  },

  BookingBorderDerma: {
    border: "4px solid",
    borderColor: CalendarColors.DERMA_COLOR,
  },

  BookingBorderScreening: {
    border: "4px solid",
    borderColor: CalendarColors.SCREENING_COLOR,
  },

  BookingBorderCorporate: {
    border: "4px solid",
    borderColor: CalendarColors.CORPORATE_COLOR,
  },

  bookingBoxPending: {
    display: "flex",
    marginRight: "10px",
    marginTop: "5px",
    padding: "10px",
    maxWidth: "150px",
    overflowX: "hidden",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#ddd",
    color: "#777",
    boxShadow: "2px 4px #fafafa",

    "&:hover": {
      background: "#eee",
      color: "#333",
    },
  },


}));

const DayViewCell = ({ key, date, time }) => {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);
  const [bookings, setBookings] = React.useState(null);
  const [filteredBookings, setFilteredBookings] = React.useState(null);
  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const [refresh, setRefresh] = React.useState(true);

  const [isPast, setIsPast] = React.useState(false);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogAddNew, setOpenDialogAddNew] = React.useState(false);

  const [openDialogGP, setOpenDialogGP] = React.useState(false);
  const [openDialogGynae, setOpenDialogGynae] = React.useState(false);
  const [openDialogSTD, setOpenDialogSTD] = React.useState(false);
  const [openDialogBlood, setOpenDialogBlood] = React.useState(false);
  const [openDialogDerma, setOpenDialogDerma] = React.useState(false);
  const [openDialogScreening, setOpenDialogScreening] = React.useState(false);
  const [openDialogCorporate, setOpenDialogCorporate] = React.useState(false);


  const handleCloseDialogGP = () => {
    setOpenDialogGP(false);
    setOpenDialogAddNew(false)
  };

  const handleCloseDialogGynae = () => {
    setOpenDialogGynae(false);
    setOpenDialogAddNew(false)
  };

  const handleCloseDialogSTD = () => {
    setOpenDialogSTD(false);
    setOpenDialogAddNew(false)
  };

  const handleCloseDialogBlood = () => {
    setOpenDialogBlood(false);
    setOpenDialogAddNew(false)
  };

  const handleCloseDialogDerma = () => {
    setOpenDialogDerma(false);
    setOpenDialogAddNew(false)
  };

  const handleCloseDialogScreening = () => {
    setOpenDialogScreening(false);
    setOpenDialogAddNew(false)
  };

  const handleCloseDialogCorporate = () => {
    setOpenDialogCorporate(false);
    setOpenDialogAddNew(false)
  };



  useEffect(() => {
    const todayStr = dateformat(new Date(), "yyyy-mm-dd");
    setIsPast(date < todayStr);
  }, [date]);

  useEffect(() => {
    if (bookings) {
      if (state.dayViewCalFilter && state.dayViewCalFilter.trim().length > 0) {
        const search = state.dayViewCalFilter.trim().toUpperCase();
        setFilteredBookings(
          bookings.filter(
            (booking) =>
              booking.fullname?.toLowerCase().indexOf(search.toLowerCase()) >=
              0 ||
              booking.forename?.toLowerCase().indexOf(search.toLowerCase()) >=
              0 ||
              booking.surname?.toLowerCase().indexOf(search.toLowerCase()) >= 0
          )
        );
      } else {
        setFilteredBookings([...bookings]);
      }
    }
  }, [state.dayViewCalFilter, bookings]);

  useEffect(() => {
    const fetchData = async () => {
      if (!date || date.length <= 0 || !time || time.length <= 0) {
        return;
      }

      // if (isPast)
      // {
      //     setBookings([]);
      //     return;
      // }

      setBookings(null);

      var res = state.AdminCalendarCache?.find(
        (record) =>
          record.method === "getBookingsByDateStrandTime" &&
          record.query === `${date}${time}`
      )?.res;
      if (!res || openDialog || openDialogAddNew) {
        res = await BookService.getAllBookingsByDateStrandTime(date, time);
        setState((state) => ({
          ...state,
          AdminCalendarCache: [
            ...state.AdminCalendarCache,
            {
              method: "getBookingsByDateStrandTime",
              query: `${date}${time}`,
              res: res,
            },
          ],
        }));
      }

      if (res.data.status === "OK") {
        setBookings(res.data.bookings);
      }
    };

    if (openDialog || openDialogAddNew) {
      setState((state) => ({
        ...state,
        AdminCalendarCache: state.AdminCalendarCache.filter(
          (record) =>
            !(
              record.method === "getBookingsByDateStrandTime" &&
              record.query === `${date}${time}`
            )
        ),
      }));
      setState((state) => ({
        ...state,
        AdminCalendarCache: state.AdminCalendarCache.filter(
          (record) =>
            !(
              record.method === "getBookingsCountByDateStrandTime" &&
              record.query === `${date}${time}`
            )
        ),
      }));
      setState((state) => ({
        ...state,
        AdminCalendarCache: state.AdminCalendarCache.filter(
          (record) =>
            !(
              record.method === "getBookingsCountByDateStr" &&
              record.query === date
            )
        ),
      }));
    }

    fetchData();
  }, [date, time, state.bookingDialogDataChanged]);

  const bookingCliked = (event, booking) => {
    console.log(booking)
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const getBookingClass = ({status, confirmed, clinic}) => {

    if ((clinic === "screening" || clinic === "visa") && !confirmed)
    {
      return classes.bookingBoxPending
    }

    switch (status) {
      case "sample_taken":
      case "patient_attended":
        return classes.bookingBoxSampleTaken;
      case "positive":
        return classes.bookingBoxPositive;
      case "report_sent":
      case "report_cert_sent":
        return classes.bookingBoxReportSent;

      default:
        return classes.bookingBox;
    }
  };

  const addNewBookingClicked = () => {
    setOpenDialogAddNew(true);
  };

  const getBookingBorderClass = (clinic) => {
    switch (clinic) {
      case "visa":
        return classes.BookingBorderPCR;
      case "gynae":
        return classes.BookingBorderGynae;
      case "gp":
        return classes.BookingBorderGP;
      case "std":
        return classes.BookingBorderSTD;
      case "blood":
        return classes.BookingBorderBlood;
      case "derma":
        return classes.BookingBorderDerma;
      case "screening":
        return classes.BookingBorderScreening;
      case "corporate":
          return classes.BookingBorderCorporate;
    

      default:
        return null;
    }
  };

  const getBookingsBox = (_bookings) => {
    if (_bookings === null) {
      return (
        <div className={classes.LoadingProgress}>
          <CircularProgress disableShrink />
        </div>
      );
    } else if (_bookings.length >= 0) {
      return (
        <React.Fragment>
          {_bookings.map(
            (booking) =>
              state.selectedClinics.findIndex(
                (e) => e === booking.clinic.toUpperCase()
              ) >= 0 && (
                <div
                  style={booking.tr ? { borderTop: "5px solid #d00fd6" } : {}}
                  className={clsx(
                    getBookingClass(booking),
                    getBookingBorderClass(booking.clinic)
                  )}
                  onClick={(event) => bookingCliked(event, booking)}
                >
                  {`${booking.fullname
                      ? booking.fullname
                      : `${booking.forename} ${booking.surname}`
                    }`.substring(0, 15)}
                </div>
              )
          )}

          <div className={classes.bookingBoxNew} onClick={addNewBookingClicked}>
            {" "}
            + Add New Booking
          </div>
        </React.Fragment>
      );
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogAddNew = () => {
    setOpenDialogAddNew(false);
  };

  const handleClinicClicked = (clinic) => {
    switch (clinic) {
      case "gynae":
        setOpenDialogGynae(true);
        break;
      case "gp":
        setOpenDialogGP(true);
        break;
      case "std":
        setOpenDialogSTD(true);
        break;
      case "blood":
        setOpenDialogBlood(true);
        break;
      case "derma":
        setOpenDialogDerma(true);
        break;
      case "screening":
      case "visa":  
        setOpenDialogScreening(true);
        break;
      case "corporate":
        setOpenDialogCorporate(true);
        break; 

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div className={classes.Container}>
        {getBookingsBox(filteredBookings)}
      </div>

      <BookingDialog
        booking={selectedBooking}
        open={openDialog}
        onClose={handleCloseDialog}
      />

      <NewBookingDialog
        date={date}
        time={time}
        open={openDialogAddNew}
        handleClose={handleCloseDialogAddNew}
        clinicClicked={handleClinicClicked}
      />

      <NewGPDialog
        date={date}
        time={time}
        open={openDialogGP}
        handleClose={handleCloseDialogGP}
      />

      <NewSTDDialog
        date={date}
        time={time}
        open={openDialogSTD}
        handleClose={handleCloseDialogSTD}
      />

      <NewGynaeDialog
        date={date}
        time={time}
        open={openDialogGynae}
        handleClose={handleCloseDialogGynae}
      />

      <NewBloodDialog
        date={date}
        time={time}
        open={openDialogBlood}
        handleClose={handleCloseDialogBlood}
      />

      <NewDermaDialog
        date={date}
        time={time}
        open={openDialogDerma}
        handleClose={handleCloseDialogDerma}
      />

      <NewScreeningDialog
        date={date}
        time={time}
        open={openDialogScreening}
        handleClose={handleCloseDialogScreening}
      />

      <NewCorporateDialog
        date={date}
        time={time}
        open={openDialogCorporate}
        handleClose={handleCloseDialogCorporate}
      />



    </React.Fragment>
  );
};

DayViewCell.propTypes = {
  key: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default DayViewCell;
