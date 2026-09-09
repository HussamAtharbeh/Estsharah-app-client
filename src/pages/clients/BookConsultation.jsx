import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import BookingProgress from '../../components/client/booking/BookingProgress';
import ConsultationTypeStep from '../../components/client/booking/ConsultationTypeStep';
import AppointmentStep from '../../components/client/booking/AppointmentStep';
import DetailsStep from '../../components/client/booking/DetailsStep';
import PaymentStep from '../../components/client/booking/PaymentStep';

import { getToken } from '../../utils/auth';
import { CONSULTATION_TYPES } from '../../utils/labels';
import { availableDays } from '../../data/bookingData';

import '../../styles/pagesStyle/clientStyle/BookConsultation.css';

const BookConsultation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const lawyerId = searchParams.get('lawyer');

  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [currentStep, setCurrentStep] = useState(2);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [clientPhone, setClientPhone] = useState('');

  const [details, setDetails] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (!lawyerId) {
      navigate('/lawyers', { replace: true });
      return;
    }

    const fetchLawyer = async () => {
      try {
        setLoading(true);
        setError('');

        const token = getToken();

        const response = await fetch(
          `http://localhost:5000/api/lawyers/${lawyerId}`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`
                }
              : {}
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'حدث خطأ أثناء تحميل بيانات المحامي'
          );
        }

        setLawyer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [lawyerId, navigate]);

  if (loading) {
    return (
      <div className="book-consultation-page">
        <main className="booking-container">
          <p
            style={{
              textAlign: 'center',
              padding: 60
            }}
          >
            جارٍ تحميل بيانات المحامي...
          </p>
        </main>
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div className="book-consultation-page">
        <main className="booking-container">
          <p
            className="form-error"
            style={{
              textAlign: 'center',
              padding: 60
            }}
          >
            {error || 'لم يتم العثور على المحامي'}
          </p>
        </main>
      </div>
    );
  }

  const offeredTypes = CONSULTATION_TYPES
    .filter((type) =>
      lawyer.consultation_types?.includes(type.value)
    )
    .map((type) => ({
      id: type.value,
      title: type.label,
      description: type.description,
      price: lawyer.prices?.[type.value]
    }));

  const consultationType = offeredTypes.find(
    (type) => type.id === selectedType
  );

  const selectedDayData = availableDays.find(
    (day) => day.id === selectedDay
  );

  const handleDetailsChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const canContinue = () => {
    if (currentStep === 2) {
      if (selectedType === 'phone') {
        return Boolean(clientPhone.trim());
      }

      return Boolean(selectedType);
    }

    if (currentStep === 3) {
      return Boolean(selectedDay && selectedTime);
    }

    if (currentStep === 4) {
      return Boolean(
        details.title.trim() &&
        details.description.trim()
      );
    }

    return true;
  };

  const handleNext = () => {
    if (!canContinue()) {
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      navigate('/lawyers');
      return;
    }

    setCurrentStep((step) => step - 1);
  };

  const handleConfirm = async () => {
    if (!consultationType || !selectedDayData) {
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = getToken();

      const consultationResponse = await fetch(
        'http://localhost:5000/api/consultations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            lawyerId: lawyer.id,
            type: consultationType.id,
            title: details.title.trim(),
            description: details.description.trim(),
            scheduledDate: selectedDayData.value,
            scheduledTime: selectedTime,
            clientPhone: clientPhone.trim() || undefined
          })
        }
      );

      const consultationData =
        await consultationResponse.json();

      if (!consultationResponse.ok) {
        throw new Error(
          consultationData.message ||
            'حدث خطأ أثناء إنشاء الاستشارة'
        );
      }

      const paymentResponse = await fetch(
        'http://localhost:5000/api/payments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            consultationId: consultationData.id,
            method: 'card'
          })
        }
      );

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(
          paymentData.message ||
            'حدث خطأ أثناء إنشاء عملية الدفع'
        );
      }

      navigate('/client/consultations');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="book-consultation-page">

      <header className="booking-hero">
        <div className="booking-hero-container">

          <h1>حجز استشارة قانونية</h1>

          <p>
            أكمل الخطوات التالية لتأكيد حجزك بكل سرية وأمان تام.
          </p>

        </div>
      </header>

      <main className="booking-container">

        <BookingProgress
          currentStep={currentStep}
        />

        <div className="booking-content">

          {currentStep === 2 && (
            <ConsultationTypeStep
              types={offeredTypes}
              selectedType={selectedType}
              onSelect={setSelectedType}
              clientPhone={clientPhone}
              onPhoneChange={setClientPhone}
            />
          )}

          {currentStep === 3 && (
            <AppointmentStep
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              onSelectDay={setSelectedDay}
              onSelectTime={setSelectedTime}
            />
          )}

          {currentStep === 4 && (
            <DetailsStep
              details={details}
              onChange={handleDetailsChange}
            />
          )}

          {currentStep === 5 &&
            consultationType &&
            selectedDayData && (
              <PaymentStep
                lawyer={lawyer}
                consultationType={consultationType}
                selectedDay={`${selectedDayData.day} - ${selectedDayData.date}`}
                selectedTime={selectedTime}
                details={details}
                submitting={submitting}
                error={error}
                onConfirm={handleConfirm}
              />
            )}

        </div>

        <div className="booking-navigation">

          <button
            type="button"
            className="booking-back-btn"
            onClick={handleBack}
          >
            <ArrowRight size={19} />
            <span>رجوع</span>
          </button>

          {currentStep < 5 && (
            <button
              type="button"
              className={`booking-next-btn ${
                canContinue() ? 'enabled' : ''
              }`}
              onClick={handleNext}
              disabled={!canContinue()}
            >
              <span>متابعة الخطوة التالية</span>
              <ArrowLeft size={19} />
            </button>
          )}

        </div>

      </main>

    </div>
  );
};

export default BookConsultation;