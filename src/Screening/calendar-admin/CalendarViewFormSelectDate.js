import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonthView from './MonthViewForSelectDate';
import { Button, Grid, IconButton, Tooltip } from '@material-ui/core';


import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import GlobalState from '../../GlobalState';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const useStyles = makeStyles((theme) => ({

    title: {
        textAlign: "center",
        fontSize: "24px",
        fontColor: "#333"
    },

  }));

export default function CalendarView({ dayClick }) {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);

  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());

  const [day, setDay] = React.useState(new Date());

  const [firstDayofWeek, setFirstDayofWeek] = React.useState(new Date());

  const [weekDates, setWeekDates] = React.useState([]);

  const [mode, setMode] = React.useState("month");
  const [selectedTab, setSeletedTab] = React.useState("month");

  const [filter, setFilter] = React.useState("");

  const removeFilter = () => {
    setFilter("");
    setState((state) => ({ ...state, dayViewCalFilter: "" }));
  };

  useEffect(() => {
    const today = new Date();
    const dayofWeek = today.getDay();
    const firstdayofweek = new Date(today.getTime() - dayofWeek * 86400000);
    setFirstDayofWeek(firstdayofweek);
    return () => {
      removeFilter();
    };
  }, []);

  useEffect(() => {
    const dates = [];
    for (var i = 0; i < 7; i++) {
      dates.push(new Date(firstDayofWeek.getTime() + i * 86400000));
    }
    setWeekDates(dates);
  }, [firstDayofWeek]);

  const handlePrevButton = (event) => {
    if (month === 1) {
      setYear(year - 1);
    }

    const newMonth = month === 1 ? 12 : month - 1;
    setMonth(newMonth);

    const newDay = new Date(year, newMonth - 1, 1, 0, 0, 0, 0);
    setDay(newDay);

    const dayofWeek = newDay.getDay();
    setFirstDayofWeek(new Date(newDay.getTime() - dayofWeek * 86400000));
  };

  const handleNextButton = (event) => {
    if (month === 12) {
      setYear(year + 1);
    }

    const newMonth = month === 12 ? 1 : month + 1;
    setMonth(newMonth);

    const newDay = new Date(year, newMonth - 1, 1, 0, 0, 0, 0);
    setDay(newDay);

    const dayofWeek = newDay.getDay();
    setFirstDayofWeek(new Date(newDay.getTime() - dayofWeek * 86400000));
  };

  const goToday = (event) => {
    const newDay = new Date();
    const dayofWeek = newDay.getDay();
    setFirstDayofWeek(new Date(newDay.getTime() - dayofWeek * 86400000));
    setDay(newDay);
    setMonth(newDay.getMonth() + 1);
    setYear(newDay.getFullYear());
  };

  const dayClicked = (event, date) => {
    const newDate = new Date(date)
    dayClick( newDate.toISOString()
    );
    const newDay = new Date(date);
    const dayofWeek = newDay.getDay();
    setFirstDayofWeek(new Date(newDay.getTime() - dayofWeek * 86400000));
    setDay(newDay);
    setMonth(newDay.getMonth() + 1);
    setYear(newDay.getFullYear());
    
  };

  const getContentFromMode = (_mode) => {
    return <MonthView dayClicked={dayClicked} month={month} year={year} />;
  };

  const getCalendarTitleFromMode = (_mode) => {
    return (
      <span className={classes.title}>
        {" "}
        {`${monthNames[month - 1]} ${year}`}{" "}
      </span>
    );
  };

  const getPrevButtonTitle = (_mode) => {
    return `Previuos ${mode}`;
  };

  const getNextButtonTitle = (_mode) => {
    return `Next ${mode}`;
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: "10px", marginTop: "0px" }}
      >
        <Grid item md={3}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingLeft: "10px",
            }}
          >
            <Tooltip title={getPrevButtonTitle(mode)} placement="bottom-start">
              <IconButton
                color="default"
                aria-label="prev"
                onClick={handlePrevButton}
              >
                <NavigateBeforeIcon style={{ fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>

            <Tooltip title={getNextButtonTitle(mode)} placement="bottom-end">
              <IconButton
                color="default"
                aria-label="next"
                onClick={handleNextButton}
              >
                <NavigateNextIcon style={{ fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>

            <Button
              style={{ marginTop: "11px", marginLeft: "10px" }}
              onClick={goToday}
              variant="outlined"
            >
              {" "}
              Today{" "}
            </Button>
          </div>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
            spacing={3}
          >
            <Grid item>{getCalendarTitleFromMode(mode)}</Grid>
          </Grid>
        </Grid>
      </Grid>

      {getContentFromMode(mode)}
    </React.Fragment>
  );
}