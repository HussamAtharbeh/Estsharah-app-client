import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import ConsultationCard from '../../components/client/ConsultationCard';
import ComplaintModal from '../../components/client/ComplaintModal';
import RatingModal from '../../components/client/RatingModal';

import { getToken } from '../../utils/auth';

import '../../styles/pagesStyle/clientStyle/MyConsultations.css';
import '../../styles/componentsStyle/clientStyle/ConsultationCard.css';

const MyConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => {
    setRefreshKey((key) => key + 1);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchConsultations = async () => {
      try {
        setLoading(true);
        setError('');

        const token = getToken();

        const response = await fetch(
          'http://localhost:5000/api/consultations/me',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'حدث خطأ أثناء تحميل الاستشارات'
          );
        }

        if (!cancelled) {
          setConsultations(data);
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

    fetchConsultations();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const openComplaint = (consultation) => {
    setSelectedConsultation(consultation);
    setModalType('complaint');
  };

  const openRating = (consultation) => {
    setSelectedConsultation(consultation);
    setModalType('rating');
  };

  const closeModal = () => {
    setSelectedConsultation(null);
    setModalType(null);
  };

  const handleSaved = () => {
    closeModal();
    reload();
  };

  const handleCancel = async (consultation) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من إلغاء الاستشارة "${consultation.title}"؟`
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/consultations/${consultation.id}/cancel`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء إلغاء الاستشارة'
        );
      }

      reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="my-consultations-page">

      <div className="my-consultations-container">

        <div className="my-consultations-header">

          <h1 className="my-consultations-title">
            جميع الاستشارات
          </h1>

          <Link
            to="/lawyers"
            className="new-consultation-btn"
          >
            <Plus size={20} />
            <span>حجز استشارة جديدة</span>
          </Link>

        </div>

        <div className="consultations-list">

          {loading && (
            <p
              style={{
                textAlign: 'center',
                color: '#94a3b8'
              }}
            >
              جارٍ التحميل...
            </p>
          )}

          {!loading && error && (
            <p className="form-error">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            consultations.length === 0 && (
              <p
                style={{
                  textAlign: 'center',
                  color: '#94a3b8'
                }}
              >
                لا توجد استشارات بعد — ابدأ بحجز استشارة جديدة.
              </p>
            )}

          {consultations.map((consultation) => (
            <ConsultationCard
              key={consultation.id}
              consultation={consultation}
              onComplaint={openComplaint}
              onRating={openRating}
              onCancel={handleCancel}
            />
          ))}

        </div>

      </div>

      {modalType === 'complaint' && (
        <ComplaintModal
          consultation={selectedConsultation}
          onClose={closeModal}
          onSaved={handleSaved}
        />
      )}

      {modalType === 'rating' && (
        <RatingModal
          consultation={selectedConsultation}
          onClose={closeModal}
          onSaved={handleSaved}
        />
      )}

    </div>
  );
};

export default MyConsultations;