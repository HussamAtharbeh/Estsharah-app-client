import React, { useEffect, useState } from 'react';
import ConsultationCard from '../../components/lawyers/ConsultationCard';
import ComplaintModal from '../../components/lawyers/consultationModals/ComplaintModal';
import MeetingLinkModal from '../../components/lawyers/consultationModals/MeetingLinkModal';
import LocationModal from '../../components/lawyers/consultationModals/LocationModal';
import PhoneModal from '../../components/lawyers/consultationModals/PhoneModal';
import { getToken } from '../../utils/auth';
import '../../styles/pagesStyle/lawyerStyle/LawyerConsultations.css';
import '../../styles/pagesStyle/lawyerStyle/LawyerConsultationModals.css';

const Consultations = () => {
  const [filter, setFilter] = useState('active');
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeModal, setActiveModal] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [complaintType, setComplaintType] = useState('');
  const [complaintDetails, setComplaintDetails] = useState('');
  const [inputValue, setInputValue] = useState('');

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      setError('');

      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/consultations/lawyer/me?status=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء جلب الاستشارات'
        );
      }

      setConsultations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [filter]);

  const openModal = (type, consultation) => {
    setSelectedConsultation(consultation);
    setActiveModal(type);

    setComplaintType('');
    setComplaintDetails('');

    if (type === 'link') {
      setInputValue(consultation.meeting_link || '');
    } else if (type === 'location') {
      setInputValue(consultation.office_location || '');
    } else {
      setInputValue('');
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedConsultation(null);
    setComplaintType('');
    setComplaintDetails('');
    setInputValue('');
  };

  const handleSend = async (actionType) => {
    if (!selectedConsultation) {
      return;
    }

    try {
      const token = getToken();

      let url = '';
      let method = 'PUT';
      let body = {};

      if (actionType === 'complaint') {
        url = 'http://localhost:5000/api/complaints';
        method = 'POST';

        body = {
          consultationId: selectedConsultation.id,
          type: complaintType,
          details: complaintDetails
        };
      }

      if (actionType === 'link') {
        url = `http://localhost:5000/api/consultations/${selectedConsultation.id}/meeting-link`;

        body = {
          link: inputValue
        };
      }

      if (actionType === 'location') {
        url = `http://localhost:5000/api/consultations/${selectedConsultation.id}/office-location`;

        body = {
          location: inputValue
        };
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء تنفيذ العملية'
        );
      }

      if (actionType === 'complaint') {
        alert('تم تقديم الشكوى للإدارة بنجاح!');
      }

      if (actionType === 'link') {
        alert('تم إرسال رابط الاجتماع للعميل بنجاح!');
      }

      if (actionType === 'location') {
        alert('تم إرسال موقع المكتب للعميل بنجاح!');
      }

      closeModal();

      fetchConsultations();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleComplete = async (consultation) => {
    const confirmed = window.confirm(
      'هل تم إنجاز هذه الاستشارة؟'
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/consultations/${consultation.id}/complete`,
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
          data.message || 'حدث خطأ أثناء إنهاء الاستشارة'
        );
      }

      fetchConsultations();
    } catch (err) {
      alert(err.message);
    }
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

          {loading ? (
            <div className="consultations-empty-state">
              <p>جارٍ التحميل...</p>
            </div>

          ) : error ? (
            <div className="consultations-empty-state">
              <p className="form-error">
                {error}
              </p>
            </div>

          ) : consultations.length > 0 ? (
            consultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onOpenModal={openModal}
                onComplete={handleComplete}
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