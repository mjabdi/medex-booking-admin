import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CorporateService from '../services/CorporateService';

export default function CorporatesList() {

    const [corporates, setCorporates] = React.useState("")
    const [saving, setSaving] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
    const [savingDone, setSavingDone] = React.useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const res = await CorporateService.getCorporates()
            if (res.data.status === "OK") {
                setCorporates(res.data.result)
                setLoaded(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const corporatesChanged = (event) => {
        setCorporates(event.target.value)
    }

    const saveClicked = async () => {
        try {
            setSaving(true)

            await CorporateService.updateCorporates(corporates)

            setSaving(false)
            setSavingDone(true)
        } catch (err) {
            console.error(err)
            setSaving(false)
        }
    }


    return (
        <React.Fragment>

            {loaded && (


                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Alert severity="info" style={{ fontSize: "1rem" }}>
                            Please enter each corporate in a new line.
                        </Alert>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            disabled={saving}
                            value={corporates}
                            onChange={corporatesChanged}
                            multiline
                            rows={20}
                            label="Corporates List"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                style: {
                                    lineHeight: "1.8rem"
                                },
                            }}
                        ></TextField>


                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button disabled={saving} variant="contained" color="primary" onClick={saveClicked}>
                                    Save Changes
                                </Button>
                            </Grid>
                            {saving && (
                                <Grid item>
                                    <div style={{ width: "100%", paddingTop: "0px" }}>
                                        <CircularProgress color="primary" />
                                    </div>
                                </Grid>
                            )}

                            {savingDone && !saving && (
                                <Grid item xs={12}>
                                    <div>
                                        <Alert severity="success" style={{ fontSize: "1rem", fontWeight: "500" }}>
                                            Success! - Your changes have been saved successfully.
                                        </Alert>
                                    </div>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>

            )}
        </React.Fragment>
    );
}

