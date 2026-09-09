import React, { useState } from 'react';
import {
  Video,
  MapPin,
  AlertCircle,
  Phone,
  CheckCircle,
  FileText
} from 'lucide-react';

import {
  consultationStatusClass,
  consultationTypeLabel,
  formatDate,
  initialOf
} from '../../utils/labels';

import { getToken } from '../../utils/auth';
import '../../styles/componentsStyle/lawersStyle/ConsultationCard.css';

const ConsultationCard = ({ consultation, onOpenModal, onComplete }) => {
  const {
    id,
    client_name,
    client_account_phone,
    type,
    status,
    price,
    title,
    description,
    scheduled_date,
    scheduled_time
  } = consultation;

  const [showDetails, setShowDetails] = useState(false);

  const statusClass = consultationStatusClass(status);
  const isActive = status === 'confirmed';

  const handleComplete = async () => {
    try {
      const token = getToken();

      const res = await fetch(
        `http://localhost:5000/api/consultations/${id}/complete`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء إنهاء الاستشارة'
        );
      }

      if (onComplete) {
        onComplete(consultation);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="consultation-card-modern">

      <div className="consultation-card-header">

        <div className="header-client-info">

          <div className="client-avatar">
            {initialOf(client_name)}
          </div>

          <div className="client-text">

            <h2>{client_name}</h2>

            <div className="client-subtext">

              <span className="order-type">
                {consultationTypeLabel(type)}
              </span>

              <span className="order-id">
                IST-{String(id).padStart(4, '0')}
              </span>

              <span className="order-date">
                {formatDate(scheduled_date)} — {scheduled_time}
              </span>

            </div>

            <p className="order-title">
              {title}
            </p>

          </div>

        </div>

        <div className="header-status-price">

          <span className={`status-badge ${statusClass}`}>
            {isActive ? 'نشطة' : 'مكتملة'}
          </span>

          <span className="price-text">
            {price} د.أ
          </span>

        </div>

      </div>



      <div className="consultation-details-section">

        <button
          className="show-details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          <FileText size={18} />

          <span>
            {showDetails
              ? 'إخفاء تفاصيل الاستشارة'
              : 'عرض تفاصيل الاستشارة'}
          </span>

        </button>


        {showDetails && (
          <div className="lawyer-details-panel">

            <div className="lawyer-details-title">
              <FileText size={20} />

              <div>
                <h3>تفاصيل الاستشارة</h3>
                <p>المعلومات التي أرسلها العميل عند الحجز</p>
              </div>
            </div>


            <div className="lawyer-details-grid">

              <div className="lawyer-detail-item">
                <span>عنوان الاستشارة</span>
                <strong>{title || 'غير محدد'}</strong>
              </div>


              <div className="lawyer-detail-item">
                <span>اسم العميل</span>
                <strong>{client_name || 'غير محدد'}</strong>
              </div>


              <div className="lawyer-detail-item">
                <span>نوع الاستشارة</span>
                <strong>
                  {consultationTypeLabel(type)}
                </strong>
              </div>


              <div className="lawyer-detail-item">
                <span>التاريخ</span>
                <strong>
                  {formatDate(scheduled_date)}
                </strong>
              </div>


              <div className="lawyer-detail-item">
                <span>الوقت</span>
                <strong>
                  {scheduled_time}
                </strong>
              </div>


              <div className="lawyer-detail-item">
                <span>السعر</span>
                <strong>
                  {price} د.أ
                </strong>
              </div>


              {type === 'phone' && client_account_phone && (
                <div className="lawyer-detail-item">
                  <span>رقم هاتف العميل</span>
                  <strong>
                    {client_account_phone}
                  </strong>
                </div>
              )}

            </div>


            <div className="lawyer-description-box">

              <div className="lawyer-description-header">
                <FileText size={18} />

                <strong>
                  وصف المشكلة
                </strong>
              </div>

              <p>
                {description || 'لم يرسل العميل وصفاً للمشكلة.'}
              </p>

            </div>

          </div>
        )}

      </div>



      {isActive && (
        <div className="consultation-card-actions">

          {type === 'video' && (
            <button
              className="action-box video-action"
              onClick={() =>
                onOpenModal('link', consultation)
              }
            >
              <div className="action-icon-circle">
                <Video size={22} />
              </div>

              <span>
                {consultation.meeting_link
                  ? 'تعديل رابط الاجتماع'
                  : 'إرسال رابط اجتماع'}
              </span>
            </button>
          )}


          {type === 'office' && (
            <button
              className="action-box map-action"
              onClick={() =>
                onOpenModal('location', consultation)
              }
            >
              <div className="action-icon-circle">
                <MapPin size={22} />
              </div>

              <span>
                {consultation.office_location
                  ? 'تعديل موقع المكتب'
                  : 'إرسال موقع المكتب'}
              </span>
            </button>
          )}


          {type === 'phone' && (
            <button
              className="action-box phone-action"
              onClick={() =>
                onOpenModal('phone', consultation)
              }
            >
              <div className="action-icon-circle">
                <Phone size={22} />
              </div>

              <span>
                عرض رقم العميل
              </span>
            </button>
          )}


          <button
            className="action-box complete-action"
            onClick={handleComplete}
          >
            <div className="action-icon-circle">
              <CheckCircle size={22} />
            </div>

            <span>
              إنهاء الاستشارة
            </span>
          </button>


          <button
            className="action-box complaint-action"
            onClick={() =>
              onOpenModal('complaint', consultation)
            }
          >
            <div className="action-icon-circle">
              <AlertCircle size={22} />
            </div>

            <span>
              شكوى على العميل
            </span>
          </button>

        </div>
      )}

    </div>
  );
};

export default ConsultationCard;