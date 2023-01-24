import API from './api';
import axiosRetry from 'axios-retry';

export default class BookService {

   static setClinicNotes = (bookingId, notes) =>
   {
      return API.post(`/api/blood/book/setclinicnotes`, {bookingId, notes});
   }


   static getAllCodes = () =>
   {
       return API.get(`/api/medex/invoice/getallbloodcodesadmin`)
   }

   
   static getBloodReportsByBookingId = (bookingId) =>
   {
      return API.get(`/api/blood/book/getbloodreportsbybookingid?id=${bookingId}`);
   }


   

   static getNewBloodResultsCount = () =>
   {
      return API.get(`/api/blood/book/getnewbloodresultscount`);
   }

   static getSentBloodReports = () =>
   {
      return API.get(`/api/blood/book/getsentbloodreports`);
   }


   static getArchivedBloodReports = () =>
   {
      return API.get(`/api/blood/book/getarchivedbloodreports`);
   }

   static getNewMatchedBloodReports = () =>
   {
      return API.get(`/api/blood/book/getnewmatchedbloodreports`);
   }

   static getArchivedMatchedBloodReports = () =>
   {
      return API.get(`/api/blood/book/getarchivedmatchedbloodreports`);
   }

   static getNewUnmatchedBloodReports = () =>
   {
      return API.get(`/api/blood/book/getnewunmatchedbloodreports`);
   }

   static getArchivedUnmatchedBloodReports = () =>
   {
      return API.get(`/api/blood/book/getarchivedunmatchedbloodreports`);
   }

   static sendBloodReportEmail = (bloodreportId, email, notes) =>
   {
      return API.post(`/api/blood/book/sendbloodreportemail?id=${bloodreportId}`, {email, notes});
   }

   static updateBloodReport = (bloodreportId, email, notes) =>
   {
      return API.post(`/api/blood/book/updatebloodreport?id=${bloodreportId}`, {email, notes});
   }


   static archiveBloodReport = (bloodreportId) =>
   {
      return API.post(`/api/blood/book/archivebloodreport?id=${bloodreportId}`);
   }

   static unArchiveBloodReport = (bloodreportId) =>
   {
      return API.post(`/api/blood/book/unarchivebloodreport?id=${bloodreportId}`);
   }




   static addNewBooking = (payload) =>
   {
      return API.post(`/api/blood/book/addnewbooking`, payload);
   }
   
   static sendRegFormEmail = (bookingId) =>
   {
      return API.post(`/api/blood/book/sendregformemail?id=${bookingId}`);
   }

   static sendForPrint = (bookingId) =>
   {
      return API.post(`/api/blood/book/sendforprint?id=${bookingId}`);
   }

   static changeDepositBooking = (bookingId, deposit) => {
      return API.post(`/api/blood/book/changedepositbooking?id=${bookingId}&deposit=${deposit}`);
   }

   static manualRefundBooking = (bookingId) =>
   {
      return API.post(`/api/blood/payment/manualrefundpayment`, {bookingId: bookingId});
   }



   static payBooking = (bookingId,price, paymentMethod, corporate) =>
   {
      return API.post(`/api/blood/book/paybooking?id=${bookingId}&paymentmethod=${paymentMethod}&corporate=${corporate}&price=${price}`);
   }

   static unPayBooking = (bookingId) =>
   {
      return API.post(`/api/blood/book/unpaybooking?id=${bookingId}`);
   }

   static getShouldRefundsCount = () =>
   {
      return API.get(`/api/blood/book/getshouldrefundscount`);
   }  

   static refundBooking = (bookingId) =>
   {
      return API.post(`/api/blood/payment/refundpayment`, {bookingId: bookingId});
   }

   static getBookingsStatsByDateStr = (dateStr) =>
   {
      return API.get(`/api/blood/book/getbookingsstatsbydatestr?date=${dateStr}`);
   }

   static getBookingsCountByDateStr = (dateStr) =>
   {
      return API.get(`/api/blood/book/getbookingscountbydatestr?date=${dateStr}`);
   }

   static getAllBookingsCountAll = () =>
   {
      return API.get(`/api/blood/book/getallbookingscountall`);
   }

   static getBookingsCountByDateStrandTime = (dateStr, time, source) =>
   {
      return API.get(`/api/blood/book/getbookingscountbydatestrandtime?date=${dateStr}&time=${time}`, {cancelToken: source.token});
   }

   static getBookingsByDateStrandTime = (dateStr, time) =>
   {
      return API.get(`/api/blood/book/getbookingsbydatestrandtime?date=${dateStr}&time=${time}`);
   }


   static getAllBookingsCountByDateStr = (dateStr) =>
   {
      return API.get(`/api/blood/book/getallbookingscountbydatestr?date=${dateStr}`);
   }

   static getAllBookingsCountByDateStrandTime = (dateStr, time, source) =>
   {
      return API.get(`/api/blood/book/getallbookingscountbydatestrandtime?date=${dateStr}&time=${time}`, {cancelToken: source.token});
   }

   static getAllBookingsByDateStrandTime = (dateStr, time) =>
   {
      return API.get(`/api/blood/book/getallbookingsbydatestrandtime?date=${dateStr}&time=${time}`);
   }

   static changeBackToBookingMade = (id) =>
   {
      return API.post(`/api/blood/book/changebacktobookingmade?id=${id}`);
   }

   static changeToPatientAttended = (id) =>
   {
      return API.post(`/api/blood/book/changetopatientattended?id=${id}`);
   }

   static changeToCompleted = (id) =>
   {
      return API.post(`/api/blood/book/changetocompleted?id=${id}`);
   }


   static updateBooking = (payload) =>
   {
      return API.post(`/api/blood/book/updatebookappointment`, payload);
   } 

   static updateBookingTime = (payload) =>
   {
      return API.post(`/api/blood/book/updatebookappointmenttime`, payload);
   } 

   static deleteBooking = (id) =>
   {
      return API.post(`/api/blood/book/deletebookappointment?id=${id}`);
   } 

   static unDeleteBooking = (id) =>
   {
      return API.post(`/api/blood/book/undeletebookappointment?id=${id}`);
   } 
   
    static getBookingsByRef = (ref) =>
    {
       return API.get(`/api/blood/book/getbookingsbyref?ref=${ref}`);
    }

    static getBookingById = (id) =>
    {
       return API.get(`/api/blood/book/getbookingbyid?id=${id}`);
    }

    static getAllBookings = (limit) =>
    {
      if (!limit) limit = 25 
      return API.get(`/api/blood/book/getallbookings?limit=${limit}`);
    }

    static getDeletedBookings= (limit) =>
    {
      if (!limit) limit = 25 
       return API.get(`/api/blood/book/getdeletedbookings?limit=${limit}`);
    }

    static getTodayBookings= () =>
    {
       return API.get(`/api/blood/book/gettodaybookings`);
    }

    static getLiveBookings= () =>
    {
       return API.get(`/api/blood/book/getlivebookings`);
    }

    static getCompletedBookings= (limit) =>
    {
       return API.get(`/api/blood/book/getcompletedbookings?limit=${limit}`);
    }

    static getOldBookings= (limit) =>
    {
      if (!limit) limit = 25 
       return API.get(`/api/blood/book/getoldbookings?limit=${limit}`);
    }

    static getFutureBookings= (limit) =>
    {
      if (!limit) limit = 25 
       return API.get(`/api/blood/book/getfuturebookings?limit=${limit}`);
    }

    static getRecentBookings= () =>
    {
       return API.get(`/api/blood/book/getrecentbookings`);
    }

    static getRecentBookingsAll= (limit) =>
    {
      if (!limit) limit = 25 
       return API.get(`/api/blood/book/getrecentbookingsall?limit=${limit}`);
    }
}