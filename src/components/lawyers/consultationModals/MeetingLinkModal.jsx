import React from 'react';
import { X } from 'lucide-react';

const MeetingLinkModal = ({
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
          <h2>إرسال رابط الاجتماع</h2>

          <p>
            سيتم إرسال الرابط لبريد العميل{' '}
            {consultation.clientName}
          </p>
        </div>

        <input
          type="url"
          className="modal-input"
          placeholder="أدخل رابط الاجتماع (Zoom, Teams, Meet)..."
          value={value}
          onChange={onChange}
        />

        <button
          className="submit-modal-btn"
          onClick={onSend}
          disabled={!value}
        >
          إرسال الرابط
        </button>
      </div>
    </div>
  );
};

export default MeetingLinkModal;