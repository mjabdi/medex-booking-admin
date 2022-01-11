import API from './api';

export default class PDFService {


    static downloadCorporateRegForm = (id) =>
    {
       return API.get(`/api/pdf/downloadcorporateregform?id=${id}`, {
        responseType: 'arraybuffer',
        id: id,
        headers: {
            Accept: 'application/pdf',
        }
        });
    }

}