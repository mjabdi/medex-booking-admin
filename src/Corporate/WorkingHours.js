import React, { useEffect } from "react";
import TimeService from "./services/TimeService";
import {
  Button,
  Typography,
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { IconButton } from "@material-ui/core";
import AvTimerIcon from "@material-ui/icons/AvTimer";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  refreshButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function BookingTable(props) {
  const classes = useStyles();

  const [data, setData] = React.useState({
    workingHours: {},
    isFetching: true,
  });
  const [form, setFormData] = React.useState({
    startingHourMonday: "",
    endingHourMonday: "",
    periodMonday: "",
    startingHourTuesday: "",
    endingHourTuesday: "",
    periodTuesday: "",
    startingHourWednesday: "",
    endingHourWednesday: "",
    periodWednesday: "",
    startingHourThursday: "",
    endingHourThursday: "",
    periodThursday: "",
    startingHourFriday: "",
    endingHourFriday: "",
    periodFriday: "",
    startingHourSaturday: "",
    endingHourSaturday: "",
    periodSaturday: "",
    startingHourSunday: "",
    endingHourSunday: "",
    periodSunday: "",
  });
  const loadData = async () => {
    var api = TimeService.getWorkingHours;
    setData({ workingHours: {}, isFetching: true });

    // console.log(props)

    return api()
      .then((res) => {
        // console.log(res)
        setData({
          workingHours: res.data.result,
          isFetching: false,
        });
        setFormData({ ...res.data.result });
        // return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    loadData();
  }, [props.date]);

  let times = [];
  for (let h = 6; h <= 24; h += 0.25) {
    const time = `${
      h < 13
        ? Math.floor(h).toLocaleString("en-UK", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        : Math.floor(h - 12).toLocaleString("en-UK", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
    }:${Math.floor((h % 1) * 60).toLocaleString("en-UK", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })} ${h < 12 ? "AM" : "PM"}`;
    times.push({ value: h, label: time });
  }
  const submit = async () => {
    try {
      await TimeService.addWorkingHours(form);
    } catch (err) {
      console.log(err);
    } finally {
      await refreshClicked();
    }
  };

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
                  <AvTimerIcon style={{ fontSize: "2.2rem" }} />
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
                  Corporate Working Hours
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
      </Grid>
      <Grid style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Monday:
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="starting-hour">Starting Hour</InputLabel>
            <Select
              labelId="starting-hour"
              id="starting-hour"
              label="Starting hour"
              value={form.startingHourMonday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, startingHourMonday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="ending-hour">Ending Hour</InputLabel>
            <Select
              labelId="ending-hour"
              id="ending-hour"
              label="ending hour"
              value={form.endingHourMonday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, endingHourMonday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="period">Period</InputLabel>
            <Select
              labelId="period"
              id="period"
              label="period"
              value={form.periodMonday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, periodMonday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0.25}>15 min</MenuItem>
              <MenuItem value={0.5}>30 min</MenuItem>
              <MenuItem value={0.75}>45 min</MenuItem>
              <MenuItem value={1}>60 min</MenuItem>
              <MenuItem value={1.25}>75 min</MenuItem>
              <MenuItem value={1.5}>90 min</MenuItem>
              <MenuItem value={1.75}>105 min</MenuItem>
              <MenuItem value={2}>120 min</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Tuesday:
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="starting-hour">Starting Hour</InputLabel>
            <Select
              labelId="starting-hour"
              id="starting-hour"
              label="Starting hour"
              value={form.startingHourTuesday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, startingHourTuesday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="ending-hour">Ending Hour</InputLabel>
            <Select
              labelId="ending-hour"
              id="ending-hour"
              label="ending hour"
              value={form.endingHourTuesday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, endingHourTuesday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="period">Period</InputLabel>
            <Select
              labelId="period"
              id="period"
              label="period"
              value={form.periodTuesday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, periodTuesday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0.25}>15 min</MenuItem>
              <MenuItem value={0.5}>30 min</MenuItem>
              <MenuItem value={0.75}>45 min</MenuItem>
              <MenuItem value={1}>60 min</MenuItem>
              <MenuItem value={1.25}>75 min</MenuItem>
              <MenuItem value={1.5}>90 min</MenuItem>
              <MenuItem value={1.75}>105 min</MenuItem>
              <MenuItem value={2}>120 min</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Wednesday:
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="starting-hour">Starting Hour</InputLabel>
            <Select
              labelId="starting-hour"
              id="starting-hour"
              label="Starting hour"
              value={form.startingHourWednesday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, startingHourWednesday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="ending-hour">Ending Hour</InputLabel>
            <Select
              labelId="ending-hour"
              id="ending-hour"
              label="ending hour"
              value={form.endingHourWednesday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, endingHourWednesday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="period">Period</InputLabel>
            <Select
              labelId="period"
              id="period"
              label="period"
              value={form.periodWednesday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, periodWednesday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0.25}>15 min</MenuItem>
              <MenuItem value={0.5}>30 min</MenuItem>
              <MenuItem value={0.75}>45 min</MenuItem>
              <MenuItem value={1}>60 min</MenuItem>
              <MenuItem value={1.25}>75 min</MenuItem>
              <MenuItem value={1.5}>90 min</MenuItem>
              <MenuItem value={1.75}>105 min</MenuItem>
              <MenuItem value={2}>120 min</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Thursday:
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="starting-hour">Starting Hour</InputLabel>
            <Select
              labelId="starting-hour"
              id="starting-hour"
              label="Starting hour"
              value={form.startingHourThursday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, startingHourThursday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="ending-hour">Ending Hour</InputLabel>
            <Select
              labelId="ending-hour"
              id="ending-hour"
              label="ending hour"
              value={form.endingHourThursday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, endingHourThursday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="period">Period</InputLabel>
            <Select
              labelId="period"
              id="period"
              label="period"
              value={form.periodThursday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, periodThursday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0.25}>15 min</MenuItem>
              <MenuItem value={0.5}>30 min</MenuItem>
              <MenuItem value={0.75}>45 min</MenuItem>
              <MenuItem value={1}>60 min</MenuItem>
              <MenuItem value={1.25}>75 min</MenuItem>
              <MenuItem value={1.5}>90 min</MenuItem>
              <MenuItem value={1.75}>105 min</MenuItem>
              <MenuItem value={2}>120 min</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Friday:
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="starting-hour">Starting Hour</InputLabel>
            <Select
              labelId="starting-hour"
              id="starting-hour"
              label="Starting hour"
              value={form.startingHourFriday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, startingHourFriday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="ending-hour">Ending Hour</InputLabel>
            <Select
              labelId="ending-hour"
              id="ending-hour"
              label="ending hour"
              value={form.endingHourFriday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, endingHourFriday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="period">Period</InputLabel>
            <Select
              labelId="period"
              id="period"
              label="period"
              value={form.periodFriday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, periodFriday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0.25}>15 min</MenuItem>
              <MenuItem value={0.5}>30 min</MenuItem>
              <MenuItem value={0.75}>45 min</MenuItem>
              <MenuItem value={1}>60 min</MenuItem>
              <MenuItem value={1.25}>75 min</MenuItem>
              <MenuItem value={1.5}>90 min</MenuItem>
              <MenuItem value={1.75}>105 min</MenuItem>
              <MenuItem value={2}>120 min</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Saturday:
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="starting-hour">Starting Hour</InputLabel>
            <Select
              labelId="starting-hour"
              id="starting-hour"
              label="Starting hour"
              value={form.startingHourSaturday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, startingHourSaturday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="ending-hour">Ending Hour</InputLabel>
            <Select
              labelId="ending-hour"
              id="ending-hour"
              label="ending hour"
              value={form.endingHourSaturday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, endingHourSaturday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="period">Period</InputLabel>
            <Select
              labelId="period"
              id="period"
              label="period"
              value={form.periodSaturday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, periodSaturday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0.25}>15 min</MenuItem>
              <MenuItem value={0.5}>30 min</MenuItem>
              <MenuItem value={0.75}>45 min</MenuItem>
              <MenuItem value={1}>60 min</MenuItem>
              <MenuItem value={1.25}>75 min</MenuItem>
              <MenuItem value={1.5}>90 min</MenuItem>
              <MenuItem value={1.75}>105 min</MenuItem>
              <MenuItem value={2}>120 min</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid style={{ marginBottom: "40px" }}>
        <Typography variant="h6" gutterBottom>
          Sunday:
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="starting-hour">Starting Hour</InputLabel>
            <Select
              labelId="starting-hour"
              id="starting-hour"
              label="Starting hour"
              value={form.startingHourSunday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, startingHourSunday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="ending-hour">Ending Hour</InputLabel>
            <Select
              labelId="ending-hour"
              id="ending-hour"
              label="ending hour"
              value={form.endingHourSunday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, endingHourSunday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {times.map((el) => {
                return <MenuItem value={el.value}>{el.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl variant="filled" style={{ minWidth: "200px" }}>
            <InputLabel id="period">Period</InputLabel>
            <Select
              labelId="period"
              id="period"
              label="period"
              value={form.periodSunday}
              onChange={(e, data) =>
                setFormData((other) => {
                  return { ...other, periodSunday: data.props.value };
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0.25}>15 min</MenuItem>
              <MenuItem value={0.5}>30 min</MenuItem>
              <MenuItem value={0.75}>45 min</MenuItem>
              <MenuItem value={1}>60 min</MenuItem>
              <MenuItem value={1.25}>75 min</MenuItem>
              <MenuItem value={1.5}>90 min</MenuItem>
              <MenuItem value={1.75}>105 min</MenuItem>
              <MenuItem value={2}>120 min</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
      <Grid>
        <Button variant="contained" color="primary" onClick={submit}>
          Save
        </Button>
      </Grid>
    </React.Fragment>
  );
}
