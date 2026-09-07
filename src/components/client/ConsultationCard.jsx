import React from 'react';
import { AlertCircle, Star } from 'lucide-react';
import '../../styles/componentsStyle/clientStyle/ConsultationCard.css';

const ConsultationCard = ({
  consultation,
  onComplaint,
  onRating
}) => {
  const statusClass = consultation.status === 'نشطة'
    ? 'active'
    : consultation.status === 'مكتملة'
      ? 'completed'
      : 'cancelled';

  return (
    <article className="consultation-card">

      <div className="consultation-info">

        <div className="consultation-top-row">
  <span className="consultation-id">
    {consultation.id}
  </span>

  <span className={`consultation-status ${statusClass}`}>
    {consultation.status}
  </span>
</div>

        <h2 className="consultation-title">
          {consultation.title}
        </h2>

        <div className="consultation-details">

          <span>{consultation.lawyer}</span>
          <span>•</span>
                    <span>{consultation.type}</span>

          <span>•</span>
                    <span>{consultation.date}</span>

          <span>•</span>
          <strong>{consultation.price}</strong>

        </div>

      </div>

      <div className="consultation-actions">



{consultation.status === 'مكتملة' && (
          <button
            className="rating-btn"
            onClick={() => onRating(consultation)}
          >
            <span>قيّم المحامي</span>
            <Star size={16} />
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