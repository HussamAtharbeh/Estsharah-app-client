import React from 'react';
import { Zap, Award, Lock } from 'lucide-react';

const VALUES_DATA = [
  { 
    id: 1, 
    icon: Zap, 
    title: 'الاستجابة الفورية', 
    desc: 'متوسط وقت الاستجابة أقل من ساعة واحدة للاستشارات العاجلة.' 
  },
  { 
    id: 2, 
    icon: Award, 
    title: 'الاحترافية العالية', 
    desc: 'محامون مرخصون ومعتمدون من نقابة المحامين مع سنوات من الخبرة.' 
  },
  { 
    id: 3, 
    icon: Lock, 
    title: 'السرية المطلقة', 
    desc: 'جميع الاستشارات محمية بأعلى معايير الخصوصية والأمان لضمان سرية معلوماتك.' 
  }
];

const Values = () => {
  return (
    <section className="values-section">
      <div className="values-header">
        <span className="section-label">قيمنا</span>
        <h2>المبادئ التي نلتزم بها</h2>
      </div>
      <div className="values-grid">
        {VALUES_DATA.map((val) => {
          const IconComponent = val.icon;
          return (
            <div className="value-card" key={val.id}>
              <div className="icon-wrapper">
                <IconComponent size={24} />
              </div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Values;
