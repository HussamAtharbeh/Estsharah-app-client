import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/vistors/Home';
import Lawyers from '../pages/vistors/LawyersList';
import Services from '../pages/vistors/Services';
import About from '../pages/vistors/About';
import Blog from '../pages/vistors/Blog';
import SignIn from '../pages/login/SignIn';
import Contact from '../pages/vistors/Contact';
import SignUp from '../pages/login/SignUp';
import SignUpClient from '../pages/login/SignUpClient';
import SignUpLawyer from '../pages/login/SignUpLawyer';
import LawyerProfile from '../components/lawyers/LawyerProfile';
import NotFound from '../pages/vistors/NotFound';
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}