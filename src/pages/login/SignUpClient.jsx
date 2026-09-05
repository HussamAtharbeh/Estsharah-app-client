import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AuthSidebar } from '../../components/shared/AuthSidebar';
import '../../styles/pagesStyle/loginStyle/SignUp.css';
import '../../styles/pagesStyle/loginStyle/SignUpClient.css';

const SignUpClient = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <div className="signup-layout">

      <div className="signup-form-section">
        <div className="signup-container client-form-container">

          <Link to="/signup" className="back-link">
            <ChevronRight size={18} />
            <span>رجوع</span>
          </Link>

          <div className="signup-header">
            <h1>إنشاء حساب عميل</h1>
            <p>أدخل بياناتك للبدء في استخدام المنصة</p>
          </div>

          <form className="client-signup-form" onSubmit={handleSubmit}>

            <Input
              label="الاسم الكامل"
              placeholder="الاسم الرباعي"
              type="text"
              dir="rtl"
              required
            />

            <Input
              label="البريد الإلكتروني"
              placeholder="name@email.com"
              type="email"
              dir="ltr"
              required
            />

            <Input
              label="رقم الجوال"
              placeholder="+962 7X XXX XXXX"
              type="tel"
              dir="ltr"
              required
            />

            <Input
              label="كلمة المرور"
              placeholder="8 أحرف على الأقل"
              type="password"
              dir="rtl"
              required
            />

            <Button type="submit">
              إنشاء الحساب
            </Button>

          </form>

          <div className="terms-text">
            بالتسجيل أنت توافق على <span>الشروط والأحكام</span> و <span>سياسة الخصوصية</span>
          </div>

        </div>
      </div>

      <AuthSidebar />

    </div>
  );
};

export default SignUpClient;