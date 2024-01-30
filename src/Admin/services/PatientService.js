import API from "./api";

export default class PatientService {
  static searchAllPatients = (filter) => {
    return API.post(`/api/admin/patients/search`, { filter: filter });
  };
}
