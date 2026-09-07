import React from 'react';
import DashboardSidebar from '../shared/DashboardSidebar';
import { FileText, MessageSquare, Settings, Globe } from 'lucide-react';

const LawyerSidebar = ({ user }) => {
  const lawyerMenu = [
    {
      id: 'requests',
      label: 'الطلبات',
      icon: FileText,
      path: '/lawyer/requests'
    },
    {
      id: 'consultations',
      label: 'الاستشارات',
      icon: MessageSquare,
      path: '/lawyer/consultations'
    }
  ];

  const commonBottom = [
    {
      id: 'home',
      label: 'الرئيسية',
      icon: Globe,
      path: '/'
    },
    {
      id: 'settings',
      label: 'الإعدادات',
      icon: Settings,
      path: '/lawyer/settings'
    }
  ];

  return (
    <DashboardSidebar
      user={user}
      menuItems={lawyerMenu}
      bottomItems={commonBottom}
    />
  );
};

export default LawyerSidebar;