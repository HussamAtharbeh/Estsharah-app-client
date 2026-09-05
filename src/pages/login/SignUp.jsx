import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, User, CheckCircle2,Briefcase } from 'lucide-react';
import '../../styles/pagesStyle/loginStyle/SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-layout">
      
      <div className="signup-form-section">
        <div className="signup-container">
          
          <Link to="/" className="signup-logo">
            <div className="logo-icon">
              <Scale size={28} color="white" />
            </div>
            <div className="logo-text">
              <span className="logo-text-ar">استشارة</span>
              <span className="logo-text-en">ISTISHARA</span>
            </div>
          </Link>

          <div className="signup-header">
            <h1>إنشاء حساب جديد</h1>
            <p>اختر نوع حسابك للبدء</p>
          </div>

          <div className="roles-container">
            <Link to="/signup/client" className="role-card">
              <div className="role-icon-wrapper blue-bg">
                <User size={32} color="white" />
              </div>
              <h3>عميل</h3>
              <p>احصل على استشارات وخدمات قانونية من نخبة المحامين</p>
            </Link>

                       <Link to="/signup/lawyer" className="role-card">
              <div className="role-icon-wrapper gold-bg">
                <Briefcase size={32} color="white" />
              </div>
              <h3>محامي</h3>
              <p>قدم استشاراتك القانونية وانضم لشبكة المحامين المعتمدين</p>
            </Link>
          </div>

          <div className="signin-prompt">
            لديك حساب؟ <Link to="/signin">تسجيل الدخول</Link>
          </div>

        </div>
      </div>

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

    </div>
  );
};

export default SignUp;