import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import PatientService from "./services/PatientService";
import BookingTableForPatient from './BookingTableForPatient'
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import {
  FormatDateFromString,
} from "./DateFormatter";

import SearchIcon from "@material-ui/icons/Search";
import * as dateformat from "dateformat";
import { CalendarColors } from "./calendar-admin/colors";
import { width } from "@material-ui/system";

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


export default function SearchBookingTable(props) {
  const classes = useStyles();

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
        return classes.clinicTitle;
    }
  };

  // console.log(props.data.fullname)
  let columns = [];
  columns = [
    {
      field: "_id",
      headerName: " ",
      width: 100,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Button
              color="primary"
              onClick={(event) => props.select(null, params.value)}
            >
              Select
            </Button>
          </React.Fragment>
        );
      },
    },
    {
      field: "patientId",
      headerName: "Patient ID",
      width: 120,
    },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 250,
      valueGetter: (params) => {
        if (!params.value || params.value.length === 0) {
          return `${params.getValue("forename")} ${params.getValue("surname")}`;
        } else {
          return params.value;
        }
      },
    },
    {
      field: "birthDate",
      headerName: "Birth Date",
      align: "center",
      width: 130,
      valueFormatter: (params) => {
        return FormatDateFromString(params.value);
      },
    },
    {
      field: "allbookings",
      headerName: "Bookings Count",
      width: 170,
      valueFormatter: (params) => {
        return params.value?.length || 0;
      },
    },
    {
      field: "bookings",
      headerName: "Last Booking Clinic",
      align: "center",
      width: 190,
      renderCell: (params) => {
        return (
          <span className={getClassforClinic(Array.isArray(params.value) ? params.value[0].clinic : '')}>
            {Array.isArray(params.value) && params.value[0].clinic
              ? params.value[0].clinic?.toUpperCase()
              : "N/A"}
          </span>
        );
      },
    },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "title", headerName: "Title", width: 100 },
    { field: "phone", headerName: "Tel", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
  ];
  const [data, setData] = React.useState({
    bookings: [],
    cachedPatients: [],
    isFetching: false,
  });
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [seeDetailsDialogOpen, setSeeDetailsDialogOpen] = React.useState(false);
 const [birthDate, setBirthDate] = React.useState(null);

  const [filter, setFilter] = React.useState("");

  // const formatTimeStamp = (timeStamp) => {
  //   const todayStr = dateformat(new Date(), "yyyy-mm-dd");
  //   const timeStampStr = dateformat(timeStamp, "yyyy-mm-dd");
  //   if (todayStr === timeStampStr) {
  //     return dateformat(timeStamp, "'Today', h:MM:ss TT");
  //   } else {
  //     return dateformat(timeStamp, "mmm dS, h:MM:ss TT");
  //   }
  // };

  const loadData = (initialFilter, initialBirthDate) => {
    var api = PatientService.searchAllPatients;

    setData({ patients: [], cachedPatients: [], isFetching: true });

    // console.log(props)

    return api(initialFilter || filter, initialBirthDate || birthDateStr)
      .then((res) => {
        // console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          res.data[i] = { ...res.data[i], id: i + 1 };
        }
        setData({
          patients: [...res.data],
          cachedPatients: [...res.data],
          isFetching: false,
        });
        // return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCloseSeeDetaisDialog = () => {
    setSeeDetailsDialogOpen(false);
    setSelectedBooking({id:0, bookings: null});
  };

  const openDetailsDialog = (event, id) => {
    const booking = data.patients.find((element) => element._id === id);
    setSelectedBooking({ id: 0, bookings: null, ...booking });
    setSeeDetailsDialogOpen(true);
  };

  const filterChanged = (event) => {
    setFilter(event.target.value);
    setFilterError(false);
  };

  const [page, setPage] = React.useState(1);

  const [filterError, setFilterError] = React.useState(false);
   const handleBirthDateChange = (date) => {
     setBirthDate(date);
     setBirthDateStr(dateformat(date, "yyyy-mm-dd"));
   };
     const [birthDateStr, setBirthDateStr] = useState(
       dateformat(
         null,
         "yyyy-mm-dd"
       )
     );
  const doSearch = () => {
    loadData();
  };

  useEffect(()=>{
    const loadInitialData = async () => {
      try {
        loadData(
          props.data.fullname || `${props.data.surname} ${props.data.forename}`,
          props.data.birthDate
        );
      } catch (err) {
        console.error(err);
      }
    };    
    loadInitialData();
  },[])

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
      >
        <Grid item md={4}>
          <TextField
            error={filterError}
            variant="standard"
            value={filter}
            onChange={filterChanged}
            id="filter"
            label="Patient's Name"
            helperText={`You can search the patients by name ${
              filterError ? "- Please Enter at least 3 characters" : ""
            }`}
            name="filter"
            autoComplete="off"
            style={{ width: "250px" }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                doSearch();
              }
            }}
          />
        </Grid>
        <Grid item md={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-from"
                  label="Birth date"
                  value={birthDate}
                  onChange={handleBirthDateChange}
                />
              </MuiPickersUtilsProvider>
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" onClick={doSearch}>
            Search
          </Button>
        </Grid>

        <Grid item>
          {data.isFetching && (
            <div style={{ width: "100%", paddingTop: "3px" }}>
              <CircularProgress color="primary" />
            </div>
          )}
        </Grid>

        {data.isFetching && <div className={classes.HideNowRows}></div>}
      </Grid>

      {data.patients && data.patients.length > 0 && (
        <div style={{ height: 700, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={data.patients}
            columns={columns}
            autoPageSize
            page={page}
            onPageChange={(params) => {
              setPage(params.page);
            }}
          />
        </div>
      )}
      {data.patients && data.patients.length > 0 && (
        <Dialog
          maxWidth="lg"
          open={seeDetailsDialogOpen}
          onClose={handleCloseSeeDetaisDialog}
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
                <div
                  style={{
                    color: "#2f942e",
                    paddingBottom: "5px",
                    fontWeight: "800",
                  }}
                >
                  {" "}
                  Patient Info{" "}
                </div>
              </Grid>
            </Grid>
            <Divider />
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <div
                  style={{
                    color: "#2f942e",
                    paddingBottom: "5px",
                    fontWeight: "800",
                  }}
                >
                  {" "}
                  Details{" "}
                </div>
              </Grid>
            </Grid>
            <Divider />
            <div
              style={{
                minHeight: 120,
                width: "100%",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <DataGrid
                rows={[selectedBooking]}
                columns={columns}
                hideFooter={true}
              />
            </div>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <div
                  style={{
                    color: "#2f942e",
                    paddingBottom: "5px",
                    fontWeight: "800",
                  }}
                >
                  {" "}
                  History{" "}
                </div>
              </Grid>
            </Grid>
            <Divider />
            <BookingTableForPatient bookingsData={selectedBooking} />
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
}
