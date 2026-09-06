import React from 'react';
import '../../styles/componentsStyle/sharedStyle/HowItWorks.css'

const STEPS_DATA = [
  { 
    id: '01', 
    title: 'اختر التخصص', 
    desc: 'حدد نوع القضية والتخصص القانوني المطلوب' 
  },
  { 
    id: '02', 
    title: 'اختر محاميك', 
    desc: 'تصفح نخبة المحامين المرخصين واختر الأنسب' 
  },
  { 
    id: '03', 
    title: 'احجز موعدك', 
    desc: 'اختر الوقت المناسب وطريقة التواصل المفضلة' 
  },
  { 
    id: '04', 
    title: 'ابدأ استشارتك', 
    desc: 'تواصل مع محاميك بأمان وسرية تامة' 
  }
];

export const HowItWorks = () => {
  return (
    <section className="hiw-section">
      <div className="hiw-container">
        <div className="hiw-header">
          <span className="hiw-subtitle">كيف يعمل</span>
          <h2 className="hiw-title">4 خطوات بسيطة للحصول على استشارتك</h2>
        </div>
        
        <div className="hiw-grid">
          {STEPS_DATA.map((step) => (
            <div className="hiw-card" key={step.id}>
              <div className="hiw-circle">{step.id}</div>
              <h3 className="hiw-card-title">{step.title}</h3>
              <p className="hiw-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};