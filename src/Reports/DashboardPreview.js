import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Tooltip } from '@material-ui/core';
import GlobalState from './../GlobalState';
import MonthlyChart from './MonthlyChart';
import dateformat from 'dateformat';

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    // height: 400,
  },
}));

export default function DashboardPreview() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const getPrevMonth = () =>
  {
    const today = new Date()
    const prevMonth = new Date(today.getTime() - (today.getDate() + 1) * 24 * 60 * 60 * 1000)
    return prevMonth
  }

  return (
    <React.Fragment>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <MonthlyChart defaultMonth={`${dateformat(getPrevMonth(),'mmmm-yyyy')}`}/>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}