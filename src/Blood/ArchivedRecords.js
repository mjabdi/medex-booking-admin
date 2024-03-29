import React, { useEffect, useRef, useState } from 'react';
import { DataGrid, ROW_CLICK } from '@material-ui/data-grid';
import BookService from './services/BookService';
import Typography from '@material-ui/core/Typography';
import { Button, Checkbox, Divider, FormControlLabel, Grid, Link, makeStyles, TextField, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { IconButton } from '@material-ui/core';
import LoaderSpinner from 'react-loader-spinner';
import GlobalState from '../GlobalState';
import { withStyles } from '@material-ui/core/styles';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import SearchIcon from '@material-ui/icons/Search';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import dateformat from 'dateformat';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import BookingDialog from './BookingDialog';
import BloodReportDialog from './BloodReportDialog';

import Alert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

import WarningIcon from '@material-ui/icons/Warning';

import { FormatDateFromString, RevertFormatDateFromString } from './DateFormatter';
import PDFService from './services/PDFService';

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

import ArchiveIcon from '@material-ui/icons/Archive';
import { CalendarColors } from '../Admin/calendar-admin/colors';


var interval;

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),

  },

  refreshButton: {
    marginLeft: theme.spacing(2),
  },

  checkIcon: {
    color: "green"
  },

  closeIcon: {
    color: "red"
  },

  RefLink: {
    cursor: "pointer"
  },

  BookedLabel: {
    backgroundColor: "#606060",
    color: "#fff",
    paddingRight: "10px",
    paddingLeft: "10px"
  },

  PatientAttendedLabel: {
    backgroundColor: "#0066aa",
    color: "#fff",
    paddingRight: "15px",
    paddingLeft: "10px"
  },

  SampleTakenLabel: {
    backgroundColor: "#0066cc",
    color: "#fff",
    paddingRight: "40px",
    paddingLeft: "10px"
  },

  ReportSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "90px",
    paddingLeft: "10px"
  },

  ReportCertSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "68px",
    paddingLeft: "10px"
  },

  archiveButton: {

  },

  smartMatchButton: {
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff"
    },
    textDecoration: "none !important",
    marginRight: "10px"
    // padding: "10px"  
  },

  infoTitle: {
    fontWeight: "400"
  },

  infoData: {
    paddingLeft: "10px",
    fontWeight: "800"
  },

  matchButton:
  {
    marginTop: "30px",
    marginBottom: "20px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff"
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px"
  },

  resendButton:
  {
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff"
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px"
  },

  resendFilesButton: {
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#3792ad",
    "&:hover": {
      background: "#2f798f",
      color: "#fff"
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px"
  },

  cancelButton:
  {
    marginBottom: "10px",
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "90px",
    paddingRight: "90px"
  },

  downloadPDFButton:
  {
    marginRight: "50px"
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
    fontSize: "0.85rem",
  },

  CorporateLabel: {
    color: CalendarColors.CORPORATE_COLOR,
    fontWeight: "600",
    fontSize: "0.85rem",
  },



}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#cedbce" //theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#2f942e',
  },
}))(LinearProgress);
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography style={{ fontWeight: "800", color: "#5e855e" }} variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function ArchivedRecords() {

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
      case "screening":
        return classes.ScreeningLabel;
      case "corporate":
        return classes.CorporateLabel;
    

      default:
        return classes.clinicTitle;
    }
  };

  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [seeDetailsDialogOpen, setSeeDetailsDialogOpen] = React.useState(false);


  const openDetailsDialog = (id) =>
  {
    const booking = data.bookings.find(element => element._id === id);
    setSelectedBooking(booking);
    setSeeDetailsDialogOpen(true);
  }

  


  const columns = [
    {
      field: 'id', headerName: ' ', width: 100, renderCell: (params) => {
        return (

          <React.Fragment>

            {params.getValue("emailSent") && (
              <Tooltip style={{ fontSize: "20px" }} title="Email has been sent">
                <SendRoundedIcon style={{ fontSize: "20px", color: "#009634" }} />
              </Tooltip>
            )
            }
            { !params.getValue("emailSent") && (
              <SendRoundedIcon style={{ fontSize: "20px", color: "#fafafa" }} />
            )
            }



            <Button
              color="primary"
              onClick={event => openDetailsDialog(params.getValue("_id"))}
            >

              <SearchIcon />

            </Button>

          </React.Fragment>



        );

      }
    },

    {
      field: "clinic",
      headerName: "Clinic",
      align: "center",
      width: 90,
      renderCell: (params) => {
        return (
          <span className={getClassforClinic(params.value)}>
            {params.value ? params.value.toUpperCase() : "N/A"}
          </span>
        );
      },
    },


    {
      field: 'testDate', headerName: 'Test Date', width: 120, valueFormatter: (params) => {
        return FormatDateFromString(params.value);
      }
    },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'birthDate', headerName: 'D.O.B', width: 120, valueFormatter: (params) => {
        return FormatDateFromString(params.value);
      }
    },
    { field: 'email', headerName: 'Email', width: 150 },

    {
      field: '_id', headerName: 'Action', width: 500, renderCell: (params) => {
        if (selectedTab === 'unresolved') {
          return (
            <React.Fragment>

              {/* <Button
                    disabled = {params.value === disableId}
                    type="button"
                    variant="contained"
                    color="primary"
                    startIcon={<WbIncandescentIcon />}
                    onClick = { event => smartMatchClicked(event,params.value)}
                    className={classes.smartMatchButton}
                    >
                    smart match
              </Button> */}



              <Button
                disabled={params.value === disableId}
                type="button"
                color="primary"
                onClick={event => downloadLabReport(params.value)}
                className={classes.downloadPDFButton}
              >
                view pdf
              </Button>

              <Button
                disabled={params.value === disableId}
                type="button"
                variant="contained"
                color="primary"
                onClick={event => unArchiveRecord(event, params.value)}
                className={classes.archiveButton}
              >
                Restore
              </Button>



            </React.Fragment>

          );
        } else {
          return (

            <React.Fragment>

              {/* <Button
                        disabled = {params.value === disableId}
                        type="button"
                        variant="contained"
                        color="primary"
                        startIcon={<WbIncandescentIcon />}
                        onClick = { event => smartMatchClicked(event,params.value)}
                        className={classes.smartMatchButton}
                        >
                        smart match
                  </Button> */}

              <Button
                disabled={params.value === disableId}
                type="button"
                variant="contained"
                color="primary"
                onClick={event => unArchiveRecord(event, params.value)}
                className={classes.archiveButton}
              >
                Restore
                  </Button>

              <Button
                disabled={params.value === disableId}
                type="button"
                color="primary"
                onClick={event => downloadLabReport(params.value)}
                className={classes.downloadPDFButton}
              >
                view pdf
                  </Button>

            </React.Fragment>
          );
        }

      }
    },

  ];

  const [state, setState] = React.useContext(GlobalState);

  const [data, setData] = React.useState({ bookings: [], cachedBookings: [], isFetching: false });

  const [selectedRow, setSelectedRow] = React.useState(null);

  const [filter, setFilter] = React.useState('');

  const [refresh, setRefresh] = React.useState(false);

  const [disableId, setDisableId] = React.useState(null);

  const [selectedTab, setSeletedTab] = React.useState('unresolved');

  const [openDialog, setOpenDialog] = React.useState(false);

  const [smartLinkId, setSmartLinkId] = React.useState(null);

  const [smartLinkDetails, setSmartLinkDetails] = React.useState(null);

  const [likelyBookings, setLikelyBookings] = React.useState(null);

  const [seeDetailsBooking, setSeeDetailsBooking] = React.useState(null);

  const [matching, setMatching] = React.useState(false);

  const [matched, setMatched] = React.useState(false);

  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const [sendJustToPCR, setSendJustToPCR] = React.useState(false);

  const [sendingStatus, setSendingStatus] = React.useState('');

  const [sendingProgress, setSendingProgress] = React.useState(10);

  const [loading, setLoading] = React.useState(false)


  const handleTabChanged = (event, value) => {
    if (value && value.length) {
      setSeletedTab(value);
    }

  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setSmartLinkId(null);
      setSmartLinkDetails(null);
      setLikelyBookings(null);
      setSelectedBooking(null);
      setMatched(false);
      setMatching(false);
      setSendingStatus(null);
      setSending(false);
      setSent(false);
      clearInterval(interval);
      setSendJustToPCR(false);
    }, 100);
  }

  const handleCloseSeeDetaisDialog = () => {
    setSeeDetailsDialogOpen(false);
    setSelectedBooking(false)
    // setTimeout(() => {
    //   setSeeDetailsBooking(null);
    // }, 500);
  }

  const seeDetailsClicked = (event, row) => {
    setSeeDetailsBooking(row);
    setSeeDetailsDialogOpen(true);
  }

  const smartMatchClicked = (event, id) => {
    setSmartLinkId(id);
    setOpenDialog(true);
    findBestMatches(id);
  }

  useEffect(() => {
    if (smartLinkId) {
      findBestMatches(smartLinkId);
      // console.log('refrshing....');

    }


  }, [state.bookingDialogDataChanged]);

  const findBestMatches = (id) => {
    BookService.getLinkDetails(id).then(res => {
      setSmartLinkDetails(res.data);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });

    BookService.findBestMatches(id).then(res => {
      setLikelyBookings(res.data.matchedBookings);
    }).catch(err => {
      console.log(err);
      setLikelyBookings([]);
    })
  }

  const archiveRecord = (event, id) => {
    if (disableId) {
      return;
    }
    setDisableId(id);

    BookService.archiveBloodReport(id).then(
      (res) => {
        setDisableId(null);
        setRefresh(!refresh);
      }
    ).catch((err) => {
      setDisableId(null);
    })
  }

  const unArchiveRecord = (event, id) => {
    if (disableId) {
      return;
    }
    setDisableId(id);

    BookService.unArchiveBloodReport(id).then(
      (res) => {
        setDisableId(null);
        setRefresh(!refresh);
      }
    ).catch((err) => {
      setDisableId(null);
    })
  }


  const lastPromise = useRef();

  useEffect(() => {

    var api = BookService.getArchivedBloodReports;
    // if (selectedTab === 'archived') {
    //   api = BookService.getArchivedMatchedBloodReports;
    // }

    setLoading(true)

    setData({ bookings: [], cachedBookings: [], isFetching: true });
    const currentPromise = api().then((res) => {

      for (var i = 0; i < res.data.result.length; i++) {
        res.data.result[i] = { ...res.data.result[i], id: i + 1 }
      }

      return res.data.result;
    })

    lastPromise.current = currentPromise;

    currentPromise.then(
      result => {
        if (currentPromise === lastPromise.current) {
          setLoading(false)
          setData({ bookings: result, cachedBookings: [...result], isFetching: false });
        }
      },
      e => {
        if (currentPromise === lastPromise.current) {
          setLoading(false)
          console.log(e);
          setData({ bookings: data.bookings, cachedBookings: data.cachedBookings, isFetching: false });
        }
      });
  },
    [refresh, selectedTab, state.bloodReportRefresh]);





  useEffect(() => {

    if (filter && filter.trim().length > 0) {
      var filteredData = data.cachedBookings.filter((element) => {

        return (element.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
          ;

      });


      setData({ bookings: filteredData, cachedBookings: data.cachedBookings, isFetching: false });
    } else {
      setData({ bookings: [...data.cachedBookings], cachedBookings: data.cachedBookings, isFetching: false });
    }
  },
    [filter]);






  const refreshClicked = (event) => {
    setFilter('');
    setRefresh(!refresh);

  }

  const filterChanged = (event) => {
    setFilter(event.target.value);
  }

  const handleSelectionChanged = (newSelection) => {
    if (newSelection.length > 0) {
      setSelectedRow(newSelection.rows[0]);
    }
  }

  const handleCheckChanged = (event, row) => {
    if (event.target.checked) {
      setSelectedBooking(row);
    }
    else {
      setSelectedBooking(null);
    }
  }

  const matchRecords = (event) => {

    setMatching(true);

    BookService.getBookingById(selectedBooking._id).then(res => {
      setSelectedBooking(res.data);
    });

    BookService.matchRecords(selectedBooking._id, smartLinkId).then(res => {

      if (res.data.status === 'OK') {
        setMatching(false);
        setMatched(true);
      }

    }).catch(err => {
      console.log(err);
    });
  }

  const getProgress = (status) => {
    console.log(`status : ${status}`);

    if (status === 'downloadFailed')
      return 10;
    else if (status === 'downloading')
      return 30;
    else if (status === 'downloadSuccess')
      return 70;
    else if (status === 'sent')
      return 100;
    else
      return 0;

  }

  useEffect(() => {

    setSendingProgress((prevProgress) => (prevProgress >= 100 ? 100 : getProgress(sendingStatus)));

  }, [sendingStatus]);

  const resendFilesClicked = (event) => {
    setSending(true);
    setSendingProgress(0);
    setSendingStatus('downloadFailed');
    setSendJustToPCR(true);


    BookService.regenerateFiles(smartLinkId).then(res => {

      interval = setInterval(() => {

        // setProgress(sendingCounter);

        // setProgress(getProgress(sendingStatus));

        BookService.getLinkDetails(smartLinkId).then(res => {

          setSendingStatus(res.data.status);

          if (res.data.status === 'sent') {
            setSending(false);
            setSent(true);
            setRefresh(!refresh);
            clearInterval(interval);
          }
        });

      }, 1000);

    }).catch(err => {
      console.log(err);
      setSending(false);
    });


  }

  const resendEmailsClicked = (event) => {
    setSending(true);
    setSendingProgress(0);
    setSendingStatus('downloadFailed');


    BookService.resendEmails(smartLinkId).then(res => {

      interval = setInterval(() => {



        // setProgress(sendingCounter);

        // setProgress(getProgress(sendingStatus));

        BookService.getLinkDetails(smartLinkId).then(res => {

          setSendingStatus(res.data.status);

          if (res.data.status === 'sent') {
            setSending(false);
            setSent(true);
            setRefresh(!refresh);
            clearInterval(interval);
          }
        });

      }, 1000);

    }).catch(err => {
      console.log(err);
      setSending(false);
    });



  }

  const cancelResendEmailsClicked = (event) => {
    setMatched(false);
  }

  const downloadLabReport = (id) => {
    PDFService.downloadPdfLabReport(id).then((res) => {
      const file = new Blob(
        [res.data],
        { type: 'application/pdf' });

      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");



    }).catch((err) => {
      console.log(err);
    });
  }


  return (
    <React.Fragment>

      {loading && (
        <div style={{ width: "100%", paddingTop: "3px" }}>
          <LinearProgress color="primary" />
        </div>
      )}

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item md={5}>
          <div style={{ textAlign: "left", paddingLeft: "10px" }}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <span style={{ paddingRight: "15px", color: "#777" }}> <ArchiveIcon style={{ fontSize: "2.2rem" }} /> </span>
              </Grid>
              <Grid item>
                <span style={{ fontSize: '1.4rem', fontWeight: "600", color: "#555" }}> Archived Blood Results </span>
              </Grid>
              <Grid item>
                <Tooltip title="Refresh" placement="right">
                  <IconButton
                    color="primary"
                    className={classes.refreshButton}
                    onClick={refreshClicked}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </div>
        </Grid>

        {/* <Grid item md={3}>
          <ToggleButtonGroup
            value={selectedTab}
            style={{ marginBottom: "10px" }}
            exclusive
            onChange={handleTabChanged}
            aria-label="text alignment"
          >
            <ToggleButton value="unresolved" aria-label="left aligned">
              NEW
            </ToggleButton>
            <ToggleButton value="archived" aria-label="centered">
              Archived
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid> */}

        <Grid item md={3}>
          <TextField
            variant="standard"
            value={filter}
            onChange={filterChanged}
            margin="normal"
            size="small"
            id="filter"
            label="Filter"
            name="filter"
            autoComplete="off"
          />
        </Grid>
      </Grid>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={data.bookings}
          columns={columns}
          autoPageSize
          onSelectionChange={handleSelectionChanged}
        />
      </div>

      <Dialog
        maxWidth="lg"
        open={openDialog}
        onClose={handleCloseDialog}
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
              <WbIncandescentIcon
                style={{ color: "#2f942e", fontSize: "2rem" }}
              />
            </Grid>

            <Grid item>
              <div
                style={{
                  color: "#2f942e",
                  paddingBottom: "12px",
                  fontWeight: "800",
                }}
              >
                {" "}
                SMART MATCH{" "}
              </div>
            </Grid>
          </Grid>

          <Divider />
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              height: "600px",
              // width: "1200px",
            }}
          >
            {(!likelyBookings || !smartLinkDetails) && (
              <React.Fragment>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <LoaderSpinner
                      style={{ marginTop: "170px" }}
                      type="Grid"
                      color="#2f942e"
                      height={100}
                      width={100}
                      timeout={0} //3 secs
                    />
                  </Grid>
                  <Grid item>
                    <div
                      style={{
                        color: "#2f942e",
                        paddingBottom: "12px",
                        fontWeight: "800",
                      }}
                    >
                      {" "}
                      SEARCHING ...{" "}
                    </div>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {likelyBookings && likelyBookings.length === 0 && (
              <React.Fragment>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <div
                      style={{
                        color: "#2f942e",
                        paddingBottom: "12px",
                        fontWeight: "800",
                        marginTop: "230px",
                      }}
                    >
                      {" "}
                      SORRY, NO RECORDS FOUND !{" "}
                    </div>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {likelyBookings && smartLinkDetails && likelyBookings.length > 0 && (
              <React.Fragment>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#2f942e",
                        marginBottom: "15px",
                      }}
                    >
                      {" "}
                      LAB RECORD :
                    </div>

                    <Grid
                      style={{ paddingLeft: "20px", paddingBottom: "20px" }}
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      spacing={4}
                    >
                      <Grid item>
                        <span className={classes.infoTitle}>Name:</span>
                        <span className={classes.infoData}>
                          {smartLinkDetails.name}
                        </span>
                      </Grid>

                      <Grid item>
                        <span className={classes.infoTitle}>D.O.B:</span>
                        <span className={classes.infoData}>
                          {FormatDateFromString(smartLinkDetails.birthDate)}
                        </span>
                      </Grid>

                      <Grid item>
                        <span className={classes.infoTitle}>Test Date:</span>
                        <span className={classes.infoData}>
                          {FormatDateFromString(smartLinkDetails.testDate)}
                        </span>
                      </Grid>
                    </Grid>

                    <Divider />
                  </Grid>

                  <Grid item>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#2f942e",
                        marginBottom: "15px",
                      }}
                    >
                      {" "}
                      BEST MATCHES :
                    </div>
                  </Grid>

                  <Grid item>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Select</TableCell>
                          <TableCell>Match</TableCell>
                          <TableCell>Forename</TableCell>
                          <TableCell>Surname</TableCell>
                          <TableCell>D.O.B</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Test Date</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {likelyBookings.map((row) => (
                          <TableRow key={row._id}>
                            <TableCell>
                              <Tooltip
                                title={
                                  row.birthDate !== smartLinkDetails.birthDate
                                    ? '"D.O.B" DOES NOT MATCH THE LAB REPORT ! PLEASE MAKE SURE "D.O.B" OF THE SELECTED BOOKING IS CORRECT !'
                                    : ""
                                }
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={
                                        selectedBooking &&
                                        selectedBooking._id === row._id
                                      }
                                      disabled={
                                        matched || matching
                                      }
                                      onChange={(event) =>
                                        handleCheckChanged(event, row)
                                      }
                                      name="checkedA"
                                    />
                                  }
                                  label=""
                                />
                              </Tooltip>
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "800",
                                color: "#2f942e",
                                fontSize: "1.1rem",
                              }}
                            >{`${row.likelihood} %`}</TableCell>
                            <TableCell
                              style={
                                row.forenameCapital ===
                                  smartLinkDetails.forename
                                  ? { fontWeight: "800", color: "#2f942e" }
                                  : { fontWeight: "800", color: "#ff871f" }
                              }
                            >
                              {row.forenameCapital}
                            </TableCell>
                            <TableCell
                              style={
                                row.surnameCapital === smartLinkDetails.surname
                                  ? { fontWeight: "800", color: "#2f942e" }
                                  : { fontWeight: "800", color: "#ff871f" }
                              }
                            >
                              {row.surnameCapital}
                            </TableCell>
                            <TableCell
                              style={
                                row.birthDate === smartLinkDetails.birthDate
                                  ? { fontWeight: "800", color: "#2f942e" }
                                  : { fontWeight: "800", color: "red" }
                              }
                            >
                              <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                spacing={1}
                              >
                                <Grid item>
                                  {row.birthDate !==
                                    smartLinkDetails.birthDate && (
                                      <span style={{ textAlign: "center" }}>
                                        <ReportProblemIcon />
                                      </span>
                                    )}
                                </Grid>
                                {FormatDateFromString(row.birthDate)}
                                <Grid item></Grid>
                              </Grid>
                            </TableCell>
                            <TableCell>{row.email?.toUpperCase()}</TableCell>
                            <TableCell
                              style={
                                dateformat(
                                  row.samplingTimeStamp,
                                  "yyyy-mm-dd"
                                ) === smartLinkDetails.testDate
                                  ? { fontWeight: "800", color: "#2f942e" }
                                  : { fontWeight: "800", color: "red" }
                              }
                            >
                              {FormatDateFromString(dateformat(row.samplingTimeStamp, "yyyy-mm-dd"))}
                            </TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                disabled={sending}
                                onClick={(event) =>
                                  seeDetailsClicked(event, row)
                                }
                              >
                                See Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="column"
                  justify="center"
                  spacing={1}
                  alignItems="center"
                >

                  {!matched && (
                    <React.Fragment>
                      <Grid item>
                        <Button
                          disabled={!selectedBooking || matching}
                          className={classes.matchButton}
                          variant="contained"
                          color="primary"
                          onClick={matchRecords}
                        >
                          GO Match THE Records
                          </Button>
                      </Grid>

                      {!selectedBooking && (
                        <Grid item>
                          <Alert severity="warning">No Record is Selected ! — Please select a record you think it is a match.</Alert>
                        </Grid>
                      )}

                    </React.Fragment>
                  )}

                  {matched && !sent && !sending && (
                    <React.Fragment>

                      <Grid item>

                        <Alert style={{ marginTop: "10px", paddingLeft: "50px", paddingRight: "50px" }} severity="success"> Success — The Records are Matched Now !</Alert>

                      </Grid>

                      <Grid item>

                        <div style={{ paddingTop: "5px", fontSize: "1rem", fontWeight: "500", color: "#555" }}>
                          Do you want to Resend the LAB Report {selectedBooking.certificate ? ' and Certificate' : ''}  Now?
                      </div>

                      </Grid>

                      <Grid item>
                        <Button
                          disabled={sending || sent}
                          className={classes.resendButton}
                          variant="contained"
                          color="primary"
                          onClick={resendEmailsClicked}
                        >
                          YES ! RESEND THE EMAILS
                          </Button>
                      </Grid>

                      <Grid item>
                        <Button
                          disabled={sending || sent}
                          className={classes.cancelButton}
                          variant="contained"
                          color="default"
                          onClick={cancelResendEmailsClicked}
                        >
                          NO ! NOT NOW
                          </Button>
                      </Grid>


                      <Grid item>
                        <Button
                          disabled={sending || sent}
                          className={classes.resendFilesButton}
                          variant="contained"
                          color="primary"
                          onClick={resendFilesClicked}
                        >
                          Just Generate The Files and send to pcrresults@medicalexpressclinic.co.uk
                          </Button>
                      </Grid>

                      <Grid item>

                        <Alert style={{ marginTop: "10px", paddingLeft: "50px", paddingRight: "50px" }} severity="warning">
                          Caution! — The LAB Report and Certificate will be Sent According to the Record you have Selected !
                          </Alert>

                      </Grid>



                    </React.Fragment>
                  )}

                  {matched && (sending || sent) && (
                    <Grid item>

                      <div style={{ paddingTop: "50px", color: "#2f942e", fontWeight: "600", fontSize: "1rem" }}>
                        {sending && !sent && (
                          'Sending ...'
                        )}

                        {sent && !sendJustToPCR && (
                          <Alert style={{ marginTop: "10px", paddingLeft: "50px", paddingRight: "50px" }} severity="success">
                            Success! — The LAB Report {selectedBooking.certificate ? ' and Certificate ' : ' '}  Successfully Sent.
                          </Alert>
                        )}

                        {sent && sendJustToPCR && (
                          <Alert style={{ marginTop: "10px", paddingLeft: "50px", paddingRight: "50px" }} severity="success">
                            Success! — The LAB Report {selectedBooking.certificate ? ' and Certificate ' : ' '}  Successfully Sent Just to pcrresults@medicalexpressclinic.co.uk .
                          </Alert>
                        )}




                      </div>

                    </Grid>

                  )}

                </Grid>
              </React.Fragment>
            )}


            {matched && (sending || sent) && (
              <React.Fragment>

                <div style={{ marginTop: "10px", width: "50%", marginLeft: "27%" }}>

                  <LinearProgressWithLabel variant="determinate" color="primary" value={sendingProgress} />

                </div>

                <div style={{ paddingTop: "30px", color: "#2f942e", fontWeight: "600", fontSize: "1rem", marginLeft: "45%" }}>
                  {sending && !sent && (
                    'PLEASE WAIT ...'
                  )}

                </div>

              </React.Fragment>
            )}


          </div>

        </DialogContent>
      </Dialog>

      <BloodReportDialog
            booking={selectedBooking}
            open={seeDetailsDialogOpen}
            onClose={handleCloseSeeDetaisDialog}
          />

    </React.Fragment>
  );
}