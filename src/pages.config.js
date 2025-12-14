import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Team from './pages/Team';
import BookingNotifications from './pages/BookingNotifications';
import AdminBookings from './pages/AdminBookings';
import Sitemap from './pages/Sitemap';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Services": Services,
    "Gallery": Gallery,
    "Contact": Contact,
    "Team": Team,
    "BookingNotifications": BookingNotifications,
    "AdminBookings": AdminBookings,
    "Sitemap": Sitemap,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};