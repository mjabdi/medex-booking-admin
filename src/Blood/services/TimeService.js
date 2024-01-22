import API from "./api";

export default class TimeService {
  static getAllOffDays = () => {
    return API.get("/api/medex/offdays?service=blood");
  };
  static removeOneDay = (id) => {
    return API.post("/api/medex/offdays/remove", { id: id });
  };
  static addOneDay = (date) => {
    return API.post("/api/medex/offdays/add", { date: date, service: 'blood' });
  };
}
