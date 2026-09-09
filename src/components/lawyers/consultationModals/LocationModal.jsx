import React from 'react';
import { X } from 'lucide-react';

const LocationModal = ({
  consultation,
  value,
  onChange,
  onSend,
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
          <h2>إرسال موقع المكتب</h2>

          <p>
            سيتم إرسال الموقع لبريد العميل{' '}
            {consultation.client_name}
          </p>
        </div>

        <input
          type="url"
          className="modal-input"
          placeholder="أدخل رابط الموقع من خرائط جوجل..."
          value={value}
          onChange={onChange}
        />

        <button
          className="submit-modal-btn"
          onClick={onSend}
          disabled={!value}
        >
          إرسال الموقع
        </button>
      </div>
    </div>
  );
};

export default LocationModal;