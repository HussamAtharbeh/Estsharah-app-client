import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../../components/admin/AdminSidebar';
import { getUser } from '../../utils/auth';

import '../../styles/pagesStyle/adminStyle/AdminPages.css';

const AdminDashboard = () => {
  const user = getUser();

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar user={user} />

      <main className="admin-dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;