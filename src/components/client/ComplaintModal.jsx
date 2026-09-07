import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import '../../styles/componentsStyle/clientStyle/ComplaintModal.css';

const COMPLAINT_TYPES = [
  'عدم الاحترافية',
  'معلومات خاطئة',
  'عدم الالتزام بالموعد',
  'تأخر في الرد',
  'سوء معاملة',
  'أخرى'
];

const ComplaintModal = ({ consultation, onClose }) => {
  const [type, setType] = useState('عدم الاحترافية');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaint = {
      consultationId: consultation.id,
      type,
      details
    };

    console.log(complaint);
    onClose();
  };

  return (
    <div className="complaint-overlay" onClick={onClose}>

      <div
        className="complaint-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="complaint-close"
          onClick={onClose}
        >
          <X size={21} />
        </button>

        <div className="complaint-header">
          <h2>تقديم شكوى</h2>
          <p>
            شكوى بحق {consultation.lawyer}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="complaint-section">

            <label>
              نوع الشكوى
            </label>

            <div className="complaint-types">

              {COMPLAINT_TYPES.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`complaint-type ${type === item ? 'selected' : ''}`}
                  onClick={() => setType(item)}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          <div className="complaint-section">

            <label>
              تفاصيل الشكوى
            </label>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="اكتب تفاصيل الشكوى..."
              required
            />

          </div>

          <button
            type="submit"
            className="complaint-submit"
          >
            <AlertCircle size={18} />
            إرسال الشكوى
          </button>

        </form>

      </div>

    </div>
  );
};

export default ComplaintModal;