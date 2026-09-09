


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react'; // أضفنا Menu و X
import { clearAuth } from '../../utils/auth';

import '../../styles/componentsStyle/sharedStyle/DashboardSidebar.css';

const DashboardSidebar = ({ user, menuItems, bottomItems }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // حالة القائمة في الجوال

  const handleLogout = () => {
    clearAuth();
    navigate('/signin', { replace: true });
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button className="mobile-open-btn" onClick={() => setIsOpen(true)}>
        <Menu size={26} color="#0B1320" />
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        
        <button className="mobile-close-btn" onClick={closeMenu}>
          <X size={24} color="#64748b" />
        </button>

        <div className="sidebar-profile">
          <div className="avatar">
            <User size={22} />
          </div>

          <div className="profile-info">
            <h4>{user.name}</h4>
            <span>{user.role}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="menu-list">

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.includes(item.path);

              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={closeMenu} // إغلاق القائمة تلقائياً عند اختيار صفحة
                    className={`menu-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={20} className="menu-icon" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}

          </ul>
        </nav>

        <div className="sidebar-bottom">
          <ul className="menu-list">

            {bottomItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={closeMenu} // إغلاق القائمة تلقائياً عند اختيار صفحة
                    className="menu-item"
                  >
                    <Icon size={20} className="menu-icon" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}

            <li>
              <button
                className="menu-item logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={20} className="menu-icon" />
                <span>تسجيل الخروج</span>
              </button>
            </li>

          </ul>
        </div>

      </aside>
    </>
  );
};

export default DashboardSidebar;