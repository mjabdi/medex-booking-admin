import API from './api';

export default class PDFService {


    static downloadBloodRegForm = (id) =>
    {
       return API.get(`/api/pdf/downloadbloodregform?id=${id}`, {
        responseType: 'arraybuffer',
        id: id,
        headers: {
            Accept: 'application/pdf',
        }
        });
    }

}