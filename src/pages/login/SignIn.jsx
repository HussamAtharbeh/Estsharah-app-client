import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Mail, Lock } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { homePathFor, saveAuth } from '../../utils/auth';
import '../../styles/pagesStyle/loginStyle/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'حدث خطأ، حاول مرة أخرى');
        return;
      }

      saveAuth(data.user, data.token);

      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');

      window.location.href = redirect || homePathFor(data.user.role);
    } catch (err) {
      setError('تعذر الاتصال بالسيرفر، تأكد من اتصالك بالإنترنت');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-layout">
      <div className="signin-form-section">
        <div className="signin-container">

          <Link
            to="/"
            className="signin-logo"
            title="العودة للصفحة الرئيسية"
            aria-label="العودة للصفحة الرئيسية"
          >
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

          <form className="signin-form" onSubmit={login} autoComplete="off">

            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="name@email.com"
              autoComplete="new-email"
              dir="ltr"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="كلمة المرور"
              type="password"
              placeholder="••••••••"
              dir="ltr"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="form-error">{error}</p>}

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>تذكرني</span>
              </label>

              <Link to="/forgot-password" className="forgot-link">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
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