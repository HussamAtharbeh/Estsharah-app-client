import React from 'react';
import { Clock, CalendarDays } from 'lucide-react';

import {
  availableDays,
  availableTimes
} from '../../../data/bookingData';

import '../../../styles/pagesStyle/clientStyle/AppointmentStep.css';

const AppointmentStep = ({
  selectedDay,
  selectedTime,
  onSelectDay,
  onSelectTime
}) => {
  return (
    <section className="booking-step-card appointment-step">

      <div className="booking-step-header">
        <h2>الموعد المناسب</h2>
        <p>
          اختر التاريخ والوقت الأنسب لك بتوقيت عمّان.
        </p>
      </div>

      <div className="appointment-section">

        <div className="appointment-section-header">
          <CalendarDays size={20} />
          <h3>الأيام المتاحة</h3>
        </div>

        <div className="available-days">
          {availableDays.map((day) => (
            <button
              type="button"
              key={day.id}
              className={`available-day ${
                selectedDay === day.id ? 'selected' : ''
              }`}
              onClick={() => {
                onSelectDay(day.id);
                onSelectTime(null);
              }}
            >
              <strong>{day.day}</strong>
              <span>{day.date}</span>
            </button>
          ))}
        </div>

      </div>

      {selectedDay && (
        <div className="appointment-section">

          <div className="appointment-section-header">
            <Clock size={20} />
            <h3>الأوقات المتاحة</h3>
          </div>

          <div className="available-times">
            {availableTimes.map((time) => (
              <button
                type="button"
                key={time}
                className={`available-time ${
                  selectedTime === time ? 'selected' : ''
                }`}
                onClick={() => onSelectTime(time)}
              >
                <Clock size={17} />
                <span>{time}</span>
              </button>
            ))}
          </div>

        </div>
      )}

    </section>
  );
};

export default AppointmentStep;