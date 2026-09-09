import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  FileText,
  Clock,
  Star,
  Eye,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { cityLabel, specializationLabel } from '../../utils/labels';
import '../../styles/componentsStyle/lawersStyle/LawyerCard.css';
import {User} from 'lucide-react';

const LawyerCard = ({ lawyer }) => {
  return (
    <div className="lawyer-card">
      <div className="card-cover">
        {lawyer.available && (
          <div className="available-badge">
            <span className="dot"></span>
            متاح فوراً
          </div>
        )}

        <div className="card-avatar-wrapper">
          {lawyer.image ? (
  <img
    src={lawyer.image}
    alt={lawyer.name}
    className="card-avatar"
  />
) : (
  <div className="card-avatar">
    <User size={40} />
  </div>
)}
          <CheckCircle2
            className="verified-badge"
            size={20}
          />
        </div>
      </div>

      <div className="card-body">
        <h3 className="lawyer-name">
          المحامي {lawyer.name}
        </h3>

        <p className="lawyer-spec">
          {specializationLabel(lawyer.specialty)}
        </p>

        <div className="lawyer-rating">
          <Star
            className="star-icon"
            size={16}
          />
          <span className="rate-num">
            {Number(lawyer.rating_avg ?? 0).toFixed(1)}
          </span>
          <span className="reviews-count">
            ({lawyer.reviews_count ?? 0} مراجعة)
          </span>
        </div>

        <div className="lawyer-stats-grid">
          <div className="stat-item">
            <MapPin size={16} />
            <span>{cityLabel(lawyer.city)}</span>
          </div>

          <div className="stat-item">
            <Briefcase size={16} />
            <span>{lawyer.experience} سنة خبرة</span>
          </div>

          <div className="stat-item">
            <FileText size={16} />
            <span>{lawyer.cases_count} قضية منجزة</span>
          </div>

          <div className="stat-item">
            <Clock size={16} />
            <span>{lawyer.response_time || 'خلال 24 ساعة'}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="price-section">
          <span className="price-num">
            {lawyer.min_price ?? '—'}
          </span>

          <span className="price-cur">
            د.أ / جلسة
          </span>
        </div>

        <div className="actions-section">
          <Link
            to={`/lawyers/${lawyer.id}`}
            onClick={() => window.scrollTo(0, 0)}
            className="view-profile-btn"
          >
            <Eye size={20} />
          </Link>

          <Link
            to={`/client/consultations/book?lawyer=${lawyer.id}`}
            onClick={() => window.scrollTo(0, 0)}
            className="book-btn"
          >
            <span>احجز الآن</span>
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
