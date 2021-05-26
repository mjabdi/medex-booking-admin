import API from './api';
import axiosRetry from 'axios-retry';

export default class PaymentService {

   static sendPaymentLinkTextMessage = (medexPaymentId, phone) =>
   {
      return API.post(`/api/medex/payment/sendpaymentlinktext`, {medexPaymentId : medexPaymentId, phone: phone});
   }


   static sendPaymentLinkEmail = (medexPaymentId, email) =>
   {
      return API.post(`/api/medex/payment/sendpaymentlinkemail`, {medexPaymentId : medexPaymentId, email: email});
   }

   static doPayment = (paymentId, medexPaymentId) =>
   {
      return API.post(`/api/medex/payment/dopayment`, {paymentId: paymentId  , medexPaymentId : medexPaymentId});
   }

   static refundPayment = (paymentId) =>
   {
      return API.post(`/api/medex/payment/refundpayment`, {medexPaymentId : paymentId});
   }

   static createNewPaymentLink = (paymentRecord) =>
   {
      return API.post(`/api/medex/payment/createpayment`, {paymentRecord : paymentRecord});
   }

   static deletePaymentLink = (paymentId) =>
   {
      return API.post(`/api/medex/payment/deletepayment`, {medexPaymentId : paymentId});
   }

   static getAllPayments = () =>
   {
      return API.get(`/api/medex/payment/getallpayments`);
   }

   static getDeletedPayments = () =>
   {
      return API.get(`/api/medex/payment/getdeletedpayments`);
   }

   static getPaidPayments = () =>
   {
      return API.get(`/api/medex/payment/getpaidpayments`);
   }

   static getNotPaidPayments = () =>
   {
      return API.get(`/api/medex/payment/getnotpaidpayments`);
   }

   static getLatePayments = () =>
   {
      return API.get(`/api/medex/payment/getlatepayments`);
   }


   static getRefundPayments = () =>
   {
      return API.get(`/api/medex/payment/getrefundpayments`);
   }

   static getRecentPayments = () => {
      return API.get(`/api/medex/payment/getrecentpayments`);
   }

   static getPaymentById = (paymentId) =>
   {
      return API.get(`/api/medex/payment/getpaymentbyid?id=${paymentId}`);
   }

   static getTotalReceivedAmount = () => {
      return API.get(`/api/medex/payment/gettotalreceivedamount`);
   }

   static getTodayReceivedAmount = () => {
      return API.get(`/api/medex/payment/gettodayreceivedamount`);
   }

   static getTotalLinkSent = () => {
      return API.get(`/api/medex/payment/gettotallinksent`);
   }

   static getTodayLinkSent = () => {
      return API.get(`/api/medex/payment/gettodaylinksent`);
   }


   


}