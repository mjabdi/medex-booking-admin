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
/// PCR ------------------
import FindByRef from "./PCR/FindByRef";
import BookingTable from "./PCR/BookingTable";
import DashboardPreview from "./PCR/DashboardPreview";
import UnmatchedRecords from "./PCR/UnmatchedRecords";
// import CalendarView from "./PCR/calendar/CalendarView";
import PCRCalendarView from "./PCR/calendar-admin/CalendarView";
//-----------------------

/// Gynae -------------------
import GynaeBookingTable from "./Gynae/BookingTable";
import GynaeDashboardPreview from "./Gynae/DashboardPreview";
import GynaeFindByRef from "./Gynae/FindByRef";
import GynaeCalendarView from "./Gynae/calendar-admin/CalendarView";
//----------------------------

/// GP -------------------
import GPBookingTable from "./GP/BookingTable";
import GPDashboardPreview from "./GP/DashboardPreview";
import GPFindByRef from "./GP/FindByRef";
import GPCalendarView from "./GP/calendar-admin/CalendarView";
//----------------------------

/// GP -------------------
import STDBookingTable from "./STD/BookingTable";
import STDDashboardPreview from "./STD/DashboardPreview";
import STDFindByRef from "./STD/FindByRef";
import STDCalendarView from "./STD/calendar-admin/CalendarView";
//----------------------------

// Admin ----------------
import AdminDashBoardPreview from "./DashboardPreview";
import AdminFindByRef from "./Admin/FindByRef";
import AdminBookingTable from "./Admin/BookingTable";
import AdminCalendarView from "./Admin/calendar-admin/CalendarView";

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
        return <STDBookingTable date="old" />;
      case 4:
        return <STDBookingTable date="future" />;
      case 5:
        return <STDBookingTable date="all" />;
      case 6:
        return <STDBookingTable date="deleted" />;
      case 7:
        return <STDCalendarView />;
      case 8:
        return <STDFindByRef />;
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
      default:
        return `Page Not Found!`;
    }
  } else {
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
