import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/vistors/Home';
import Lawyers from '../pages/vistors/LawyersList';
import Services from '../pages/vistors/Services';
import About from '../pages/vistors/About';
import Blog from '../pages/vistors/Blog';
import Contact from '../pages/vistors/Contact';
import NotFound from '../pages/vistors/NotFound';

import SignIn from '../pages/login/SignIn';
import SignUp from '../pages/login/SignUp';
import SignUpClient from '../pages/login/SignUpClient';
import SignUpLawyer from '../pages/login/SignUpLawyer';

import LawyerProfile from '../components/lawyers/LawyerProfile';

import ClientDashboard from '../pages/clients/ClientDashboard';
import MyConsultations from '../pages/clients/MyConsultations';
import Payments from '../pages/clients/Payments';
import Settings from '../pages/clients/Settings';
import BookConsultation from '../pages/clients/BookConsultation';

import LawyerDashboard from '../pages/lawyers/LawyerDashboard';
import LawyerOrders from '../pages/lawyers/LawyerOrders';
import LawyerConsultations from '../pages/lawyers/Consultations';
import LawyerSettings from '../pages/lawyers/Settings';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lawyers" element={<Lawyers />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/client" element={<SignUpClient />} />
      <Route path="/signup/lawyer" element={<SignUpLawyer />} />

      <Route path="/lawyer/profile" element={<LawyerProfile />} />

      <Route path="/client" element={<ClientDashboard />}>
        <Route index element={<Navigate to="consultations" replace />} />
        <Route path="consultations" element={<MyConsultations />} />
        <Route path="consultations/book" element={<BookConsultation />} />
        <Route path="payments" element={<Payments />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/lawyer" element={<LawyerDashboard />}>
        <Route index element={<Navigate to="requests" replace />} />
        <Route path="requests" element={<LawyerOrders />} />
        <Route path="consultations" element={<LawyerConsultations />} />
        <Route path="settings" element={<LawyerSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};