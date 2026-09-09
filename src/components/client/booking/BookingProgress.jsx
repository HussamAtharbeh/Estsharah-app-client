import React from 'react';
import { Check } from 'lucide-react';

import { bookingSteps } from '../../../data/bookingData';

import '../../../styles/pagesStyle/clientStyle/BookingProgress.css';

const BookingProgress = ({ currentStep }) => {
  return (
    <div className="booking-progress">

      {bookingSteps.map((step, index) => {
        const completed = step.id < currentStep;
        const active = step.id === currentStep;

        return (
          <React.Fragment key={step.id}>

            <div
              className={`booking-progress-step ${
                completed ? 'completed' : ''
              } ${active ? 'active' : ''}`}
            >
              <div className="booking-progress-circle">
                {completed ? (
                  <Check size={18} />
                ) : (
                  step.id
                )}
              </div>

              <span>{step.title}</span>
            </div>

            {index < bookingSteps.length - 1 && (
              <div
                className={`booking-progress-line ${
                  completed ? 'completed' : ''
                }`}
              />
            )}

          </React.Fragment>
        );
      })}

    </div>
  );
};

export default BookingProgress;