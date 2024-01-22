
import API from './api';

export default class TimeService {
  static getFirstAvailableDate = () => {
    return API.get("/api/time/getfirstavaiabledate");
  };

  // static dayIsBooked =  (date) =>
  // {
  //    /// check if this date is booked or not
  //    return new Promise( (resolve, reject) =>
  //    {
  //         setTimeout(() => {
  //             resolve(false);
  //         }, 1000);
  //    });
  // }

  static getFullyBookedDates = () => {
    return API.get("/api/time/getfullybookeddays");
  };

  static getTimeSlots = (date) => {
    return API.get(`/api/time/gettimeslots?date=${date}`);
  };
  static getAllOffDays = () => {
    return API.get("/api/medex/offdays?service=gynae");
  };
  static removeOneDay = (id) => {
    return API.post("/api/medex/offdays/remove", { id: id });
  };
  static addOneDay = (date) => {
    return API.post("/api/medex/offdays/add", {
      date: date,
      service: "gynae",
    });
  };
}