import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight, MapPin, Star, Briefcase, FileText, Calendar,
  CheckCircle2, Building2, Users, Scale, ShieldAlert, HardHat, Home
} from 'lucide-react';
import { cityLabel, specializationLabel } from '../../utils/labels';
import '../../styles/componentsStyle/lawersStyle/LawyerProfile.css';
import {User} from 'lucide-react';
const specialtyIcons = {
  "قانون تجاري وشركات": Building2,
  "قانون تجاري": Building2,
  "قانون مدني": Scale,
  "قانون جنائي": ShieldAlert,
  "قانون أحوال شخصية": Users,
  "قانون العمل": HardHat,
  "قانون عقاري": Home,
  "الملكية الفكرية": FileText
};

const LawyerProfile = () => {
  const { id } = useParams();

  const [lawyer, setLawyer] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let cancelled = false;

  const loadLawyer = async () => {
    try {
      const res = await fetch(
  `http://localhost:5000/api/lawyers/${id}`
);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'حدث خطأ أثناء جلب بيانات المحامي');
      }

      if (!cancelled) {
        setLawyer(data);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadLawyer();

  return () => {
    cancelled = true;
  };
}, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>جارٍ التحميل...</h2>
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>لم يتم العثور على بيانات المحامي</h2>
        <Link to="/lawyers">العودة لقائمة المحامين</Link>
      </div>
    );
  }

  const specialtyText = specializationLabel(lawyer.specialty);

  return (
    <div className="lawyer-profile-page">
      <div className="lp-header">
        <div className="lp-container">
          <Link to="/lawyers" className="lp-back-link">
            <ChevronRight size={18} />
            العودة للمحامين
          </Link>

          <div className="lp-header-content">
            <div className="lp-header-right">
              <div className="lp-image-wrapper">

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

<div className="lp-verified-badge">
                  <CheckCircle2 size={16} className="lp-badge-icon" fill="#C9A86A" color="#ffffff" />
                  <span>موثق</span>
                </div>
              </div>

              <div className="lp-info-wrapper">
                <div className="lp-badges-row">
                  <span className="lp-badge-gold">موقع رسمي</span>
                  {lawyer.available && (
                    <span className="lp-badge-green">
                      <span className="lp-green-dot"></span>
                      متاح للاستشارة الآن
                    </span>
                  )}
                </div>

                <h1 className="lp-lawyer-name">المحامي {lawyer.name}</h1>

                <div className="lp-location-row">
                  <MapPin size={18} className="lp-gold-icon" />
                  <span>{specialtyText} · {cityLabel(lawyer.city)}</span>
                </div>

                <div className="lp-stats-bar">
                  <div className="lp-stat-item">
                    <Star size={24} className="lp-gold-icon" fill="currentColor" />
                    <div className="lp-stat-text-col">
                      <span className="lp-stat-val">{Number(lawyer.rating_avg ?? 0).toFixed(1)}</span>
                      <span className="lp-stat-label">({lawyer.reviews_count} تقييم)</span>
                    </div>
                  </div>

                  <div className="lp-stat-item">
                    <Briefcase size={20} className="lp-white-icon" />
                    <span className="lp-stat-val-inline">{lawyer.experience} سنة خبرة</span>
                  </div>

                  <div className="lp-stat-item">
                    <FileText size={20} className="lp-white-icon" />
                    <span className="lp-stat-val-inline">{lawyer.cases_count} قضية مغلقة</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lp-header-left">
              <Link to={`/client/consultations/book?lawyer=${lawyer.id}`} className="lp-book-btn">
                <Calendar size={20} />
                طلب الاستشارة — تبدأ من {lawyer.min_price ?? '—'} د.أ
              </Link>
              <span className="lp-secure-text">استشارة آمنة ومباشرة مع المحامي</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lp-body">
        <div className="lp-container">
          <div className="lp-section">
            <h2 className="lp-section-title">نبذة عن المحامي</h2>
            <p className="lp-bio-text">
              {lawyer.bio ||
                `محام متخصص في ${specialtyText} مع خبرة تتجاوز ${lawyer.experience} عاماً في المحاكم الأردنية.`}
            </p>
          </div>

          <div className="lp-section">
            <h2 className="lp-section-title">التخصصات</h2>
            <div className="lp-tags-container">

              {lawyer.specialties?.map((specialty, index) => {
                const TagIcon = specialtyIcons[specialty] || Briefcase;
                return (
                  <div className="lp-tag" key={index}>
                    <TagIcon size={18} className="lp-tag-icon" />
                    <span>{specialty}</span>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LawyerProfile;
