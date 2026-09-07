import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import '../../styles/pagesStyle/adminStyle/AdminPages.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar />
      <main className="admin-dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;