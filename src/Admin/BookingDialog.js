import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PCRBookingDialog from "./../PCR/BookingDialog";
import GPBookingDialog from "./../GP/BookingDialog";
import GynaeBookingDialog from "./../Gynae/BookingDialog";
import STDBookingDialog from "./../STD/BookingDialog";
import BloodBookingDialog from "./../Blood/BookingDialog";
import DermaBookingDialog from "./../Derma/BookingDialog";
import ScreeningBookingDialog from "./../Screening/BookingDialog";
import CorporateBookingDialog from "./../Corporate/BookingDialog";


const useStyles = makeStyles((theme) => ({}));

export default function BookingDialog(props) {
  const classes = useStyles();

  if (props.booking) {
    switch (props.booking.clinic) {
      case "pcr":
        return (
          <PCRBookingDialog
            booking={props.booking}
            open={props.open}
            onClose={props.onClose}
          />
        );
      case "gp":
        return (
          <GPBookingDialog
            booking={props.booking}
            open={props.open}
            onClose={props.onClose}
          />
        );

      case "gynae":
        return (
          <GynaeBookingDialog
            booking={props.booking}
            open={props.open}
            onClose={props.onClose}
          />
        );

      case "std":
        return (
          <STDBookingDialog
            booking={props.booking}
            open={props.open}
            onClose={props.onClose}
          />
        );

        case "blood":
          return (
            <BloodBookingDialog
              booking={props.booking}
              open={props.open}
              onClose={props.onClose}
            />
          );
          case "derma":
          return (
            <DermaBookingDialog
              booking={props.booking}
              open={props.open}
              onClose={props.onClose}
            />
          );
          case "screening":
          case "visa":  
          return (
            <ScreeningBookingDialog
              booking={props.booking}
              open={props.open}
              onClose={props.onClose}
            />
          );

          case "corporate":
            return (
              <CorporateBookingDialog
                booking={props.booking}
                open={props.open}
                onClose={props.onClose}
              />
            );
  


      default:
        return null;
    }
  } else {
    return null;
  }
}
