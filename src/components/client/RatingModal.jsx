import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import '../../styles/componentsStyle/clientStyle/RatingModal.css';

const RatingModal = ({ consultation, onClose }) => {
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      consultationId: consultation.id,
      rating,
      comment
    };

    console.log(review);
    onClose();
  };

  return (
    <div className="rating-overlay" onClick={onClose}>

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
          كيف كانت استشارتك مع {consultation.lawyer}؟
        </p>

        <form onSubmit={handleSubmit}>

          <div className="rating-stars">

            {[1, 2, 3, 4, 5].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setRating(item)}
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
            >
              إرسال التقييم
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RatingModal;