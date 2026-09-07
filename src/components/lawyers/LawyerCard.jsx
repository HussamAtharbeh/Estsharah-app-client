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
import '../../styles/componentsStyle/lawersStyle/LawyerCard.css';

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
          <img
            src={lawyer.image}
            alt={lawyer.name}
            className="card-avatar"
          />
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
          {lawyer.spec}
        </p>

        <div className="lawyer-rating">
          <Star
            className="star-icon"
            size={16}
          />
          <span className="rate-num">
            {lawyer.rating}
          </span>
          <span className="reviews-count">
            ({lawyer.reviews} مراجعة)
          </span>
        </div>

        <div className="lawyer-stats-grid">
          <div className="stat-item">
            <MapPin size={16} />
            <span>{lawyer.city}</span>
          </div>

          <div className="stat-item">
            <Briefcase size={16} />
            <span>{lawyer.exp} سنة خبرة</span>
          </div>

          <div className="stat-item">
            <FileText size={16} />
            <span>{lawyer.cases} قضية منجزة</span>
          </div>

          <div className="stat-item">
            <Clock size={16} />
            <span>{lawyer.time}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="price-section">
          <span className="price-num">
            {lawyer.price}
          </span>

          <span className="price-cur">
            د.أ / جلسة
          </span>
        </div>

        <div className="actions-section">
          <Link
            to="/lawyer/profile"
            state={{ lawyerData: lawyer }}
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