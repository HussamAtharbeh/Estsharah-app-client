import React from 'react';

const STATS_DATA = [
  { id: 1, number: '+12,400', label: 'استشارة مكتملة' },
  { id: 2, number: '24/7', label: 'دعم متواصل' },
  { id: 3, number: '99%', label: 'نسبة الرضا' },
  { id: 4, number: '500+', label: 'محام معتمد' }
];

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        {STATS_DATA.map((stat) => (
          <div className="stat-item" key={stat.id}>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;