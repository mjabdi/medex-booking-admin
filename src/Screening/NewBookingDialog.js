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
  Switch,
  TextField,
  Tooltip,
} from "@material-ui/core";
import GlobalState from "../GlobalState";
import { withStyles } from "@material-ui/core/styles";

import CreditCardIcon from "@material-ui/icons/CreditCard";

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
import { corporates } from "./Corporates";
import NumberFormat from "react-number-format";

import AddIcon from "@material-ui/icons/Add";
import { validate } from "email-validator";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { CalendarColors } from "../Admin/calendar-admin/colors";
import DateField from "../Blood/DateField";

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

  CalendarIcon: {
    color: theme.palette.primary.main,
  },

  DateTimeLabel: {
    fontWeight: "500",
    color: theme.palette.primary.main,
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 5,
    color: "#fff",
  },

  PriceLabelPaid:{
    color: theme.palette.primary.main,
    fontWeight: "600"
  },

  PriceLabelNotPaid:{
    color: theme.palette.secondary.main,
    fontWeight: "600"
  },


}));

const Packages = [
  { packageName: "HEALTH SCREENING / MEDISCREEN BASIC MOT" },
  { packageName: "HEALTH SCREENING / HEALTH BASICS MOT" },
  { packageName: "HEALTH SCREENING / HEALTH ADVANCED MOT" },
  { packageName: "HEALTH SCREENING / HEALTH ELITE MOT" },
  { packageName: "HEALTH SCREENING / MEDISCREEN SEXUAL HEALTH MOT" },
  { packageName: "HEALTH SCREENING / MEN'S HEALTH BASICS MOT" },
  { packageName: "HEALTH SCREENING / MEN'S HEALTH ADVANCED MOT" },
  { packageName: "HEALTH SCREENING / MEN'S HEALTH ELITE MOT" },
  { packageName: "HEALTH SCREENING / PLATINIUM HEALTH SCREEN MEN" },
  { packageName: "HEALTH SCREENING / MEDISCREEN SEXUAL HEALTH MOT" },
  { packageName: "HEALTH SCREENING / WOMEN'S HEALTH BASICS MOT" },
  { packageName: "HEALTH SCREENING / WOMEN'S HEALTH ADVANCED MOT" },
  { packageName: "HEALTH SCREENING / WOMEN'S HEALTH ELITE MOT" },
  { packageName: "HEALTH SCREENING / MEDISCREEN SEXUAL HEALTH MOT" },
  { packageName: "HEALTH SCREENING / HEALTH ADVANCED PLUS MOT" },
  { packageName: "HEALTH SCREENING / MEDISCREEN SEXUAL HEALTH MOT" },
  { packageName: "ALLERGY SCREENING / ALLERGY BASICS MOT PACKAGE" },
  { packageName: "ALLERGY SCREENING / ALLERGY ADVANCED MOT PACKAGE" },

  { packageName: `OCCUPATIONAL HEALTH / PRE EMPLOYMENT` },
  { packageName: `TRAVEL HEALTH & VACCINATION` },
  { packageName: `VISA MEDICAL` },
  { packageName: `CANCER SCREEENING` },
  
];

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

export default function NewBookingDialog(props) {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);
  const [saving, setSaving] = useState(false);

  const [fullname, setFullname] = React.useState("");
  const [fullnameError, setFullnameError] = React.useState(false);

  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [service, setService] = React.useState("");

  const [serviceError, setServiceError] = React.useState(false);

  const [birthDate, setBirthDate] = React.useState(null);
  const [birthDateError, setBirthDateError] = React.useState(false);

  const [gender, setGender] = React.useState("");
  const [genderError, setGenderError] = React.useState(false);

  const birthDateChanged = (dateStr) =>
  {
      setBirthDate(dateStr);
      setBirthDateError(false)
  }  

  const genderChanged = (event) => {
    setGender(event.target.value);
    setGenderError(false);
  };

  
  const fullnameChanged = (event) => {
    setFullname(event.target.value);
    setFullnameError(false);
  };

  const phoneChanged = (event) => {
    setPhone(event.target.value);
  };

  const emailChanged = (event) => {
    setEmail(event.target.value);
  };


  const notesChanged = (event) => {
    setNotes(event.target.value);
  };

  const serviceChanged = (event) => {
    setService(event.target.value);
    setServiceError(false)
  };


  const handleClose = () => {
    if (saving) return;

    setFullname("");
    setFullnameError(false);
    setPhone("");
    setEmail("");
    setNotes("");
    setService("");
    setBirthDate(null)
    setServiceError(false)
    setGender(null)
    
    props.handleClose();
    setSaving(false);
  };

  const validateBooking = () => {
    let error = false;
    if (!fullname || fullname.trim().length < 1) {
      setFullnameError(true);
      error = true;
    }

    if (!birthDate || birthDate.length !== 10)
    {
      setBirthDateError(true)
      error = true
    }

    if (!service)
    {
      setServiceError(true)
    }

    if (!gender)
    {
      setGenderError(true)
      error = true
    }


    return !error;
  };

  const saveClicked = async () => {
    if (!validateBooking()) {
      return;
    }

    setSaving(true);

    try {
      await BookService.addNewBooking({
        bookingDate: props.date,
        bookingTime: props.time,
        fullname: fullname,
        phone: phone,
        email: email,
        notes: notes,
        service: service,
        birthDate: birthDate,
        gender: gender,
        smsPush: true,
      });
      setSaving(false);
      setState((state) => ({
        ...state,
        bookingDialogDataChanged: !state.bookingDialogDataChanged
          ? true
          : false,
      }));
      handleClose();
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  return (
    <React.Fragment>
      {props.date && props.time && (
        <React.Fragment>
          <Dialog
            maxWidth="sm"
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
                  <AddIcon style={{ color: "#f50057", fontSize: "3rem" }} />
                </Grid>

                <Grid item>
                  <div
                    style={{
                      color: "#f50057",
                      paddingBottom: "10px",
                      fontWeight: "800",
                    }}
                  >
                    {" "}
                    ADD New Booking{" "}
                  </div>
                </Grid>
              </Grid>

              <div style={{position:"absolute", top: "5px", right: "5px", backgroundColor:CalendarColors.SCREENING_COLOR, color:"#fff", padding: "0px 5px", borderRadius:"10px", fontSize:"1rem"}}>
                    Screening
              </div>


              <Divider />
            </DialogTitle>
            <DialogContent>
              <div
                style={{
                  height: "400px",
                }}
              >
                <Grid
                  container
                  direction="row"
                  justify="stretch"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <DateRangeIcon className={classes.CalendarIcon} />
                      </Grid>
                      <Grid item>
                        <span className={classes.DateTimeLabel}>
                          {props.date} , {props.time}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      autoFocus
                      error={fullnameError}
                      label="Full Name"
                      value={fullname}
                      required
                      onChange={fullnameChanged}
                      name="fullname"
                      id="fullname-id"
                      autoComplete="none"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Telephone"
                      value={phone}
                      onChange={phoneChanged}
                      name="phone"
                      id="phone-id"
                      autoComplete="none"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={email}
                      onChange={emailChanged}
                      name="email"
                      id="email-id"
                      autoComplete="none"
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <FormControl required fullWidth>
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        error={genderError ? true : false}
                        required
                        labelId="gender-label"
                        id="gender-select"
                        value={gender}
                        onChange={genderChanged}
                      >
                        <MenuItem value={"M"}>{`Male`}</MenuItem>
                        <MenuItem value={"F"}>{`Female`}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel id="service-label-id">Package</InputLabel>
                      <Select
                        fullWidth
                        labelId="service-label-id"
                        id="service-id"
                        value={service}
                        onChange={serviceChanged}
                        error={serviceError}
                      >
                        {Packages.map((item) => (
                          <MenuItem value={item.packageName}>
                            {item.packageName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <DateField
                      error={birthDateError}
                      title="Date of Birth"
                      value={birthDate}
                      dateChanged={birthDateChanged}
                    >

                    </DateField>
                  </Grid>




                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Notes"
                      value={notes}
                      onChange={notesChanged}
                      name="notes"
                      id="notes-id"
                      autoComplete="none"
                    />
                  </Grid>

                </Grid>

              </div>

              <Backdrop className={classes.backdrop} open={saving}>
                <CircularProgress color="inherit" />
              </Backdrop>
            </DialogContent>
            <DialogActions>
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
                        color="secondary"
                        style={{ width: "100px" }}
                        disabled={saving}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>

            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
