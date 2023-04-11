import React, { useEffect, useRef, useState } from "react";
import BookService from "./services/BookService";
import Typography from "@material-ui/core/Typography";
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  DialogActions,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import GlobalState from "./../GlobalState";
import { withStyles } from "@material-ui/core/styles";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import ReportIcon from "@material-ui/icons/BarChart";
import PdfIcon from "@material-ui/icons/PictureAsPdf";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";

import Alert from "@material-ui/lab/Alert";

import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import NumberFormat from "react-number-format";
import { getCorporates } from "../Corporates";
import { width } from "@material-ui/system";

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
    paddingRight: "10px",
    paddingLeft: "10px",
  },

  PatientAttendedLabel: {
    backgroundColor: "#0066aa",
    color: "#fff",
    paddingRight: "15px",
    paddingLeft: "10px",
  },

  SampleTakenLabel: {
    backgroundColor: "#0066cc",
    color: "#fff",
    paddingRight: "40px",
    paddingLeft: "10px",
  },

  ReportSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "90px",
    paddingLeft: "10px",
  },

  ReportCertSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "68px",
    paddingLeft: "10px",
  },

  archiveButton: {},

  smartMatchButton: {
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    marginRight: "10px",
    // padding: "10px"
  },

  infoTitle: {
    fontWeight: "400",
  },

  infoData: {
    paddingLeft: "10px",
    fontWeight: "800",
  },

  matchButton: {
    marginTop: "30px",
    marginBottom: "20px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },

  resendButton: {
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },

  resendFilesButton: {
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#3792ad",
    "&:hover": {
      background: "#2f798f",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },

  cancelButton: {
    marginBottom: "10px",
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "90px",
    paddingRight: "90px",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 5,
    color: "#fff",
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#cedbce", //theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#2f942e",
  },
}))(LinearProgress);
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography
          style={{ fontWeight: "800", color: "#5e855e" }}
          variant="body2"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
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
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ReportDataDialog(props) {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);
  const [saving, setSaving] = useState(false);

  const [reportData, setReportData] = useState(null);

  React.useEffect(() => {
    if (props.open) {
      loadData();
    }
  }, [props.open]);

  const loadData = async () => {
    const res = await BookService.getReportData(props.booking._id);
    if (res && res.data && res.data.status === "OK") {
      const _reportData = res.data.reportData;
      setReportData(_reportData);
      console.log(_reportData);
    }
  };

  const handleClose = () => {
    if (saving) return;

    props.handleClose();
    setReportData(null)
    setIsDownloading(false)
    setSaving(false);
  };

  const resetClicked = () => {
    let _temp = [...reportData]
    _temp.forEach(item => {
      item.value = null
    })
    setReportData(prev => _temp)

  };

  const saveClicked = async () => {
    setSaving(true);

    try {
      await BookService.setReportData(props.booking._id, reportData);
      setSaving(false);
      setState((state) => ({
        ...state,
        bookingPayChanged: !state.bookingPayChanged ? true : false,
      }));
      handleClose();
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  const getColorBasedOnValue = (value) =>
  {
    switch (value)
    {
      case "low":
        return "#fa7d2f"
      case "high":
        return "#ff1f1f"
      case "inRange":
        return "#00b524"
       default:
          return "grey"     
    }
  }

  const setSelectedValueChanged = (value, param) =>
  {
    let _temp = [...reportData]
    const index = _temp.findIndex(item => item.param === param)
    if (index > -1)
    {
      _temp[index].value = value
      setReportData(prev => _temp)
    }
  }

  const [isDownloading, setIsDownloading] = useState(false)
  const downloadPdf = async () => {

    setIsDownloading(true)

    BookService.downloadPDFReport(props.booking._id, reportData)
    .then((res) => {
      setIsDownloading(false)
      const file = new Blob([res.data], { type: "application/pdf" });

      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    })
    .catch((err) => {
      console.log(err);
      setIsDownloading(false)
    });


  }

  return (
    <React.Fragment>
      {props.booking && (
        <React.Fragment>
          <Dialog
            maxWidth="md"
            open={props.open}
            onClose={handleClose}
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
                  <ReportIcon style={{ color: "#1cb2c9", fontSize: "3rem" }} />
                </Grid>

                <Grid item>
                  <div
                    style={{
                      color: "#1cb2c9",
                      paddingBottom: "10px",
                      fontWeight: "800",
                    }}
                  >
                    Report Details -{" "}
                    <span style={{ color: "#33a198" }}>
                      {" "}
                      <i> {`${props.booking.fullname}`} </i>
                    </span>
                  </div>
                </Grid>
              </Grid>

              <Divider />
            </DialogTitle>
            <DialogContent>
              <div
                style={{
                  minHeight: "700px", 
                  paddingBottom:"80px" 
                }}
              >
                {!reportData  && (
                  <div style={{ width: "100%", paddingTop: "3px" }}>
                    <LinearProgress color="primary" />
                  </div>
                )}

                <Grid container spacing={2}>
                  {reportData &&
                    reportData.map((item) => (
                      <Grid item>

                        <div style={{padding:"5px", border:"#ddd 1px solid", borderRadius:"4px"}}>
                          <Grid container spacing={2} justify="center" alignItems="center">
                            <Grid item>
                              <span style={{color:`${getColorBasedOnValue(item.value)}`, fontWeight:`${!!item.value ? "500" : "400"}`}}>
                                {item.param}
                              </span>
                            </Grid>
                            <Grid item>
                              <Select
                                variant="standard"
                                value={item.value} 
                                style={{width:"100px", textAlign:"center"}}
                                onChange={(event) => setSelectedValueChanged(event.target.value, item.param)}
                              >
                                <MenuItem value={null}>
                                  
                                </MenuItem>
                                <MenuItem value={"low"}>
                                  Low
                                </MenuItem>
                                <MenuItem value={"inRange"}>
                                  In Range
                                </MenuItem>
                                <MenuItem value={"high"}>
                                  High
                                </MenuItem>
                              </Select>
                            </Grid>
                          </Grid>
                        </div>

                                          
                      </Grid>
                    ))}
                </Grid>
              </div>

                <div style={{position:"absolute", width:"100%", bottom:"0", right:"0", height:"60px", background:"#fff"}}>

                </div>
   

                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "20px",
                    background:"white",
                    width:"100%"
                  }}
                >
                  <Button
                    onClick={resetClicked}
                    variant="outlined"
                    color="secondary"
                    style={{ width: "150px" }}
                    disabled={saving}
                  >
                    Reset Data
                  </Button>

                  <Button
                    onClick={downloadPdf}
                    disabled={isDownloading}
                    variant="contained"
                    color="secondary"  
                    startIcon={<PdfIcon/>}                  
                    style={{ width: "250px", marginLeft:"10px" }}
                  >
                    {isDownloading ? "Generating PDF ..." :  "Download PDF Report"} 
                  </Button>

                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "20px",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Button
                        onClick={handleClose}
                        style={{ width: "100px" }}
                        disabled={saving}
                      >
                        back
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button
                        onClick={saveClicked}
                        variant="contained"
                        color="primary"
                        style={{ width: "150px" }}
                        disabled={saving}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </div>

              <Backdrop className={classes.backdrop} open={saving}>
                <CircularProgress color="inherit" />
              </Backdrop>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
