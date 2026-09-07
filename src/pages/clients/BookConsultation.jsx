import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BookingProgress from '../../components/client/booking/BookingProgress';
import ConsultationTypeStep from '../../components/client/booking/ConsultationTypeStep';
import AppointmentStep from '../../components/client/booking/AppointmentStep';
import DetailsStep from '../../components/client/booking/DetailsStep';
import PaymentStep from '../../components/client/booking/PaymentStep';
import {
  consultationTypes,
  lawyers,
  availableDays
} from '../../data/bookingData';
import '../../styles/pagesStyle/clientStyle/BookConsultation.css';

const BookConsultation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const lawyerId = searchParams.get('lawyer');
  const lawyer = lawyers[lawyerId];

  const [currentStep, setCurrentStep] = useState(2);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [details, setDetails] = useState({
    title: '',
    description: ''
  });

  if (!lawyer) {
    navigate('/lawyers', { replace: true });
    return null;
  }

  const consultationType = consultationTypes.find(
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

  const handleConfirm = () => {
    const booking = {
      lawyerId: lawyer.id,
      lawyer: lawyer.name,
      consultationType: consultationType.id,
      date: selectedDayData.date,
      day: selectedDayData.day,
      time: selectedTime,
      title: details.title.trim(),
      description: details.description.trim(),
      price: consultationType.price
    };

    console.log('Booking:', booking);

    navigate('/client/consultations');
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
        <BookingProgress currentStep={currentStep} />

        <div className="booking-content">
          {currentStep === 2 && (
            <ConsultationTypeStep
              selectedType={selectedType}
              onSelect={setSelectedType}
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

          {currentStep === 5 && consultationType && selectedDayData && (
            <PaymentStep
              lawyer={lawyer}
              consultationType={consultationType}
              selectedDay={`${selectedDayData.day} - ${selectedDayData.date}`}
              selectedTime={selectedTime}
              details={details}
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