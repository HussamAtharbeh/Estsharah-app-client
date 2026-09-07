import React from 'react';
import { X } from 'lucide-react';
import { complaintTypes } from '../../../data/lawyerConsultationsData';

const ComplaintModal = ({
  consultation,
  complaintType,
  complaintDetails,
  onComplaintTypeChange,
  onComplaintDetailsChange,
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
          <h2>تقديم شكوى</h2>
          <p>
            شكوى بحق العميل {consultation.clientName}
          </p>
        </div>

        <div className="complaint-form">
          <label className="form-label">
            نوع الشكوى
          </label>

          <div className="complaint-types">
            {complaintTypes.map((type) => (
              <button
                key={type}
                className={`type-chip ${
                  complaintType === type ? 'selected' : ''
                }`}
                onClick={() => onComplaintTypeChange(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <label className="form-label">
            تفاصيل الشكوى
          </label>

          <textarea
            placeholder="اشرح المشكلة بالتفصيل..."
            value={complaintDetails}
            onChange={onComplaintDetailsChange}
          />

          <button
            className="submit-modal-btn"
            onClick={onSend}
            disabled={!complaintType || !complaintDetails}
          >
            إرسال الشكوى
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;