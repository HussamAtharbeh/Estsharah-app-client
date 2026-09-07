import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP-001',
      date: '2025-01-10',
      type: 'تأخر في الرد',
      status: 'تم الحل',
      complainant: { name: 'محمد أحمد', role: 'عميل' },
      accused: { name: 'خالد العمري', role: 'محامي' },
      details: 'المحامي تأخر 3 أيام في الرد على استفساري رغم دفعي مسبقاً.'
    },
    {
      id: 'CMP-002',
      date: '2025-01-09',
      type: 'إلغاء متكرر',
      status: 'مفتوحة',
      complainant: { name: 'ريم الشوبكي', role: 'محامي' },
      accused: { name: 'عبدالله صالح', role: 'عميل' },
      details: 'العميل ألغى 3 مواعيد متتالية دون إشعار مسبق.'
    }
  ]);

  const resolveComplaint = (id) => {
    setComplaints((prev) =>
      prev.map((cmp) =>
        cmp.id === id
          ? { ...cmp, status: 'تم الحل' }
          : cmp
      )
    );
  };

  const archiveComplaint = (id) => {
    const complaint = complaints.find((item) => item.id === id);

    const confirmed = window.confirm(
      `هل أنت متأكد من رفض وأرشفة الشكوى "${complaint?.id}"؟`
    );

    if (!confirmed) {
      return;
    }

    setComplaints((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="admin-page-container">

      <header className="admin-page-header">
        <div className="header-title">
          <h1>الشكاوى</h1>
          <p>مراجعة شكاوى العملاء والمحامين ومعالجتها</p>
        </div>
      </header>

      <div className="complaints-list">
        {complaints.length === 0 && (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>
            لا يوجد شكاوى حالياً
          </p>
        )}

        {complaints.map((cmp) => (
          <div key={cmp.id} className={`complaint-card ${cmp.status === 'مفتوحة' ? 'open-cmp' : 'resolved-cmp'}`}>

            <div className="cmp-header">
              <span className="cmp-date">{cmp.date}</span>
              <div className="cmp-badges">
                <span className="cmp-badge type-badge">{cmp.type}</span>
                <span className={`cmp-badge status-badge-cmp ${cmp.status === 'مفتوحة' ? 'open' : 'resolved'}`}>
                  {cmp.status}
                </span>
                <span className="cmp-badge id-badge">{cmp.id}</span>
              </div>
            </div>

            <div className="cmp-body">
              <div className="cmp-parties">
                <div className="party-box">
                  <span className="party-label">مقدم الشكوى</span>
                  <strong className="party-name">{cmp.complainant.name}</strong>
                  <span className="party-role">{cmp.complainant.role}</span>
                </div>
                <div className="party-box">
                  <span className="party-label">المشكو بحقه</span>
                  <strong className="party-name">{cmp.accused.name}</strong>
                  <span className="party-role">{cmp.accused.role}</span>
                </div>
              </div>

              <div className="cmp-details-box">
                <span className="details-label">تفاصيل الشكوى</span>
                <p>{cmp.details}</p>
              </div>
            </div>

            {cmp.status === 'مفتوحة' && (
              <div className="cmp-actions">
                <button
                  type="button"
                  className="cmp-btn btn-archive"
                  onClick={() => archiveComplaint(cmp.id)}
                >
                  رفض وأرشفة
                </button>

                <button
                  type="button"
                  className="cmp-btn btn-resolve"
                  onClick={() => resolveComplaint(cmp.id)}
                >
                  <Check size={18} />
                  <span>تم معالجة الشكوى</span>
                </button>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;