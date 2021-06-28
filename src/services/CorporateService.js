import API from './api';

export default class CorporateService{
  
    static getCorporates = (payload) =>
    {
        return  API.get('/api/medex/invoice/getcorporates')
    }

    static updateCorporates = (corporatesStr) =>
    {
        return  API.post('/api/medex/invoice/updatecorporates', {corporates: corporatesStr})
    }

}
