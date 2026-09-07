import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Scale } from 'lucide-react';
import '../../styles/componentsStyle/sharedStyle/Footer.css';

const QUICK_LINKS = [
  { id: 1, label: 'الرئيسية', path: '/' },
  { id: 2, label: 'المحامون', path: '/lawyers' },
  { id: 3, label: 'خدماتنا', path: '/services' },
  { id: 4, label: 'من نحن', path: '/about' },
  { id: 5, label: 'المدونة', path: '/blog' },
  { id: 6, label: 'تواصل معنا', path: '/contact' }
];

const SPECIALIZATIONS = [
  { id: 1, label: 'القانون التجاري' },
  { id: 2, label: 'قانون الأسرة' },
  { id: 3, label: 'القانون الجزائي' },
  { id: 4, label: 'قانون العقارات' }
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Scale size={22} strokeWidth={2.5} />
              </div>
              <span>استشارة</span>
            </div>
            <p>
              المنصة الأولى للاستشارات القانونية الرقمية
              <br />
              في الشرق الأوسط.
            </p>
          </div>

          <div className="footer-column">
            <h3>روابط سريعة</h3>
            <div className="footer-links">
              {QUICK_LINKS.map((link) => (
                <Link 
                  key={link.id} 
                  to={link.path}
                  onClick={() => window.scrollTo(0, 0)} 
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>التخصصات</h3>
            <div className="footer-links">
              {SPECIALIZATIONS.map((item) => (
                <Link 
                  key={item.id} 
                  to="/lawyers"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-column footer-contact">
            <h3>تواصل معنا</h3>
            <a href="mailto:hussamoatharbeh@gmail.com" className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <span dir="ltr">hussamoatharbeh@gmail.com</span>
            </a>
            <a href="tel:+962795140439" className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <span dir="ltr">+962 795140439</span>
            </a>
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>عمان، الأردن</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 استشارة. جميع الحقوق محفوظة.</p>
          <div className="footer-legal">
            <Link to="/">سياسة الخصوصية</Link>
            <Link to="/">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;