import React from 'react';
import { Briefcase, Users, AlertCircle, Globe } from 'lucide-react';
import DashboardSidebar from '../shared/DashboardSidebar';

const AdminSidebar = () => {
  const adminUser = {
    name: 'المدير العام',
    role: 'لوحة الإدارة'
  };

  const adminMenu = [
    { id: 'lawyers', label: 'إدارة المحامين', icon: Briefcase, path: '/admin/lawyers' },
    { id: 'clients', label: 'إدارة العملاء', icon: Users, path: '/admin/clients' },
    { id: 'complaints', label: 'الشكاوى', icon: AlertCircle, path: '/admin/complaints' }
  ];

  const bottomMenu = [
    { id: 'home', label: 'الرئيسية', icon: Globe, path: '/' }
  ];

  return (
    <DashboardSidebar
      user={adminUser}
      menuItems={adminMenu}
      bottomItems={bottomMenu}
      showOnlineStatus={false}
    />
  );
};

export default AdminSidebar;