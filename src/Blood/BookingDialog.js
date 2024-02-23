import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GlobalState from "../GlobalState";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { getIsDoctor } from "../isDoctor";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SearchPatientTableForSelecting from "../Admin/SearchPatientTableForSelecting";

import {
  Button,
  Checkbox,
  DialogActions,
  DialogContentText,
  Divider,
  FormControlLabel,
  IconButton,
  TextField,
  Tooltip,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import PDFService from "./services/PDFService";

import { calculatePrice } from "./PriceCalculator";

import bookingService from "./services/BookService";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Slide from "@material-ui/core/Slide";

import Paper from "@material-ui/core/Paper";

import DeleteIcon from "@material-ui/icons/Delete";
import BookService from "./services/BookService";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  FormatDateFromString,
  RevertFormatDateFromString,
} from "./DateFormatter";
import PayDialog from "./PayDialog";

import PrintIcon from "@material-ui/icons/Print";

import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import UndoIcon from "@material-ui/icons/Undo";

import SendIcon from "@material-ui/icons/Send";

import HistoryIcon from "@material-ui/icons/History";

import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { CalendarColors } from "../Admin/calendar-admin/colors";
import InvoiceService from "../services/InvoiceService";
import InvoiceDialog from "../InvoiceDialog";

import SearchIcon from '@material-ui/icons/Search';
import BloodReportDialog from "./BloodReportDialog";

import TimeStampDialog from "./TimeStampDialog"
import { SaveAlt } from "@material-ui/icons";

import * as dateformat from "dateformat"

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "#373737",
    color: "#fff",
    padding: "1px",
    borderRadius: "4px",
    textAlign: "justify",
    paddingRight: "40px",
  },

  boxRed: {
    backgroundColor: "#dc2626",
    color: "#fff",
    padding: "1px",
    borderRadius: "4px",
    textAlign: "justify",
    paddingRight: "40px",
  },

  boxInfo: {
    textAlign: "justify",
    backgroundColor: "#fafafa",
    color: "#333",
    padding: "1px",
    borderRadius: "4px",
    paddingRight: "40px",
    border: "1px solid #eee",
  },

  ul: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },

  li: {
    marginBottom: "15px",
  },

  icon: {
    marginRight: "8px",
  },

  root: {
    width: "100%",
  },

  lineThrough: {
    textDecoration: "line-through",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },

  infoDetails: {
    textAlign: "left",
  },

  infoTitle: {
    fontWeight: "800",
    marginRight: "10px",
  },

  infoData: {
    fontWeight: "400",
  },

  title: {
    textAlign: "center",
    fontWeight: "600",
    marginLeft: "10px",
    marginBottom: "5px",
  },

  Accordion: {
    backgroundColor: "#f5f5f5",
    color: "#222",
  },

  AccordionDeleted: {
    backgroundColor: "#aaa",
    color: "#555",
  },

  DownloadForm: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  infoDataCharges: {
    fontSize: "18px",
    color: "green",
    fontWeight: "600",
  },

  infoDataChargesHigher: {
    fontSize: "18px",
    color: "red",
    fontWeight: "600",
  },
  BookedLabel: {
    color: "#606060",
    paddingLeft: "5px",
    paddingBottom: "3px",
    paddingTop: "3px",
    fontWeight: "800",
    borderLeft: "5px solid",
    borderColor: "#606060",
    width: "150px",
    display: "inline-block",
  },

  PatientAttendedLabel: {
    color: "#0066aa",
    paddingLeft: "5px",
    paddingBottom: "3px",
    paddingTop: "3px",
    fontWeight: "800",
    borderLeft: "5px solid",
    borderColor: "#0066aa",
    width: "150px",
    display: "inline-block",
  },

  SampleTakenLabel: {
    color: "#0066cc",
    paddingRight: "10px",
    paddingLeft: "5px",
    paddingBottom: "3px",
    paddingTop: "3px",
    fontWeight: "800",
    borderLeft: "5px solid",
    borderColor: "#0066cc",
  },

  ReportSentLabel: {
    color: "#009900",
    paddingRight: "10px",
    paddingLeft: "5px",
    paddingBottom: "3px",
    paddingTop: "3px",
    fontWeight: "800",
    borderLeft: "5px solid",
    borderColor: "#009900",
    width: "150px",
    display: "inline-block",
  },

  ReportCertSentLabel: {
    color: "#009900",
    paddingRight: "10px",
    paddingLeft: "5px",
    paddingBottom: "3px",
    paddingTop: "3px",
    fontWeight: "800",
    borderLeft: "5px solid",
    borderColor: "#009900",
  },

  PositiveLabel: {
    color: "red",
    paddingRight: "10px",
    paddingLeft: "5px",
    paddingBottom: "3px",
    paddingTop: "3px",
    fontWeight: "800",
    borderLeft: "5px solid",
    borderColor: "red",
  },

  EditButton: {
    marginBottom: "20px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
  },

  ResendEmailsButton: {
    // marginBottom : "20px",
    color: "#2f942e",
    borderColor: "#2f942e",
    "&:hover": {
      background: "#fafffa",
      borderColor: "#2f942e",
    },
    textDecoration: "none !important",
    paddingLeft: "50px",
    paddingRight: "50px",
  },

  PayButton: {
    marginLeft: "70px",
    width: "300px",
  },

  PayLabel: {
    marginLeft: "20px",

    color: "#2f942e",
    fontWeight: "500",
    textAlign: "center",
  },

  RestoreButton: {
    marginBottom: "20px",
    backgroundColor: "#eee",
    color: "#333",
    "&:hover": {
      background: "#f1f1f1",
      color: "#111",
    },
    textDecoration: "none !important",
    padding: "10px",
  },

  DeleteButton: {
    marginBottom: "20px",
    backgroundColor: "#d90015",
    "&:hover": {
      background: "#b80012",
      color: "#fff",
    },

    padding: "10px",
  },

  SaveButton: {
    marginBottom: "10px",
    padding: "10px",

    backgroundColor: "#d1175e",
    "&:hover": {
      background: "#bd0d50",
      color: "#fff",
    },
  },

  CancelButton: {
    marginBottom: "20px",
    // padding: "10px"
  },

  TextBox: {
    padding: "0px",
  },

  checkIcon: {
    color: "green",
  },

  checkIconSmall: {
    color: "green",
    paddingTop: "5px",
  },

  closeIcon: {
    color: "red",
  },

  centeredLabel: {
    display: "flex",
    alignItems: "center",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 5,
    color: "#fff",
  },

  invoiceNumber: {
    display: "inline-block",
    fontWeight: "500",
    width: "72px",
    fontSize: "1rem",
    color: theme.palette.primary.main,
  },

  printInvoiceButton: {
    marginLeft: "70px",
    fontSize: "0.8rem",
    // width: "300px",
  },

  editInvoiceButton: {
    marginLeft: "10px",
    fontSize: "0.8rem",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#alert-dialog-slide-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function BookingDialog(props) {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);

  const [copied, setCopied] = useState(false);

  const [emailSent, setEmailSent] = React.useState(false);

  const [openResendDialog, setOpenResendDialog] = React.useState(false);
  const [openPayDialog, setOpenPayDialog] = React.useState(false);
  const [openRefundDialog, setOpenRefundDialog] = React.useState(false);

  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const [editMode, setEditMode] = React.useState({ edit: false, person: null });
  const [deleteMode, setDeleteMode] = React.useState({
    delete: false,
    person: null,
  });
  const [restoreMode, setRestoreMode] = React.useState({
    restore: false,
    person: null,
  });

  const [saving, setSaving] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [restoring, setRestoring] = React.useState(false);

  const [validationError, setValidationError] = React.useState({});

  const [bookingDate, setBookingDate] = React.useState("");
  const [bookingTime, setBookingTime] = React.useState("");

  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState("");

  const [gender, setGender] = React.useState("");


  const [notes, setNotes] = React.useState("");
  const [doctorNote, setDoctorNote] = React.useState("");

  const [service, setService] = React.useState("");

  const [refreshData, setRefreshData] = React.useState(false);

  const [booking, setBooking] = React.useState(null);

  const [recordChanged, setRecordChanged] = React.useState(false);

  const [fieldChanged, setFieldChanged] = React.useState(false);

  const [openUndoPayDialog, setOpenUndoPayDialog] = React.useState(false);

  const [openTimeStampDialog, setOpenTimeStampDialog] = React.useState(false);
 const [isFindPatientModalShow, setFindPatientModalShow] = React.useState(null);
 const [selectedBookingId, setSelectedBookingId] = React.useState(null);

 const handleBirthDateChange = (event, date) => {
   setPatientBirthDate(date);
 };
 const handleGenderChange = (event, data) => {
   setPatientGenderType(data.props.value);
 };
 const handleSurnameChange = (event) => {
   setPatientSurname(event.target.value);
 };
 const handleForenameChange = (event) => {
   setPatientForename(event.target.value);
 };

 const [patientBirthDate, setPatientBirthDate] = React.useState(null);
 const [patientGenderType, setPatientGenderType] = React.useState(null);
 const [patientForename, setPatientForename] = React.useState(null);
 const [patientSurname, setPatientSurname] = React.useState(null);
 const [isDoctor, setIsDoctor] = React.useState(getIsDoctor());
  
  const handleCloseTimeStampDialog = () => {
    setOpenTimeStampDialog(false);
    setSelectedBooking(null);
  };

  const handleCloseUndoPayDialog = () => {
    setOpenUndoPayDialog(false);
    setSelectedBooking(null);
  };

  const handleCloseResendDialog = () => {
    setOpenResendDialog(false);
    setSelectedBooking(null);
  };

  const handleClosePayDialog = () => {
    setOpenPayDialog(false);
    setSelectedBooking(null);
  };

  const handleCloseRefundDialog = () => {
    setOpenRefundDialog(false);
    setSelectedBooking(null);
  };

  useEffect(() => {
    if (booking) {
      const isChanged =
        bookingDate !== FormatDateFromString(booking.bookingDate) ||
        bookingTime !== booking.bookingTime ||
        fullname !== booking.fullname ||
        dob !== FormatDateFromString(booking.birthDate) ||
        email !== booking.email ||
        tel !== booking.phone ||
        gender !== booking.gender ||
        notes !== booking.notes ||
        service !== booking.packageName ||
        doctorNote !== booking.doctorNote;

      setRecordChanged(isChanged);
    }
  }, [fieldChanged]);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setEditMode({ edit: false, person: null });
        setRecordChanged(false);
      }, 500);
    }else if (props.open){


    }
  }, [props.open]);

  const bookingDateChanged = (event) => {
    setBookingDate(event.target.value);
    setValidationError({ ...validationError, bookingDateError: false });
    setFieldChanged(!fieldChanged);
  };

  const bookingTimeChanged = (event) => {
    setBookingTime(event.target.value);
    setValidationError({ ...validationError, bookingTimeError: false });
    setFieldChanged(!fieldChanged);
  };

  const fullnameChanged = (event) => {
    setFullname(event.target.value);
    setFieldChanged(!fieldChanged);
  };

  const emailChanged = (event) => {
    setEmail(event.target.value);
    setFieldChanged(!fieldChanged);
  };

  const telChanged = (event) => {
    setTel(event.target.value);
    setFieldChanged(!fieldChanged);
  };

  const genderChanged = (event) => {
    setGender(event.target.value);
    setValidationError({ ...validationError, genderError: false });
    setFieldChanged(!fieldChanged);
  };

  const serviceChanged = (event) => {
    setService(event.target.value);
    setFieldChanged(!fieldChanged);
  };

  const notesChanged = (event) => {
    setNotes(event.target.value);
    setFieldChanged(!fieldChanged);
  };
  
  const doctorNoteChanged = (event) => {
    setDoctorNote(event.target.value);
    setFieldChanged(!fieldChanged);
  };

  const getStatusLabel = (status) => {
    if (status === "booked") {
      return <div className={classes.BookedLabel}> Booking Made </div>;
    } else if (status === "patient_attended") {
      return (
        <div className={classes.PatientAttendedLabel}> Patient Attended </div>
      );
    } else if (status === "report_sent") {
      return (
        <div className={classes.ReportSentLabel}> Report Sent </div>
      );
    }
    else {
      return "Unknown";
    }
  };

  const handleEditModeChanged = (edit, person) => {
    if (edit) {
      setFullname(person.fullname);
      setBookingDate(FormatDateFromString(person.bookingDate));
      setBookingTime(person.bookingTime.toUpperCase());
      setEmail(person.email);
      setTel(person.phone);
      setGender(person.gender?.toUpperCase() || '')
      setDOB(FormatDateFromString(person.birthDate));
      setService(person.packageName);
      if (person.notes) {
        setNotes(person.notes);
      }
      if (person.doctorNote) {
        setDoctorNote(person.doctorNote);
      }

      setEditMode({ edit: edit, person: person });
    } else if (!edit && !person) {
      setEditMode({ edit: edit, person: person });
      setRecordChanged(false);
    } else if (!edit && person) {
      const booking = {};
      const bookingId = person._id;
      booking.email = email;
      booking.phone = tel;
      booking.fullname = fullname;
      booking.notes = notes;
      booking.doctorNote = doctorNote
      booking.birthDate = RevertFormatDateFromString(dob);
      booking.packageName = service;
      booking.bookingDate = RevertFormatDateFromString(bookingDate);
      booking.bookingTime = bookingTime;
      booking.bookingRef = person.bookingRef;
      booking.gender = gender;

      if (validateBooking(booking)) {
        updateBooking({ bookingId: bookingId, person: booking });
      }
    }
  };

  const validateDate = (str) => {
    var error = false;
    if (!str || str.length !== 10) {
      error = true;
    }

    if (str.charAt(4) !== "-" || str.charAt(7) !== "-") {
      error = true;
    }

    try {
      const result = /^\d{4}-\d{2}-\d{2}$/.test(str);
      if (!result) {
        error = true;
      }

      const year = parseInt(str.substr(0, 4));
      const month = parseInt(str.substr(5, 2));
      const day = parseInt(str.substr(8, 2));

      if (year < 1900) {
        error = true;
      }

      if (month < 1 || month > 12) {
        error = true;
      }

      if (day > 31) {
        error = true;
      }
    } catch (err) {
      error = true;
    }

    return !error;
  };

  const validateTime = (str) => {
    var error = false;

    const result = /^\d{2}:\d{2} AM$|^\d{2}:\d{2} PM$/.test(str);
    if (!result) {
      error = true;
    }

    try {
      const hour = parseInt(str.substr(0, 2));
      const minute = parseInt(str.substr(3, 2));

      if (hour < 0 || hour > 12) {
        error = true;
      }

      if (minute < 0 || minute > 59) {
        error = true;
      }
    } catch (err) {
      error = true;
    }

    return !error;
  };

  const validateBooking = (booking) => {

    console.log(booking)

    var error = false;

    if (!validateDate(booking.bookingDate)) {
      error = true;
      setValidationError({ ...validationError, bookingDateError: true });
    }

    if (!validateDate(booking.birthDate)) {
      error = true;
      setValidationError({ ...validationError, dobError: true });
    }

    if (!validateTime(booking.bookingTime)) {
      error = true;
      setValidationError({ ...validationError, bookingTimeError: true });
    }

    if (booking.gender && (booking.gender.toUpperCase() !== 'F' && booking.gender.toUpperCase() !== 'M'))
    {
      error = true;
      setValidationError({ ...validationError, genderError: true });
    }



    return !error;
  };

  const updateBooking = (payload) => {
    setSaving(true);
    bookingService
      .updateBooking(payload)
      .then((res) => {
        setSaving(false);
        setEditMode({ edit: false, person: null });
        setRefreshData(!refreshData);
      })
      .catch((err) => {
        setSaving(false);
        setEditMode({ edit: false, person: null });
        console.log(err);
      });
  };

  const deleteBooking = (id) => {
    setDeleting(true);
    bookingService
      .deleteBooking(id)
      .then((res) => {
        setDeleting(false);
        setDeleteMode({ delete: false, person: null });
        setRefreshData(!refreshData);
      })
      .catch((err) => {
        setDeleting(false);
        setDeleteMode({ delete: false, person: null });
        console.log(err);
      });
  };

  const restoreBooking = (id) => {
    setRestoring(true);
    bookingService
      .unDeleteBooking(id)
      .then((res) => {
        setRestoring(false);
        setRestoreMode({ restore: false, person: null });
        setRefreshData(!refreshData);
      })
      .catch((err) => {
        setRestoring(false);
        setRestoreMode({ restore: false, person: null });
        console.log(err);
      });
  };

  const handleDeleteModeChanged = (del, person) => {
    if (del) {
      setDeleteMode({ delete: del, person: person });
    } else if (!del && !person) {
      setDeleteMode({ delete: del, person: person });
    } else if (!del && person) {
      deleteBooking(person._id);
    }
  };

  const handleRestoreModeChanged = (restore, person) => {
    if (restore) {
      setRestoreMode({ restore: restore, person: person });
    } else if (!restore && !person) {
      setRestoreMode({ restore: restore, person: person });
    } else if (!restore && person) {
      restoreBooking(person._id);
    }
  };

  const changeBackToBookingMade = (event, id) => {
    setSaving(true);
    BookService.changeBackToBookingMade(id)
      .then((res) => {
        setSaving(false);
        setRefreshData(!refreshData);
      })
      .catch((err) => {
        console.log(err);
        setSaving(false);
      });
  };


  const changeToCompleted = (event, id) => {
    setSaving(true);
    BookService.changeToCompleted(id)
      .then((res) => {
        setSaving(false);
        setRefreshData(!refreshData);
      })
      .catch((err) => {
        console.log(err);
        setSaving(false);
      });
  };

  const openPatientsModal = (booking) => {
    setFindPatientModalShow(true);
    setSelectedBooking(booking);
    setPatientBirthDate(booking.birthDate);
    setPatientSurname(booking.surname);
    setPatientForename(booking.forename);
    setPatientGenderType(booking.gender);
  };

  const closePatientsModal = () => {
    setFindPatientModalShow(false);
    setSelectedBookingId(null);
    setPatientBirthDate(null);
    setPatientSurname(null);
    setPatientForename(null);
    setPatientGenderType(null);
  };

  const changeToPatientAttended = (event, patientid) => {
    setSaving(true);
    BookService.changeToPatientAttended(selectedBooking._id, {
      patientid: patientid || null,
      birthDate: patientBirthDate,
      forename: patientForename,
      surname: patientSurname,
      gender: patientGenderType,
    })
      .then((res) => {
        setSaving(false);
        setRefreshData(!refreshData);
        closePatientsModal();
      })
      .catch((err) => {
        console.log(err);
        setSaving(false);
      });
  };
  const Pay = (event, id) => {
    setSelectedBooking(booking);
    setOpenPayDialog(true);
  };

  useEffect(() => {
    if (props.booking) {
      BookService.getBookingById(props.booking._id)
        .then((res) => {
          setBooking(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setState((state) => ({
        ...state,
        bookingDialogDataChanged: !state.bookingDialogDataChanged
          ? true
          : false,
      }));
    }
  }, [refreshData, state.bookingPayChanged]);

  useEffect(() => {
    if (props.booking) {
      setBooking(props.booking);
    }
  }, [props.booking]);

  const undoPaymentClicked = async () => {
    setSaving(true);
    try {
      await BookService.unPayBooking(booking._id);
      setSaving(false);
      setOpenUndoPayDialog(false);
      setRefreshData(!refreshData);
    } catch (err) {
      console.error(err);
      setSaving(false);
      setOpenUndoPayDialog(false);
    }
  };

  const refundPaymentClicked = async () => {
    setSaving(true);
    try {
      await BookService.refundBooking(booking._id);
      setSaving(false);
      updateShouldRefundsCount();
      setOpenRefundDialog(false);
      setRefreshData(!refreshData);
    } catch (err) {
      console.error(err);
      setSaving(false);
      setOpenRefundDialog(false);
    }
  };

  const updateShouldRefundsCount = async () => {
    try {
      const res = await BookService.getShouldRefundsCount();
      if (res && res.data && res.data.status === "OK") {
        setState((state) => ({ ...state, shouldRefunsCount: res.data.count }));
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const downloadRegForm = (id) => {
    PDFService.downloadBloodRegForm(id)
      .then((res) => {
        const file = new Blob([res.data], { type: "application/pdf" });

        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendRegForm = (id) => {
    setSaving(true);
    setEmailSent(false);
    BookService.sendRegFormEmail(id)
      .then((res) => {
        setSaving(false);
        if (res.data.status === "OK") {
          setEmailSent(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSaving(false);
      });
  };

  const onClose = () => {
    setEmailSent(false);
    setEmailSentInvoice(false);
    setInvoice(null);

    props.onClose();
  };

  ///*** Invoice  ******************/

  const [invoice, setInvoice] = React.useState(null);
  const [invoiceLoaded, setInvoiceLoaded] = React.useState(false);
  const [openInvoiceDialog, setOpenInvoiceDialog] = React.useState(false);
  const [emailSentInvoice, setEmailSentInvoice] = React.useState(false);

  const fetchInvoice = async () => {
    try {
      setInvoiceLoaded(false);
      const res = await InvoiceService.getInvoiceByBookingId(props.booking._id);
      setInvoice(res.data.invoice);
      setInvoiceLoaded(true);
    } catch (err) {
      setInvoiceLoaded(true);
      console.error(err);
    }
  };

  React.useEffect(() => {
    if (props.booking && props.open) {
      fetchInvoice();
      fetchBloodReports();

      setClinicNotes(props.booking.clinicNotes || "")
      setInitialClinicNotes(props.booking.clinicNotes || "")
      setNotesSaving(false)

    }
  }, [props.booking, props.open]);

  const [bloodReports, setBloodReports] = React.useState(null)
  const [selectedBloodReport, setSelectedBloodReport] = React.useState(null)
  const [bloodReportDialogOpen, setBloodReportDialogOpen] = React.useState(null)
  const fetchBloodReports = async () =>
  {
    setBloodReports(null)
    try{
      const res = await BookService.getBloodReportsByBookingId(props.booking._id)
      if (res.data && res.data.result && res.data.result.length > 0)
      {
        setBloodReports(res.data.result)
      }
    }
    catch(err)
    {
      console.error(err)
    }
  }
  const handleClodeBloodReportDialog = () =>
  {
    setBloodReportDialogOpen(false)
    setSelectedBloodReport(null)
  }
  const showBloodReportClicked = (bloodReport) =>
  {
    setSelectedBloodReport(bloodReport)
    setBloodReportDialogOpen(true)
  }



  const handleCloseInvoiceDialog = (refresh) => {
    setOpenInvoiceDialog(false);
    setSelectedBooking(null);
    fetchInvoice();
  };

  const OpenInvoiceDialog = () => {
    setSelectedBooking(booking);
    setInvoice(invoice);
    setOpenInvoiceDialog(true);
  };

  const downloadInvoice = (id) => {
    InvoiceService.downloadInvoice(id)
      .then((res) => {
        const file = new Blob([res.data], { type: "application/pdf" });

        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendInvoiceEmail = (id, _email) => {
    setSaving(true);
    setEmailSentInvoice(false);
    InvoiceService.emailInvoice(id, _email)
      .then((res) => {
        setSaving(false);
        if (res.data.status === "OK") {
          setEmailSentInvoice(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSaving(false);
      });
  };

  //***************************** */

  const [dob, setDOB] = React.useState("");
  const dobChanged = (event) => {
    setDOB(event.target.value);
    setValidationError({ ...validationError, dobError: false });
    setFieldChanged(!fieldChanged);
  };

  const getIndivisualTestsString = (indivisualTests) => {
    if (!indivisualTests)
      return '-'
    const tests = JSON.parse(indivisualTests);
    let testsString = "";
    tests.forEach((item) => {
      testsString += item.description;
      testsString += " , ";
    });
    return testsString;
  };

  
const getTotalPrice = (items) => {
  let sum = 0

  items.forEach(item => {
    sum += parseFloat(item.price)
  })

  return sum

}

const depositChanged = async (event) => {
  const checked = event.target.checked;
  const deposit = checked ? 50 : 0;
  setSaving(true);
  try {
    await BookService.changeDepositBooking(booking._id, deposit);
    setSaving(false);
    setRefreshData(!refreshData);
  } catch (err) {
    console.error(err);
    setSaving(false);
  }
}

const manualRefund = async () => {
  setSaving(true);
  try {
    await BookService.manualRefundBooking(booking._id);
    setSaving(false);
    updateShouldRefundsCount();
    setRefreshData(!refreshData);
  } catch (err) {
    console.error(err);
    setSaving(false);
    setOpenRefundDialog(false);
  }
}

const [clinicNotes, setClinicNotes] = React.useState("");
const [initialClinicNotes, setInitialClinicNotes] = React.useState("");

const [notesSaving, setNotesSaving] = useState(false);

const clinicNotesChanged = (event) => {
  setClinicNotes(event.target.value);
};

const saveNotesClicked = async () => {
  try {
    setNotesSaving(true);
    const res = await BookService.setClinicNotes(props.booking._id, clinicNotes)
    if (res && res.data && res.data.status && res.data.status === "OK")
    {
      setInitialClinicNotes(clinicNotes)
      setNotesSaving(false)
      setRefreshData(!refreshData);
    }else
    {
      setNotesSaving(false)
    }
  } catch (err) {
    console.error(err);
    setNotesSaving(false);
  }
};

const [isPrinting, setPrinting] = useState(false)
const printLabel = async () => {
  try {
    setPrinting(true)

    const now = new Date()
    const dateStr = dateformat(now, "yyyy-mm-dd")
    const timeStr = dateformat(now, "HH:MM:ss")
    let surname = props.booking.fullname?.trim().split(' ').slice(-1).join(' ').toUpperCase()
    if (!surname || surname.trim().length === 0)
    {
      surname = "--"
    }

    let forename = props.booking.fullname?.trim().split(' ').slice(0, -1).join(' ').toUpperCase()
    if (!forename || forename.trim().length === 0)
    {
      forename = "--"
    }

    let dob = props.booking.birthDate
    if (!dob || dob.trim().length === 0)
    {
      dob = "--"
    }

    const element = document.createElement("a");
    const file = new Blob([`Text_3=${surname}`,
                           "\n",
                           `Text_3_1=${forename}`,
                            "\n",
                            `Text_3_1_1=${convertGender(props.booking.gender)}`,
                            "\n",
                            `Text_3_1_1_1=${convertDate(dob)}`,
                            "\n",
                            `Text_3_1_1_2=${convertDate(dateStr)}`,
                            "\n",
                            `Text_3_1_1_2_1=${timeStr}`,
                            "\n",
                            `Text_3_1_1_2_2=${props.booking.bookingRef}`,
                            "\n"
                          ],    
                {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${props.booking.fullname}.values`;
    document.body.appendChild(element);
    element.click();

    setPrinting(false)

  } catch (err) {
    setPrinting(false)
  }


  function convertGender(str){
    if (str === "M")
      return "Male"
    else if (str === "F")
      return "Female"
    else
      return "--"    
  }

  function convertDate(str) {

    if (!str || str.length != 10) {
        return ""
    }
    return `${str.substr(8, 2)}-${str.substr(5, 2)}-${str.substr(0, 4)}`
  }
  
};



/////********************** REVIEW SMS */

const smsTypes = [
  {value: 1, text: "Medical Express Clinic"},
]

const smsMessageArray = [
  `It was great to see and treat you at the Medical Express Clinic, Please let us know how you got on by clicking here: https://g.page/r/CZcAyTF67Ec0EBM/review`,
]

const [smsType, setSmstype] = useState(1)
const smsTypeChanged = (event) => {
  setSmstype(event.target.value)
  setSmsMessage(smsMessageArray[event.target.value-1])
}

const [smsSending, setSmsSending] = useState(false)

const SendSMS = async () => {

  setSmsSending(true)

  try{

    const res =await BookService.sendReviewSMS(booking._id, smsMessage)
    if (res && res.data && res.data.status === "OK")
    {
      setBooking(r => { return {...r, smsSent: true}})
      setState((state) => ({
        ...state,
        bookingDialogDataChanged: !state.bookingDialogDataChanged
          ? true
          : false,
      }));

    }

    setSmsSending(false)
    

  }catch(err)
  {
    console.error(err)
    setSmsSending(false)
    setBooking(r => { return {...r, smsSent: false}})
  }
 

}

const [smsMessage, setSmsMessage] = useState(smsMessageArray[0])
const smsMessageChanged = (event) => {
  setSmsMessage(event.target.value)
}

const isValidPhone = (phone) => {
  if (!phone || phone.length < 7)
  {
    return false
  }else
  {
    return true
  }
}




  return (
    <React.Fragment>
      {booking && (
        <React.Fragment>
          <Dialog
            maxWidth="md"
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            PaperComponent={PaperComponent}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle
              id="alert-dialog-slide-title"
              style={
                booking.tr ? { backgroundColor: "#7e0082", color: "#fff" } : {}
              }
            >
              <div style={{ position: "absolute", top: "25x", left: "25px" }}>
                <Tooltip title="COPY EDIT LINK TO CLIPBOARD">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://londonmedicalclinic.co.uk/medicalexpressclinic/user/edit/blood/${booking._id}`
                      );
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 1500);
                    }}
                    aria-label="delete"
                    className={classes.margin}
                    size="small"
                  >
                    <FileCopyOutlinedIcon
                      style={booking.tr ? { color: "#ddd" } : {}}
                      fontSize="14px"
                    />
                  </IconButton>
                </Tooltip>

                <span
                  hidden={!copied}
                  style={{ fontSize: "12px", transition: "all 1s ease-in" }}
                >
                  {" "}
                  Copied{" "}
                </span>
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "25x",
                  left: "150px",
                  // border: "1px solid #69c9ab",
                  background: `${clinicNotes ? "#d4fffe" : "#fff"} `,
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                  width: "620px",
                  height: "60px",
                }}
              >
                <TextField
                  fullWidth
                  // label="MY NOTES"
                  label="Notes on the patient - staff only"
                  style={{ margin: "0px", height: "100%", fontSize: "0.7em" }}
                  value={clinicNotes || ""}
                  onChange={clinicNotesChanged}
                  variant="outlined"
                  // inputProps={{
                  //   style: {
                  //     fontSize:"0.8em"
                  //   },
                  // }}
                ></TextField>
              </div>

              {notesSaving && (
                <div
                  style={{
                    position: "absolute",
                    top: "25x",
                    left: "770px",
                    // border: "1px solid #69c9ab",
                    borderRadius: "0px 4px 4px 0px",
                    background: `"#fff"`,
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    backgroundColor: "#e84331",
                    padding: "0px 2px",
                    color: "#fff",
                  }}
                >
                  saving
                </div>
              )}

              {initialClinicNotes !== clinicNotes && !notesSaving && (
                <div
                  style={{
                    position: "absolute",
                    top: "25x",
                    left: "770px",
                    // border: "1px solid #69c9ab",
                    background: `${clinicNotes ? "#d4fffe" : "#fff"} `,
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                  }}
                >
                  <Tooltip title="SAVE NOTES">
                    <IconButton
                      onClick={saveNotesClicked}
                      className={classes.margin}
                      size="small"
                    >
                      <SaveAlt
                        style={{
                          color: "#fff6f5",
                          background: "#d91b07",
                          borderRadius: "4px",
                        }}
                        fontSize="14px"
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  top: "25x",
                  right: "20px",
                  backgroundColor: CalendarColors.BLOOD_COLOR,
                  color: "#fff",
                  padding: "0px 5px",
                  borderRadius: "10px",
                }}
              >
                {booking.doctorConsultation
                  ? "Blood + Doctor Consultation"
                  : "Blood"}
              </div>

              <Grid
                container
                style={{ paddingTop: "60px" }}
                direction="row"
                justify="center"
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <div
                    style={
                      booking.deleted
                        ? {
                            paddingBottom: "5px",
                            textDecoration: "line-through",
                          }
                        : {}
                    }
                  >
                    {`${booking.fullname}`}
                  </div>
                </Grid>

                {booking.deleted && (
                  <Grid item>
                    <Tooltip title="This record has been deleted.">
                      <DeleteIcon
                        style={
                          booking.tr
                            ? {
                                padding: 0,
                                margin: 0,
                                color: "#fff",
                                fontSize: 25,
                              }
                            : {
                                padding: 0,
                                margin: 0,
                                color: "#333",
                                fontSize: 25,
                              }
                        }
                      />
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
            </DialogTitle>
            <DialogContent>
              <div
                style={{
                  // height: "550px",
                  paddingTop: "0px",
                }}
              >
                <Grid item xs={12} md={12} key={`panel0`}>
                  <div className={classes.infoDetails}>
                    <ul className={classes.ul}>
                      {!isDoctor && (
                        <React.Fragment>
                          {/* Restore Functionality ******************************************* */}
                          <li
                            hidden={
                              !(
                                restoreMode.restore &&
                                restoreMode.person._id === booking._id
                              )
                            }
                          >
                            <div
                              style={{
                                fontWeight: "500",
                                paddingBottom: "5px",
                                paddingLeft: "5px",
                                fontSize: "16px",
                                color: "#333",
                              }}
                            >
                              Are you sure you want to restore this record?
                            </div>
                          </li>

                          <li
                            hidden={
                              !booking.deleted ||
                              (restoreMode.restore &&
                                restoreMode.person._id === booking._id)
                            }
                          >
                            <Button
                              type="button"
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleRestoreModeChanged(true, booking);
                              }}
                              className={classes.RestoreButton}
                            >
                              Restore This Record
                            </Button>
                          </li>

                          <li
                            hidden={
                              !(
                                restoreMode.restore &&
                                restoreMode.person._id === booking._id
                              )
                            }
                          >
                            <Button
                              type="button"
                              fullWidth
                              variant="contained"
                              color="primary"
                              disabled={restoring}
                              onClick={() => {
                                handleRestoreModeChanged(false, booking);
                              }}
                              className={classes.SaveButton}
                            >
                              YES, Restore this!
                            </Button>
                          </li>

                          <li
                            hidden={
                              !(
                                restoreMode.restore &&
                                restoreMode.person._id === booking._id
                              )
                            }
                          >
                            <Button
                              type="button"
                              fullWidth
                              variant="contained"
                              color="default"
                              disabled={restoring}
                              onClick={() => {
                                handleRestoreModeChanged(false, null);
                              }}
                              className={classes.CancelButton}
                            >
                              Cancel
                            </Button>
                          </li>
                        </React.Fragment>
                      )}
                      {/*  ******************************************************************* */}
                      {/* Edit Functionality ******************************************* */}

                      <li
                        hidden={
                          booking.deleted ||
                          deleteMode.delete ||
                          (editMode.edit && editMode.person._id === booking._id)
                        }
                      >
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleEditModeChanged(true, booking);
                          }}
                          className={classes.EditButton}
                        >
                          Edit Booking Info
                        </Button>
                      </li>

                      <li
                        hidden={
                          !(
                            editMode.edit && editMode.person._id === booking._id
                          )
                        }
                      >
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          disabled={saving || !recordChanged}
                          onClick={() => {
                            handleEditModeChanged(false, booking);
                          }}
                          className={classes.SaveButton}
                        >
                          Save Changes
                        </Button>
                      </li>

                      <li
                        hidden={
                          !(
                            editMode.edit && editMode.person._id === booking._id
                          )
                        }
                      >
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="default"
                          disabled={saving}
                          onClick={() => {
                            handleEditModeChanged(false, null);
                          }}
                          className={classes.CancelButton}
                        >
                          Cancel
                        </Button>
                      </li>

                      {/* ****************************************************************************************** */}

                      {/* Delete Functionality ******************************************* */}
                      {!isDoctor && (
                        <React.Fragment>
                          <li
                            hidden={
                              !(
                                deleteMode.delete &&
                                deleteMode.person._id === booking._id
                              )
                            }
                          >
                            <div
                              style={{
                                fontWeight: "600",
                                paddingBottom: "5px",
                                paddingLeft: "5px",
                                fontSize: "16px",
                              }}
                            >
                              Are you sure you want to delete this record?
                            </div>
                          </li>

                          <li
                            hidden={
                              props.deleteButtonDisabled ||
                              booking.deleted ||
                              editMode.edit ||
                              (deleteMode.delete &&
                                deleteMode.person._id === booking._id)
                            }
                          >
                            {booking.OTCCharges > 0 && (
                              <Tooltip
                                title={"Paid Records Cannot be Deleted!"}
                              >
                                <div>
                                  <Button
                                    disabled={booking.OTCCharges > 0}
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      handleDeleteModeChanged(true, booking);
                                    }}
                                    className={classes.DeleteButton}
                                  >
                                    Delete This Record
                                  </Button>
                                </div>
                              </Tooltip>
                            )}
                            {booking.OTCCharges === 0 && (
                              <Button
                                disabled={booking.OTCCharges > 0}
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  handleDeleteModeChanged(true, booking);
                                }}
                                className={classes.DeleteButton}
                              >
                                Delete This Record
                              </Button>
                            )}
                          </li>

                          <li
                            hidden={
                              !(
                                deleteMode.delete &&
                                deleteMode.person._id === booking._id
                              )
                            }
                          >
                            <Button
                              type="button"
                              fullWidth
                              variant="contained"
                              color="primary"
                              disabled={deleting}
                              onClick={() => {
                                handleDeleteModeChanged(false, booking);
                              }}
                              className={classes.SaveButton}
                            >
                              YES, Delete this!
                            </Button>
                          </li>

                          <li
                            hidden={
                              !(
                                deleteMode.delete &&
                                deleteMode.person._id === booking._id
                              )
                            }
                          >
                            <Button
                              type="button"
                              fullWidth
                              variant="contained"
                              color="default"
                              disabled={deleting}
                              onClick={() => {
                                handleDeleteModeChanged(false, null);
                              }}
                              className={classes.CancelButton}
                            >
                              Cancel
                            </Button>
                          </li>
                        </React.Fragment>
                      )}
                      {/* ****************************************************************************************** */}

                      <li className={classes.li}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <span className={classes.infoTitle}>
                              BOOKED DATE
                            </span>

                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoData}
                            >
                              {FormatDateFromString(booking.bookingDate)}
                            </span>
                            <span
                              hidden={
                                !(
                                  editMode.edit &&
                                  editMode.person._id === booking._id
                                )
                              }
                              className={classes.infoData}
                            >
                              <TextField
                                fullWidth
                                error={validationError.bookingDateError}
                                className={classes.TextBox}
                                value={bookingDate}
                                onChange={bookingDateChanged}
                                inputProps={{
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              ></TextField>
                            </span>
                          </Grid>
                          <Grid item xs={6}>
                            <span className={classes.infoTitle}>
                              BOOKED TIME
                            </span>
                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoData}
                            >
                              {booking.bookingTime.toUpperCase()}
                            </span>
                            <span
                              hidden={
                                !(
                                  editMode.edit &&
                                  editMode.person._id === booking._id
                                )
                              }
                              className={classes.infoData}
                            >
                              <TextField
                                fullWidth
                                error={validationError.bookingTimeError}
                                className={classes.TextBox}
                                value={bookingTime}
                                onChange={bookingTimeChanged}
                                inputProps={{
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              ></TextField>
                            </span>
                          </Grid>
                        </Grid>
                      </li>

                      <li className={classes.li}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <span className={classes.infoTitle}>FULLNAME</span>
                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoData}
                            >
                              {booking.fullname}
                            </span>
                            <span
                              hidden={
                                !(
                                  editMode.edit &&
                                  editMode.person._id === booking._id
                                )
                              }
                              className={classes.infoData}
                            >
                              <TextField
                                fullWidth
                                className={classes.TextBox}
                                value={fullname}
                                onChange={fullnameChanged}
                                inputProps={{
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              ></TextField>
                            </span>
                          </Grid>
                          <Grid item xs={6}>
                            <span className={classes.infoTitle}>EMAIL</span>
                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoData}
                            >
                              {booking.email}
                            </span>
                            <span
                              hidden={
                                !(
                                  editMode.edit &&
                                  editMode.person._id === booking._id
                                )
                              }
                              className={classes.infoData}
                            >
                              <TextField
                                fullWidth
                                className={classes.TextBox}
                                value={email}
                                onChange={emailChanged}
                                inputProps={{
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              ></TextField>
                            </span>
                          </Grid>
                        </Grid>
                      </li>
                      <li className={classes.li}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <span className={classes.infoTitle}>TEL</span>
                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoData}
                            >
                              {booking.phone?.toUpperCase()}
                            </span>
                            <span
                              hidden={
                                !(
                                  editMode.edit &&
                                  editMode.person._id === booking._id
                                )
                              }
                              className={classes.infoData}
                            >
                              <TextField
                                fullWidth
                                className={classes.TextBox}
                                value={tel}
                                onChange={telChanged}
                                inputProps={{
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              ></TextField>
                            </span>
                          </Grid>
                          <Grid item xs={4}>
                            <span className={classes.infoTitle}>D.O.B</span>
                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoData}
                            >
                              {FormatDateFromString(booking.birthDate)}
                            </span>
                            <span
                              hidden={
                                !(
                                  editMode.edit &&
                                  editMode.person._id === booking._id
                                )
                              }
                              className={classes.infoData}
                            >
                              <TextField
                                fullWidth
                                error={validationError.dobError}
                                className={classes.TextBox}
                                value={dob}
                                onChange={dobChanged}
                                inputProps={{
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              ></TextField>
                            </span>
                          </Grid>

                          <Grid item xs={4}>
                            <span className={classes.infoTitle}>GENDER</span>
                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoData}
                            >
                              {booking.gender?.toUpperCase()}
                            </span>
                            <span
                              hidden={
                                !(
                                  editMode.edit &&
                                  editMode.person._id === booking._id
                                )
                              }
                              className={classes.infoData}
                            >
                              <TextField
                                fullWidth
                                error={validationError.genderError}
                                className={classes.TextBox}
                                value={gender}
                                onChange={genderChanged}
                                inputProps={{
                                  style: {
                                    padding: 0,
                                  },
                                }}
                              ></TextField>
                            </span>
                          </Grid>
                        </Grid>
                      </li>

                      <li className={classes.li} style={{ paddingTop: "10px" }}>
                        <span className={classes.infoTitle}>Package</span>
                        <span
                          hidden={
                            editMode.edit && editMode.person._id === booking._id
                          }
                          className={classes.infoData}
                        >
                          {booking.packageName}
                        </span>
                        <span
                          hidden={
                            !(
                              editMode.edit &&
                              editMode.person._id === booking._id
                            )
                          }
                          className={classes.infoData}
                        >
                          <TextField
                            fullWidth
                            className={classes.TextBox}
                            value={service}
                            onChange={serviceChanged}
                            inputProps={{
                              style: {
                                padding: 0,
                              },
                            }}
                          ></TextField>
                        </span>
                      </li>

                      <li className={classes.li} style={{ paddingTop: "10px" }}>
                        <span className={classes.infoTitle}>
                          Indivisual Tests
                        </span>
                        <span className={classes.infoData}>
                          {getIndivisualTestsString(booking.indivisualTests)}
                        </span>
                      </li>

                      <li className={classes.li} style={{ paddingTop: "10px" }}>
                        <span className={classes.infoTitle}>
                          PATIENT'S NOTES
                        </span>
                        <span
                          hidden={
                            editMode.edit && editMode.person._id === booking._id
                          }
                          className={classes.infoData}
                        >
                          {booking.notes}
                        </span>
                        <span
                          hidden={
                            !(
                              editMode.edit &&
                              editMode.person._id === booking._id
                            )
                          }
                          className={classes.infoData}
                        >
                          <TextField
                            fullWidth
                            className={classes.TextBox}
                            value={notes}
                            onChange={notesChanged}
                            inputProps={{
                              style: {
                                padding: 0,
                              },
                            }}
                          ></TextField>
                        </span>
                      </li>
                      <Grid item>
                        <span className={classes.infoTitle}>
                          DOCTOR'S NOTES
                        </span>
                        <span
                          hidden={
                            editMode.edit && editMode.person._id === booking._id
                          }
                          className={classes.infoData}
                        >
                          {booking.doctorNote}
                        </span>
                        <span
                          hidden={
                            !(
                              editMode.edit &&
                              editMode.person._id === booking._id
                            )
                          }
                          className={classes.infoData}
                        >
                          <TextField
                            fullWidth
                            className={classes.TextBox}
                            value={doctorNote}
                            disabled={!isDoctor}
                            onChange={doctorNoteChanged}
                            inputProps={{
                              style: {
                                padding: 0,
                              },
                            }}
                          ></TextField>
                        </span>
                      </Grid>
                      {!isDoctor && (
                        <React.Fragment>
                          <li
                            className={classes.li}
                            style={{ paddingTop: "10px" }}
                          >
                            <span className={classes.infoTitle}>STATUS</span>{" "}
                            {getStatusLabel(booking.status)}
                            {booking.status === "patient_attended" &&
                              !(
                                editMode.edit &&
                                editMode.person._id === booking._id
                              ) &&
                              !booking.deleted && (
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    width: "100%",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    disabled={saving}
                                    style={{ width: "300px" }}
                                    onClick={(event) =>
                                      changeBackToBookingMade(
                                        event,
                                        booking._id
                                      )
                                    }
                                  >
                                    Change Back To Booking Made
                                  </Button>

                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={saving}
                                    style={{ width: "200px", margin: "0" }}
                                    className={classes.EditButton}
                                    onClick={(event) =>
                                      changeToCompleted(event, booking._id)
                                    }
                                  >
                                    Change To Completed
                                  </Button>
                                </div>
                              )}
                            {booking.status === "booked" &&
                              !(
                                editMode.edit &&
                                editMode.person._id === booking._id
                              ) &&
                              !booking.deleted && (
                                <Button
                                  variant="outlined"
                                  color="default"
                                  disabled={saving}
                                  style={{ width: "300px" }}
                                  onClick={(event) =>
                                    openPatientsModal(booking)
                                  }
                                >
                                  Change To Patient Attended
                                </Button>
                              )}
                            {booking.status === "report_sent" &&
                              !(
                                editMode.edit &&
                                editMode.person._id === booking._id
                              ) &&
                              !booking.deleted && (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  disabled={saving}
                                  style={{ width: "300px" }}
                                  onClick={(event) =>
                                    changeToPatientAttended(event, booking._id)
                                  }
                                >
                                  Change Back To Patient Attended
                                </Button>
                              )}
                          </li>

                          <li
                            className={classes.li}
                            style={{ paddingTop: "10px" }}
                          >
                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoTitle}
                            >
                              Estimated Price
                            </span>
                            <span
                              hidden={
                                editMode.edit &&
                                editMode.person._id === booking._id
                              }
                              className={classes.infoData}
                            >
                              {booking.estimatedPrice}
                            </span>
                          </li>

                          <li hidden={booking.deleted || editMode.edit}>
                            <Button
                              // disabled={
                              //   booking.printStatus === "printing" ||
                              //   booking.printStatus === "preparing"
                              // }
                              startIcon={<PrintIcon />}
                              // endIcon={
                              //   booking.printStatus === "printed" ? (
                              //     <DoneOutlineIcon style={{ color: "green" }} />
                              //   ) : null
                              // }
                              disabled={isPrinting}
                              type="button"
                              fullWidth
                              variant="outlined"
                              color="primary"
                              onClick={printLabel}
                              // onClick={() => {
                              //   BookService.sendForPrint(booking._id);
                              //   setTimeout(async () => {
                              //     const _booking = await BookService.getBookingById(
                              //       booking._id
                              //     );
                              //     setBooking({
                              //       ...booking,
                              //       printStatus: _booking?.data.printStatus,
                              //     });
                              //   }, 500);
                              //   setTimeout(async () => {
                              //     const _booking = await BookService.getBookingById(
                              //       booking._id
                              //     );
                              //     setBooking({
                              //       ...booking,
                              //       printStatus: _booking?.data.printStatus,
                              //     });
                              //   }, 1500);
                              //   setTimeout(async () => {
                              //     const _booking = await BookService.getBookingById(
                              //       booking._id
                              //     );
                              //     setBooking({
                              //       ...booking,
                              //       printStatus: _booking?.data.printStatus,
                              //     });
                              //   }, 3000);
                              //   setTimeout(async () => {
                              //     const _booking = await BookService.getBookingById(
                              //       booking._id
                              //     );
                              //     setBooking({
                              //       ...booking,
                              //       printStatus: _booking?.data.printStatus,
                              //     });
                              //   }, 5000);
                              //   setTimeout(async () => {
                              //     const _booking = await BookService.getBookingById(
                              //       booking._id
                              //     );
                              //     setBooking({
                              //       ...booking,
                              //       printStatus: _booking?.data.printStatus,
                              //     });
                              //   }, 10000);
                              //   setTimeout(async () => {
                              //     const _booking = await BookService.getBookingById(
                              //       booking._id
                              //     );
                              //     setBooking({
                              //       ...booking,
                              //       printStatus: _booking?.data.printStatus,
                              //     });
                              //   }, 15000);
                              //   setTimeout(async () => {
                              //     const _booking = await BookService.getBookingById(
                              //       booking._id
                              //     );
                              //     setBooking({
                              //       ...booking,
                              //       printStatus: _booking?.data.printStatus,
                              //     });
                              //   }, 20000);
                              // }}
                              className={classes.DownloadForm}
                            >
                              {/* {!booking.printStatus && "Print LAB Label"}
                          {booking.printStatus === "printed" &&
                            "Print LAB Label Again"}
                          {booking.printStatus === "printing" && "Printing"}
                          {booking.printStatus === "preparing" &&
                            "Preparing for print"} */}

                              {isPrinting ? "Printing..." : "Print LAB Label"}
                            </Button>
                          </li>

                          <li hidden={booking.deleted || editMode.edit}>
                            <Button
                              disabled={!booking.formData}
                              startIcon={<PrintIcon />}
                              type="button"
                              fullWidth
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                downloadRegForm(booking._id);
                              }}
                              className={classes.DownloadForm}
                            >
                              Download Registration Form
                            </Button>
                          </li>

                          <li
                            hidden={
                              booking.deleted ||
                              editMode.edit ||
                              booking.formData
                            }
                          >
                            <Button
                              disabled={
                                !booking.email || booking.email.length < 3
                              }
                              startIcon={<SendIcon />}
                              type="button"
                              fullWidth
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                sendRegForm(booking._id);
                              }}
                              className={classes.DownloadForm}
                              style={{ position: "relative" }}
                            >
                              Send Registration Form Email
                              {emailSent && (
                                <div
                                  style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "5px",
                                    color: "#05ad19",
                                  }}
                                >
                                  Email Sent
                                </div>
                              )}
                            </Button>
                          </li>

                          <li>
                            <Button
                              startIcon={<HistoryIcon />}
                              type="button"
                              fullWidth
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setOpenTimeStampDialog(true);
                              }}
                              // onTouchTap = {() => {downloadForm1(person._id)}}
                              className={classes.DownloadForm}
                            >
                              Show Audit Trail
                            </Button>
                          </li>

                          <Divider />

                          <li
                            className={classes.li}
                            style={{ marginTop: "20px" }}
                          >
                            <span className={classes.infoTitle}>
                              INVOICE # :{" "}
                            </span>{" "}
                            <span style={{ paddingLeft: "0px" }}>
                              {!invoiceLoaded && (
                                <span className={classes.invoiceNumber}>
                                  {" "}
                                  ...{" "}
                                </span>
                              )}
                              {invoiceLoaded && invoice && (
                                <span className={classes.invoiceNumber}>
                                  {" "}
                                  {invoice.invoiceNumber}{" "}
                                </span>
                              )}
                              {invoiceLoaded && !invoice && (
                                <span
                                  className={classes.invoiceNumber}
                                  style={{ color: "red", fontSize: "0.9rem" }}
                                >
                                  {" "}
                                  N/A{" "}
                                </span>
                              )}
                            </span>
                            {!(
                              editMode.edit &&
                              editMode.person._id === booking._id
                            ) &&
                              !booking.deleted && (
                                <React.Fragment>
                                  {invoiceLoaded && !invoice && (
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      className={classes.PayButton}
                                      onClick={() => OpenInvoiceDialog()}
                                    >
                                      Issue Invoice
                                    </Button>
                                  )}

                                  {invoiceLoaded && invoice && (
                                    <React.Fragment>
                                      <Button
                                        variant="outlined"
                                        startIcon={<PrintIcon />}
                                        color="primary"
                                        className={classes.printInvoiceButton}
                                        onClick={() =>
                                          downloadInvoice(invoice._id)
                                        }
                                      >
                                        Download Invoice
                                      </Button>

                                      <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.editInvoiceButton}
                                        onClick={() => OpenInvoiceDialog()}
                                      >
                                        Edit Invoice
                                      </Button>

                                      <Button
                                        disabled={
                                          !booking.email ||
                                          booking.email.length < 3
                                        }
                                        startIcon={<SendIcon />}
                                        type="button"
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                          sendInvoiceEmail(
                                            invoice._id,
                                            booking.email
                                          );
                                        }}
                                        style={{
                                          position: "relative",
                                          marginLeft: "10px",
                                          paddingRight: "130px",
                                          fontSize: "0.8rem",
                                        }}
                                      >
                                        Send Invoice By Email
                                        {emailSentInvoice && (
                                          <div
                                            style={{
                                              position: "absolute",
                                              right: "10px",
                                              top: "5px",
                                              color: "#05ad19",
                                            }}
                                          >
                                            Email Sent
                                          </div>
                                        )}
                                      </Button>
                                    </React.Fragment>
                                  )}
                                </React.Fragment>
                              )}
                          </li>

                          <li className={classes.li}>
                            <div
                              style={{
                                borderTop: "1px solid #ddd",
                                paddingTop: "20px",
                              }}
                            >
                              <span className={classes.infoTitle}>
                                {booking.paymentInfo ? "ONLINE" : "PHONE"}{" "}
                                DEPOSIT
                              </span>{" "}
                              <span
                                className={
                                  !booking.deposit || booking.deposit === 0
                                    ? classes.infoDataChargesHigher
                                    : classes.infoDataCharges
                                }
                              >{`£${booking.deposit.toLocaleString(
                                "en-GB"
                              )}`}</span>
                              {!(
                                editMode.edit &&
                                editMode.person._id === booking._id
                              ) &&
                                !booking.paid &&
                                booking.deleted &&
                                booking.deposit > 0 &&
                                booking.paymentInfo && (
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.PayButton}
                                    onClick={(event) =>
                                      setOpenRefundDialog(true)
                                    }
                                  >
                                    Refund Deposit
                                  </Button>
                                )}
                              {!(
                                editMode.edit &&
                                editMode.person._id === booking._id
                              ) &&
                                !booking.paid &&
                                booking.deleted &&
                                booking.deposit > 0 &&
                                !booking.paymentInfo && (
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.PayButton}
                                    onClick={(event) => manualRefund()}
                                  >
                                    <span
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      I made the refund manually
                                    </span>
                                  </Button>
                                )}
                              {!(
                                editMode.edit &&
                                editMode.person._id === booking._id
                              ) &&
                                // !booking.paid &&
                                !booking.deleted &&
                                // booking.deposit > 0 &&
                                !booking.paymentInfo && (
                                  <FormControlLabel
                                    style={{ marginLeft: "90px" }}
                                    control={
                                      <Switch
                                        color="primary"
                                        checked={booking.deposit > 0}
                                        onChange={depositChanged}
                                        name="deposit"
                                      />
                                    }
                                    label={
                                      booking.deposit > 0 ? (
                                        <span
                                          className={classes.PriceLabelPaid}
                                        >
                                          £50 Deposit Paid
                                        </span>
                                      ) : (
                                        <span
                                          className={classes.PriceLabelNotPaid}
                                        >
                                          £50 Deposit Not Paid
                                        </span>
                                      )
                                    }
                                  />
                                )}
                              {!(
                                editMode.edit &&
                                editMode.person._id === booking._id
                              ) &&
                                booking.refund && (
                                  <React.Fragment>
                                    <span className={classes.PayLabel}>
                                      {" "}
                                      <CheckIcon
                                        className={classes.checkIconSmall}
                                      />{" "}
                                      Refund Done
                                      {booking.paidBy === "corporate"
                                        ? ` "${booking.corporate}" `
                                        : ""}
                                    </span>
                                  </React.Fragment>
                                )}
                            </div>
                          </li>

                          {booking.paymentInfo && (
                            <li>
                              <div
                                style={{
                                  position: "relative",
                                  border: "1px dashed #84b076",
                                  borderRadius: "8px",
                                  padding: "10px",
                                  marginBottom: "10px",
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "-10px",
                                    fontSize: "0.85em",
                                    background: "#fff",
                                    fontWeight: "600",
                                    color: "#32701d",
                                    padding: "0px 5px",
                                  }}
                                >
                                  Payment Details
                                </div>
                                {JSON.parse(booking.paymentInfo).cardDetails ? (
                                  <Grid
                                    container
                                    spacing={4}
                                    justify="space-around"
                                    alignItems="center"
                                  >
                                    <Grid item>
                                      cardBrand:{" "}
                                      <strong>
                                        {
                                          JSON.parse(booking.paymentInfo)
                                            .cardDetails?.card.cardBrand
                                        }
                                      </strong>
                                    </Grid>
                                    <Grid item>
                                      expDate:{" "}
                                      <strong>
                                        {
                                          JSON.parse(booking.paymentInfo)
                                            .cardDetails?.card.expMonth
                                        }
                                        /
                                        {
                                          JSON.parse(booking.paymentInfo)
                                            .cardDetails?.card.expYear
                                        }
                                      </strong>
                                    </Grid>
                                    <Grid item>
                                      last4:{" "}
                                      <strong>
                                        {
                                          JSON.parse(booking.paymentInfo)
                                            .cardDetails?.card.last4
                                        }
                                      </strong>
                                    </Grid>
                                    <Grid item>
                                      timeStamp:{" "}
                                      <strong>
                                        {
                                          JSON.parse(booking.paymentInfo)
                                            .createdAt
                                        }
                                      </strong>
                                    </Grid>
                                  </Grid>
                                ) : (
                                  <Grid
                                    container
                                    spacing={4}
                                    justify="space-around"
                                    alignItems="center"
                                  >
                                    <Grid item>
                                      Operator: <strong>{"PAYPAL"}</strong>
                                    </Grid>

                                    <Grid item>
                                      Payer Name:{" "}
                                      <strong>
                                        {`${
                                          JSON.parse(booking.paymentInfo).payer
                                            ?.name.given_name
                                        } ${
                                          JSON.parse(booking.paymentInfo).payer
                                            ?.name.surname
                                        } `}
                                      </strong>
                                    </Grid>

                                    <Grid item>
                                      timeStamp:{" "}
                                      <strong>
                                        {
                                          JSON.parse(booking.paymentInfo)
                                            .create_time
                                        }
                                      </strong>
                                    </Grid>
                                  </Grid>
                                )}
                              </div>
                            </li>
                          )}

                          <li
                            className={classes.li}
                            style={{ marginTop: "20px" }}
                          >
                            <span className={classes.infoTitle}>
                              OTC CHARGES
                            </span>{" "}
                            <span
                              style={{ paddingLeft: "15px" }}
                              className={
                                !booking.OTCCharges || booking.OTCCharges === 0
                                  ? classes.infoDataChargesHigher
                                  : classes.infoDataCharges
                              }
                            >{`£${(booking.OTCCharges && booking.OTCCharges > 0
                              ? booking.OTCCharges
                              : invoice
                              ? invoice.grandTotal - (booking.deposit || 0)
                              : 0
                            ).toLocaleString("en-GB")}`}</span>
                            {!(
                              editMode.edit &&
                              editMode.person._id === booking._id
                            ) &&
                              !booking.paid &&
                              !booking.deleted && (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  className={classes.PayButton}
                                  onClick={(event) => Pay(event, booking._id)}
                                >
                                  Pay
                                </Button>
                              )}
                            {!(
                              editMode.edit &&
                              editMode.person._id === booking._id
                            ) &&
                              booking.paid && (
                                <React.Fragment>
                                  <span className={classes.PayLabel}>
                                    {" "}
                                    <CheckIcon
                                      className={classes.checkIconSmall}
                                    />{" "}
                                    Paid by {booking.paidBy}
                                    {booking.paidBy === "corporate"
                                      ? ` "${booking.corporate}" `
                                      : ""}
                                  </span>

                                  <Tooltip title="Undo Payment">
                                    <IconButton
                                      onClick={() => setOpenUndoPayDialog(true)}
                                    >
                                      <UndoIcon style={{ color: "red" }} />
                                    </IconButton>
                                  </Tooltip>
                                </React.Fragment>
                              )}
                          </li>

                          <li className={classes.li}>
                            <div
                              style={{
                                borderTop: "1px solid #ddd",
                                paddingTop: "10px",
                              }}
                            >
                              <span className={classes.infoTitle}>
                                TOTAL CHARGES
                              </span>{" "}
                              <span
                                className={
                                  !booking.OTCCharges ||
                                  booking.OTCCharges === 0
                                    ? classes.infoDataChargesHigher
                                    : classes.infoDataCharges
                                }
                              >{`£${(
                                booking.deposit + booking.OTCCharges
                              ).toLocaleString("en-GB")}`}</span>
                            </div>
                          </li>

                          {invoice && (
                            <li
                              style={{
                                lineHeight: "0.5rem",
                                border: "1px dashed #999",
                                padding: "0px 10px",
                                marginBottom: "10px",
                                marginTop: "-10px",
                              }}
                            >
                              {invoice.items.map((item) => (
                                <p>
                                  <span
                                    style={{
                                      width: "130px",
                                      display: "inline-block",
                                    }}
                                  >
                                    {" "}
                                    {item.code}{" "}
                                  </span>
                                  <span> £{item.price}</span>
                                </p>
                              ))}

                              <p>
                                <span
                                  style={{
                                    width: "130px",
                                    display: "inline-block",
                                    fontWeight: "500",
                                  }}
                                >
                                  {" "}
                                  TOTAL{" "}
                                </span>
                                <span
                                  style={{ fontWeight: "600", color: "green" }}
                                >
                                  {" "}
                                  £{getTotalPrice(invoice.items)}
                                </span>
                              </p>
                            </li>
                          )}

                          <li className={classes.li}>
                            <div
                              style={{
                                border: "1px dashed #285927",
                                background: "#fafffa",
                                padding: "10px",
                              }}
                            >
                              <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                              >
                                <Grid item>
                                  <span
                                    className={classes.infoTitle}
                                    style={{ color: "#2a422a" }}
                                  >
                                    Ask for Review By EMAIL
                                  </span>
                                </Grid>
                                <Grid item>
                                  <span>
                                    {booking.smsSent ? (
                                      <CheckIcon
                                        className={classes.checkIcon}
                                      />
                                    ) : (
                                      <CloseIcon
                                        className={classes.closeIcon}
                                      />
                                    )}
                                  </span>
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  style={{ paddingLeft: "20px" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                      Patient Source
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={smsType}
                                      onChange={smsTypeChanged}
                                      label="Source"
                                      fullWidth
                                    >
                                      {smsTypes.map((element) => (
                                        <MenuItem
                                          value={element.value}
                                        >{`${element.text}`}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                  <Button
                                    variant="contained"
                                    disabled={
                                      smsSending || !isValidPhone(booking.email)
                                    }
                                    color="primary"
                                    className={classes.PayButton}
                                    onClick={SendSMS}
                                  >
                                    Send EMAIL
                                  </Button>
                                </Grid>

                                {/* <Grid item xs={12} style={{paddingTop:"20px"}}>

                              <TextField
                                label="EMAIL TEXT" 
                                variant="outlined"
                                fullWidth
                                className={classes.TextBox}
                                value={smsMessage}
                                onChange={smsMessageChanged}
                              ></TextField>

                            </Grid> */}
                              </Grid>
                            </div>
                          </li>

                          {bloodReports && bloodReports.length > 0 && (
                            <React.Fragment>
                              <Divider />
                              <li>
                                <div style={{ padding: "20px" }}>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                  >
                                    <Grid item xs={12}>
                                      <div
                                        style={{
                                          color: "#dc2626",
                                          fontWeight: "600",
                                          fontSize: "1rem",
                                        }}
                                      >
                                        Blood Results :
                                      </div>
                                    </Grid>
                                    {bloodReports.map((report) => (
                                      <Grid item>
                                        <Button
                                          onClick={() =>
                                            showBloodReportClicked(report)
                                          }
                                          startIcon={<SearchIcon />}
                                          style={{ color: "#dc2626" }}
                                          variant="outlined"
                                        >
                                          {report.filename}
                                        </Button>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </div>
                              </li>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                    </ul>
                  </div>
                </Grid>
              </div>
              <Backdrop
                className={classes.backdrop}
                open={saving || deleting || restoring}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </DialogContent>

            <PayDialog
              booking={selectedBooking}
              open={openPayDialog}
              price={
                invoice ? invoice.grandTotal - (booking.deposit || 0) : null
              }
              handleClose={handleClosePayDialog}
            />

            <InvoiceDialog
              booking={selectedBooking}
              invoice={invoice}
              open={openInvoiceDialog}
              handleClose={handleCloseInvoiceDialog}
            />

            <BloodReportDialog
              booking={selectedBloodReport}
              open={bloodReportDialogOpen}
              onClose={handleClodeBloodReportDialog}
            />

            <TimeStampDialog
              booking={selectedBooking}
              open={openTimeStampDialog}
              bloodReports={bloodReports}
              handleClose={handleCloseTimeStampDialog}
            />
          </Dialog>

          <Dialog
            open={isFindPatientModalShow}
            onClose={closePatientsModal}
            maxWidth={"lg"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ color: "#999" }} id="alert-dialog-title">
              {"Patient Data"}
            </DialogTitle>
            <DialogContent
              style={{
                display: "flex",
                justifyContent: "space-between",
                minHeight: "50px",
              }}
            >
              <div>
                <div>Full Name:</div>
                {selectedBooking?.fullname ||
                  selectedBooking?.surname + " " + selectedBooking?.forename}
              </div>
              <div>
                <div>Birth Date:</div>
                {selectedBooking?.birthDate}
              </div>
              <div>
                <div>Gender:</div>
                {selectedBooking?.gender}
              </div>
              <div>
                <div>Email:</div>
                {selectedBooking?.email}
              </div>
            </DialogContent>

            <DialogTitle style={{ color: "#999" }} id="alert-dialog-title">
              {"Find Patient"}
            </DialogTitle>
            <DialogContent>
              <SearchPatientTableForSelecting
                data={selectedBooking}
                select={changeToPatientAttended}
              />
              <DialogContentText
                style={{ color: "#333", fontWeight: "400", marginTop: "32px" }}
                id="alert-dialog-description"
              >
                Do you want to create a new patient ?
              </DialogContentText>
              <FormControl fullWidth style={{ marginBottom: "12px" }}>
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  value={patientSurname}
                  onChange={handleSurnameChange}
                />
              </FormControl>
              <FormControl
                fullWidth
                spacing={3}
                style={{ marginBottom: "12px" }}
              >
                <TextField
                  id="outlined-basic"
                  label="Forename"
                  variant="outlined"
                  value={patientForename}
                  onChange={handleForenameChange}
                />
              </FormControl>
              <FormControl
                fullWidth
                spacing={3}
                style={{ marginBottom: "12px" }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  placeholder="Gender"
                  value={patientGenderType}
                  onChange={handleGenderChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                spacing={3}
                style={{ marginBottom: "12px" }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-from"
                    label="Birth date"
                    value={patientBirthDate}
                    onChange={handleBirthDateChange}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
              <Button
                onClick={changeToPatientAttended}
                color="secondary"
                autoFocus
              >
                Save
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={closePatientsModal} color="default">
                Back
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openUndoPayDialog}
            onClose={handleCloseUndoPayDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ color: "#999" }} id="alert-dialog-title">
              {"Undo Payment"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                style={{ color: "#333", fontWeight: "400" }}
                id="alert-dialog-description"
              >
                Are you sure you want to undo payment for this booking?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUndoPayDialog} color="default">
                Back
              </Button>
              <Button onClick={undoPaymentClicked} color="secondary" autoFocus>
                Yes, Undo Payment
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openRefundDialog}
            onClose={handleCloseRefundDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ color: "#999" }} id="alert-dialog-title">
              {"Refund Deposit"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                style={{ color: "#333", fontWeight: "400" }}
                id="alert-dialog-description"
              >
                Are you sure you want to refund deposit payment for this
                booking?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRefundDialog} color="default">
                Back
              </Button>
              <Button
                onClick={refundPaymentClicked}
                color="secondary"
                autoFocus
              >
                Yes, Refund Payment
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
