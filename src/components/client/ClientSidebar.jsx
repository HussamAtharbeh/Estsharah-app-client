import React from 'react';
import DashboardSidebar from '../shared/DashboardSidebar';
import { Briefcase, CreditCard, Settings, Search, Globe } from 'lucide-react';

const ClientSidebar = ({ user }) => {
  const clientMenu = [
    { id: 'consultations', label: 'استشاراتي', icon: Briefcase, path: '/client/consultations' },
    { id: 'payments', label: 'المدفوعات', icon: CreditCard, path: '/client/payments' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, path: '/client/settings' }
  ];

  const commonBottom = [
    { id: 'browse', label: 'تصفح المحامين', icon: Search, path: '/lawyers' },
    { id: 'home', label: 'الرئيسية', icon: Globe, path: '/' }
  ];

  return (
    <DashboardSidebar
      user={user}
      menuItems={clientMenu}
      bottomItems={commonBottom}
    />
  );
};

export default ClientSidebar;