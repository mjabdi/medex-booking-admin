import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getIsDoctor } from "./isDoctor";

import {
  Badge,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Tooltip,
} from "@material-ui/core";
import GlobalState from "./GlobalState";
import { List, ListItem } from "@material-ui/core";

import ListItemText from "@material-ui/core/ListItemText";
import { getMenuRole, getMenuId } from "./MenuList";
import { border, borderBottom } from "@material-ui/system";
import { getGlobalPath } from "./GlobalPath";

import GyaneBookService from "./Gynae/services/BookService"
import ScreeningBookService from "./Screening/services/BookService"
import BloodBookService from "./Blood/services/BookService"


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },

  icon: {
    fontSize: "1rem",
    color: "#777",
    cursor: "pointer",
    paddingTop: "10px",
    paddingBottom: "8px",
    borderBottom: "1px solid #eee",
  },

  iconSelected: {
    color: "#fff",
    backgroundColor:  theme.palette.primary.main,
    transition: "all 0.1s ease-in-out"
  },

  menuText: {
    fontSize: "1rem",
    fontWeight: "500"
  },

  Badge:{
    backgroundColor: "rgb(220, 0, 78)",
    color: "#fff",
    fontWeight: "600",
    textAlign:"center",
    borderRadius: "50%",
    fontSize: "0.85rem",
    lineHeight: "0.85rem",
    padding:"7px",
    marginTop:"9px",
    width:"28px"

  }
}));

export default function MyMenu() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);
 const [isDoctor, setIsDoctor] = React.useState(getIsDoctor());
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  let history = useHistory();

  const updateShouldRefundsCount = async () =>
  {
    try{
      const res = await GyaneBookService.getShouldRefundsCount()
      if (res && res.data && res.data.status === "OK")
      {
        setState(state => ({...state, shouldRefunsCount: res.data.count}))
      }
    }
    catch(ex)
    {
      console.error(ex)
    }
  }

  const updateShouldRefundsCountScreening = async () =>
  {
    try{
      const res = await ScreeningBookService.getShouldRefundsCount()
      if (res && res.data && res.data.status === "OK")
      {
        setState(state => ({...state, shouldRefunsCountScreening: res.data.count}))
      }
    }
    catch(ex)
    {
      console.error(ex)
    }
  }

  const updateShouldRefundsCountBlood = async () =>
  {
    try{
      const res = await BloodBookService.getShouldRefundsCount()
      if (res && res.data && res.data.status === "OK")
      {
        setState(state => ({...state, shouldRefunsCountBlood: res.data.count}))
      }
    }
    catch(ex)
    {
      console.error(ex)
    }
  }



  const updateHSPendingBookingsCount = async () =>
  {
    try{
      const res = await ScreeningBookService.getPendingBookings()
      if (res && res.data)
      {
        setState(state => ({...state, hsPendingBookingsCount: res.data.length}))
      }
    }
    catch(ex)
    {
      console.error(ex)
    }
  }


  useEffect(() => {
    setSelectedIndex(state.currentMenuIndex);
    updateShouldRefundsCount()
    updateShouldRefundsCountScreening()
    updateShouldRefundsCountBlood()

    updateHSPendingBookingsCount()
  }, [state.currentMenuIndex, state.bookingDialogDataChanged]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setState((state) => ({ ...state, currentMenuIndex: index }));

    history.push(getGlobalPath(`/${getMenuId(state.role,index)}`));
  };

  return (
    <React.Fragment>
      <List>
        {state.role &&
          getMenuRole(state.role).map(
            (item) =>
              !item.hidden &&
              !(item.doctorHide && isDoctor ) && (
                // <ListItem button selected={selectedIndex === item.index} onClick={(event) => handleListItemClick(event, item.index)}>
                // <ListItemIcon>
                //     {item.icon}
                // </ListItemIcon>
                // <ListItemText primary={`${item.title}`} />
                // </ListItem>
                <React.Fragment key={`${item.id}`}>
                  <div
                    key={`${item.id}`}
                    className={clsx(
                      classes.icon,
                      selectedIndex === item.index && classes.iconSelected
                    )}
                    onClick={(event) => handleListItemClick(event, item.index)}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      spacing={3}
                      style={{ paddingLeft: "15px" }}
                    >
                      <Grid item>{item.icon}</Grid>

                      <Grid item style={{ textAlign: "left" }}>
                        <span
                          className={classes.menuText}
                        >{`${item.title}`}</span>{" "}
                      </Grid>

                      {state.role === "gynae" &&
                        item.id === "deletedBookings" &&
                        state.shouldRefunsCount > 0 && (
                          <span className={classes.Badge}>
                            {" "}
                            {state.shouldRefunsCount}{" "}
                          </span>
                        )}

                      {state.role === "screening" &&
                        item.id === "pendingBookings" &&
                        state.hsPendingBookingsCount > 0 && (
                          <span className={classes.Badge}>
                            {" "}
                            {state.hsPendingBookingsCount}{" "}
                          </span>
                        )}

                      {state.role === "screening" &&
                        item.id === "deletedBookings" &&
                        state.shouldRefunsCountScreening > 0 && (
                          <span className={classes.Badge}>
                            {" "}
                            {state.shouldRefunsCountScreening}{" "}
                          </span>
                        )}

                      {state.role === "blood" &&
                        item.id === "deletedBookings" &&
                        state.shouldRefunsCountBlood > 0 && (
                          <span className={classes.Badge}>
                            {" "}
                            {state.shouldRefunsCountBlood}{" "}
                          </span>
                        )}
                    </Grid>
                  </div>
                </React.Fragment>
              )
          )}
      </List>
    </React.Fragment>
  );
}
