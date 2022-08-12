import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { Backdrop, Button, CircularProgress, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, OutlinedInput, Select, Switch, TextField, Tooltip } from "@material-ui/core";
import GlobalState from "./../GlobalState";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import BloodIcon from '@material-ui/icons/Opacity';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert, Autocomplete } from "@material-ui/lab";
import InvoiceService from "../services/InvoiceService";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import AddCircleIcon from '@material-ui/icons/AddCircle';


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

  formControl: {
    marginBottom: "20px",
    minWidth: "200px"
  },

  submit: {
    color: "#f5f5f5",
    height: "50px",
    marginTop: "2px",
    width: "100px"
  },

  codeTitle: {
    fontSize:"1.2rem",
    fontWeight: "500",
    color: theme.palette.primary.main,
    padding: "10px"
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 5,
    color: "#fff",
  },

}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default function InvoiceCodes() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [loading, setLoading] = React.useState(false)

  const [password, setPassword] = React.useState('')
  const [showContent, setShowContent] = React.useState(false)
  const adminPassword = "steve@2021"

  const [showPassword, setShowPassword] = React.useState(false);

  const [isChanged, setIsChanged] = React.useState(false)

  const [changesSaved, setChangesSaved] = useState(false)
  const [newChangesSaved, setnewChangesSaved] = useState(false)


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordChanged = (event) => {
    setPassword(event.target.value);
    setError(null);
  };

  const [error, setError] = React.useState(null);


  const [code, setCode] = React.useState(null);
  const [allCodes, setAllCodes] = React.useState([]);

  const [newCode, setnewCode] = React.useState(null);
  const [newDescription, setnewDescription] = React.useState(null);
  const [newPrice, setNewPrice] = React.useState(null);

  const [newCodeError, setnewCodeError] = React.useState(false);
  const [newDescriptionError, setnewDescriptionError] = React.useState(false);
  const [newPriceError, setNewPriceError] = React.useState(false);

  const [showNewItem, setNewShowItem] = React.useState(false);




  const fetchAllCodes = async () => {
    try {
      const res = await InvoiceService.getAllCodes();
      setAllCodes(res.data.result);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        await fetchAllCodes();

        setLoading(false)

      } catch (err) {
        setLoading(false)
        console.error(err)
      }

    }
    if (!allCodes || allCodes.length === 0) {
      loadData();
    }

  }, [])

  const signIn = () => {
    if (password === adminPassword) {
      setShowContent(true)
    } else {
      setShowContent(false)
      setError("Invalid Password!")
    }
  }

  const codeChanged = (newCode) => {
    if (newCode) {
      setDescription(newCode.description)
      setPrice(newCode.price)
      setHidden(newCode.hidden ? true : false)
      setDescriptionError(false)
      setPriceError(false)
      setTimeout(() => {
        setIsChanged(false)
      }, 200);
    }
  }

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState(false);

  const [hidden, setHidden] = useState(false);

  const [saving, setSaving] = useState(false)


  const priceChanged = (event) => {
    if (price !== event.target.value)
    {
      setIsChanged(true)
    }
    setPrice(event.target.value);
    setPriceError(false);
  };

  const descriptionChanged = (event) => {
    if (description !== event.target.value)
    {
      setIsChanged(true)
    }
    setDescription(event.target.value);
    setDescriptionError(false);
  };

  const hiddenChanged = (event) =>
  {
    if (hidden !== event.target.checked)
    {
      setIsChanged(true)
    }
    setHidden(event.target.checked)
  }


  const newPriceChanged = (event) => {
    setNewPrice(event.target.value);

    if (event.target.value)
    {
      setNewPriceError(false);
    }
  };

  const newCodeChanged = (event) => {
    setnewCode(event.target.value);

    if (event.target.value)
    {
      setnewCodeError(false);
    }
  };

  const newDescriptionChanged = (event) => {

    setnewDescription(event.target.value);

    if (event.target.value)
    {
      setnewDescriptionError(false);
    }
  };

  const newSaveChanges = async () => {
    let error = false
    if (!newPrice)
    {
      error = true
      setNewPriceError(true)
    }
    if (!newDescription)
    {
      error = true
      setnewDescriptionError(true)
    }
    if (!newCode)
    {
      error = true
      setnewCodeError(true)
    }

    if (error)
    {
      return
    }

    try{

      setSaving(true)

      await InvoiceService.addCode(newCode, newDescription, newPrice)
      fetchAllCodes()

      setSaving(false)
      setNewPrice(null)
      setnewDescription(null)
      setnewCode(null)
      setnewChangesSaved(true)
  
      setTimeout(() => {
        setNewShowItem(false)
        setnewChangesSaved(false)
      }, 3000);

    }catch(err)
    {
      console.error(err)
      setSaving(false)
    }




  }


  const saveChanges = async () => {
    if (!validateData())
    {
      return 
    }

    try{
      setSaving(true)
      const res = await InvoiceService.updateCode(code._id, {description, price, hidden, isBloodTable: code.isBloodTable})
      if (res && res.data && res.data.status === "OK")
      {
        const newAllCodes = [...allCodes]
        const index = newAllCodes.findIndex((e) => e._id === code._id)
        newAllCodes[index].description = description
        newAllCodes[index].price = price
        newAllCodes[index].hidden = hidden
        setAllCodes(newAllCodes)
        setCode(null)
        setCode(newAllCodes[index])
        setChangesSaved(true)
        setTimeout(() => {
          setChangesSaved(false)
        }, 3000);

      }

      setSaving(false)
    }catch(err)
    {
      setSaving(false)
      console.error(err)
    }


  }

  const validateData = () =>
  {
    let error = false;
    if (!description || description.trim().length === 0){
      error = true
      setDescriptionError(true)
    }

    if (!price || price === 0)
    {
      error = true
      setPriceError(true)
    }

    return !error;
  }

  return (
    <React.Fragment>

      <div style={{ textAlign: "left", padding: "20px" }}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <span style={{ paddingRight: "15px", color: "#555" }}>
              <FormatListBulletedIcon style={{ fontSize: "2.2rem" }} />;
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
              {"System Codes"}
            </span>
          </Grid>
        </Grid>
      </div>

      {loading && showContent && (
        <div style={{ minHeight: "80vh" }}>
          <LinearProgress color="secondary" />
        </div>
      )}

      {!showContent && (
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={12}>
            <Alert severity="warning" style={{ fontSize: "1rem", fontWeight: "400" }}>Alert - In order to proceed, please enter your password.</Alert>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl
              fullWidth
              required

              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  signIn();
                }
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                {" "}
                Password{" "}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                placeholder="Please Enter Your Password"

                value={password}
                onChange={passwordChanged}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabindex="-1"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={100}
              />
            </FormControl>

          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={signIn}
              className={classes.submit}
            >
              Enter
            </Button>
          </Grid>
        </Grid>
      )}

      {!loading && showContent && (
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              id="code-auto-complete"
              value={code}
              onChange={(event, newValue) => {
                setCode(newValue);
                codeChanged(newValue)
              }}
              options={allCodes}
              getOptionLabel={(option) =>
                `.${option.code} -- ${option.description
                } -- ${parseFloat(
                  option.price
                ).toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}`
              }
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="System Codes"
                  helperText="Standard codes already defined in the system"
                />
              )}
            />
          </Grid>

          {!code && !showNewItem && (
            <div style={{width:"100%", display:"flex", justifyContent: "flex-end", margin:"0px 20px"}}>
              <Tooltip title="Add New Item">
                <IconButton aria-label="add" size="large" onClick={() => {setNewShowItem(!showNewItem)}}>
                  <AddCircleIcon color="primary" fontSize="inherit"/>
                </IconButton>
              </Tooltip>
            </div>
          )}

          {!code && showNewItem && (
            <Fragment>
            <Grid item xs={12} style={{ width: "100%", marginTop: "20px" }}>
              <Paper elevation={4} style={{position:"relative"}}>
                <Backdrop className={classes.backdrop} open={saving}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Grid container direction="row" spacing={2} style={{padding:"20px"}}>

                <Grid item xs={2}>
                    <TextField
                      error={newCodeError}
                      value={newCode}
                      onChange={newCodeChanged}
                      fullWidth
                      label="Code"
                      name="code"
                      id="code-id"
                    />
                  </Grid>

                  <Grid item xs={8}>
                    <TextField
                      error={newDescriptionError}
                      value={newDescription}
                      onChange={newDescriptionChanged}
                      fullWidth
                      label="Description (Custom)"
                      name="desc"
                      helperText="You can enter any description you want to be placed on the invoice"
                      id="desc-id"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      error={newPriceError}
                      value={newPrice}
                      onChange={newPriceChanged}
                      fullWidth
                      label="Price"
                      name="price"
                      id="price-id"
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                        startAdornment: (
                          <InputAdornment position="start">
                            £
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {newChangesSaved && (
                    <Grid item xs={12}>
                      <Alert severity="success" style={{ fontSize: "1rem", fontWeight: "400" }}>Success - New Code Saved.</Alert>
                    </Grid>
                  )}

                  <Grid item xs={6} md={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={newSaveChanges}
                      style={{height:"40px"}}
                      // disabled={!isChanged}
                    >
                      Add New Code
                    </Button>
                  </Grid>

                </Grid>
              </Paper>
            </Grid>
          </Fragment>



          )}

          {code && (
            <Fragment>
              <Grid item xs={12} style={{ width: "100%", marginTop: "20px" }}>
                <Paper elevation={4} style={{position:"relative"}}>
                  <Backdrop className={classes.backdrop} open={saving}>
                    <CircularProgress color="inherit" />
                  </Backdrop>


                  {code && code.isBloodTable && (
                    <div style={{ position: "absolute", right: "10px", top: "10px" }}>
                      <Tooltip title="Blood Test">
                        <BloodIcon style={{ color: "red", fontSize: "1.5rem" }} />
                      </Tooltip>
                    </div>
                  )}


                  <div className={classes.codeTitle}>
                    <span style={{fontSize:"0.9rem", color:"#999"}}>CODE: </span> {code.code}
                  </div>

                  <Grid container direction="row" spacing={2} style={{padding:"20px"}}>
                    <Grid item xs={8}>
                      <TextField
                        error={descriptionError}
                        value={description}
                        onChange={descriptionChanged}
                        fullWidth
                        label="Description (Custom)"
                        name="desc"
                        helperText="You can enter any description you want to be placed on the invoice"
                        id="desc-id"
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <TextField
                        error={priceError}
                        value={price}
                        onChange={priceChanged}
                        fullWidth
                        label="Price"
                        name="price"
                        id="price-id"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                          startAdornment: (
                            <InputAdornment position="start">
                              £
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    {code.isBloodTable && (
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={hidden}
                              onChange={hiddenChanged}
                              color="secondary"
                              name="hide-canceled"
                              inputProps={{ "aria-label": "secondary checkbox" }}
                            />
                          }
                          label="Hide From Online Patients"
                        />
                      </Grid>
                    )}

                    {/* <Grid item xs={6} md={8}>
                    </Grid> */}

                    {changesSaved && (
                      <Grid item xs={12}>
                        <Alert severity="success" style={{ fontSize: "1rem", fontWeight: "400" }}>Success - Changes Saved Successfully.</Alert>
                      </Grid>
                    )}


                    <Grid item xs={6} md={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={saveChanges}
                        style={{height:"40px"}}
                        disabled={!isChanged}
                      >
                        Save Changes
                      </Button>
                    </Grid>





                  </Grid>
                </Paper>
              </Grid>
            </Fragment>

          )}

          <Grid item xs={12}>
          </Grid>
        </Grid>
      )}

    </React.Fragment>
  );
}
