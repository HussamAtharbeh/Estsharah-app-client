import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Star,
  Check
} from 'lucide-react';

import '../../styles/pagesStyle/vistorsStyle/Home.css';
import homeimage from '../../assets/images/homePage.jpg';
import { Link } from 'react-router-dom';

import Stats from '../../components/shared/Stats';
import { HowItWorks } from '../../components/shared/HowItWorks';

import { getUser, isLoggedIn, homePathFor } from '../../utils/auth';

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
    label: 'محام معتمد'
  }
];

const Home = () => {
  const loggedInUser = isLoggedIn() ? getUser() : null;

  const ctaPath = loggedInUser
    ? homePathFor(loggedInUser.role)
    : '/signin';

  const ctaText = loggedInUser
    ? 'الذهاب إلى حسابي'
    : 'ابدأ استشارتك الآن';

  const [lawyersCount, setLawyersCount] = useState(0);

  useEffect(() => {
    const fetchLawyersCount = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/lawyers/count'
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to fetch lawyers count'
          );
        }

        setLawyersCount(Number(data.count));
      } catch (error) {
        console.error('Error fetching lawyers count:', error);
      }
    };

    fetchLawyersCount();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-image-side">

          <div className="floating-badge top-left-badge">
            <div className="badge-text-left">
              <strong className="badge-number">
                +12,400
              </strong>

              <span className="badge-label">
                استشارة مكتملة بنجاح
              </span>
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
              <strong>
                {lawyersCount} محام معتمد
              </strong>

              <span>
                جاهزون لخدمتك الآن
              </span>
            </div>

            <div className="badge-avatars">
              <img
                src={FEATURED_LAWYERS[0].image}
                alt="محامي"
              />

              <img
                src={FEATURED_LAWYERS[1].image}
                alt="محامية"
              />

              <img
                src={FEATURED_LAWYERS[2].image}
                alt="محامي"
              />
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
              to={ctaPath}
              className="btn-solid-gold large-btn"
            >
              {ctaText}
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

              const label =
                item.id === 3
                  ? `+${lawyersCount} محام معتمد`
                  : item.label;

              return (
                <div
                  className="trust-item"
                  key={item.id}
                >
                  <Icon
                    size={18}
                    className="trust-icon"
                  />

                  <span>
                    {label}
                  </span>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      <Stats />

      <HowItWorks />
    </div>
  );
};

export default Home;