import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import BookService from "./services/BookService";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  InputLabel,
  LinearProgress,
  Link,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  SvgIcon,
  Switch,
  TextField,
  Tooltip,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import GlobalState from "../GlobalState";
import { getMenuIndex } from "../MenuList";
import {
  FormatDateFromString,
  FormatDateFromStringShortYear,
} from "./DateFormatter";

import SearchIcon from "@material-ui/icons/Search";
import BookingDialog from "./BookingDialog";

import NewReleasesIcon from "@material-ui/icons/NewReleases";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";
import DescriptionIcon from "@material-ui/icons/Description";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";

import * as dateformat from "dateformat";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import BusinessIcon from "@material-ui/icons/Business";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import PriceCalculator from "./PriceCalculator";
import { corporates } from "./Corporates";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import BloodReportDialog from "../Blood/BloodReportDialog";
import { CalendarColors } from "./calendar-admin/colors";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },

  refreshButton: {
    marginLeft: theme.spacing(2),
  },

  checkIcon: {
    color: "green",
  },

  closeIcon: {
    color: "red",
  },

  RefLink: {
    cursor: "pointer",
  },

  BookedLabel: {
    backgroundColor: "#606060",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  PatientAttendedLabel: {
    backgroundColor: "#0066aa",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  SampleTakenLabel: {
    backgroundColor: "#0066cc",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  ReportSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  ReportCertSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  PositiveLabel: {
    backgroundColor: "red",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  HideNowRows: {
    position: "absolute",
    top: "40%",
    left: "40%",
    width: "600px",
    height: "300px",
    backgroundColor: "#fafafa",
    color: "#111",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  },

  ExportToExcelButton: {
    // marginBottom : "20px",
    color: "#2f942e",
    borderColor: "#2f942e",
    "&:hover": {
      background: "#fafffa",
      borderColor: "#2f942e",
    },
    textDecoration: "none !important",
  },

  ExportToExcelButtonInline: {
    // marginBottom : "20px",
    color: "#2f942e",
    borderColor: "#2f942e",
    "&:hover": {
      background: "#fafffa",
      borderColor: "#2f942e",
    },
    textDecoration: "none !important",
    cursor: "pointer",
    padding: "10px",
  },

  table: {
    width: "100%",
    border: "1px solid #ddd",
    borderCollapse: "collapse",
  },

  th: {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    verticalAlign: "middle",
    fontcolor: "#555",
    fontWeight: "400",
    fontSize: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    width: "14%",
    paddingLeft: "5px",
  },

  td: {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    verticalAlign: "middle",
    paddingLeft: "5px",
  },

  topSelect: {
    margin: theme.spacing(1),
    minWidth: 80,
  },

  notifyIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "rgb(220, 0, 78)",
    marginLeft: "10px",
  },

  clinicTitle: {
    fontWeight: "600",
    textAlign: "center",
    color: theme.palette.primary.main,
    padding: "2px 10px",
  },

  PCRLabel: {
    color: CalendarColors.PCR_COLOR,
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  GynaeLabel: {
    color: CalendarColors.GYNAE_COLOR,
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  GPLabel: {
    color: CalendarColors.GP_COLOR,
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  STDLabel: {
    color: CalendarColors.STD_COLOR,
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  BloodLabel: {
    color: CalendarColors.BLOOD_COLOR,
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  DermaLabel: {
    color: CalendarColors.DermaLabel,
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  ScreeningLabel: {
    color: CalendarColors.SCREENING_COLOR,
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  CorporateLabel: {
    color: CalendarColors.CORPORATE_COLOR,
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  DefaultLabel: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function SearchBookingTable({ bookingsData }) {
  const classes = useStyles();
  console.log(bookingsData)
  const data = {bookings : []}
  if (Array.isArray(bookingsData.bookings)) {
    const dataArray = bookingsData.bookings;
    data.bookings = [];
    for (var i = 0; i < dataArray.length; i++) {
      data.bookings[i] = { ...dataArray[i], id: i + 1 };
    }
  }
  const getClassforClinic = (clinic) => {
    switch (clinic) {
      case "pcr":
        return classes.PCRLabel;
      case "gp":
        return classes.GPLabel;
      case "gynae":
        return classes.GynaeLabel;
      case "std":
        return classes.STDLabel;
      case "blood":
        return classes.BloodLabel;
      case "derma":
        return classes.DermaLabel;
      case "screening":
        return classes.ScreeningLabel;
      case "corporate":
        return classes.CorporateLabel;
      default:
        return classes.DefaultLabel;
    }
  };

  const [topCount, setTopCount] = React.useState(25);
  const topCountChanged = (event) => {
    setTopCount(event.target.value);
    loadData(event.target.value);
  };

  const [openDialogExcel, setOpenDialogExcel] = useState(false);
  const handleCloseDialogExcel = () => {
    setCorporate(corporates[0]);
    setJustCorporate(false);
    setOpenDialogExcel(false);
  };

  const [fromDate, setFromDate] = React.useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const handleFromDateChange = (date) => {
    setFromDate(date);
    setFromDateStr(dateformat(date, "yyyy-mm-dd"));
  };

  const [untilDate, setUntilDate] = React.useState(
    new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
  );
  const handleUntilDateChange = (date) => {
    setUntilDate(date);
    seUntilDateStr(dateformat(date, "yyyy-mm-dd"));
  };

  const [fromDateStr, setFromDateStr] = useState(
    dateformat(
      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      "yyyy-mm-dd"
    )
  );
  const [untilDateStr, seUntilDateStr] = useState(
    dateformat(
      new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
      "yyyy-mm-dd"
    )
  );

  const [justCorporate, setJustCorporate] = useState(false);

  const [chkDate, setChkDate] = useState(true);
  const [chkForename, setChkForename] = useState(true);
  const [chkSurname, setChkSurname] = useState(true);
  const [chkDOB, setChkDOB] = useState(true);
  const [chkEmail, setChkEmail] = useState(true);
  const [chkTel, setChkTel] = useState(true);
  const [chkCertificate, setChkCertidicate] = useState(true);
  const [chkAntiBodyTest, setChkAntiBodyTest] = useState(true);
  const [chkextRef, setChkExtRef] = useState(true);
  const [chkPrice, setChkPrice] = useState(true);

  const justCorporateChanged = (event) => {
    setJustCorporate(event.target.checked);
  };

  const chkDateChanged = (event) => {
    setChkDate(event.target.checked);
  };

  const chkForenameChanged = (event) => {
    setChkForename(event.target.checked);
  };

  const chkSurnameChanged = (event) => {
    setChkSurname(event.target.checked);
  };

  const chkDOBChanged = (event) => {
    setChkDOB(event.target.checked);
  };

  const chkEmailChanged = (event) => {
    setChkEmail(event.target.checked);
  };

  const chkTelChanged = (event) => {
    setChkTel(event.target.checked);
  };

  const chkCertificateChanged = (event) => {
    setChkCertidicate(event.target.checked);
  };

  const chkAntiBodyTestChanged = (event) => {
    setChkAntiBodyTest(event.target.checked);
  };

  const chkextRefChanged = (event) => {
    setChkExtRef(event.target.checked);
  };

  const chkPriceChanged = (event) => {
    setChkPrice(event.target.checked);
  };

  var columns = [];

  columns = [
    // { field: 'id', headerName: '#', width: 70 },

    {
      field: "_id",
      headerName: " ",
      width: 70,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Button
              color="primary"
              onClick={(event) =>
                openDetailsDialog(
                  event,
                  params.value,
                  params.getValue("clinic")
                )
              }
            >
              <SearchIcon />
            </Button>
          </React.Fragment>
        );
      },
    },

    {
      field: "clinic",
      headerName: "Type",
      align: "center",
      width: 130,
      renderCell: (params) => {
        return (
          <span className={getClassforClinic(params.value)}>
            {params.value ? params.value.toUpperCase() : "N/A"}
          </span>
        );
      },
    },

    {
      field: "fullname",
      headerName: "Fullname",
      width: 200,
      valueGetter: (params) => {
        if (!params.value || params.value.length === 0) {
          return `${params.getValue("forename")} ${params.getValue("surname")}`;
        } else {
          return params.value;
        }
      },
    },

    {
      field: "bookingDate",
      headerName: "B Date",
      width: 110,
      valueFormatter: (params) => {
        return FormatDateFromString(params.value);
      },
    },
    {
      field: "bookingTimeNormalized",
      headerName: "B Time",
      width: 105,
      valueGetter: (params) => {
        return params.getValue("bookingTime");
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        if (params.value === "booked") {
          return <span className={classes.BookedLabel}> BM </span>;
        } else if (params.value === "patient_attended") {
          return <span className={classes.PatientAttendedLabel}> PA </span>;
        } else if (params.value === "sample_taken") {
          return <span className={classes.SampleTakenLabel}> ST </span>;
        } else if (params.value === "report_sent") {
          return <span className={classes.ReportSentLabel}> RS </span>;
        } else if (params.value === "report_cert_sent") {
          return <span className={classes.ReportCertSentLabel}> RCS </span>;
        } else if (params.value === "positive") {
          return <span className={classes.PositiveLabel}> POS </span>;
        } else {
          return "";
        }
      },
    },
    {
      field: "bookingRef",
      headerName: "Ref No.",
      width: 120,
      renderCell: (params) => {
        return (
          <Tooltip title="Go Find By Ref" placement="right">
            <Link
              className={classes.RefLink}
              //  onClick={
              //   () => {
              //     console.log(params.value);

              //     setState(state => ({...state, currentMenuIndex: getMenuIndex(`pcr` , `findByRef`)}));
              //     setState(state => ({...state, ref : params.value}));
              //     setState(state => ({...state, refError : false}));
              //     setState(state => ({...state, foundRecords : []}));
              //     setState(state => ({...state, findRecords : !state.findRecords}));
              //   }
              // }
            >
              {params.value}
            </Link>
          </Tooltip>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Tel", width: 150 },
    { field: "notes", headerName: "Notes", width: 500 },
  ];

  const [state, setState] = React.useContext(GlobalState);

  const [selectedRow, setSelectedRow] = React.useState(null);

  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [seeDetailsDialogOpen, setSeeDetailsDialogOpen] = React.useState(false);
  const [seeDetailsDialogOpenBloodReport, setSeeDetailsDialogOpenBloodReport] =
    React.useState(false);

  const [corporate, setCorporate] = useState(corporates[0]);
  const corporateChanged = (event) => {
    setCorporate(event.target.value);
  };

  const [filter, setFilter] = React.useState("");

  const lastPromise = useRef();

  const formatTimeStamp = (timeStamp) => {
    const todayStr = dateformat(new Date(), "yyyy-mm-dd");
    const timeStampStr = dateformat(timeStamp, "yyyy-mm-dd");
    if (todayStr === timeStampStr) {
      return dateformat(timeStamp, "'Today', h:MM:ss TT");
    } else {
      return dateformat(timeStamp, "mmm dS, h:MM:ss TT");
    }
  };

  const loadData = () => {};

  const handleCloseSeeDetaisDialog = () => {
    setSelectedBooking(null);
    setSeeDetailsDialogOpen(false);
    setSeeDetailsDialogOpenBloodReport(false);
  };

  const openDetailsDialog = (event, id, clinic) => {
    const booking = data.bookings.find((element) => element._id === id);
    setSelectedBooking(booking);
    if (clinic === "Blood Result") {
      setSeeDetailsDialogOpenBloodReport(true);
    } else {
      setSeeDetailsDialogOpen(true);
    }
  };

  const refreshClicked = (event) => {
    setFilter("");
    loadData(topCount);
  };

  const filterChanged = (event) => {
    setFilter(event.target.value);
    setFilterError(false);
  };

  const handleSelectionChanged = (newSelection) => {
    if (newSelection.length > 0) {
      setSelectedRow(newSelection.rows[0]);
    }
  };

  const [page, setPage] = React.useState(1);

  const handleExcelButtonClicked = (event) => {
    setOpenDialogExcel(true);
  };

  const isTopSelectHidden = (date) => {
    return (
      date === "live" ||
      date === "positive" ||
      date === "late" ||
      date === "today"
    );
  };

  const [filterError, setFilterError] = React.useState(false);
  const doSearch = () => {
    if (!filter || filter.trim().length < 3) {
      setFilterError(true);
      return;
    }

    loadData();
  };

  return (
    <React.Fragment>
      {data.bookings && data.bookings.length > 0 && (
        <div style={{ height: 700, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={data.bookings}
            columns={columns}
            autoPageSize
            page={page}
            onPageChange={(params) => {
              setPage(params.page);
            }}
            onSelectionChange={handleSelectionChanged}
          />
        </div>
      )}

      <BookingDialog
        booking={selectedBooking}
        open={seeDetailsDialogOpen}
        onClose={handleCloseSeeDetaisDialog}
      />

      {data.bookings && data.bookings.length > 0 && (
        <Dialog
          maxWidth="lg"
          open={openDialogExcel}
          onClose={handleCloseDialogExcel}
          PaperComponent={PaperComponent}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <FontAwesomeIcon
                  style={{ color: "#2f942e", fontSize: "2rem" }}
                  icon={faFileExcel}
                />
              </Grid>

              <Grid item>
                <div
                  style={{
                    color: "#2f942e",
                    paddingBottom: "5px",
                    fontWeight: "800",
                  }}
                >
                  {" "}
                  Export to EXCEL{" "}
                </div>
              </Grid>
            </Grid>

            <Divider />
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                minHeight: "600px",
                maxHeight: "600px",
                minWidth: "1200px",
                maxWidth: "1200px",
              }}
            >
              <div>
                <Grid row container justify="center" spacing={3}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={justCorporate}
                          onChange={justCorporateChanged}
                          name="justCorporate"
                        />
                      }
                      label="Just Corporate Records"
                    />
                  </Grid>

                  {justCorporate && (
                    <Grid item>
                      <FormControl
                        style={{ marginTop: "0px" }}
                        className={classes.formControl}
                      >
                        <Select
                          labelId="select-corporate"
                          id="select-corporate-id"
                          value={corporate}
                          onChange={corporateChanged}
                        >
                          {corporates.map((element) => (
                            <MenuItem value={element}>{`${element}`}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid row container justify="center" spacing={3}>
                    <Grid item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-from"
                        label="From"
                        value={fromDate}
                        onChange={handleFromDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-until"
                        label="Until"
                        value={untilDate}
                        onChange={handleUntilDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>

                    <Grid item>
                      <div style={{ paddingTop: "30px", marginLeft: "20px" }}>
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className={classes.ExportToExcelButtonInline}
                          table="table-to-xls"
                          filename={`PCR.Report.${fromDateStr}.${untilDateStr}`}
                          sheet="PCR-Report"
                          buttonText="Download as XLS"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>

              <div>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkDate}
                          onChange={chkDateChanged}
                          name="chkDate"
                        />
                      }
                      label="Date"
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkForename}
                          onChange={chkForenameChanged}
                          name="chkForename"
                        />
                      }
                      label="Forename"
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkSurname}
                          onChange={chkSurnameChanged}
                          name="chkSurname"
                        />
                      }
                      label="Surname"
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkDOB}
                          onChange={chkDOBChanged}
                          name="chkDOB"
                        />
                      }
                      label="D.O.B"
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkEmail}
                          onChange={chkEmailChanged}
                          name="chkEmail"
                        />
                      }
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkTel}
                          onChange={chkTelChanged}
                          name="chkTel"
                        />
                      }
                      label="Tel"
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkCertificate}
                          onChange={chkCertificateChanged}
                          name="chkCertificate"
                        />
                      }
                      label="Certificate"
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkAntiBodyTest}
                          onChange={chkAntiBodyTestChanged}
                          name="chkAntiBodyTest"
                        />
                      }
                      label="AntiBodyTest"
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkextRef}
                          onChange={chkextRefChanged}
                          name="chkextRef"
                        />
                      }
                      label="Lab No."
                    />
                  </Grid>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={chkPrice}
                          onChange={chkPriceChanged}
                          name="chkPrice"
                        />
                      }
                      label="Price"
                    />
                  </Grid>
                </Grid>
              </div>

              <div style={{ width: "100%", paddingTop: "20px" }}>
                <table className={classes.table} id="table-to-xls">
                  <tr>
                    {chkDate && <th className={classes.th}>Date</th>}
                    {chkForename && <th className={classes.th}>Forename</th>}
                    {chkSurname && <th className={classes.th}>Surename</th>}
                    {chkDOB && <th className={classes.th}>D.O.B</th>}
                    {chkEmail && <th className={classes.th}>Email</th>}
                    {chkTel && <th className={classes.th}>Tel</th>}
                    {chkCertificate && (
                      <th className={classes.th}>Certificate</th>
                    )}
                    {chkAntiBodyTest && (
                      <th className={classes.th}>AntiBodyTest</th>
                    )}
                    {chkextRef && <th className={classes.th}>Lab No.</th>}
                    {chkPrice && <th className={classes.th}>Price (£) </th>}
                  </tr>

                  {data.bookings
                    .filter((booking) => {
                      if (!justCorporate) {
                        return (
                          booking.bookingDate >= fromDateStr &&
                          booking.bookingDate <= untilDateStr
                        );
                      } else {
                        return (
                          booking.bookingDate >= fromDateStr &&
                          booking.bookingDate <= untilDateStr &&
                          booking.paid &&
                          booking.paidBy === "corporate" &&
                          booking.corporate === corporate
                        );
                      }
                    })

                    .map((booking) => (
                      <tr>
                        {chkDate && (
                          <td className={classes.td}>
                            {FormatDateFromString(booking.bookingDate)}
                          </td>
                        )}
                        {chkForename && (
                          <td className={classes.td}>
                            {booking.forenameCapital}
                          </td>
                        )}
                        {chkSurname && (
                          <td className={classes.td}>
                            {booking.surnameCapital}
                          </td>
                        )}
                        {chkDOB && (
                          <th className={classes.th}>
                            {/* {FormatDateFromString(booking.birthDate)} */}
                          </th>
                        )}
                        {chkEmail && (
                          <td className={classes.td}>{booking.email}</td>
                        )}
                        {chkTel && (
                          <td className={classes.td}>{booking.phone}</td>
                        )}
                        {chkCertificate && (
                          <td className={classes.td}>
                            {booking.certificate ? "YES" : "NO"}
                          </td>
                        )}
                        {chkAntiBodyTest && (
                          <td className={classes.td}>
                            {booking.antiBodyTest ? "YES" : "NO"}
                          </td>
                        )}
                        {chkextRef && (
                          <td className={classes.td}>{booking.extRef}</td>
                        )}
                        {chkPrice && (
                          <td className={classes.td}>
                            {PriceCalculator.calculatePrice(booking)}
                          </td>
                        )}
                      </tr>
                    ))}
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <BloodReportDialog
        booking={selectedBooking}
        open={seeDetailsDialogOpenBloodReport}
        onClose={handleCloseSeeDetaisDialog}
      />
    </React.Fragment>
  );
}
