import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Scale } from 'lucide-react';
import '../../styles/componentsStyle/sharedStyle/Footer.css';

const QUICK_LINKS = [
  { id: 1, label: 'الرئيسية', path: '/' },
  { id: 2, label: 'المحامون', path: '/lawyers' },
  { id: 3, label: 'خدماتنا', path: '/services' },
  { id: 4, label: 'من نحن', path: '/about' }
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
          {/* العمود الأول: الشعار والوصف */}
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

          {/* العمود الثاني: روابط سريعة */}
          <div className="footer-column">
            <h3>روابط سريعة</h3>
            <div className="footer-links">
              {QUICK_LINKS.map((link) => (
                <Link key={link.id} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* العمود الثالث: التخصصات */}
          <div className="footer-column">
            <h3>التخصصات</h3>
            <div className="footer-links">
              {SPECIALIZATIONS.map((item) => (
                <Link key={item.id} to="/lawyers">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* العمود الرابع: تواصل معنا */}
          <div className="footer-column footer-contact">
            <h3>تواصل معنا</h3>
            <a href="mailto:info@istishara.com" className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <span dir="ltr">info@istishara.com</span>
            </a>
            <a href="tel:+96261234567" className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <span dir="ltr">+962 6 123 4567</span>
            </a>
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>عمان، الأردن</span>
            </div>
          </div>
        </div>

        {/* الجزء السفلي: الحقوق والروابط القانونية */}
        <div className="footer-bottom">
          <p>© 2025 استشارة. جميع الحقوق محفوظة.</p>
          <div className="footer-legal">
            <Link to="/privacy">سياسة الخصوصية</Link>
            <Link to="/terms">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;