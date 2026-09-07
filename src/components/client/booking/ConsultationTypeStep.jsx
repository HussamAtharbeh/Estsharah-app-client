import React from 'react';
import { Video, Phone, MapPin, Mail } from 'lucide-react';
import { consultationTypes } from '../../../data/bookingData';
import '../../../styles/pagesStyle/clientStyle/ConsultationTypeStep.css';

const ConsultationTypeStep = ({ selectedType, onSelect }) => {
  const icons = {
    video: Video,
    phone: Phone,
    office: MapPin
  };

  return (
    <section className="booking-step-card consultation-type-step">
      <div className="booking-step-header">
        <h2>طريقة التواصل</h2>
        <p>كيف تفضل أن تتم الاستشارة؟</p>
      </div>

      <div className="consultation-types">
        {consultationTypes.map((type) => {
          const Icon = icons[type.id];

          return (
            <button
              type="button"
              key={type.id}
              className={`consultation-type-card ${
                selectedType === type.id ? 'selected' : ''
              }`}
              onClick={() => onSelect(type.id)}
            >
              <div className="consultation-type-icon">
                <Icon size={26} />
              </div>

              <div className="consultation-type-content">
                <h3>{type.title}</h3>
                <strong>{type.price} د.أ</strong>
              </div>
            </button>
          );
        })}
      </div>

      {selectedType === 'phone' && (
        <div className="consultation-extra phone-extra">
          <div className="consultation-extra-header">
            <Phone size={23} />
            <h3>أرقام التواصل</h3>
          </div>

          <div className="phone-fields">
            <div className="phone-field">
              <label htmlFor="main-phone">
                رقم الهاتف الرئيسي *
              </label>

              <input
                id="main-phone"
                type="tel"
                placeholder="079XXXXXXXX"
                dir="ltr"
              />
            </div>

            <div className="phone-field">
              <label htmlFor="alternative-phone">
                رقم بديل (اختياري)
              </label>

              <input
                id="alternative-phone"
                type="tel"
                placeholder="07XXXXXXXX"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      )}

      {selectedType === 'video' && (
        <div className="consultation-extra video-extra">
          <div className="consultation-extra-icon">
            <Video size={25} />
          </div>

          <div className="consultation-extra-content">
            <h3>اجتماع Google Meet</h3>
            <p>
              سيتم إرسال رابط دعوة الاجتماع عبر Google Meet
              إلى بريدك الإلكتروني المسجل لدينا قبل الموعد بـ 15 دقيقة.
            </p>
          </div>
        </div>
      )}

      {selectedType === 'office' && (
        <div className="consultation-extra office-extra">
          <div className="consultation-extra-icon">
            <Mail size={25} />
          </div>

          <div className="consultation-extra-content">
            <h3>موقع مكتب المحامي</h3>
            <p>
              تم إرسال الموقع على الإيميل.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConsultationTypeStep;