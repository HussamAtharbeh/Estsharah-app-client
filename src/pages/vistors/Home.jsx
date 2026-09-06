import React from 'react';
import { CheckCircle2, Zap, ShieldCheck, ArrowLeft, Star, FileText, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import LawyerCard from '../../components/lawyers/LawyerCard';
import '../../styles/pagesStyle/vistorsStyle/Home.css';

const STATS_DATA = [
  { id: 1, value: '500+', label: 'محام معتمد ومرخص', hasStar: false },
  { id: 2, value: '+12,400', label: 'استشارة قانونية مكتملة', hasStar: false },
  { id: 3, value: '4.8', label: 'متوسط تقييم المحامين', hasStar: true },
  { id: 4, value: '98%', label: 'نسبة رضا العملاء', hasStar: false }
];

const SERVICES_DATA = [
  {
    id: 1,
    icon: Zap,
    title: 'استشارات قانونية',
    desc: 'تواصل مباشر مع محامي مرخص لتقديم المشورة الدقيقة.',
    tag: 'تبدأ فوراً'
  },
  {
    id: 2,
    icon: FileText,
    title: 'الخدمات القانونية',
    desc: 'صياغة ومراجعة العقود وإعداد اللوائح.',
    tag: 'حسب الخدمة'
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'التأمين القانوني',
    desc: 'باقات اشتراك ذكية توفر لك غطاءً قانونياً.',
    tag: 'اشتراك دوري'
  }
];

const STEPS_DATA = [
  { id: '01', title: 'اختر التخصص', desc: 'حدد نوع القضية والتخصص القانوني المطلوب' },
  { id: '02', title: 'اختر محاميك', desc: 'تصفح نخبة المحامين المرخصين واختر الأنسب' },
  { id: '03', title: 'احجز موعدك', desc: 'اختر الوقت المناسب وطريقة التواصل المفضلة' },
  { id: '04', title: 'ابدأ استشارتك', desc: 'تواصل مع محاميك بأمان وسرية تامة' }
];

const FEATURED_LAWYERS = [
  {
    id: 1,
    name: 'يوسف الزعبي',
    specialization: 'قانون العقارات',
    location: 'الزرقاء',
    experience: '12 سنة خبرة',
    rating: 4.7,
    price: '65',
    type: 'هاتفية',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'سارة الطراونة',
    specialization: 'قانون الأسرة',
    location: 'إربد',
    experience: '10 سنة خبرة',
    rating: 4.8,
    price: '55',
    type: 'هاتفية',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'خالد العمري',
    specialization: 'قانون تجاري',
    location: 'عمان',
    experience: '15 سنة خبرة',
    rating: 4.9,
    price: '75',
    type: 'هاتفية',
    image: 'https://randomuser.me/api/portraits/men/46.jpg'
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge-system">
            <span className="dot-indicator"></span>
            منظومة استشارات قانونية معتمدة
          </div>
          <h1>
            حماية قانونية بمعايير 
            <span className="highlight-gold"> النخبة والسرية التامة</span>
          </h1>
          <p>
            نربطك بنخبة من المحامين والمستشارين القانونيين المرخصين لتقديم استشارات تجارية، عقارية، وجنائية بدقة استثنائية وجاهزية فورية.
          </p>
          
          <div className="hero-actions">
            <Button className="btn-gold-solid">ابدأ استشارتك الآن</Button>
            <Button className="btn-ghost-outline">
              تصفح المحامين <ArrowLeft size={18} />
            </Button>
          </div>

          <div className="hero-trust">
            <span><ShieldCheck size={16} /> +500 محامٍ معتمد</span>
            <span><Zap size={16} /> استجابة سريعة لطلبك</span>
            <span><CheckCircle size={16} /> مرخص من نقابة المحامين</span>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="floating-badge top-left-badge">
            <div className="badge-text">
              <strong>+12,400</strong>
              <span>استشارة مكتملة بنجاح</span>
            </div>
            <div className="badge-icon green-check">
              <CheckCircle2 size={22} />
            </div>
          </div>
          
          <img src="premium_istishara_logo_with_scales.jpg" alt="Istishara Law Office" className="main-hero-img" />
          
          <div className="floating-badge bottom-center-badge">
            <div className="badge-rating">
              <strong>4.8</strong>
              <Star size={20} fill="#FFB800" color="#FFB800" />
            </div>
            <div className="badge-center-text">
              <strong>+500 محام معتمد</strong>
              <span>جاهزون لخدمتك الآن</span>
            </div>
            <div className="badge-avatars">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="lawyer" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="lawyer" />
              <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="lawyer" />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          {STATS_DATA.map(stat => (
            <div className="stat-item" key={stat.id}>
              <h2>
                {stat.hasStar && <Star size={24} fill="#0B1320" color="#0B1320" className="stat-star" />}
                {stat.value}
              </h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-section">
        <div className="section-header">
          <span className="subtitle">ما نقدمه</span>
          <h2>خدمات قانونية شاملة بمعايير عالمية</h2>
          <p>نوفر باقة متكاملة من الخدمات القانونية المصممة لتلبية كافة احتياجات الأفراد والشركات.</p>
        </div>
        
        <div className="services-grid">
          {SERVICES_DATA.map(service => {
            const Icon = service.icon;
            return (
              <div className="service-card" key={service.id}>
                <div className="service-icon"><Icon size={24} /></div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="service-tag">{service.tag}</span>
              </div>
            );
          })}
        </div>
        
        <div className="services-action">
          <Button className="btn-ghost-outline">
            عرض جميع الخدمات <ArrowLeft size={18} />
          </Button>
        </div>
      </section>

      <section className="steps-section">
        <div className="section-header">
          <span className="subtitle">كيف يعمل</span>
          <h2>4 خطوات بسيطة للحصول على استشارتك</h2>
        </div>
        
        <div className="steps-container">
          {STEPS_DATA.map(step => (
            <div className="step-item" key={step.id}>
              <div className="step-number">{step.id}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-lawyers-section">
        <div className="lawyers-header-flex">
          <div className="header-titles">
            <span className="subtitle">فريقنا</span>
            <h2>نخبة المحامين المعتمدين</h2>
          </div>
          <a href="/lawyers" className="view-all-link">
            عرض الجميع <ArrowLeft size={16} />
          </a>
        </div>

        <div className="lawyers-grid">
          {FEATURED_LAWYERS.map(lawyer => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;