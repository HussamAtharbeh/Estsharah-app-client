import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/pagesStyle/clientStyle/ClientDashboard.css';
import ClientSidebar from '../../components/client/ClientSidebar';

export default function ClientDashboard() {
  const [user, setUser] = useState({
    name: 'عبداللطيف ابو رحمة',
    role: 'حساب عميل',
    email: 'm.ahmed@mail.com',
    phone: '+962 79 123 4567',
    city: 'عمان'
  });

  return (
    <div className="client-dashboard-layout">
      <ClientSidebar user={user} />

      <main className="dashboard-main-content">
        <Outlet context={{ user, setUser }} />
      </main>
    </div>
  );
}