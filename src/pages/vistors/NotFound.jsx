import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import bgImage from '../../assets/images/notFound.png';
import '../../styles/pagesStyle/vistorsStyle/NotFound.css';

const NotFound = () => {
  return (
    <div 
      className="notfound-lux-page" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="notfound-lux-content">
        <h1 className="notfound-lux-title">الصفحة غير موجودة</h1>
        <p className="notfound-lux-desc">
          عذراً، الصفحة التي تبحث عنها غير موجودة<br />
          أو ربما تم نقلها إلى مكان آخر.
        </p>
        <Link to="/" 
        onClick={() => window.scrollTo(0, 0)}
        className="notfound-lux-btn">
          <span className="btn-icon">
            <ArrowLeft size={18} />

          </span>
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;