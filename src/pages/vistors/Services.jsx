import React, { useState } from 'react';
import {
  Zap,
  FileText,
  ShieldCheck,
  BookOpen,
  Building2,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/pagesStyle/vistorsStyle/Services.css';

const SERVICES_DATA = [
  {
    id: 1,
    icon: Zap,
    title: 'استشارات قانونية',
    desc: 'تواصل مباشر مع محامي مرخص لتقديم المشورة الدقيقة.',
    tag: 'تبدأ فوراً',
    linkText: 'ابدأ هنا',
    linkTo: '/signin',
    available: true
  },
  {
    id: 2,
    icon: FileText,
    title: 'الخدمات القانونية',
    desc: 'صياغة ومراجعة العقود وإعداد اللوائح.',
    tag: 'حسب الخدمة',
    linkText: 'غير متوفره حالياً',
    linkTo: null,
    available: false
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'التأمين القانوني',
    desc: 'باقات اشتراك ذكية توفر لك غطاءً قانونياً.',
    tag: 'اشتراك دوري',
    linkText: 'غير متوفره حالياً',
    linkTo: null,
    available: false
  },
  {
    id: 4,
    icon: BookOpen,
    title: 'التدريب القانوني',
    desc: 'دورات وورش عمل متخصصة لتطوير الكفاءات.',
    tag: 'حسب البرنامج',
    linkText: 'غير متوفره حالياً',
    linkTo: null,
    available: false
  },
  {
    id: 5,
    icon: Building2,
    title: 'تأسيس الشركات',
    desc: 'خدمة متكاملة لتأسيس وتسجيل الشركات.',
    tag: 'تسليم خلال',
    linkText: 'غير متوفره حالياً',
    linkTo: null,
    available: false
  }
];

const Services = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="srv-page-container">
      <section className="srv-page-hero">
        <span className="srv-page-overline">خدماتنا</span>
        <h1 className="srv-page-title">خدماتنا القانونية</h1>
        <p className="srv-page-subtitle">
          نقدم باقة متكاملة من الخدمات القانونية المصممة لتلبية كافة احتياجات الأفراد والشركات
          <br />
          بمعايير عالمية
        </p>
      </section>

      <section className="srv-page-grid-wrapper">
        <div className="srv-page-grid">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            const isActive = activeId === service.id;

            return (
              <div
                className={`srv-page-card ${isActive ? 'srv-page-card-active' : ''}`}
                key={service.id}
                onClick={() => setActiveId(service.id)}
              >
                <div className={`srv-page-icon-circle ${isActive ? 'srv-page-icon-active' : ''}`}>
                  <Icon size={22} />
                </div>

                <h3 className="srv-page-card-title">{service.title}</h3>
                <p className="srv-page-card-desc">{service.desc}</p>

                <div className="srv-page-card-footer">
                  <span className="srv-page-tag">{service.tag}</span>

                  {service.available && service.linkTo ? (
                    <Link to={service.linkTo} className="srv-page-link">
                      {service.linkText} <ArrowLeft size={14} />
                    </Link>
                  ) : (
                    <span className="srv-page-unavailable">{service.linkText}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
  

export default Services;