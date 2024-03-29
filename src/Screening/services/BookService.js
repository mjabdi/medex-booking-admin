import API from './api';
import axiosRetry from 'axios-retry';

export default class BookService {
  static sendReviewSMS = (bookingId, message) => {
    return API.post(`/api/screening/book/sendreviewsms`, {
      id: bookingId,
      message,
    });
  };

  static downloadPDFReport = (bookingId, reportData) => {
    return API.post(
      `/api/screening/book/downloadpdfreport?id=${bookingId}`,
      { reportData: reportData },
      {
        responseType: "arraybuffer",
        id: bookingId,
        headers: {
          Accept: "application/pdf",
        },
      }
    );
  };

  static getReportData = (bookingId) => {
    return API.get(`/api/screening/book/getreportdata?id=${bookingId}`);
  };

  static setReportData = (bookingId, reportData) => {
    return API.post(`/api/screening/book/setreportdata`, {
      bookingId,
      reportData,
    });
  };

  static setClinicNotes = (bookingId, notes) => {
    return API.post(`/api/screening/book/setclinicnotes`, { bookingId, notes });
  };

  static getBloodReportsByBookingId = (bookingId) => {
    return API.get(
      `/api/blood/book/getbloodreportsbybookingid?id=${bookingId}`
    );
  };

  static changeDepositBooking = (bookingId, deposit) => {
    return API.post(
      `/api/screening/book/changedepositbooking?id=${bookingId}&deposit=${deposit}`
    );
  };

  static manualRefundBooking = (bookingId) => {
    return API.post(`/api/screening/payment/manualrefundpayment`, {
      bookingId: bookingId,
    });
  };

  static addNewBooking = (payload) => {
    return API.post(`/api/screening/book/addnewbooking`, payload);
  };

  static sendForPrint = (bookingId) => {
    return API.post(`/api/screening/book/sendforprint?id=${bookingId}`);
  };

  static sendRegFormEmail = (bookingId) => {
    return API.post(`/api/screening/book/sendregformemail?id=${bookingId}`);
  };
  static payBooking = (bookingId, price, paymentMethod, corporate) => {
    return API.post(
      `/api/screening/book/paybooking?id=${bookingId}&paymentmethod=${paymentMethod}&corporate=${corporate}&price=${price}`
    );
  };

  static unPayBooking = (bookingId) => {
    return API.post(`/api/screening/book/unpaybooking?id=${bookingId}`);
  };

  static getShouldRefundsCount = () => {
    return API.get(`/api/screening/book/getshouldrefundscount?`);
  };

  static refundBooking = (bookingId) => {
    return API.post(`/api/screening/payment/refundpayment`, {
      bookingId: bookingId,
    });
  };

  static getBookingsStatsByDateStr = (dateStr) => {
    return API.get(
      `/api/screening/book/getbookingsstatsbydatestr?date=${dateStr}`
    );
  };

  static getBookingsCountByDateStr = (dateStr) => {
    return API.get(
      `/api/screening/book/getbookingscountbydatestr?date=${dateStr}`
    );
  };

  static getAllBookingsCountAll = () => {
    return API.get(`/api/screening/book/getallbookingscountall`);
  };

  static getBookingsCountByDateStrandTime = (dateStr, time, source) => {
    return API.get(
      `/api/screening/book/getbookingscountbydatestrandtime?date=${dateStr}&time=${time}`,
      { cancelToken: source.token }
    );
  };

  static getBookingsByDateStrandTime = (dateStr, time) => {
    return API.get(
      `/api/screening/book/getbookingsbydatestrandtime?date=${dateStr}&time=${time}`
    );
  };

  static getAllBookingsCountByDateStr = (dateStr) => {
    return API.get(
      `/api/screening/book/getallbookingscountbydatestr?date=${dateStr}`
    );
  };

  static getAllBookingsCountByDateStrandTime = (dateStr, time, source) => {
    return API.get(
      `/api/screening/book/getallbookingscountbydatestrandtime?date=${dateStr}&time=${time}`,
      { cancelToken: source.token }
    );
  };

  static getAllBookingsByDateStrandTime = (dateStr, time) => {
    return API.get(
      `/api/screening/book/getallbookingsbydatestrandtime?date=${dateStr}&time=${time}`
    );
  };

  static changeBackToBookingMade = (id) => {
    return API.post(`/api/screening/book/changebacktobookingmade?id=${id}`);
  };

  static changeToCompleted = (id) => {
    return API.post(`/api/screening/book/changetocompleted?id=${id}`);
  };

  static changeToPatientAttended = (id, payload) => {
    return API.post(
      `/api/screening/book/changetopatientattended?id=${id}`,
      payload
    );
  };

  static updateBooking = (payload) => {
    return API.post(`/api/screening/book/updatebookappointment`, payload);
  };

  static updateBookingTime = (payload) => {
    return API.post(`/api/screening/book/updatebookappointmenttime`, payload);
  };

  static deleteBooking = (id) => {
    return API.post(`/api/screening/book/deletebookappointment?id=${id}`);
  };

  static unDeleteBooking = (id) => {
    return API.post(`/api/screening/book/undeletebookappointment?id=${id}`);
  };

  static moveTBCFolder = (id) => {
    return API.post(`/api/screening/book/movetbcfolder?id=${id}`);
  };

  static undoMoveTBCFolder = (id) => {
    return API.post(`/api/screening/book/undomovetbcfolder?id=${id}`);
  };

  static confirmBooking = (id) => {
    return API.post(
      `/api/screening/book/confirmbookappointment?bookingId=${id}`
    );
  };

  static getBookingsByRef = (ref) => {
    return API.get(`/api/screening/book/getbookingsbyref?ref=${ref}`);
  };

  static getBookingById = (id) => {
    return API.get(`/api/screening/book/getbookingbyid?id=${id}`);
  };

  static getAllBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/screening/book/getallbookings?limit=${limit}`);
  };

  static getDeletedBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/screening/book/getdeletedbookings?limit=${limit}`);
  };

  static getTBCFolderBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/screening/book/gettbcfolderbookings?limit=${limit}`);
  };

  static getTodayBookings = () => {
    return API.get(`/api/screening/book/gettodaybookings`);
  };

  static getLiveBookings = () => {
    return API.get(`/api/screening/book/getlivebookings`);
  };

  static getCompletedBookings = (limit) => {
    return API.get(`/api/screening/book/getcompletedbookings?limit=${limit}`);
  };

  static getOldBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/screening/book/getoldbookings?limit=${limit}`);
  };

  static getFutureBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/screening/book/getfuturebookings?limit=${limit}`);
  };

  static getRecentBookings = () => {
    return API.get(`/api/screening/book/getrecentbookings`);
  };

  static getPendingBookings = () => {
    return API.get(`/api/screening/book/getpendingbookings`);
  };

  static getRecentBookingsAll = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/screening/book/getrecentbookingsall?limit=${limit}`);
  };
}