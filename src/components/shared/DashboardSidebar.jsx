import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import '../../styles/componentsStyle/sharedStyle/DashboardSidebar.css';

const DashboardSidebar = ({ user, menuItems, bottomItems }) => {
  const location = useLocation();

  return (
    <aside className="dashboard-sidebar">
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
                <Link to={item.path} className={`menu-item ${isActive ? 'active' : ''}`}>
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
                <Link to={item.path} className="menu-item">
                  <Icon size={20} className="menu-icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button className="menu-item logout-btn">
              <LogOut size={20} className="menu-icon" />
              <span>تسجيل الخروج</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;