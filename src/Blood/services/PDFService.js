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

    static downloadPdfLabReport = (id) =>
    {
       return API.get(`/api/pdf/downloadpdflabreport?id=${id}`, {
        responseType: 'arraybuffer',
        headers: {
            Accept: 'application/pdf',
        }
        });
    }


}