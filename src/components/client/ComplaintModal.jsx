import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

import { getToken } from '../../utils/auth';

import '../../styles/componentsStyle/clientStyle/ComplaintModal.css';
import {API_URL} from "../../config"
const COMPLAINT_TYPES = [
  'عدم الاحترافية',
  'معلومات خاطئة',
  'عدم الالتزام بالموعد',
  'تأخر في الرد',
  'سوء معاملة',
  'أخرى'
];

const ComplaintModal = ({ consultation, onClose, onSaved }) => {
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type) {
      setError('يرجى اختيار نوع الشكوى');
      return;
    }

    setError('');
    setSaving(true);

    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/complaints`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            consultationId: consultation.id,
            type,
            details
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء إرسال الشكوى'
        );
      }

      onSaved();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div
      className="complaint-overlay"
      onClick={onClose}
    >
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
            شكوى بحق المحامي {consultation.lawyer_name}
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
                  className={`complaint-type ${
                    type === item ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setType(item);
                    setError('');
                  }}
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

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="complaint-submit"
            disabled={saving}
          >
            <AlertCircle size={18} />

            {saving
              ? 'جارٍ الإرسال...'
              : 'إرسال الشكوى'}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ComplaintModal;