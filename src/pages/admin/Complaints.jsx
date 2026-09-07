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

  return (
    <div className="admin-page-container">
      
      <div className="complaints-list">
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
                <button className="cmp-btn btn-archive">رفض وأرشفة</button>
                <button className="cmp-btn btn-resolve">
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