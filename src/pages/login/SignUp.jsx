import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, User, Briefcase } from 'lucide-react';
import { AuthSidebar } from '../../components/shared/AuthSidebar';
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

      <AuthSidebar />

    </div>
  );
};

export default SignUp;