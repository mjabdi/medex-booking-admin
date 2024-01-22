import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TimeService from "./services/TimeService";
import Calendar from "./calendar-admin/CalendarViewFormSelectDate";
import {
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import {
  FormatDateFromString,
} from "./DateFormatter";
import EventBusyIcon from "@material-ui/icons/EventBusy";

import * as dateformat from "dateformat";


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

  deleteIcon: {
    color: "red",
  },

  PositiveLabel: {
    backgroundColor: "red",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  table: {
    width: "100%",
    border: "1px solid #ddd",
    borderCollapse: "collapse",
  },

  th: {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    verticalAlign: "middle",
    fontcolor: "#555",
    fontWeight: "400",
    fontSize: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    width: "14%",
    paddingLeft: "5px",
  },

  td: {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    verticalAlign: "middle",
    paddingLeft: "5px",
  },

  notifyIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "rgb(220, 0, 78)",
    marginLeft: "10px",
  },

  clinicTitle: {
    fontWeight: "600",
    textAlign: "center",
    color: theme.palette.primary.main,
    padding: "2px 10px",
  },
}));

export default function BookingTable(props) {
  const classes = useStyles();

  var columns = [];
    columns = [
      {
        field: "_id",
        headerName: "Actions",
        width: 120,
        renderCell: (params) => {
          return (
            <React.Fragment>
              <Button onClick={() => removeOneDay(params.value)}>
                <DeleteIcon />
              </Button>
            </React.Fragment>
          );
        },
      },
      {
        field: "date",
        headerName: "Date",
        width: 150,
        valueFormatter: (params) => {
          return FormatDateFromString(params.value);
        },
      },
     
    ];
  
  const [data, setData] = React.useState({
    offDays: [],
    isFetching: true,
  });

  const formatTimeStamp = (timeStamp) => {
    const todayStr = dateformat(new Date(), "yyyy-mm-dd");
    const timeStampStr = dateformat(timeStamp, "yyyy-mm-dd");
    if (todayStr === timeStampStr) {
      return dateformat(timeStamp, "'Today', h:MM:ss TT");
    } else {
      return dateformat(timeStamp, "mmm dS, h:MM:ss TT");
    }
  };

  const loadData = async () => {
    var api = TimeService.getAllOffDays;
    setData({ offDays: [], isFetching: true });

    // console.log(props)

    return api()
      .then((res) => {
        // console.log(res)
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i] = { ...res.data.result[i], id: i + 1 };
        }
        setData({
          offDays: [...res.data.result],
          isFetching: false,
        });
        // return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeOneDay = async(id) => {
    await TimeService.removeOneDay(id);
    await refreshClicked()
  }
  useEffect(() => {
    loadData();
  }, [props.date]);

  const [isAddNewDateDialog, setIsAddNewDateDialog] = useState(false);
  const closeAddNewDateDialog = () => {
    setIsAddNewDateDialog(false);
  };

  const openAddNewDateDialog = () => {
    setIsAddNewDateDialog(true);
  };

  const dayClick = async(date) => {
    closeAddNewDateDialog()
    await TimeService.addOneDay(date);
    await refreshClicked()
  }

  const refreshClicked = () => {
    return loadData();
  };

  return (
    <React.Fragment>
      {data.isFetching && (
        <div style={{ width: "100%", paddingTop: "3px" }}>
          <LinearProgress color="primary" />
        </div>
      )}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item md={4}>
          <div style={{ textAlign: "left", paddingLeft: "10px" }}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <span style={{ paddingRight: "15px", color: "#555" }}>
                  <EventBusyIcon style={{ fontSize: "2.2rem" }} />
                </span>
              </Grid>
              <Grid item>
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    color: "#444",
                  }}
                >
                  STD Off Days
                </span>
              </Grid>
              <Grid item>
                <Tooltip title="Refresh" placement="right">
                  <IconButton
                    color="primary"
                    className={classes.refreshButton}
                    onClick={refreshClicked}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </div>
        </Grid>
        {data.isFetching}
        <Button color="primary" onClick={() => openAddNewDateDialog()}>
          {" "}
          Add{" "}
        </Button>
      </Grid>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid rows={data.offDays} columns={columns} autoPageSize />
      </div>
      {isAddNewDateDialog && (
        <Dialog
          maxWidth="lg"
          open={openAddNewDateDialog}
          onClose={closeAddNewDateDialog}
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
                <div
                  style={{
                    color: "#2f942e",
                    paddingBottom: "5px",
                    fontWeight: "800",
                  }}
                >
                  Add New Off Day
                </div>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                minHeight: "600px",
                maxHeight: "600px",
                minWidth: "1200px",
                maxWidth: "1200px",
              }}
            >
              <div style={{ width: "100%", paddingTop: "20px" }}>
                <Calendar dayClick={dayClick} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
}
