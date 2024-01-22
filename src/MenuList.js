import DashboardIcon from "@material-ui/icons/Dashboard";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";
import DescriptionIcon from "@material-ui/icons/Description";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import WarningIcon from "@material-ui/icons/Warning";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import ArchiveIcon from '@material-ui/icons/Archive';
import CallIcon from '@material-ui/icons/Call';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import EventBusyIcon from "@material-ui/icons/EventBusy";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SendIcon from '@material-ui/icons/Send';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import BusinessIcon from '@material-ui/icons/Business';

/// PCR ------------------
import FindByRef from "./PCR/FindByRef";
import BookingTable from "./PCR/BookingTable";
import DashboardPreview from "./PCR/DashboardPreview";
import UnmatchedRecords from "./PCR/UnmatchedRecords";
// import CalendarView from "./PCR/calendar/CalendarView";
import PCRCalendarView from "./PCR/calendar-admin/CalendarView";
import PCROffDays from "./PCR/OffDays";
//-----------------------

/// Gynae -------------------
import GynaeBookingTable from "./Gynae/BookingTable";
import GynaeDashboardPreview from "./Gynae/DashboardPreview";
import GynaeFindByRef from "./Gynae/FindByRef";
import GynaeCalendarView from "./Gynae/calendar-admin/CalendarView";
import GynaeOffDays from "./Gynae/OffDays";
//----------------------------

/// GP -------------------
import GPBookingTable from "./GP/BookingTable";
import GPDashboardPreview from "./GP/DashboardPreview";
import GPFindByRef from "./GP/FindByRef";
import GPCalendarView from "./GP/calendar-admin/CalendarView";
import GPOffDays from "./GP/OffDays";
//----------------------------

/// STD -------------------
import STDBookingTable from "./STD/BookingTable";
import STDDashboardPreview from "./STD/DashboardPreview";
import STDFindByRef from "./STD/FindByRef";
import STDCalendarView from "./STD/calendar-admin/CalendarView";
import STDOffDays from "./STD/OffDays";
//----------------------------

/// Blood -------------------
import BloodBookingTable from "./Blood/BookingTable";
import BloodDashboardPreview from "./Blood/DashboardPreview";
import BloodFindByRef from "./Blood/FindByRef";
import BloodCalendarView from "./Blood/calendar-admin/CalendarView";
import BloodUnmatchedRecords from "./Blood/UnmatchedRecords";
import BloodMatchedRecords from "./Blood/MatchedRecords";
import BloodArchivedRecords from "./Blood/ArchivedRecords";
import SentBloodRecords from "./Blood/SentRecords";
import BloodOffDays from "./Blood/OffDays";
//----------------------------

/// Derma -------------------
import DermaBookingTable from "./Derma/BookingTable";
import DermaDashboardPreview from "./Derma/DashboardPreview";
import DermaFindByRef from "./Derma/FindByRef";
import DermaCalendarView from "./Derma/calendar-admin/CalendarView";
import DermaOffDays from "./Derma/OffDays";
//----------------------------

/// Screening -------------------
import ScreeningBookingTable from "./Screening/BookingTable";
import ScreeningDashboardPreview from "./Screening/DashboardPreview";
import ScreeningFindByRef from "./Screening/FindByRef";
import ScreeningCalendarView from "./Screening/calendar-admin/CalendarView";
import ScreeningOffDays from "./Screening/OffDays";
//----------------------------


/// Corporate -------------------
import CorporateBookingTable from "./Corporate/BookingTable";
import CorporateDashboardPreview from "./Corporate/DashboardPreview";
import CorporateFindByRef from "./Corporate/FindByRef";
import CorporateCalendarView from "./Corporate/calendar-admin/CalendarView";
import CorporateOffDays from "./Corporate/OffDays";
//----------------------------



// Admin ----------------
import AdminDashBoardPreview from "./DashboardPreview";
import AdminFindByRef from "./Admin/FindByRef";
import AdminBookingTable from "./Admin/BookingTable";
import AdminCalendarView from "./Admin/calendar-admin/CalendarView";
import SearchBookingTable from "./Admin/SearchBookingTable";
import InvoiceCodes from "./Admin/InvoiceCodes"
import OffDays from "./Admin/OffDays"


// Payment ----------------
import PaymentsTable from "./Payment/PaymentsTable";
import PaymentsDashboard from "./Payment/DashboardPreview"

//---------------

// Reports ----------------
import SearchInvoices from "./Reports/SearchInvoices"
import PeriodicReport from "./Reports/PeriodicReport";
import CorporatesList from "./Reports/CorporatesList";
import ReportsDashboard from "./Reports/DashboardPreview"

//---------------



import LinkIcon from '@material-ui/icons/Link';

export const MenuList_Reports = [
  {
    index: 0,
    id: `dashboard`,
    title: `Dashboard`,
    icon: <DashboardIcon />,
  },
  {
    index: 1,
    id: `periodicReport`,
    title: `Periodic Report`,
    icon: <EventNoteIcon />,
  },
  {
    index: 2,
    id: `searchInvoices`,
    title: `Search Invoices`,
    icon: <SearchIcon />,
  },
  {
    index: 3,
    id: `corporates`,
    title: `Corporates List`,
    icon: <BusinessIcon />,
  },


]


//---------------


export const MenuList_Payment = [
  {
    index: 0,
    id: `dashboard`,
    title: `Dashboard`,
    icon: <DashboardIcon />,
  },
  {
    index: 1,
    id: `paymentsTable`,
    title: `Payment Links`,
    icon: <LinkIcon />,
  },
  {
    index: 2,
    id: `paidpaymentsTable`,
    title: `Successful Payments`,
    icon: <DoneOutlineIcon />,
  },
  {
    index: 3,
    id: `latepaymentsTable`,
    title: `4 Hours Late`,
    icon: <HourglassEmptyIcon />,
  },


  {
    index: 4,
    id: `notyetPaid`,
    title: `Not Yet Paid`,
    icon: <MoneyOffIcon />,
  },
  {
    index: 5,
    id: `refundpaymentsTable`,
    title: `Refunded Payments`,
    icon: <KeyboardReturnIcon />,
  },
  {
    index: 6,
    id: `deletedpaymentsTable`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },

]


//---------------

export const MenuList_Admin = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },

  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },

  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 9,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },
  {
    index: 10,
    id: `systemCodes`,
    title: `System Codes`,
    icon: <FormatListBulletedIcon />,
  },
  {
    index: 11,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];

export const MenuList_Gynae = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 9,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },

  {
    index: 10,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];

export const MenuList_GP = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 9,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },
  {
    index: 10,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];

export const MenuList_STD = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `liveBookings`,
    title: `Live Bookings`,
    icon: <LiveTvIcon />,
  },
  {
    index: 4,
    id: `completedBookings`,
    title: `Completed Bookings`,
    icon: <PlaylistAddCheckIcon />,
  },

  {
    index: 5,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 6,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 7,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 8,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 9,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 10, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 11,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },
  {
    index: 12,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];



export const MenuList_Blood = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `liveBookings`,
    title: `Live Bookings`,
    icon: <LiveTvIcon />,
  },
  {
    index: 4,
    id: `completedBookings`,
    title: `Completed Bookings`,
    icon: <PlaylistAddCheckIcon />,
  },
  {
    index: 5,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 6,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 7,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 8,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 9,
    id: `bloodMatchedRecords`,
    title: `Matched Results`,
    icon: <DoneOutlineIcon />,
  },
  {
    index: 10,
    id: `bloodUnatchedRecords`,
    title: `Unmatched Results`,
    icon: <WarningIcon />,
  },

  {
    index: 11,
    id: `bloodArchived`,
    title: `Archived Results`,
    icon: <ArchiveIcon />,
  },

  {
    index: 12,
    id: `bloodSent`,
    title: `Sent Results`,
    icon: <SendRoundedIcon />,
  },
  {
    index: 13,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 14, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 15,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },
  {
    index: 16,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];

export const MenuList_PCR = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `liveBookings`,
    title: `Live Bookings`,
    icon: <LiveTvIcon />,
  },
  { index: 4, id: `oldBookings`, title: `Old Bookings`, icon: <HistoryIcon /> },
  {
    index: 5,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 6,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 7,
    id: `completedBookings`,
    title: `Completed Bookings`,
    icon: <PlaylistAddCheckIcon />,
  },
  {
    index: 8,
    id: `positiveBookings`,
    title: `Positive Results`,
    icon: <AddCircleOutlineIcon />,
  },
  {
    index: 9,
    id: `latebookings`,
    title: `40 Hours Late`,
    icon: <HourglassEmptyIcon />,
  },
  {
    index: 10,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 11,
    id: `trBookings`,
    title: `TR Bookings`,
    icon: <AirplanemodeActiveIcon />,
  },
  {
    index: 12,
    id: `unmatchedRecords`,
    title: `Unmatched Records`,
    icon: <WarningIcon />,
  },
  {
    index: 13,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  // {
  //   index: 14,
  //   id: `adminCalendarView`,
  //   title: `Admin Calendar`,
  //   icon: <EventNoteIcon />,
  // },
  { index: 15, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 16,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },
  {
    index: 17,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];

export const MenuList_Derma = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 9,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },
  {
    index: 10,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];

export const MenuList_Screening = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `pendingBookings`,
    title: `Pending Bookings`,
    icon: <AddAlertIcon />,
  },
  { index: 2, id: `tbcBookings`, title: `Patients TBC`, icon: <CallIcon /> },

  {
    index: 3,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 4,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 5,
    id: `liveBookings`,
    title: `Live Bookings`,
    icon: <LiveTvIcon />,
  },
  {
    index: 6,
    id: `completedBookings`,
    title: `Completed Bookings`,
    icon: <PlaylistAddCheckIcon />,
  },
  {
    index: 7,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 8,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 9,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 10,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 11,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 12, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 13,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },
  {
    index: 14,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];


export const MenuList_Corporate = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
  {
    index: 9,
    id: `searchBooking`,
    title: `Search By Name`,
    icon: <SearchOutlinedIcon />,
  },
  {
    index: 10,
    id: `offDays`,
    title: `Off Days`,
    icon: <EventBusyIcon />,
  },
];




export const MenuList_PCRLAB = [
  {
    index: 0,
    id: `liveBookings`,
    title: `Live Bookings`,
    icon: <LiveTvIcon />,
  },
  {
    index: 1,
    id: `latebookings`,
    title: `40 Hours Late`,
    icon: <HourglassEmptyIcon />,
  },
  {
    index: 2,
    id: `unmatchedRecords`,
    title: `Unmatched Records`,
    icon: <WarningIcon />,
  },

  {
    index: 3,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
];

export const getMenuContent = (role, index) => {
  if (role === "pcr") {
    switch (index) {
      case 0:
        return <DashboardPreview />;
      case 1:
        return <BookingTable date="recent" />;
      case 2:
        return <BookingTable date="today" />;
      case 3:
        return <BookingTable date="live" />;
      case 4:
        return <BookingTable date="old" />;
      case 5:
        return <BookingTable date="future" />;
      case 6:
        return <BookingTable date="all" />;
      case 7:
        return <BookingTable date="completed" />;
      case 8:
        return <BookingTable date="positive" />;
      case 9:
        return <BookingTable date="late" />;
      case 10:
        return <BookingTable date="deleted" />;
      case 11:
        return <BookingTable date="tr" />;
      case 12:
        return <UnmatchedRecords />;
      case 13:
        //   return <CalendarView />;
        // case 14:
        return <PCRCalendarView />;
      case 15:
        return <FindByRef />;
      case 16:
        return <SearchBookingTable />
      case 17:
        return <PCROffDays />
      default:
        return `Page Not Found!`;
    }
  } else if (role === "pcrlab") {
    switch (index) {
      case 0:
        return <BookingTable date="live" />;
      case 1:
        return <BookingTable date="late" />;
      case 2:
        return <UnmatchedRecords />;
      case 3:
        return <PCRCalendarView />;

      default:
        return `Page Not Found!`;
    }
  } else if (role === "gynae") {
    switch (index) {
      case 0:
        return <GynaeDashboardPreview />;
      case 1:
        return <GynaeBookingTable date="recent" />;
      case 2:
        return <GynaeBookingTable date="today" />;
      case 3:
        return <GynaeBookingTable date="old" />;
      case 4:
        return <GynaeBookingTable date="future" />;
      case 5:
        return <GynaeBookingTable date="all" />;
      case 6:
        return <GynaeBookingTable date="deleted" />;
      case 7:
        return <GynaeCalendarView />;
      case 8:
        return <GynaeFindByRef />;
      case 9:
        return <SearchBookingTable />;
      case 10:
        return <GynaeOffDays />;
      default:
        return `Page Not Found!`;
    }
  } else if (role === "gp") {
    switch (index) {
      case 0:
        return <GPDashboardPreview />;
      case 1:
        return <GPBookingTable date="recent" />;
      case 2:
        return <GPBookingTable date="today" />;
      case 3:
        return <GPBookingTable date="old" />;
      case 4:
        return <GPBookingTable date="future" />;
      case 5:
        return <GPBookingTable date="all" />;
      case 6:
        return <GPBookingTable date="deleted" />;
      case 7:
        return <GPCalendarView />;
      case 8:
        return <GPFindByRef />;
      case 9:
        return <SearchBookingTable />;
      case 10:
        return <GPOffDays />;
      default:
        return `Page Not Found!`;
    }
  } else if (role === "std") {
    switch (index) {
      case 0:
        return <STDDashboardPreview />;
      case 1:
        return <STDBookingTable date="recent" />;
      case 2:
        return <STDBookingTable date="today" />;
      case 3:
        return <STDBookingTable date="live" />;
      case 4:
        return <STDBookingTable date="completed" />;
      case 5:
        return <STDBookingTable date="old" />;
      case 6:
        return <STDBookingTable date="future" />;
      case 7:
        return <STDBookingTable date="all" />;
      case 8:
        return <STDBookingTable date="deleted" />;
      case 9:
        return <STDCalendarView />;
      case 10:
        return <STDFindByRef />;
      case 11:
        return <SearchBookingTable />;
      case 12:
        return <STDOffDays />;
      default:
        return `Page Not Found!`;
    }
  } else if (role === "blood") {
    switch (index) {
      case 0:
        return <BloodDashboardPreview />;
      case 1:
        return <BloodBookingTable date="recent" />;
      case 2:
        return <BloodBookingTable date="today" />;
      case 3:
        return <BloodBookingTable date="live" />;
      case 4:
        return <BloodBookingTable date="completed" />;
      case 5:
        return <BloodBookingTable date="old" />;
      case 6:
        return <BloodBookingTable date="future" />;
      case 7:
        return <BloodBookingTable date="all" />;
      case 8:
        return <BloodBookingTable date="deleted" />;
      case 9:
        return <BloodMatchedRecords />;
      case 10:
        return <BloodUnmatchedRecords />;
      case 11:
        return <BloodArchivedRecords />;
      case 12:
        return <SentBloodRecords />;
      case 13:
        return <BloodCalendarView />;
      case 14:
        return <BloodFindByRef />;
      case 15:
        return <SearchBookingTable />;
      case 16:
        return <BloodOffDays />;
      default:
        return `Page Not Found!`;
    }
  } else if (role === "admin") {
    switch (index) {
      case 0:
        return <AdminDashBoardPreview />;
      case 1:
        return <AdminBookingTable date="recent" />;
      case 2:
        return <AdminBookingTable date="today" />;
      case 3:
        return <AdminBookingTable date="old" />;
      case 4:
        return <AdminBookingTable date="future" />;
      case 5:
        return <AdminBookingTable date="all" />;
      case 6:
        return <AdminBookingTable date="deleted" />;
      case 7:
        return <AdminCalendarView />;
      case 8:
        return <AdminFindByRef />;
      case 9:
        return <SearchBookingTable />;
      case 10:
        return <InvoiceCodes />;
      case 11:
        return <OffDays />;

      default:
        return `Page Not Found!`;
    }
  }
  else if (role === "derma") {
    switch (index) {
      case 0:
        return <DermaDashboardPreview />;
      case 1:
        return <DermaBookingTable date="recent" />;
      case 2:
        return <DermaBookingTable date="today" />;
      case 3:
        return <DermaBookingTable date="old" />;
      case 4:
        return <DermaBookingTable date="future" />;
      case 5:
        return <DermaBookingTable date="all" />;
      case 6:
        return <DermaBookingTable date="deleted" />;
      case 7:
        return <DermaCalendarView />;
      case 8:
        return <DermaFindByRef />;
      case 9:
        return <SearchBookingTable />;
      case 10:
        return <DermaOffDays />;
      default:
        return `Page Not Found!`;
    }
  } else if (role === "payment") {
    switch (index) {
      case 0:
        return <PaymentsDashboard />;
      case 1:
        return <PaymentsTable date="all" />;
      case 2:
        return <PaymentsTable date="paid" />;
      case 3:
        return <PaymentsTable date="late" />;
      case 4:
        return <PaymentsTable date="notpaid" />;
      case 5:
        return <PaymentsTable date="refund" />;
      case 6:
        return <PaymentsTable date="deleted" />;

      default:
        return `Page Not Found!`;
    }
  } else if (role === "screening") {
    switch (index) {
      case 0:
        return <ScreeningDashboardPreview />;
      case 1:
        return <ScreeningBookingTable date="pending" />;
      case 2:
        return <ScreeningBookingTable date="tbc" />;
      case 3:
        return <ScreeningBookingTable date="recent" />;
      case 4:
        return <ScreeningBookingTable date="today" />;
      case 5:
        return <ScreeningBookingTable date="live" />;
      case 6:
        return <ScreeningBookingTable date="completed" />;
      case 7:
        return <ScreeningBookingTable date="old" />;
      case 8:
        return <ScreeningBookingTable date="future" />;
      case 9:
        return <ScreeningBookingTable date="all" />;
      case 10:
        return <ScreeningBookingTable date="deleted" />;
      case 11:
        return <ScreeningCalendarView />;
      case 12:
        return <ScreeningFindByRef />;
      case 13:
        return <SearchBookingTable />;
      case 14:
        return <ScreeningOffDays />;

      default:
        return `Page Not Found!`;
    }
  } else if (role === "corporate") {
    switch (index) {
      case 0:
        return <CorporateDashboardPreview />;
      case 1:
        return <CorporateBookingTable date="recent" />;
      case 2:
        return <CorporateBookingTable date="today" />;
      case 3:
        return <CorporateBookingTable date="old" />;
      case 4:
        return <CorporateBookingTable date="future" />;
      case 5:
        return <CorporateBookingTable date="all" />;
      case 6:
        return <CorporateBookingTable date="deleted" />;
      case 7:
        return <CorporateCalendarView />;
      case 8:
        return <CorporateFindByRef />;
      case 9:
        return <SearchBookingTable />;
      case 10:
        return <CorporateOffDays />;
      default:
        return `Page Not Found!`;
    }
  }


  else if (role === "reports") {
    switch (index) {
      case 0:
        return <ReportsDashboard />;
      case 1:
        return <PeriodicReport />;
      case 2:
        return <SearchInvoices />;
      case 3:
        return <CorporatesList />;

      default:
        return `Page Not Found!`;
    }
  }
  else {
    return `Page Not Found!`;
  }
};

export const getMenuRole = (role) => {
  switch (role) {
    case "admin":
      return MenuList_Admin;
    case "pcr":
      return MenuList_PCR;
    case "pcrlab":
      return MenuList_PCRLAB;

    case "gynae":
      return MenuList_Gynae;
    case "gp":
      return MenuList_GP;
    case "std":
      return MenuList_STD;
    case "blood":
      return MenuList_Blood;
    case "derma":
      return MenuList_Derma;
    case "payment":
      return MenuList_Payment;
    case "screening":
      return MenuList_Screening;
    case "corporate":
      return MenuList_Corporate;
    case "reports":
      return MenuList_Reports;



    default:
      return [];
  }
};

export const getMenuId = (role, index) => {
  const MenuList = getMenuRole(role);
  for (var i = 0; i < MenuList.length; i++) {
    if (MenuList[i].index === index) {
      return MenuList[i].id;
    }
  }

  return `Page Not Found!`;
};

export const getMenuIndex = (role, id) => {
  const MenuList = getMenuRole(role);
  for (var i = 0; i < MenuList.length; i++) {
    if (MenuList[i].id === id) {
      return MenuList[i].index;
    }
  }

  return -1;
};
