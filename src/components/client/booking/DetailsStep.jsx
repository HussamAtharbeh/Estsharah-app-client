import React from 'react';

import '../../../styles/pagesStyle/clientStyle/DetailsStep.css';

const DetailsStep = ({
  details,
  onChange
}) => {
  return (
    <section className="booking-step-card">

      <div className="booking-step-header">
        <h2>تفاصيل الطلب</h2>

        <p>
          أخبر المحامي بتفاصيل الموضوع الذي تحتاج الاستشارة بشأنه.
        </p>
      </div>

      <div className="details-form">

        <div className="details-field">
          <label htmlFor="consultation-title">
            عنوان الاستشارة
          </label>

          <input
            id="consultation-title"
            type="text"
            name="title"
            value={details.title}
            onChange={onChange}
            placeholder="مثال: مراجعة عقد إيجار"
            autoComplete="off"
          />
        </div>

        <div className="details-field">
          <label htmlFor="consultation-description">
            تفاصيل الاستشارة
          </label>

          <textarea
            id="consultation-description"
            name="description"
            value={details.description}
            onChange={onChange}
            placeholder="اكتب تفاصيل الموضوع الذي ترغب بمناقشته مع المحامي..."
            rows="7"
          />
        </div>

      </div>

    </section>
  );
};

export default DetailsStep;