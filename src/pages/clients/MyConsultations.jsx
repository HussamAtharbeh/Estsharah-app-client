import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConsultationCard from '../../components/client/ConsultationCard';
import ComplaintModal from '../../components/client/ComplaintModal';
import RatingModal from '../../components/client/RatingModal';
import '../../styles/pagesStyle/clientStyle/MyConsultations.css';
import '../../styles/componentsStyle/clientStyle/ConsultationCard.css';
const MyConsultations = () => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [modalType, setModalType] = useState(null);

  const consultations = [
    {
      id: 'IST-2025-001',
      title: 'نزاع عقاري - مراجعة العقود',
      lawyer: 'المحامي خالد العمري',
      date: '2025-01-10',
      type: 'فيديو',
      price: '95 د.أ',
      status: 'نشطة'
    },
    {
      id: 'IST-2025-002',
      title: 'استشارة قانون الأسرة',
      lawyer: 'المحامي سارة الطراونة',
      date: '2025-01-08',
      type: 'هاتفي',
      price: '55 د.أ',
      status: 'مكتملة',
      rated: true
    },
    {
      id: 'IST-2025-003',
      title: 'مراجعة عقد تجاري دولي',
      lawyer: 'المحامي ريم الشوبكي',
      date: '2025-01-05',
      type: 'مكتبي',
      price: '140 د.أ',
      status: 'مكتملة',
      rated: true
    },
    {
      id: 'IST-2025-004',
      title: 'استشارة ملكية فكرية',
      lawyer: 'المحامي فارس البشير',
      date: '2024-12-20',
      type: 'فيديو',
      price: '100 د.أ',
      status: 'مكتملة',
      rated: true
    },
    {
      id: 'IST-2025-005',
      title: 'تأسيس شركة ذات مسؤولية محدودة',
      lawyer: 'المحامي خالد العمري',
      date: '2024-12-15',
      type: 'مكتبي',
      price: '125 د.أ',
      status: 'ملغاة'
    }
  ];

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

          {consultations.map((consultation) => (
            <ConsultationCard
              key={consultation.id}
              consultation={consultation}
              onComplaint={openComplaint}
              onRating={openRating}
            />
          ))}

        </div>

      </div>

      {modalType === 'complaint' && (
        <ComplaintModal
          consultation={selectedConsultation}
          onClose={closeModal}
        />
      )}

      {modalType === 'rating' && (
        <RatingModal
          consultation={selectedConsultation}
          onClose={closeModal}
        />
      )}

    </div>
  );
};

export default MyConsultations;