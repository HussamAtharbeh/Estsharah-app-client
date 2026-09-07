import React, { useState } from 'react';
import ConsultationCard from '../../components/lawyers/ConsultationCard';
import ComplaintModal from '../../components/lawyers/consultationModals/ComplaintModal';
import MeetingLinkModal from '../../components/lawyers/consultationModals/MeetingLinkModal';
import LocationModal from '../../components/lawyers/consultationModals/LocationModal';
import PhoneModal from '../../components/lawyers/consultationModals/PhoneModal';
import { consultations } from '../../data/lawyerConsultationsData';
import '../../styles/pagesStyle/lawyerStyle/LawyerConsultations.css';
import '../../styles/pagesStyle/lawyerStyle/LawyerConsultationModals.css';

const Consultations = () => {
  const [filter, setFilter] = useState('active');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [complaintType, setComplaintType] = useState('');
  const [complaintDetails, setComplaintDetails] = useState('');
  const [inputValue, setInputValue] = useState('');

  const filteredConsultations = consultations.filter(
    (consultation) => consultation.status === filter
  );

  const openModal = (type, consultation) => {
    setSelectedConsultation(consultation);
    setActiveModal(type);
    setComplaintType('');
    setComplaintDetails('');
    setInputValue('');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedConsultation(null);
    setComplaintType('');
    setComplaintDetails('');
    setInputValue('');
  };

  const handleSend = (actionType) => {
    if (!selectedConsultation) {
      return;
    }

    if (actionType === 'complaint') {
      alert('تم تقديم الشكوى للإدارة بنجاح!');
    }

    if (actionType === 'link') {
      alert('تم إرسال رابط الاجتماع إلى بريد العميل بنجاح!');
    }

    if (actionType === 'location') {
      alert('تم إرسال موقع المكتب إلى العميل بنجاح!');
    }

    closeModal();
  };

  return (
    <div className="lawyer-consultations-page">
      <div className="lawyer-consultations-container">

        <header className="consultations-page-header">
          <div className="header-title">
            <h1>سجل الاستشارات</h1>
            <p>
              تابع وأدر جميع جلسات الاستشارة الخاصة بك
            </p>
          </div>
        </header>

        <div className="consultations-tabs">
          <button
            className={`tab-btn ${
              filter === 'active' ? 'active' : ''
            }`}
            onClick={() => setFilter('active')}
          >
            الاستشارات القادمة والنشطة
          </button>

          <button
            className={`tab-btn ${
              filter === 'completed' ? 'active' : ''
            }`}
            onClick={() => setFilter('completed')}
          >
            الاستشارات المكتملة
          </button>
        </div>

        <div className="consultations-list">
          {filteredConsultations.length > 0 ? (
            filteredConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onOpenModal={openModal}
              />
            ))
          ) : (
            <div className="consultations-empty-state">
              <p>
                لا توجد استشارات في هذا القسم حالياً.
              </p>
            </div>
          )}
        </div>
      </div>

      {activeModal === 'complaint' &&
        selectedConsultation && (
          <ComplaintModal
            consultation={selectedConsultation}
            complaintType={complaintType}
            complaintDetails={complaintDetails}
            onComplaintTypeChange={setComplaintType}
            onComplaintDetailsChange={(event) =>
              setComplaintDetails(event.target.value)
            }
            onSend={() => handleSend('complaint')}
            onClose={closeModal}
          />
        )}

      {activeModal === 'link' &&
        selectedConsultation && (
          <MeetingLinkModal
            consultation={selectedConsultation}
            value={inputValue}
            onChange={(event) =>
              setInputValue(event.target.value)
            }
            onSend={() => handleSend('link')}
            onClose={closeModal}
          />
        )}

      {activeModal === 'location' &&
        selectedConsultation && (
          <LocationModal
            consultation={selectedConsultation}
            value={inputValue}
            onChange={(event) =>
              setInputValue(event.target.value)
            }
            onSend={() => handleSend('location')}
            onClose={closeModal}
          />
        )}

      {activeModal === 'phone' &&
        selectedConsultation && (
          <PhoneModal
            consultation={selectedConsultation}
            onClose={closeModal}
          />
        )}
    </div>
  );
};

export default Consultations;