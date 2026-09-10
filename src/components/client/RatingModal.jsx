import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

import { getToken } from '../../utils/auth';

import '../../styles/componentsStyle/clientStyle/RatingModal.css';
import {API_URL} from "../../config"
const RatingModal = ({ consultation, onClose, onSaved }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError('يرجى اختيار التقييم');
      return;
    }

    setError('');
    setSaving(true);

    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/consultations/${consultation.id}/rating`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            rating,
            comment
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء إرسال التقييم'
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
      className="rating-overlay"
      onClick={onClose}
    >
      <div
        className="rating-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="rating-icon">
          <Star size={32} />
        </div>

        <button
          className="rating-close"
          onClick={onClose}
        >
          <X size={21} />
        </button>

        <h2>
          قيّم تجربتك
        </h2>

        <p>
          كيف كانت استشارتك مع المحامي {consultation.lawyer_name}؟
        </p>

        <form onSubmit={handleSubmit}>

          <div className="rating-stars">

            {[1, 2, 3, 4, 5].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setRating(item);
                  setError('');
                }}
                className={item <= rating ? 'selected' : ''}
              >
                <Star
                  size={45}
                  fill={item <= rating ? 'currentColor' : 'none'}
                />
              </button>
            ))}

          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="اكتب تعليقك..."
          />

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <div className="rating-actions">

            <button
              type="button"
              className="rating-cancel"
              onClick={onClose}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="rating-submit"
              disabled={saving}
            >
              {saving
                ? 'جارٍ الإرسال...'
                : 'إرسال التقييم'}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default RatingModal;