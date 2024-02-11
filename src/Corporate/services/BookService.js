import API from './api';
import axiosRetry from 'axios-retry';

export default class BookService {
  static setClinicNotes = (bookingId, notes) => {
    return API.post(`/api/corporate/book/setclinicnotes`, { bookingId, notes });
  };

  static getCorporateReportsByBookingId = (bookingId) => {
    return API.get(
      `/api/blood/book/getcorporatereportsbybookingid?id=${bookingId}`
    );
  };

  static addNewBooking = (payload) => {
    return API.post(`/api/corporate/book/addnewbooking`, payload);
  };

  static sendRegFormEmail = (bookingId) => {
    return API.post(`/api/corporate/book/sendregformemail?id=${bookingId}`);
  };
  static payBooking = (bookingId, price, paymentMethod, corporate) => {
    return API.post(
      `/api/corporate/book/paybooking?id=${bookingId}&paymentmethod=${paymentMethod}&corporate=${corporate}&price=${price}`
    );
  };

  static unPayBooking = (bookingId) => {
    return API.post(`/api/corporate/book/unpaybooking?id=${bookingId}`);
  };

  static getShouldRefundsCount = () => {
    return API.get(`/api/corporate/book/getshouldrefundscount?`);
  };

  static refundBooking = (bookingId) => {
    return API.post(`/api/corporate/payment/refundpayment`, {
      bookingId: bookingId,
    });
  };

  static getBookingsStatsByDateStr = (dateStr) => {
    return API.get(
      `/api/corporate/book/getbookingsstatsbydatestr?date=${dateStr}`
    );
  };

  static getBookingsCountByDateStr = (dateStr) => {
    return API.get(
      `/api/corporate/book/getbookingscountbydatestr?date=${dateStr}`
    );
  };

  static getAllBookingsCountAll = () => {
    return API.get(`/api/corporate/book/getallbookingscountall`);
  };

  static getBookingsCountByDateStrandTime = (dateStr, time, source) => {
    return API.get(
      `/api/corporate/book/getbookingscountbydatestrandtime?date=${dateStr}&time=${time}`,
      { cancelToken: source.token }
    );
  };

  static getBookingsByDateStrandTime = (dateStr, time) => {
    return API.get(
      `/api/corporate/book/getbookingsbydatestrandtime?date=${dateStr}&time=${time}`
    );
  };

  static getAllBookingsCountByDateStr = (dateStr) => {
    return API.get(
      `/api/corporate/book/getallbookingscountbydatestr?date=${dateStr}`
    );
  };

  static getAllBookingsCountByDateStrandTime = (dateStr, time, source) => {
    return API.get(
      `/api/corporate/book/getallbookingscountbydatestrandtime?date=${dateStr}&time=${time}`,
      { cancelToken: source.token }
    );
  };

  static getAllBookingsByDateStrandTime = (dateStr, time) => {
    return API.get(
      `/api/corporate/book/getallbookingsbydatestrandtime?date=${dateStr}&time=${time}`
    );
  };

  static changeBackToBookingMade = (id) => {
    return API.post(`/api/corporate/book/changebacktobookingmade?id=${id}`);
  };

  static changeToPatientAttended = (id, payload) => {
    return API.post(
      `/api/corporate/book/changetopatientattended?id=${id}`,
      payload
    );
  };

  static updateBooking = (payload) => {
    return API.post(`/api/corporate/book/updatebookappointment`, payload);
  };

  static updateBookingTime = (payload) => {
    return API.post(`/api/corporate/book/updatebookappointmenttime`, payload);
  };

  static deleteBooking = (id) => {
    return API.post(`/api/corporate/book/deletebookappointment?id=${id}`);
  };

  static unDeleteBooking = (id) => {
    return API.post(`/api/corporate/book/undeletebookappointment?id=${id}`);
  };

  static getBookingsByRef = (ref) => {
    return API.get(`/api/corporate/book/getbookingsbyref?ref=${ref}`);
  };

  static getBookingById = (id) => {
    return API.get(`/api/corporate/book/getbookingbyid?id=${id}`);
  };

  static getAllBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/corporate/book/getallbookings?limit=${limit}`);
  };

  static getDeletedBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/corporate/book/getdeletedbookings?limit=${limit}`);
  };

  static getTodayBookings = () => {
    return API.get(`/api/corporate/book/gettodaybookings`);
  };

  static getOldBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/corporate/book/getoldbookings?limit=${limit}`);
  };

  static getFutureBookings = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/corporate/book/getfuturebookings?limit=${limit}`);
  };

  static getRecentBookings = () => {
    return API.get(`/api/corporate/book/getrecentbookings`);
  };

  static getRecentBookingsAll = (limit) => {
    if (!limit) limit = 25;
    return API.get(`/api/corporate/book/getrecentbookingsall?limit=${limit}`);
  };
}