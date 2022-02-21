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
import { setRole } from "./Role";
import { useLocation, useHistory } from "react-router-dom";
import { getGlobalPath } from "./GlobalPath";
import { getMenuId, getMenuIndex } from "./MenuList";
import NewBloodResultsBookingView from "./NewBloodResultsBookingView";
import NewScreeningBookingView from "./NewScreeningBookingView"
import ShouldRefundBookingScreeningView from "./ShouldRefundBookingScreeningView";
import LiveBookingView from "./LiveBookingView";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 400,
  },
  fixedHeightSmall: {
    height: 200,
    cursor:"pointer"
  },
}));

export default function DashboardPreview() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperSmall = clsx(classes.paper, classes.fixedHeightSmall);

  const history = useHistory();

  const gotoLateBookings = () =>
  {
    const role = 'pcr'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'latebookings'))}`));
  }

  const gotoUnmatchedPCR = () =>
  {
    const role = 'pcr'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'unmatchedRecords'))}`));
  }

  const gotoBlood = () =>
  {
    const role = 'blood'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'dashboard'))}`));
  }

  
  const gotoRefundGynae = () =>
  {
    const role = 'gynae'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'deletedBookings'))}`));
  }

  const gotoScreening = () =>
  {
    const role = 'screening'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'pendingBookings'))}`));
  }

  const gotoScreeningRefunds = () =>
  {
    const role = 'screening'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'deletedBookings'))}`));
  }



  

  return (
    <React.Fragment>
      <Grid container spacing={2}>       
       
        <Grid item xs={12} md={12}>
          <Paper style={{background: "linear-gradient(0deg, rgba(230,249,255,1) 0%, rgba(255,255,255,1) 100%)"}}>
              <LiveBookingView/>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaperSmall} onClick={gotoLateBookings}>
             <LateBookingView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaperSmall} onClick={gotoUnmatchedPCR}>
             <UnmatchedBookingView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaperSmall} onClick={gotoRefundGynae}>
             <ShouldRefundBookingView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaperSmall} onClick={gotoBlood}>
             <NewBloodResultsBookingView />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaperSmall} onClick={gotoScreening}>
             <NewScreeningBookingView />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={fixedHeightPaperSmall} onClick={gotoScreeningRefunds}>
             <ShouldRefundBookingScreeningView />
          </Paper>
        </Grid>


        {/* <Grid item xs={12} md={6}>
        </Grid> */}



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


      </Grid>
    </React.Fragment>
  );
}
