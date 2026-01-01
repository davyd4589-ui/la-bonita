import Layout from "./Layout.jsx";

import AdminBookings from "./AdminBookings";

import BookingNotifications from "./BookingNotifications";

import BridalPackages from "./BridalPackages";

import Contact from "./Contact";

import Gallery from "./Gallery";

import Home from "./Home";

import Services from "./Services";

import Sitemap from "./Sitemap";

import Team from "./Team";

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const PAGES = {
    
    AdminBookings: AdminBookings,
    
    BookingNotifications: BookingNotifications,
    
    BridalPackages: BridalPackages,
    
    Contact: Contact,
    
    Gallery: Gallery,
    
    Home: Home,
    
    Services: Services,
    
    Sitemap: Sitemap,
    
    Team: Team,
    
}

function PagesContent() {
    return (
        <Routes>            
            <Route path="/" element={<Layout currentPageName="Home"><Home /></Layout>} />
            <Route path="/AdminBookings" element={<Layout currentPageName="AdminBookings"><AdminBookings /></Layout>} />
            <Route path="/BookingNotifications" element={<Layout currentPageName="BookingNotifications"><BookingNotifications /></Layout>} />
            <Route path="/BridalPackages" element={<Layout currentPageName="BridalPackages"><BridalPackages /></Layout>} />
            <Route path="/Contact" element={<Layout currentPageName="Contact"><Contact /></Layout>} />
            <Route path="/Gallery" element={<Layout currentPageName="Gallery"><Gallery /></Layout>} />
            <Route path="/Home" element={<Navigate to="/" replace />} />
            <Route path="/Services" element={<Layout currentPageName="Services"><Services /></Layout>} />
            <Route path="/Sitemap" element={<Layout currentPageName="Sitemap"><Sitemap /></Layout>} />
            <Route path="/Team" element={<Layout currentPageName="Team"><Team /></Layout>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}