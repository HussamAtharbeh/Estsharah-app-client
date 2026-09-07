import React from 'react';
import { X } from 'lucide-react';

const PhoneModal = ({
  consultation,
  onClose
}) => {
  return (
    <div className="modal-overlay">
      <div className="custom-modal">
        <button
          className="close-btn"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="modal-header-centered">
          <h2>رقم هاتف العميل</h2>

          <p>
            العميل: {consultation.clientName}
          </p>
        </div>

        <div className="phone-display-box">
          <h3>{consultation.phone}</h3>
        </div>

        <button
          className="submit-modal-btn"
          onClick={onClose}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default PhoneModal;