import API from "./api";

export default class TimeService {
  static getAllOffDays = () => {
    return API.get("/api/medex/offdays?service=clinic");
  };
  static removeOneDay = (id) => {
    return API.post("/api/medex/offdays/remove", { id: id });
  };
  static addOneDay = (payload) => {
    return API.post("/api/medex/offdays/add", { ...payload, service: 'clinic' });
  };
}
