import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import { IconButton, Tooltip } from '@material-ui/core';
import GlobalState from './../GlobalState';

import dateformat from 'dateformat';
import BookService from './services/BookService';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip as TooltipCharts, Legend, ResponsiveContainer } from 'recharts';
import { CalendarColors } from '../Admin/calendar-admin/colors';

const useStyles = makeStyles((theme) => ({
  Title: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
    fontWeight: "500",
    width: "100%",
    textAlign: "center"
  },

  Arrow: {
    fontSize: "2rem",
    color: theme.palette.primary.main,
    fontWeight: "500",
  },

  ArrowRight: {
    fontSize: "2rem",
    color: theme.palette.primary.main,
    fontWeight: "500",
  },

  TotalAmount: {
    fontSize: "1.5rem",
    backgroundColor: theme.palette.primary.dark,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
    padding: "10px",
    color: "#fff",
    borderRadius: "8px",
    letterSpacing: "5px"
  },

  content: {
    fontSize: "1rem",
    color: "#777",
    fontWeight: "500",
  },

  primaryColor: {
    color: theme.palette.primary.main,
    fontWeight: "500",
  }


}));

export default function MonthlyChart(props) {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [month, setMonth] = React.useState(props.defaultMonth || dateformat(new Date(), "mmmm-yyyy"));
  const [data, setData] = React.useState([])

  const [chartData, setChartData] = React.useState([])

  const [activeIndex, setActiveIndex] = React.useState(0)



  useEffect(() => {
    loadData()
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      loadChart()
    }
  }, [month, data]);

  const loadChart = () => {
    const currentData = data[getMonthIndex()] ? data[getMonthIndex()].data : {pcr:0,gynae:0,gp:0,std:0,blood:0,screening:0,derma:0}
    let _chartData = []
    _chartData.push({
      name: "PCR",
      Income: currentData.pcr
    })
    _chartData.push({
      name: "GYNAE",
      Income: currentData.gynae
    })
    _chartData.push({
      name: "GP",
      Income: currentData.gp
    })
    _chartData.push({
      name: "STD",
      Income: currentData.std
    })
    _chartData.push({
      name: "BLOOD",
      Income: currentData.blood
    })
    _chartData.push({
      name: "SCREENING",
      Income: currentData.screening
    })
    _chartData.push({
      name: "DERMA",
      Income: currentData.derma
    })

    setChartData(_chartData)

  }

  const loadData = async () => {
    try {
      const res = await BookService.getInvoiceReports()
      setData(JSON.parse(res.data.result))

    } catch (err) {
      console.error(err)
    }
  }

  const goNext = () => {
    const monthIndex = data.findIndex(e => e.month === month);
    if (monthIndex < data.length - 1) {
      setMonth(data[monthIndex + 1].month)
    }
  }

  const goPrevious = () => {
    const monthIndex = data.findIndex(e => e.month === month);
    if (monthIndex > 0) {
      setMonth(data[monthIndex - 1].month)
    }
  }

  const getMonthIndex = () => {
    return data.findIndex(e => e.month === month);
  }

  const barClicked = (_data, _index) => {
    setActiveIndex(_index)
  }

  const getColor = (index) => {
    switch (index) {
      case 0:
        return CalendarColors.PCR_COLOR;
      case 1:
        return CalendarColors.GYNAE_COLOR;
      case 2:
        return CalendarColors.GP_COLOR;
      case 3:
        return CalendarColors.STD_COLOR;
      case 4:
        return CalendarColors.BLOOD_COLOR;
      case 5:
        return CalendarColors.SCREENING_COLOR;
      case 6:
        return CalendarColors.DERMA_COLOR;

      default:
        return "#777";
    }
  }

  return (
    <React.Fragment>
      {data && data.length > 0 && chartData && chartData.length > 0 && (
        <>
          <Grid container spacing={2} justify="center" alignItems="center" style={{ width: "100%" }}>
            <Grid item xs={2}>
              <Tooltip title="Previous Month">
                <IconButton onClick={goPrevious} disabled={getMonthIndex() === 0}>
                  <ArrowBackIosIcon className={classes.Arrow} style={getMonthIndex() === 0 ? { color: "#ddd" } : {}} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={8}>
              <div className={classes.Title}>{month.replace("-", " ")}</div>
            </Grid>
            <Grid item xs={2}>
              <div style={{width:"100%", display:"flex", justifyContent:"flex-end"}}>
                <Tooltip title="Next Month">
                  <IconButton onClick={goNext} disabled={getMonthIndex() === data.length - 1}>
                    <ArrowForwardIosIcon className={classes.ArrowRight} style={getMonthIndex() === data.length - 1 ? { color: "#ddd" } : {}} />
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
          </Grid>


          <div className={classes.TotalAmount}>
            <Grid container spacing={1} justify="center" alignItems="center" style={{ width: "100%" }}>
              <Grid item xs={12}>
                <div style={{fontSize:"0.95rem", letterSpacing: "1px", color:"#f1f1f1"}}>
                  Total Income:
                </div>
              </Grid>
              <Grid item xs={12}>

                {data[getMonthIndex()] ? `${parseFloat(
                  data[getMonthIndex()].data.total
                ).toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}` : '£0.00' }
              </Grid>
            </Grid>
          </div>

          <div style={{ marginTop: "30px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={900} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <TooltipCharts />
              {/* <Legend /> */}
              <Bar dataKey="Income" onClick={barClicked}>
                {chartData.map((entry, index) => (
                  <Cell cursor="pointer" fill={getColor(index)} key={`cell-${index}`} />
                ))}
              </Bar>
            </BarChart>
            </ResponsiveContainer>
          </div>
          <p className={classes.content}>{`Income of "${chartData[activeIndex].name}":`} <span className={classes.primaryColor}> {`${parseFloat(chartData[activeIndex].Income).toLocaleString("en-GB", { style: "currency", currency: "GBP", })}`}</span> </p>
          <span style={{color:"#777"}}>* Click on each bar to view the details.</span>

        </>
      )}

    </React.Fragment>
  );
}