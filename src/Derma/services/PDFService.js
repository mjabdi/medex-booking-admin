import API from './api';

export default class PDFService {


    static downloadDermaRegForm = (id) =>
    {
       return API.get(`/api/pdf/downloaddermaregform?id=${id}`, {
        responseType: 'arraybuffer',
        id: id,
        headers: {
            Accept: 'application/pdf',
        }
        });
    }



}