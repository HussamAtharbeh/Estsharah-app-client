import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { TextField, Button } from '@mui/material';
import '../../styles/pagesStyle/vistorsStyle/Contact.css';

const CONTACT_INFO = [
  {
    id: 1,
    icon: MapPin,
    title: 'المقر الرئيسي',
    value: 'عمان',
    link: null
  },
  {
    id: 2,
    icon: Mail,
    title: 'البريد الإلكتروني',
    value: 'hussamoatharbeh@gmail.com',
    link: 'mailto:hussamoatharbeh@gmail.com'
  },
  {
    id: 3,
    icon: Phone,
    title: 'اتصل بنا',
    value: '079517043',
    link: 'tel:079517043'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <span className="section-subtitle">تواصل معنا</span>
        <h1>نحن هنا لمساعدتك</h1>
        <p>
          لا تتردد في التواصل معنا لأي استفسار أو طلب. فريقنا جاهز لخدمتك.
        </p>
      </div>

      <div className="contact-cards-container">
        {CONTACT_INFO.map((info) => {
          const IconComp = info.icon;

          return (
            <div className="contact-card" key={info.id}>
              <div className="card-icon">
                <IconComp size={24} />
              </div>

              <h3>{info.title}</h3>

              {info.link ? (
                <a href={info.link}>{info.value}</a>
              ) : (
                <p>{info.value}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="contact-form-container">
        <div className="form-card">
          <h2>أرسل رسالتك</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="mui-field">
                <TextField
                  fullWidth
                  name="name"
                  placeholder="الاسم الكامل"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </div>

              <div className="mui-field">
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ '& input': { direction: 'ltr' } }}
                />
              </div>
            </div>

            <div className="mui-field">
              <TextField
                fullWidth
                name="subject"
                placeholder="الموضوع"
                value={formData.subject}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </div>

            <div className="mui-field message-field">
              <TextField
                fullWidth
                name="message"
                placeholder="نص الرسالة"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={5}
                variant="outlined"
              />
            </div>

            <Button
              type="submit"
              className="submit-btn"
              variant="contained"
            >
              إرسال الرسالة
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;