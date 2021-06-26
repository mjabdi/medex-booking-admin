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
} from "../Admin/DateFormatter";

import SearchIcon from "@material-ui/icons/Search";
import BookingDialog from "../Admin/BookingDialog";

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
import PriceCalculator from "../Admin/PriceCalculator";
import { corporates } from "../Admin/Corporates";

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import BloodReportDialog from "../Blood/BloodReportDialog";
import { CalendarColors } from "../Admin/calendar-admin/colors";
import ViewInvoiceDialog from "./ViewInvoiceDialog";

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


  DefaultLabel: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: "0.95rem",
  },

  Summary: {
    marginTop: "10px",
    padding: "15px 30px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#333",
    color: "#fff",
    fontWeight: "500",
    fontSize: "1rem"
  }

}));

const getTableTitle = (str) => {
  if (str === "today") {
    return `Today's Bookings`;
  } else if (str === "old") {
    return `Old Bookings`;
  } else if (str === "future") {
    return `Future Bookings`;
  } else if (str === "recent") {
    return `Recent Bookings`;
  } else if (str === "live") {
    return `Live Bookings`;
  } else if (str === "completed") {
    return `Completed Bookings`;
  } else if (str === "positive") {
    return `Positive Results`;
  } else if (str === "deleted") {
    return `Deleted Records`;
  } else if (str === "late") {
    return `40 Hours Late`;
  } else {
    return `All Bookings`;
  }
};

const getTableIcon = (str) => {
  if (str === "today") {
    return <NewReleasesIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === "old") {
    return <HistoryIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === "future") {
    return <TimelineIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === "recent") {
    return <AutorenewIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === "live") {
    return <LiveTvIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === "completed") {
    return <PlaylistAddCheckIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === "positive") {
    return <AddCircleOutlineIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === "deleted") {
    return <DeleteIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === "late") {
    return <HourglassEmptyIcon style={{ fontSize: "2.2rem" }} />;
  } else {
    return <DescriptionIcon style={{ fontSize: "2.2rem" }} />;
  }
};

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

export default function PeriodicReport(props) {
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

  const [clinic, setClinic] = React.useState('all')

  const [fromDate, setFromDate] = React.useState(null)
  //   new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  // );


  const handleFromDateChange = (date) => {
    if (!date || date.toString() === "Invalid Date") {
      setFromDateStr('')
      return
    }

    setFromDate(date);
    setFromDateStr(dateformat(date, "yyyy-mm-dd"));
    setFromDateError(false)
  };

  const [untilDate, setUntilDate] = React.useState(null);
  // new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
  // );
  const handleUntilDateChange = (date) => {
    if (!date || date.toString() === "Invalid Date") {
      seUntilDateStr('');
      return
    }

    setUntilDate(date);
    seUntilDateStr(dateformat(date, "yyyy-mm-dd"));
    setUntilDateError(false)
  };

  const [fromDateError, setFromDateError] = React.useState(false)
  const [untilDateError, setUntilDateError] = React.useState(false)


  const [fromDateStr, setFromDateStr] = useState('')
  const [untilDateStr, seUntilDateStr] = useState('')

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


  const removeTitle = (_name) => {
    let name = _name
    const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr"]
    titles.forEach(title => {
      if (_name.indexOf(`${title} `) === 0) {
        name = _name.substring(title.length)
      }
    })

    return name
  }

  var columns = [];

  columns = [
    // { field: 'id', headerName: '#', width: 70 },

    {
      field: "_id",
      headerName: "Invoice #",
      width: 130,
      renderCell: (params) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={(event) => openDetailsDialog(event, params.value, params.getValue("clinic"))}
          >
            <span style={{ minWidth: "60px", color: "#00a1c5", display: "inline-block" }}>{params.getValue("invoiceNumber")}</span>
            <IconButton
              color="primary"
            >
              <SearchIcon />
            </IconButton>
          </div>
        );
      },
    },
    {
      field: "grandTotal",
      headerName: "Amount",
      align: "center",
      width: 140,
      renderCell: (params) => {
        return (
          <span style={{ fontSize: "1rem", fontWeight: "500", color: "#067500" }}>
            {parseFloat(
              params.value
            ).toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
          </span>
        );
      },
    },
    {
      field: "clinic",
      headerName: "Clinic",
      align: "center",
      width: 90,
      renderCell: (params) => {
        return (
          <span className={getClassforClinic(params.value)} style={{ fontSize: "0.8rem" }}>
            {params.value ? params.value.toUpperCase() : "N/A"}
          </span>
        );
      },
    },

    {
      field: "name", headerName: "Fullname", width: 200, renderCell: (params) => {

        return (
          <span style={{ fontSize: "0.8rem", fontWeight: "500" }}>
            {removeTitle(params.value)}
          </span>
        )

      }
    },


    {
      field: "timeStamp",
      headerName: "Invoice Date",
      width: 250,
      renderCell: (params) => {
        return (
          <span style={{ fontSize: "0.8rem", fontWeight: "500" }}>
            {formatTimeStamp(params.value)}
          </span>
        )
      },
    },
  ];


  const [state, setState] = React.useContext(GlobalState);

  const [data, setData] = React.useState({
    bookings: [],
    cachedBookings: [],
    isFetching: false,
  });

  const [selectedRow, setSelectedRow] = React.useState(null);

  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [seeDetailsDialogOpen, setSeeDetailsDialogOpen] = React.useState(false);
  const [seeDetailsDialogOpenBloodReport, setSeeDetailsDialogOpenBloodReport] = React.useState(false);


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
      return dateformat(timeStamp, "mmmm dS yyyy, h:MM:ss TT");
    }
  };

  const loadData = () => {
    var api = BookService.searchAllInvoicesByDate;

    setData({ bookings: [], cachedBookings: [], isFetching: true });

    // console.log(props)
    const search = {
      from: fromDate,
      until: untilDate,
      clinic: clinic
    }

    const currentPromise = api(search)
      .then((res) => {
        // console.log(res)
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i] = { ...res.data.result[i], id: i + 1 };
        }
        setData({
          bookings: [...res.data.result],
          cachedBookings: [...res.data.result],
          isFetching: false,
        });
        // return res.data;
      })
      .catch((err) => {
        console.error(err);
      });

    // lastPromise.current = currentPromise;

    // currentPromise.then(
    //   result => {
    //     if (currentPromise === lastPromise.current) {
    //       setData({bookings: [...result], cachedBookings: [...result], isFetching: false});
    //       setPage(1);
    //     }
    //   },
    //   e => {
    //     if (currentPromise === lastPromise.current) {
    //         console.error(e);
    //         setData({bookings: data.bookings, cachedBookings: data.cachedBookings, isFetching: false});
    //     }
    //   });

  };

  const handleCloseSeeDetaisDialog = () => {
    setSelectedBooking(null);
    setSeeDetailsDialogOpen(false);
    setSeeDetailsDialogOpenBloodReport(false);
  };

  const openDetailsDialog = (event, id, clinic) => {
    const booking = data.bookings.find((element) => element._id === id);
    setSelectedBooking(booking);
    setSeeDetailsDialogOpen(true);
  };

  const refreshClicked = (event) => {
    setFilter("");
    loadData(topCount);
  };

  const filterChanged = (event) => {
    setFilter(event.target.value);
    setFilterError(false)
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

  const [filterError, setFilterError] = React.useState(false)

  const validateData = () => {
    let error = false
    if (!fromDateStr) {
      setFromDateError(true)
      error = true
    }
    if (!untilDateStr) {
      setUntilDateError(true)
      error = true
    }

    return !error
  }

  const doSearch = () => {

    if (!validateData())
      return

    loadData()
  }

  const calcTotalAmount = (bookings) => {
    let amount = 0
    bookings.forEach(record => {
      amount += record.grandTotal
    })

    return amount
  }

  return (
    <React.Fragment>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>


        <div style={{ padding: "0px 10px 20px 10px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <KeyboardDatePicker
                error={fromDateError}
                autoOk={true}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-until"
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
                error={untilDateError}
                autoOk={true}
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
              <FormControl style={{ marginTop: "5px", width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Clinic</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={clinic}
                  onChange={(event) => setClinic(event.target.value)}
                >
                  <MenuItem value={'all'}>All Clinics</MenuItem>
                  <MenuItem value={'pcr'}>PCR</MenuItem>
                  <MenuItem value={'gynae'}>Gynae</MenuItem>
                  <MenuItem value={'gp'}>GP</MenuItem>
                  <MenuItem value={'std'}>STD</MenuItem>
                  <MenuItem value={'blood'}>Blood</MenuItem>
                  <MenuItem value={'screening'}>Screening</MenuItem>
                  <MenuItem value={'derma'}>Derma</MenuItem>

                </Select>
              </FormControl>
            </Grid>



            <Grid item>
              <FormControlLabel style={{marginTop:"30px"}}
                control={
                  <Switch
                    checked={justCorporate}
                    onChange={justCorporateChanged}
                    name="justCorporate"
                  />
                }
                label="Corporate"
              />
            </Grid>

            {justCorporate && (
              <Grid item>
                <FormControl
                  style={{ marginTop: "20px", width: "150px" }}
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

            <Grid item xs={8}>
              <Button disabled={data.isFetching} fullWidth style={{ marginTop: "0px" }} variant="contained" color="primary" onClick={doSearch}>
                Generate Report
              </Button>
            </Grid>

            <Grid item>
              {data.isFetching && (
                <div style={{ width: "100%", paddingTop: "0px" }}>
                  <CircularProgress color="primary" />
                </div>
              )}
            </Grid>



          </Grid>
        </div>


        {data.bookings && data.bookings.length > 0 && (
          <div className={classes.Summary}>
            <Grid container spacing={4} justify="space-between" alignItems="center">
              <Grid item>
                <span style={{ width: "115px", display: "inline-block", color: "#eee" }}>Total Records :</span>
                <span>{data.bookings?.length}</span>
              </Grid>
              <Grid item>
                <span style={{ width: "115px", display: "inline-block", color: "#eee" }}>Total Amount :</span>
                <span style={{ fontWeight: "700" }}>{parseFloat(
                  calcTotalAmount(data.bookings)
                ).toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}
                </span>
              </Grid>
            </Grid>
          </div>
        )}


        {data.bookings && data.bookings.length > 0 && (
          <div style={{ height: 700, width: "100%", marginTop: "0px" }}>
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

        <ViewInvoiceDialog
          booking={selectedBooking}
          invoice={selectedBooking}
          open={seeDetailsDialogOpen}
          handleClose={handleCloseSeeDetaisDialog}
        />

      </MuiPickersUtilsProvider>

    </React.Fragment>
  );
}
