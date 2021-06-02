import API from './api';

export default class PDFService {


    static downloadScreeningRegForm = (id) =>
    {
       return API.get(`/api/pdf/downloadscreeningregform?id=${id}`, {
        responseType: 'arraybuffer',
        id: id,
        headers: {
            Accept: 'application/pdf',
        }
        });
    }



}