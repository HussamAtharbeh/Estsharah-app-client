import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/auth';
import { USER_STATUS_LABELS, initialOf } from '../../utils/labels';
import {API_URL} from "../../config"
const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;

    const fetchClients = async () => {
      try {
        setLoading(true);
        setError('');

        const token = getToken();

        const response = await fetch(
        `${API_URL}/users/admin/clients`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'حدث خطأ أثناء تحميل العملاء'
          );
        }

        if (!cancelled) {
          setClients(data);
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

    fetchClients();

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

  const toggleStatus = (client) => {
    const token = getToken();

    return runAction(async () => {
      const endpoint =
        client.status === 'active'
          ? `${API_URL}/users/${client.id}/suspend`
          : `${API_URL}/users/${client.id}/activate`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء تغيير حالة العميل'
        );
      }
    });
  };

  const remove = (client) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف حساب "${client.name}"؟ لا يمكن التراجع عن هذا الإجراء.`
    );

    if (!confirmed) return;

    const token = getToken();

    runAction(async () => {
      const response = await fetch(
        `${API_URL}/users/${client.id}`,
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
          data.message || 'حدث خطأ أثناء حذف العميل'
        );
      }
    });
  };

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <div className="header-title">
          <h1>إدارة حسابات العملاء</h1>
          <p>تعليق أو حذف حسابات العملاء المسجلين</p>
        </div>
      </header>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>العميل</th>
              <th>البريد</th>
              <th>الاستشارات</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {(loading || error || clients.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: 'center',
                    color: '#94a3b8'
                  }}
                >
                  {loading
                    ? 'جارٍ التحميل...'
                    : error || 'لا يوجد عملاء حالياً'}
                </td>
              </tr>
            )}

            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar client-avatar">
                      {initialOf(client.name)}
                    </div>

                    <span className="user-name">
                      {client.name}
                    </span>
                  </div>
                </td>

                <td className="email-cell">
                  {client.email}
                </td>

                <td className="count-cell">
                  {client.consultations_count}
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      client.status === 'active'
                        ? 'active'
                        : 'suspended'
                    }`}
                  >
                    {USER_STATUS_LABELS[client.status]}
                  </span>
                </td>

                <td>
                  <div className="actions-cell">
                    <button
                      type="button"
                      className={`action-btn ${
                        client.status === 'active'
                          ? 'btn-suspend'
                          : 'btn-activate'
                      }`}
                      onClick={() => toggleStatus(client)}
                    >
                      {client.status === 'active'
                        ? 'تعليق'
                        : 'تفعيل'}
                    </button>

                    <button
                      type="button"
                      className="action-btn btn-delete"
                      onClick={() => remove(client)}
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

export default ManageClients;