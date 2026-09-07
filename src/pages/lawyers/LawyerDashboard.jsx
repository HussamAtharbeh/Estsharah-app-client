import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LawyerSidebar from '../../components/lawyers/LawyerSidebar';
import '../../styles/pagesStyle/lawyerStyle/LawyerDashboard.css';

const LawyerDashboard = () => {
  const [user, setUser] = useState({
    name: 'صالح عذاربه',
    role: 'محامي',
    email: 'lawyer@mail.com',
    phone: '+962 79 123 4567',
    city: 'عمان'
  });

  return (
    <div className="lawyer-dashboard-layout">
      <LawyerSidebar user={user} />

      <main className="lawyer-dashboard-main">
        <Outlet context={{ user, setUser }} />
      </main>
    </div>
  );
};

export default LawyerDashboard;