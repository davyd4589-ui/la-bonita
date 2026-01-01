import AdminBookings from './pages/AdminBookings';
import BookingNotifications from './pages/BookingNotifications';
import BridalPackages from './pages/BridalPackages';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Services from './pages/Services';
import Sitemap from './pages/Sitemap';
import Team from './pages/Team';
import Layout from './pages/Layout';
import index from './pages/index';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminBookings": AdminBookings,
    "BookingNotifications": BookingNotifications,
    "BridalPackages": BridalPackages,
    "Contact": Contact,
    "Gallery": Gallery,
    "Home": Home,
    "Services": Services,
    "Sitemap": Sitemap,
    "Team": Team,
    "Layout": Layout,
    "index": index,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};