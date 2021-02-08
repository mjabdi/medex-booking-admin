import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Tooltip } from "@material-ui/core";
import GlobalState from "./GlobalState";

import TodayBookingView from "./TodayBookingView" 
import TomorrowBookingView from "./TomorrowBookingView";
import TotalBookingView from "./TotalBookingView";
import LateBookingView from "./LateBookingView";
import UnmatchedBookingView from "./UnmatchedBookingView";
import ShouldRefundBookingView from "./ShouldRefundBookingView";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 250,
  },
}));

export default function DashboardPreview() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <Grid container spacing={3}>       
       
        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
            <TodayBookingView />
          </Paper>
        </Grid>
      
        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
             <TomorrowBookingView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
             <TotalBookingView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
             <LateBookingView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
             <UnmatchedBookingView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={fixedHeightPaper}>
             <ShouldRefundBookingView />
          </Paper>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
