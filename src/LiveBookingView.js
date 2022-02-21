import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import BloodBookService from "./Blood/services/BookService"
import ScreeningBookService from "./Screening/services/BookService";
import STDBookService from "./STD/services/BookService";

import GlobalState from "./GlobalState";
import { Grid, LinearProgress } from "@material-ui/core";

import LiveTvIcon from "@material-ui/icons/LiveTv";
import { CalendarColors } from "./Admin/calendar-admin/colors";
import { useHistory } from "react-router";
import { setRole } from "./Role";
import { getGlobalPath } from "./GlobalPath";
import { getMenuId, getMenuIndex } from "./MenuList";

const useStyles = makeStyles((theme) => ({
  countLabel: {
   position: "absolute",
   top: "65px",
   left: "44%",
   fontSize: "3rem",
  },

  countLabelRed: {
    position: "absolute",
    top: "65px",
    left: "44%",
    fontSize: "3rem",
    color: theme.palette.secondary.main
   },

   Icon: {
    fontSize: "2rem"

  },

  IconRed: {
   fontSize: "2rem",
  //  color: theme.palette.secondary.main,
  },

  TitleRed:{
    // color: theme.palette.secondary.main,
  },

  LiveTitle: {
    fontSize: "1.3rem",
    fontWeight: "500",
    color: "#eee"
  },


  LiveItem: {
    fontSize: "2rem",
    color: "#fff",
    fontWeight: "700"
  }

}));

export default function LiveBookingView() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [data, setData] = React.useState({screen: 0, std: 0, blood: 0});

  const [refresh, setRefresh] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const loadData = async () => {
    setLoading(true);

    try {
      const std_data = await STDBookService.getLiveBookings()
      const blood_data = await BloodBookService.getLiveBookings()
      const screening_data = await ScreeningBookService.getLiveBookings()

      let std = 0, blood = 0, screening = 0

      if (std_data)
      {
        std = std_data.data.length
      }
      if (blood_data)
      {
        blood = blood_data.data.length
      }
      if (screening_data)
      {
        screening = screening_data.data.length
      }



      setData({std, blood, screening});

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refresh]);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      setRefresh((refresh) => !refresh);
    }, 30000);

    return () =>
    {
      clearInterval(interval)
    }
  }, []);


  const history = useHistory();
  const gotoBlood = () =>
  {
    const role = 'blood'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'liveBookings'))}`));
  }

  const gotoSTD = () =>
  {
    const role = 'std'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'liveBookings'))}`));
  }

  const gotoScreening = () =>
  {
    const role = 'screening'
    setRole(role);
    setState((state) => ({ ...state, role: role }));
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'liveBookings'))}`));
  }



  return (
    <React.Fragment>
      <div style={{ position: "relative", paddingBottom: "20px" }}>
        {loading && (
          <div style={{ width: "100%", paddingTop: "3px" }}>
            <LinearProgress color="primary" />
          </div>
        )}
        <Title>
          <Grid
            container
            direction="row-reverse"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <div style={{ padding: "10px" }}>
                <LiveTvIcon className={data === 0 ? classes.Icon : classes.IconRed } />
              </div>
            </Grid>
            <Grid item style={{ textAlign: "left" }}>
              <span className={data === 0 ? classes.Title : classes.TitleRed}>
              <span style={{ padding: "10px"}}>Live Bookings</span> 
              </span>           
            </Grid>
          </Grid>
        </Title>

        <Grid container alignItems="center" justify="space-around">
          <Grid item>
              <div onClick={gotoScreening} style={{width:"100%", textAlign:"center", cursor:"pointer", background: CalendarColors.SCREENING_COLOR, padding:"5px 50px", borderRadius:"10px"}}>
                <p className={classes.LiveTitle}>Screening</p>
                <p className={classes.LiveItem}>{data.screening || 0}</p>
              </div>
          </Grid>

          <Grid item>
              <div onClick={gotoBlood} style={{width:"100%", textAlign:"center", cursor:"pointer", background: CalendarColors.BLOOD_COLOR, padding:"5px 50px", borderRadius:"10px"}}>
                <p className={classes.LiveTitle}>Blood</p>
                <p className={classes.LiveItem}>{data.blood || 0}</p>
              </div>
          </Grid>

          <Grid item>
            <div onClick={gotoSTD} style={{width:"100%", textAlign:"center", cursor:"pointer", background: CalendarColors.STD_COLOR, padding:"5px 50px", borderRadius:"10px"}}>
                <p className={classes.LiveTitle}>STD</p>
                <p className={classes.LiveItem}>{data.std || 0}</p>
              </div>
          </Grid>
        
        </Grid>  

      </div>
    </React.Fragment>
  );
}
