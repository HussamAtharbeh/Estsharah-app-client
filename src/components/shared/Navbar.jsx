import React from 'react';
import { Link,NavLink,useLocation  } from 'react-router-dom';
import '../../styles/componentsStyle/sharedStyle/Navbar.css'
import { Scale } from 'lucide-react'; 


const MAIN_LINKS = [
  { path: '/', label: 'الرئيسية' },
  { path: '/lawyers', label: 'المحامون' },
  { path: '/services', label: 'خدماتنا' },
  { path: '/about', label: 'من نحن' },
  { path: '/blog', label: 'المدونة' },
  { path: '/contact', label: 'تواصل معنا' },
];

const AUTH_LINKS = [
  { path: '/signin', label: 'تسجيل الدخول' },
  { path: '/signup', label: 'إنشاء حساب' },
];

export const Navbar = () => {
  const location = useLocation(); 
  if (location.pathname === '/signin' ||location.pathname==='/signup/client'
    ||location.pathname==='/signup/lawyer'|| location.pathname === '/signup') {
    return null; 
  }
  return (
        <header className="navbar-wrapper">
    <nav className="navbar-container">

        <Link to="/" className="navbar-logo">
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
          <NavLink key={link.path} to={link.path} 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="auth-links">
        {AUTH_LINKS.map((link) => (
          <Link key={link.path} to={link.path} className="nav-link auth-btn">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  </header>
  );
};