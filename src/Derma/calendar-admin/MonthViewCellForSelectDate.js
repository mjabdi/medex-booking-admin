import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import dateformat from "dateformat";
import BookService from "../services/BookService";

import CircularProgress from "@material-ui/core/CircularProgress";

import GlobalState from "../../GlobalState";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Container: {
    width: "100%",
    minWidth:"200px",
    paddingTop: "70%",
    position: "relative",
    backgroundColor: "#fff",
    cursor: "pointer",
  },

  ContainerPast: {
    width: "100%",
    paddingTop: "70%",
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

  DayLabelToday: {
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    fontSize: "1rem",
    borderRadius: "50%",
    padding: "5px",
    lineHight: "35px",
    minWidth: "35px",
    textAlign: "center",
  },

  DayLabelDisabled: {
    position: "absolute",
    top: "5px",
    right: "5px",
    color: "#ddd",
    fontSize: "1rem",
  },

  BookingCountLabel: {
    position: "absolute",
    top: "35%",
    left: "40%",
    color: "#3f51b5",
    backgroundColor: "#ebedf7",
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px",
    borderRadius: "50%",
    minWidth: "40px",
    lineHight: "40px",
    cursor: "pointer",
    textAlign: "center",
  },

  BookingCountLabelBusy: {
    position: "absolute",
    top: "35%",
    left: "40%",
    color: "#b00000",
    backgroundColor: "#fce6e6",
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px",
    borderRadius: "50%",
    minWidth: "40px",
    cursor: "pointer",
    textAlign: "center",
  },

  LoadingProgress: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },

  BookingCountGauge: {
    position: "absolute",
    bottom: "5%",
    left: "8%",
    width: "8%",
    height: "85%",
  },

  PCRGauge: {
    position: "absolute",
    bottom: "-20px",
    left: "0",
    width: "30px",
    height: "120%",
  },

  GynaeGauge: {
    position: "absolute",
    bottom: "-20px",
    left: "31px",
    width: "20px",
    height: "120%",
  },

  GPGauge: {
    position: "absolute",
    bottom: "-20px",
    left: "52px",
    width: "20px",
    height: "120%",
  },

  STDGauge: {
    position: "absolute",
    bottom: "-20px",
    left: "73px",
    width: "20px",
    height: "120%",
  },

  BloodGauge: {
    position: "absolute",
    bottom: "-20px",
    left: "94px",
    width: "20px",
    height: "120%",
  },

  DermaGauge: {
    position: "absolute",
    bottom: "-20px",
    left: "115px",
    width: "20px",
    height: "120%",
  },

  ScreeningGauge: {
    position: "absolute",
    bottom: "-20px",
    left: "136px",
    width: "20px",
    height: "120%",
  },

  CorporateGauge: {
    position: "absolute",
    bottom: "-20px",
    left: "157px",
    width: "20px",
    height: "120%",
  },



  DayLabelContainer: {
    position: "absolute",
    top: "15%",
    left: "5px",
    width: "100%",
    paddingTop: "45%",
  },
}));

const MAX_BOOKING_COUNT_PCR = 10;
const MAX_BOOKING_COUNT_GP = 10;
const MAX_BOOKING_COUNT_STD = 10;
const MAX_BOOKING_COUNT_GYNAE = 10;
const MAX_BOOKING_COUNT_BLOOD = 10;
const MAX_BOOKING_COUNT_DERMA = 10;


const MonthViewCell = ({ key, cellIndex, month, daysInMonth, dayClicked }) => {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);

  const [dateStr, setDateStr] = React.useState("");

  const [cellDate, setCellDate] = React.useState(new Date());

  const [bookingsCount, setBookingsCount] = React.useState(null);

  const [disableDay, setDisableDay] = React.useState(false);

  const [isPast, setIsPast] = React.useState(false);

  useEffect(() => {
    if (cellIndex <= daysInMonth.length) {
      const date = daysInMonth[cellIndex - 1];
      const dateStr = dateformat(date, "yyyy-mm-dd");
      setDateStr(dateStr);
      setCellDate(date);
      setDisableDay(date.getMonth() !== month - 1);
      const todayStr = dateformat(new Date(), "yyyy-mm-dd");
      setIsPast(dateStr < todayStr);
    } else {
      const day = cellIndex - daysInMonth.length;
      const date = new Date(
        daysInMonth[daysInMonth.length - 1].getTime() + day * 86400000
      );
      const dateStr = dateformat(date, "yyyy-mm-dd");
      setDateStr(dateStr);
      setCellDate(date);
      setDisableDay(true);
      const todayStr = dateformat(new Date(), "yyyy-mm-dd");
      setIsPast(dateStr < todayStr);
    }
  }, [cellIndex, month, daysInMonth]);

  const getDayLabel = (_cellIndex, _month, _daysInMonth) => {
    var date = null;
    var disabled = false;
    var day = -1;

    if (_cellIndex <= _daysInMonth.length) {
      date = _daysInMonth[_cellIndex - 1];
      day = date.getDate();
      if (date.getMonth() !== _month - 1) {
        disabled = true;
      }
    } else {
      const _day = _cellIndex - _daysInMonth.length;
      const date = new Date(
        _daysInMonth[_daysInMonth.length - 1].getTime() + _day * 86400000
      );
      day = date.getDate();
      disabled = true;
    }

    const isToday =
      dateformat(new Date(), "yyyy-mm-dd") === dateformat(date, "yyyy-mm-dd");

    return (
      <span
        className={
          disabled
            ? classes.DayLabelDisabled
            : isToday
            ? classes.DayLabelToday
            : classes.DayLabel
        }

        style={{zIndex:2}}
      >
        {day > 0 ? `${day}` : ""}
      </span>
    );
  };


  return (
    <React.Fragment>
      <div
        className={classes.Container}
        onClick={(event) => dayClicked(event, cellDate)}
      >
        {getDayLabel(cellIndex, month, daysInMonth)}
        {/* {getBookingsCountGauge(bookingsCount)} */}
      </div>
    </React.Fragment>
  );
};

MonthViewCell.propTypes = {
  key: PropTypes.string.isRequired,
  cellIndex: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  daysInMonth: PropTypes.arrayOf(PropTypes.date),
  dayClicked: PropTypes.func,
};

export default MonthViewCell;
