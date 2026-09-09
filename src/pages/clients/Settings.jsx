import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import {
  getUser,
  getToken,
  saveAuth
} from '../../utils/auth';

import { CITIES } from '../../utils/labels';

import '../../styles/pagesStyle/clientStyle/Settings.css';

const Settings = () => {
  const user = getUser();

  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    city: user?.city ?? ''
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setStatus({
      type: '',
      message: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    setStatus({
      type: '',
      message: ''
    });

    try {
      const token = getToken();

      const response = await fetch(
        'http://localhost:5000/api/users/me',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            city: formData.city
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء حفظ التعديلات'
        );
      }

      saveAuth(data, token);

      setStatus({
        type: 'success',
        message: 'تم حفظ التعديلات بنجاح'
      });

    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message
      });
    } finally {
      setSaving(false);
    }
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
                required
              />

              <Input
                label="البريد"
                type="email"
                name="email"
                value={formData.email}
                placeholder="example@mail.com"
                dir="ltr"
                icon={Mail}
                disabled
                readOnly
              />

              <Input
                label="الهاتف"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="07X XXX XXXX"
                dir="ltr"
                icon={Phone}
              />

              <div className="form-input-group">

                <label>
                  المدينة
                </label>

                <div className="input-wrapper">

                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">
                      اختر المدينة
                    </option>

                    {CITIES.map((city) => (
                      <option
                        key={city.value}
                        value={city.value}
                      >
                        {city.label}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

            </div>

            {status.message && (
              <p
                className={
                  status.type === 'error'
                    ? 'form-error'
                    : 'form-success'
                }
              >
                {status.message}
              </p>
            )}

            <div className="settings-actions">

              <Button
                type="submit"
                disabled={saving}
              >
                {saving
                  ? 'جارٍ الحفظ...'
                  : 'حفظ التعديلات'}
              </Button>

            </div>

          </form>

        </section>

      </div>

    </div>
  );
};

export default Settings;