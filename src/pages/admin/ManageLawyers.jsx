import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import {
  USER_STATUS_LABELS,
  formatDate,
  initialOf,
  specializationLabel
} from '../../utils/labels';
import {API_URL} from "../../config"
const ManageLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;

    const fetchLawyers = async () => {
      try {
        setLoading(true);
        setError('');

        const token = getToken();

        const response = await fetch(
          `${API_URL}/lawyers/admin/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'حدث خطأ أثناء تحميل المحامين'
          );
        }

        if (!cancelled) {
          setLawyers(data);
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

    fetchLawyers();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const runAction = async (action) => {
    try {
      await action();
      reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const approve = (lawyer) => {
    const confirmed = window.confirm(
      `هل تريد اعتماد المحامي "${lawyer.name}"؟`
    );

    if (!confirmed) return;

    const token = getToken();

    runAction(async () => {
      const response = await fetch(
        `${API_URL}/lawyers/${lawyer.id}/verify`,
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
          data.message || 'حدث خطأ أثناء اعتماد المحامي'
        );
      }
    });
  };

  const toggleStatus = (lawyer) => {
    const token = getToken();

    runAction(async () => {
      const endpoint =
        lawyer.status === 'active'
          ? `${API_URL}/lawyers/${lawyer.id}/suspend`
          : `${API_URL}/lawyers/${lawyer.id}/activate`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء تغيير حالة المحامي'
        );
      }
    });
  };

  const remove = (lawyer) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف حساب "${lawyer.name}"؟ لا يمكن التراجع عن هذا الإجراء.`
    );

    if (!confirmed) return;

    const token = getToken();

    runAction(async () => {
      const response = await fetch(
        `${API_URL}/lawyers/${lawyer.id}`,
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
          data.message || 'حدث خطأ أثناء حذف المحامي'
        );
      }
    });
  };

  const viewDocument = (lawyer) => {
  if (!lawyer.document_url) {
    alert('لا توجد وثيقة مرفوعة لهذا المحامي');
    return;
  }

  const documentUrl = `http://localhost:5000${lawyer.document_url}`;

  window.open(documentUrl, '_blank', 'noopener,noreferrer');
};

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <div className="header-title">
          <h1>إدارة حسابات المحامين</h1>
          <p>
            مراجعة الوثائق، اعتماد، تعليق أو حذف حسابات المحامين
          </p>
        </div>
      </header>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>المحامي</th>
              <th>التخصص</th>
              <th>الرقم النقابي</th>
              <th>تاريخ الانضمام</th>
              <th>الوثيقة</th>
              <th>التوثيق</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {(loading || error || lawyers.length === 0) && (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: 'center',
                    color: '#94a3b8'
                  }}
                >
                  {loading
                    ? 'جارٍ التحميل...'
                    : error || 'لا يوجد محامين حالياً'}
                </td>
              </tr>
            )}

            {lawyers.map((lawyer) => (
              <tr key={lawyer.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">
                      {initialOf(lawyer.name)}
                    </div>

                    <span className="user-name">
                      {lawyer.name}
                    </span>
                  </div>
                </td>

                <td>
                  {specializationLabel(lawyer.specialty)}
                </td>

                <td className="email-cell">
                  {lawyer.bar_number || '—'}
                </td>

                <td className="date-cell">
                  {formatDate(lawyer.created_at)}
                </td>

                <td>
                  {lawyer.document_url ? (
                    <button
                      type="button"
                      className="action-btn btn-activate"
                      onClick={() => viewDocument(lawyer)}
                    >
                      عرض الوثيقة
                    </button>
                  ) : (
                    <span style={{ color: '#94a3b8' }}>
                      لا توجد
                    </span>
                  )}
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      lawyer.verified
                        ? 'active'
                        : 'suspended'
                    }`}
                  >
                    {lawyer.verified
                      ? 'موثّق'
                      : 'بانتظار المراجعة'}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      lawyer.status === 'active'
                        ? 'active'
                        : 'suspended'
                    }`}
                  >
                    {USER_STATUS_LABELS[lawyer.status]}
                  </span>
                </td>

                <td>
                  <div className="actions-cell">
                    {!lawyer.verified && (
                      <button
                        type="button"
                        className="action-btn btn-activate"
                        onClick={() => approve(lawyer)}
                      >
                        اعتماد
                      </button>
                    )}

                    <button
                      type="button"
                      className={`action-btn ${
                        lawyer.status === 'active'
                          ? 'btn-suspend'
                          : 'btn-activate'
                      }`}
                      onClick={() => toggleStatus(lawyer)}
                    >
                      {lawyer.status === 'active'
                        ? 'تعليق'
                        : 'تفعيل'}
                    </button>

                    <button
                      type="button"
                      className="action-btn btn-delete"
                      onClick={() => remove(lawyer)}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLawyers;