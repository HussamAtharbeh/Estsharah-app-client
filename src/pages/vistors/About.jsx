import React from 'react';
import { Zap, Award, Lock } from 'lucide-react';
import '../../styles/pagesStyle/vistorsStyle/About.css';
import visionImg from '../../assets/images/aboutUs.jpg';

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

const STATS_DATA = [
  { id: 1, number: '+12,400', label: 'استشارة مكتملة' },
  { id: 2, number: '24/7', label: 'دعم متواصل' },
  { id: 3, number: '99%', label: 'نسبة الرضا' },
  { id: 4, number: '500+', label: 'محام معتمد' }
];

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="hero-content">
          <span className="hero-subtitle">تعرف علينا</span>
          <h1 className="hero-title">نبني جسراً بين العدالة والتكنولوجيا</h1>
          <p className="hero-desc">المنصة الأولى للاستشارات القانونية الرقمية في الشرق الأوسط</p>
        </div>
      </section>

      <section className="vision-section">
        <div className="vision-container">
          <div className="vision-image">
            <img src={visionImg} alt="رؤية استشارة" />
          </div>
          <div className="vision-text">
            <span className="section-label">رؤيتنا</span>
            <h2>نسعى لتبسيط الوصول إلى العدالة</h2>
            <p>
              نؤمن بأن الاستشارة القانونية الدقيقة هي الدرع الواقي للأفراد والشركات. نوفر نخبة من المحامين المعتمدين والموثوقين في مختلف التخصصات لضمان حصولك على أفضل مشورة قانونية ممكنة.
            </p>
            <p>
              منصتنا تجمع بين عراقة المحاماة وابتكار التكنولوجيا لتقديم خدمات قانونية سيادية بمعايير عالمية.
            </p>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default About;