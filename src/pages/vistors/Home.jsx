import React from 'react';
import {
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Star,
  FileText,
  Check,
  Import
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
// import LawyerCard from '../../components/lawyers/LawyerCard';
import '../../styles/pagesStyle/vistorsStyle/Home.css';
import homeimage from '../../assets/images/homePage.jpg';
import { Link } from 'react-router-dom';
import Stats from '../../components/shared/Stats';
import Footer from '../../components/shared/Footer';
import {HowItWorks} from '../../components/shared/HowItWorks';



const FEATURED_LAWYERS = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    image: 'https://randomuser.me/api/portraits/men/46.jpg'
  }
];

const TRUST_ITEMS = [
  {
    id: 1,
    icon: CheckCircle2,
    label: 'مرخص من نقابة المحامين'
  },
  {
    id: 2,
    icon: Zap,
    label: 'استجابة سريعة لطلبك'
  },
  {
    id: 3,
    icon: ShieldCheck,
    label: '+500 محام معتمد'
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-image-side">
          <div className="floating-badge top-left-badge">
            <div className="badge-text-left">
              <strong className="badge-number">+12,400</strong>
              <span className="badge-label">استشارة مكتملة بنجاح</span>
            </div>

            <div className="badge-icon-circle">
              <Check size={20} strokeWidth={3} />
            </div>
          </div>

          <img
            src={homeimage}
            alt="محامي"
            className="main-hero-img"
          />

          <div className="floating-badge bottom-right-badge">
            <div className="badge-rating-box">
              <strong>4.8</strong>
              <Star
                size={18}
                fill="#FFB800"
                color="#FFB800"
              />
            </div>

            <div className="badge-center-text">
              <strong>+500 محام معتمد</strong>
              <span>جاهزون لخدمتك الآن</span>
            </div>

            <div className="badge-avatars">
              <img src={FEATURED_LAWYERS[0].image} alt={FEATURED_LAWYERS[0].name} />
              <img src={FEATURED_LAWYERS[1].image} alt={FEATURED_LAWYERS[1].name} />
              <img src={FEATURED_LAWYERS[2].image} alt={FEATURED_LAWYERS[2].name} />
            </div>
          </div>
        </div>

        <div className="hero-content">
          <div className="badge-system">
            <span className="dot-indicator"></span>
            منظومة استشارات قانونية رقمية معتمدة
          </div>

          <h1 className="hero-title">
حقك أولاً          
  <br />
            <span className="gold-text">
استشر بثقة          
  </span>
          </h1>

          

         <div className="hero-buttons">
  <Link
    to="/signin"
    className="btn-solid-gold large-btn"
  >
    ابدأ استشارتك الآن
  </Link>

  <Link
    to="/lawyers"
    className="btn-outline-ghost large-btn"
  >
    تصفح المحامين
    <ArrowLeft size={18} />
  </Link>
</div>
          <div className="hero-trust-row">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <div className="trust-item" key={item.id}>
                  <Icon size={18} className="trust-icon" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Stats />
            <HowItWorks />

      <Footer />
    </div>
  );
};

export default Home;