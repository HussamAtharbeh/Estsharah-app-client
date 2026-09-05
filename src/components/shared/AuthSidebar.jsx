import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import '../../styles/componentsStyle/sharedStyle/AuthSidebar.css';
export const AuthSidebar = () => {
  return (
    <div className="signup-image-section">
      <div className="overlay-content">
        <h2>انضم إلى أكبر منصة قانونية رقمية في الشرق الأوسط</h2>
        <ul className="features-list">
          <li>
            <CheckCircle2 size={22} className="check-icon" />
            <span>أكثر من 500 محامٍ معتمد ومرخص</span>
          </li>
          <li>
            <CheckCircle2 size={22} className="check-icon" />
            <span>مرخص من نقابة المحامين</span>
          </li>
          <li>
            <CheckCircle2 size={22} className="check-icon" />
            <span>استجابة سريعة خلال أقل من ساعة</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
