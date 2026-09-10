import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

import { getToken } from '../../utils/auth';
import {
  COMPLAINT_STATUS_LABELS,
  ROLE_LABELS,
  formatDate
} from '../../utils/labels';
import {API_URL} from "../../config"
const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => {
    setRefreshKey((key) => key + 1);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchComplaints = async () => {
      try {
        setLoading(true);
        setError('');

        const token = getToken();

        const response = await fetch(
          `${API_URL}/complaints`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'حدث خطأ أثناء تحميل الشكاوى'
          );
        }

        if (!cancelled) {
          setComplaints(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchComplaints();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const resolve = async (complaint) => {
    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/complaints/${complaint.id}/resolve`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء معالجة الشكوى'
        );
      }

      reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const archive = async (complaint) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من رفض وأرشفة الشكوى رقم ${complaint.id}؟`
    );

    if (!confirmed) return;

    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/complaints/${complaint.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء أرشفة الشكوى'
        );
      }

      reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-page-container">

      <header className="admin-page-header">
        <div className="header-title">
          <h1>الشكاوى</h1>

          <p>
            مراجعة شكاوى العملاء والمحامين ومعالجتها
          </p>
        </div>
      </header>

      <div className="complaints-list">

        {(loading || error || complaints.length === 0) && (
          <p
            style={{
              textAlign: 'center',
              color: '#94a3b8'
            }}
          >
            {loading
              ? 'جارٍ التحميل...'
              : error || 'لا يوجد شكاوى حالياً'}
          </p>
        )}

        {complaints.map((cmp) => (
          <div
            key={cmp.id}
            className={`complaint-card ${
              cmp.status === 'open'
                ? 'open-cmp'
                : 'resolved-cmp'
            }`}
          >

            <div className="cmp-header">

              <span className="cmp-date">
                {formatDate(cmp.created_at)}
              </span>

              <div className="cmp-badges">

                <span className="cmp-badge type-badge">
                  {cmp.type}
                </span>

                <span
                  className={`cmp-badge status-badge-cmp ${cmp.status}`}
                >
                  {COMPLAINT_STATUS_LABELS[cmp.status]}
                </span>

                <span className="cmp-badge id-badge">
                  CMP-{String(cmp.id).padStart(3, '0')}
                </span>

              </div>
            </div>

            <div className="cmp-body">

              <div className="cmp-parties">

                <div className="party-box">
                  <span className="party-label">
                    مقدم الشكوى
                  </span>

                  <strong className="party-name">
                    {cmp.complainant_name}
                  </strong>

                  <span className="party-role">
                    {ROLE_LABELS[cmp.complainant_role]}
                  </span>
                </div>

                <div className="party-box">
                  <span className="party-label">
                    المشكو بحقه
                  </span>

                  <strong className="party-name">
                    {cmp.accused_name}
                  </strong>

                  <span className="party-role">
                    {ROLE_LABELS[cmp.accused_role]}
                  </span>
                </div>

              </div>

              <div className="cmp-details-box">

                <span className="details-label">
                  تفاصيل الشكوى

                  {cmp.consultation_title
                    ? ` — ${cmp.consultation_title}`
                    : ''}
                </span>

                <p>
                  {cmp.details}
                </p>

              </div>

            </div>

            {cmp.status === 'open' && (
              <div className="cmp-actions">

                <button
                  type="button"
                  className="cmp-btn btn-archive"
                  onClick={() => archive(cmp)}
                >
                  رفض وأرشفة
                </button>

                <button
                  type="button"
                  className="cmp-btn btn-resolve"
                  onClick={() => resolve(cmp)}
                >
                  <Check size={18} />

                  <span>
                    تم معالجة الشكوى
                  </span>
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