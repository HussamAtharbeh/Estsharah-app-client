import React from 'react';
import {
  AlertCircle,
  Star,
  X,
  Video,
  MapPin
} from 'lucide-react';

import {
  CONSULTATION_STATUS_LABELS,
  consultationStatusClass,
  consultationTypeLabel,
  formatDate,
  formatPrice
} from '../../utils/labels';

import '../../styles/componentsStyle/clientStyle/ConsultationCard.css';

const ConsultationCard = ({
  consultation,
  onComplaint,
  onRating,
  onCancel
}) => {
  const statusClass = consultationStatusClass(
    consultation.status
  );

  const isCancellable = [
    'pending',
    'confirmed'
  ].includes(consultation.status);

  return (
    <article className="consultation-card">

      <div className="consultation-info">

        <div className="consultation-top-row">

          <span className="consultation-id">
            IST-{String(consultation.id).padStart(4, '0')}
          </span>

          <span
            className={`consultation-status ${statusClass}`}
          >
            {CONSULTATION_STATUS_LABELS[consultation.status]}
          </span>

        </div>

        <h2 className="consultation-title">
          {consultation.title}
        </h2>

        <div className="consultation-details">

          <span>
            المحامي {consultation.lawyer_name}
          </span>

          <span>•</span>

          <span>
            {consultationTypeLabel(consultation.type)}
          </span>

          <span>•</span>

          <span>
            {formatDate(consultation.scheduled_date)}
            {' — '}
            {consultation.scheduled_time}
          </span>

          <span>•</span>

          <strong>
            {formatPrice(consultation.price)}
          </strong>

        </div>

        {consultation.meeting_link && (
          <a
            className="consultation-link"
            href={consultation.meeting_link}
            target="_blank"
            rel="noreferrer"
          >
            <Video size={15} />
            <span>رابط الاجتماع</span>
          </a>
        )}

        {consultation.office_location && (
          <a
            className="consultation-link"
            href={consultation.office_location}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={15} />
            <span>موقع المكتب</span>
          </a>
        )}

      </div>

      <div className="consultation-actions">

        {consultation.status === 'completed' &&
          !consultation.rated && (
            <button
              className="rating-btn"
              onClick={() => onRating(consultation)}
            >
              <span>قيّم المحامي</span>
              <Star size={16} />
            </button>
          )}

        {isCancellable && (
          <button
            className="cancel-btn"
            onClick={() => onCancel(consultation)}
          >
            <span>إلغاء</span>
            <X size={16} />
          </button>
        )}

        <button
          className="complaint-btn"
          onClick={() => onComplaint(consultation)}
        >
          <span>شكوى</span>
          <AlertCircle size={16} />
        </button>

      </div>

    </article>
  );
};

export default ConsultationCard;