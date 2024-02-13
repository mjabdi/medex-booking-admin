import API from "./api";

export default class PatientService {
  static searchAllPatients = (filter, birthDate) => {
    return API.post(`/api/admin/patients/search`, { filter: filter, birthDate: birthDate });
  };
}
