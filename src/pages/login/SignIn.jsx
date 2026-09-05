import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Mail, Lock } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import '../../styles/pagesStyle/loginStyle/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    console.log("محاولة تسجيل دخول:", { email, password });
  };

  return (
    <div className="signin-layout">
      <div className="signin-form-section">
        <div className="signin-container">

          <Link to="/" className="signin-logo">
            <div className="logo-icon">
              <Scale size={28} color="white" />
            </div>

            <div className="logo-text">
              <span className="logo-text-ar">استشارة</span>
              <span className="logo-text-en">ISTISHARA</span>
            </div>
          </Link>

          <div className="signin-header">
            <h1>مرحباً بعودتك</h1>
            <p>أدخل بياناتك للوصول إلى حسابك</p>
          </div>

          <form className="signin-form" onSubmit={login}>

            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="name@email.com"
              dir="ltr"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="كلمة المرور"
              type="password"
              placeholder="••••••••"
              dir="ltr"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>تذكرني</span>
              </label>

              <Link
                to="/forgot-password"
                className="forgot-link"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            <Button type="submit">
              تسجيل الدخول
            </Button>

          </form>

          <div className="signup-prompt">
            ليس لديك حساب؟
            <Link to="/signup">إنشاء حساب</Link>
          </div>

        </div>
      </div>

      <div className="signin-image-section">
        <div className="testimonial-card">

          <div className="stars">
            ★★★★★
          </div>

          <p className="quote">
            "حصلت على استشارة قانونية متميزة خلال ساعة واحدة فقط.
            المنصة سهّلت عليّ الوصول لأفضل المحامين في الأردن"
          </p>

          <div className="author-info">
            <div className="author-avatar">
              ف
            </div>

            <div className="author-text">
              <h4>فاطمة العلي</h4>
              <span>عميلة منذ 2026</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;