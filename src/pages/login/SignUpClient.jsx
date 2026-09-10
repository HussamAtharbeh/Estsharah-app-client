import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AuthSidebar } from '../../components/shared/AuthSidebar';
import { saveAuth } from '../../utils/auth';
import { CITIES } from '../../utils/labels';
import '../../styles/pagesStyle/loginStyle/SignUp.css';
import '../../styles/pagesStyle/loginStyle/SignUpClient.css';
import {API_URL} from "../../config"
const SignUpClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup/client`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'حدث خطأ، حاول مرة أخرى');
        return;
      }

     
      saveAuth(data.user, data.token);
      window.location.href = '/client';
    } catch (err) {
      setError('تعذر الاتصال بالسيرفر، تأكد من اتصالك بالإنترنت');
    } finally {
      setLoading(false);
    }
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
              name="name"
              placeholder="الاسم الرباعي"
              type="text"
              dir="rtl"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="البريد الإلكتروني"
              name="email"
              placeholder="name@email.com"
              type="email"
              dir="ltr"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="رقم الجوال"
              name="phone"
              placeholder="07X XXX XXXX"
              type="tel"
              dir="ltr"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <div className="form-input-group">
              <label>المدينة</label>
              <div className="input-wrapper">
                <select name="city" value={formData.city} onChange={handleChange} required>
                  <option value="">اختر المدينة</option>
                  {CITIES.map((city) => (
                    <option key={city.value} value={city.value}>{city.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              label="كلمة المرور"
              name="password"
              placeholder="6 أحرف على الأقل"
              type="password"
              dir="rtl"
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <p className="form-error">{error}</p>}

            <Button type="submit" disabled={loading}>
              {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
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