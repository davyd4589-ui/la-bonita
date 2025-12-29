import AdminBookings from './pages/AdminBookings';
import BookingNotifications from './pages/BookingNotifications';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Services from './pages/Services';
import Sitemap from './pages/Sitemap';
import Team from './pages/Team';
import BridalPackages from './pages/BridalPackages';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminBookings": AdminBookings,
    "BookingNotifications": BookingNotifications,
    "Contact": Contact,
    "Gallery": Gallery,
    "Home": Home,
    "Services": Services,
    "Sitemap": Sitemap,
    "Team": Team,
    "BridalPackages": BridalPackages,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};