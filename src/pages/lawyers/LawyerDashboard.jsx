import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import LawyerSidebar from '../../components/lawyers/LawyerSidebar';
import { getToken, getUser } from '../../utils/auth';

import '../../styles/pagesStyle/lawyerStyle/LawyerDashboard.css';

const LawyerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();

        const response = await fetch(
          'http://localhost:5000/api/lawyers/me',
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

        setProfile(data);
      } catch (error) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const sidebarUser = {
    name: profile?.name ?? getUser()?.name ?? '',
    role: 'محامي'
  };

  return (
    <div className="lawyer-dashboard-layout">

      <LawyerSidebar user={sidebarUser} />

      <main className="lawyer-dashboard-main">

        {profile && !profile.verified && (
          <div className="verification-notice">
            ملفك قيد المراجعة من الإدارة — لن يظهر للعملاء ولن تصلك طلبات حتى يتم اعتماده.
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: 'center', padding: 60 }}>
            جارٍ التحميل...
          </p>
        ) : (
          <Outlet context={{ profile, setProfile }} />
        )}

      </main>
    </div>
  );
};

export default LawyerDashboard;

