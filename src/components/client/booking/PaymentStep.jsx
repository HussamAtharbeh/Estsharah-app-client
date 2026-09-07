import React from 'react';
import {
  CreditCard,
  CheckCircle,
  UserRound,
  CalendarDays,
  Clock,
  FileText
} from 'lucide-react';
import '../../../styles/pagesStyle/clientStyle/PaymentStep.css';

const PaymentStep = ({
  lawyer,
  consultationType,
  selectedDay,
  selectedTime,
  details,
  onConfirm
}) => {
  return (
    <section className="booking-step-card payment-step">
      <div className="booking-step-header">
        <h2>مراجعة الحجز والدفع</h2>
        <p>راجع جميع تفاصيل الاستشارة قبل تأكيد الحجز.</p>
      </div>

      <div className="booking-summary">
        <div className="summary-row">
          <div>
            <UserRound size={18} />
            <span>المحامي</span>
          </div>
          <strong>{lawyer.name}</strong>
        </div>

        <div className="summary-row">
          <div>
            <CreditCard size={18} />
            <span>نوع الاستشارة</span>
          </div>
          <strong>{consultationType.title}</strong>
        </div>

        <div className="summary-row">
          <div>
            <CalendarDays size={18} />
            <span>التاريخ</span>
          </div>
          <strong>{selectedDay}</strong>
        </div>

        <div className="summary-row">
          <div>
            <Clock size={18} />
            <span>الوقت</span>
          </div>
          <strong>{selectedTime}</strong>
        </div>

        <div className="summary-row">
          <div>
            <FileText size={18} />
            <span>موضوع الاستشارة</span>
          </div>
          <strong>{details.title}</strong>
        </div>

        <div className="summary-total">
          <span>الإجمالي</span>
          <strong>{consultationType.price} د.أ</strong>
        </div>
      </div>

      <div className="payment-method">
        <div className="payment-method-icon">
          <CreditCard size={22} />
        </div>

        <div className="payment-method-content">
          <strong>الدفع الإلكتروني</strong>
          <span>
            سيتم تأمين عملية الدفع عبر بوابة الدفع الإلكترونية.
          </span>
        </div>

        <CheckCircle size={22} className="payment-method-check" />
      </div>

      <button
        type="button"
        className="confirm-booking-btn"
        onClick={onConfirm}
      >
        <span>تأكيد الحجز والدفع</span>
        <CheckCircle size={19} />
      </button>
    </section>
  );
};

export default PaymentStep;