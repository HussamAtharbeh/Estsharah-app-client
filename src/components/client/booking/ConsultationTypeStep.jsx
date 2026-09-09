import React from 'react';
import {
  Video,
  Phone,
  MapPin,
  Mail
} from 'lucide-react';

import '../../../styles/pagesStyle/clientStyle/ConsultationTypeStep.css';

const icons = {
  video: Video,
  phone: Phone,
  office: MapPin
};

const ConsultationTypeStep = ({
  types,
  selectedType,
  onSelect,
  clientPhone,
  onPhoneChange
}) => {
  return (
    <section className="booking-step-card consultation-type-step">

      <div className="booking-step-header">
        <h2>طريقة التواصل</h2>
        <p>كيف تفضل أن تتم الاستشارة؟</p>
      </div>

      {types.length === 0 && (
        <p className="form-error">
          لم يقم هذا المحامي بتفعيل أي نوع من الاستشارات بعد.
        </p>
      )}

      <div className="consultation-types">
        {types.map((type) => {
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
            <h3>رقم التواصل</h3>
          </div>

          <div className="phone-fields">

            <div className="phone-field">
              <label htmlFor="main-phone">
                رقم الهاتف الذي سيتصل به المحامي *
              </label>

              <input
                id="main-phone"
                type="tel"
                placeholder="07XXXXXXXX"
                dir="ltr"
                value={clientPhone}
                onChange={(e) =>
                  onPhoneChange(e.target.value)
                }
                required
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
            <h3>اجتماع عبر الإنترنت</h3>
            <p>
              سيرسل لك المحامي رابط الاجتماع بعد قبول الطلب،
              وستجده في صفحة "استشاراتي".
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
              سيرسل لك المحامي موقع المكتب بعد قبول الطلب،
              وستجده في صفحة "استشاراتي".
            </p>
          </div>

        </div>
      )}

    </section>
  );
};

export default ConsultationTypeStep;