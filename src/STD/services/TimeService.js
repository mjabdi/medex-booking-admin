import API from "./api";

export default class TimeService {
  static getAllOffDays = () => {
    return API.get("/api/medex/offdays?service=std");
  };
  static removeOneDay = (id) => {
    return API.post("/api/medex/offdays/remove", { id: id });
  };
  static addOneDay = (date) => {
    return API.post("/api/medex/offdays/add", {
      date: date,
      service: "std",
    });
  };
  static getWorkingHours = () => {
    return API.get("/api/medex/workinghours?service=std");
  };
  static removeWorkingHours = (id) => {
    return API.post("/api/medex/workinghours/remove", { id: id });
  };
  static addWorkingHours = (payload) => {
    return API.post("/api/medex/workinghours/add", {
      ...payload,
      service: "std",
    });
  };
}
