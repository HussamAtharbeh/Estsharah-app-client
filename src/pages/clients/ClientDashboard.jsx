import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import ClientSidebar from '../../components/client/ClientSidebar';
import { getUser, getToken } from '../../utils/auth';

import '../../styles/pagesStyle/clientStyle/ClientDashboard.css';

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();

        const response = await fetch(
          'http://localhost:5000/api/users/me',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'حدث خطأ');
        }

        setUser(data);
      } catch (error) {
        setUser(getUser());
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const sidebarUser = {
    name: user?.name ?? getUser()?.name ?? '',
    role: 'حساب عميل'
  };

  return (
    <div className="client-dashboard-layout">
      <ClientSidebar user={sidebarUser} />

      <main className="dashboard-main-content">
        {loading ? (
          <p style={{ textAlign: 'center', padding: 60 }}>
            جارٍ التحميل...
          </p>
        ) : (
          <Outlet context={{ user, setUser }} />
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;