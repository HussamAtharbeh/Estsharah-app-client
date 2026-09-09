import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Scale, Menu, X } from 'lucide-react';

import {
  getUser,
  isLoggedIn,
  clearAuth,
  homePathFor
} from '../../utils/auth';

import '../../styles/componentsStyle/sharedStyle/Navbar.css';

const MAIN_LINKS = [
  { path: '/', label: 'الرئيسية' },
  { path: '/lawyers', label: 'المحامون' },
  { path: '/services', label: 'خدماتنا' },
  { path: '/about', label: 'من نحن' },
  { path: '/blog', label: 'المدونة' },
  { path: '/contact', label: 'تواصل معنا' },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loggedIn = isLoggedIn();
  const user = loggedIn ? getUser() : null;

  if (!MAIN_LINKS.some(link => link.path === location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    clearAuth();
    navigate('/signin');
  };

  const accountPath = user ? homePathFor(user.role) : '/signin';

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-container">

        <Link
          to="/"
          onClick={closeMenu}
          className="navbar-logo"
        >
          <div className="logo-icon">
            <Scale size={24} color="white" />
          </div>

          <div className="logo-text">
            <span className="logo-ar">استشارة</span>
            <span className="logo-en">ISTISHARA</span>
          </div>
        </Link>

        <div className="main-links">
          {MAIN_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="auth-links">
          {loggedIn ? (
            <>
              <button type="button" onClick={handleLogout} className="nav-link">
                تسجيل الخروج
              </button>
              <Link to={accountPath} className="nav-link nav-link-primary">
                حسابي
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-link">
                تسجيل الدخول
              </Link>
              <Link to="/signup" className="nav-link nav-link-primary">
                إنشاء حساب
              </Link>
            </>
          )}

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X size={28} color="#0B1320" /> : <Menu size={28} color="#0B1320" />}
          </button>
        </div>

      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          {MAIN_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;