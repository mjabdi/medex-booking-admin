import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { Grid, LinearProgress, Tooltip } from "@material-ui/core";
import * as dateformat from "dateformat";
import BookService from "./services/BookService";
import BookingDialog from "./BookingDialog";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },

  bookingBox: {
    display: "flex",
    margin: "5px",
    padding: "5px",
    maxWidth: "90px",
    minHeight: "30px",
    border: "1px solid #eee",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    backgroundColor: "#ebedf7",
    color: "#3f51b5",
    boxShadow: "2px 4px #fafafa",
    borderRadius: "5px",
    textAlign: "center",
    alignItems: "center",
    justifyItems: "center",
    align: "center",

    "&:hover": {
      background: "#3f51b5",
      color: "#ebedf7",
    },
  },
});

const isWeekend = (date) => {
  return date.getDay() === 0 || date.getDay() === 6; /// Weekend
};

const getCurrentTimeSlot = (now) => {
  if (isWeekend(now)) {
    return null;
  }

  var min = now.getMinutes();
  var hour = now.getHours();

  if (hour < 9 || hour >= 18) return null;

  if (hour === 9 && min < 45) {
    return "09:00 AM";
  }

  if ((hour === 9 && min >= 45) || (hour === 10 && min < 30)) {
    return "09:45 AM";
  }

  if ((hour === 10 && min >= 30) || (hour === 11 && min < 15)) {
    return "10:30 AM";
  }

  if (hour === 11 && min >= 15) {
    return "11:15 AM";
  }

  if (hour === 12 && min < 45) {
    return "12:00 PM";
  }

  if ((hour === 12 && min >= 45) || (hour === 13 && min < 30)) {
    return "12:45 PM";
  }

  if ((hour === 13 && min >= 30) || (hour === 14 && min < 15)) {
    return "01:30 PM";
  }

  if (hour === 14 && min >= 15) {
    return "02:15 PM";
  }

  if (hour === 15 && min < 45) {
    return "03:00 PM";
  }

  if ((hour === 15 && min >= 45) || (hour === 16 && min < 30)) {
    return "03:45 PM";
  }

  if ((hour === 16 && min >= 30) || (hour === 17 && min < 15)) {
    return "04:30 PM";
  }

  if (hour === 17 && min >= 15) {
    return "05:15 PM";
  }
};

const getCurrentTimeSlotLabel = (timeStr) => {
  if (!timeStr) {
    return "Closed";
  }

  let endTimeStr = "";
  switch (timeStr) {
    case "09:00 AM":
      endTimeStr = "09:45 AM";
      break;
    case "09:45 AM":
      endTimeStr = "10:30 AM";
      break;
    case "10:30 AM":
      endTimeStr = "11:15 AM";
      break;
    case "11:15 AM":
      endTimeStr = "12:00 PM";
      break;
    case "12:00 PM":
      endTimeStr = "12:45 PM";
      break;
    case "12:45 PM":
      endTimeStr = "01:30 PM";
      break;
    case "01:30 PM":
      endTimeStr = "02:15 PM";
      break;
    case "02:15 PM":
      endTimeStr = "03:00 PM";
      break;
    case "03:00 PM":
      endTimeStr = "03:45 PM";
      break;
    case "03:45 PM":
      endTimeStr = "04:30 PM";
      break;
    case "04:30 PM":
      endTimeStr = "05:15 PM";
      break;
    case "05:15 PM":
      endTimeStr = "06:00 PM";
      break;
    default:
      endTimeStr = "";
      break;
  }

  return `${timeStr} - ${endTimeStr}`;
};

export default function CurrentVisits() {
  const classes = useStyles();

  const [current, setCurrent] = React.useState(new Date());
  const [bookings, setBookings] = React.useState([]);

  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(new Date());
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const currentTimeSlot = getCurrentTimeSlot(current);
    if (!currentTimeSlot) return;
    const todayStr = dateformat(current, "yyyy-mm-dd");
    setLoading(true);
    BookService.getBookingsByDateStrandTime(todayStr, currentTimeSlot)
      .then((res) => {
        setLoading(false);
        if (res.data.status === "OK") {
          setBookings([...res.data.bookings]);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [current]);

  const getBookingsBox = (_bookings) => {
    if (_bookings && _bookings.length > 0) {
      return (
        <div className={classes.root}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            spacing={0}
          >
            {_bookings.map((booking) => (
              <Grid item>
                <div
                  className={classes.bookingBox}
                  onClick={(event) => bookingCliked(event, booking)}
                >
                  <span style={{ textAlign: "center" }}>
                    {" "}
                    {`${booking.surnameCapital}`.substring(0, 10)}{" "}
                  </span>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    }
  };

  const bookingCliked = (event, booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <React.Fragment>
      {loading && (
        <div style={{ width: "100%", paddingTop: "3px" }}>
          <LinearProgress color="primary" />
        </div>
      )}

      <Title>Current Visits</Title>
      <Typography component="p" variant="h6">
        {getCurrentTimeSlotLabel(getCurrentTimeSlot(current))}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {dateformat(current, "dd mmmm, yyyy")}
      </Typography>

      {getBookingsBox(bookings)}

      <BookingDialog
        booking={selectedBooking}
        open={openDialog}
        onClose={handleCloseDialog}
      />
    </React.Fragment>
  );
}
