import React from 'react';
import {
  Video,
  MapPin,
  AlertCircle,
  Phone
} from 'lucide-react';
import '../../styles/componentsStyle/lawersStyle/ConsultationCard.css';

const ConsultationCard = ({ consultation, onOpenModal }) => {
  const {
    id,
    clientName,
    type,
    status,
    price,
    initials
  } = consultation;

  return (
    <div className="consultation-card-modern">
      <div className="consultation-card-header">
        <div className="header-client-info">
          <div className="client-avatar">
            {initials}
          </div>

          <div className="client-text">
            <h2>{clientName}</h2>

            <div className="client-subtext">
              <span className="order-type">
                {type}
              </span>

              <span className="order-id">
                {id}
              </span>
            </div>
          </div>
        </div>

        <div className="header-status-price">
          <span className={`status-badge ${status}`}>
            {status === 'active' ? 'نشطة' : 'مكتملة'}
          </span>

          <span className="price-text">
            {price} د.أ
          </span>
        </div>
      </div>

      {status === 'active' && (
        <div className="consultation-card-actions">

          {type === 'استشارة فيديو' && (
            <button
              className="action-box video-action"
              onClick={() => onOpenModal('link', consultation)}
            >
              <div className="action-icon-circle">
                <Video size={22} />
              </div>

              <span>إرسال رابط اجتماع</span>
            </button>
          )}

          {type === 'استشارة حضورية' && (
            <button
              className="action-box map-action"
              onClick={() => onOpenModal('location', consultation)}
            >
              <div className="action-icon-circle">
                <MapPin size={22} />
              </div>

              <span>إرسال موقع المكتب</span>
            </button>
          )}

          {type === 'استشارة هاتفية' && (
            <button
              className="action-box phone-action"
              onClick={() => onOpenModal('phone', consultation)}
            >
              <div className="action-icon-circle">
                <Phone size={22} />
              </div>

              <span>عرض رقم العميل</span>
            </button>
          )}

          <button
            className="action-box complaint-action"
            onClick={() => onOpenModal('complaint', consultation)}
          >
            <div className="action-icon-circle">
              <AlertCircle size={22} />
            </div>

            <span>شكوى على العميل</span>
          </button>

        </div>
      )}
    </div>
  );
};

export default ConsultationCard;