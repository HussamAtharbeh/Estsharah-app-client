import React from 'react';
import '../../styles/pagesStyle/vistorsStyle/About.css';
import visionImg from '../../assets/images/aboutUs.jpg';
import Values from '../../components/shared/Values';
import Stats from '../../components/shared/Stats';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-hero-subtitle">تعرف علينا</span>
          <h1 className="about-hero-title">
            نبني جسراً بين العدالة والتكنولوجيا
          </h1>
          <p className="about-hero-desc">
            المنصة الأولى للاستشارات القانونية الرقمية في الشرق الأوسط
          </p>
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

      <Values />
      <Stats />
    </div>
  );
};

export default About;