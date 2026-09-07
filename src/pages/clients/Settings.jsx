import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import '../../styles/pagesStyle/clientStyle/Settings.css';

const Settings = () => {
  const { user, setUser } = useOutletContext();

  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
  };

  return (
    <div className="settings-page">
      <div className="settings-container">

        <h1 className="settings-title">
          إعدادات الحساب
        </h1>

        <section className="settings-card">

          <h2 className="settings-card-title">
            المعلومات الشخصية
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="settings-grid">

              <Input
                label="الاسم"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك الكامل"
                dir="rtl"
              />

              <Input
                label="البريد"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                dir="ltr"
                icon={Mail}
              />

              <Input
                label="الهاتف"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+962 79 000 0000"
                dir="ltr"
                icon={Phone}
              />

              <Input
                label="المدينة"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="أدخل اسم المدينة"
                dir="rtl"
                icon={MapPin}
              />

            </div>

            <div className="settings-actions">
              <Button type="submit">
                حفظ التعديلات
              </Button>
            </div>

          </form>

        </section>

      </div>
    </div>
  );
};

export default Settings;