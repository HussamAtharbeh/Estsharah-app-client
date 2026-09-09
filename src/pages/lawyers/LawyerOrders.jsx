import React, { useEffect, useState } from 'react';
import {
  Check,
  X,
  Briefcase,
  Star,
  MessageCircle,
  CreditCard
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import {
  consultationTypeLabel,
  formatDate,
  initialOf
} from '../../utils/labels';
import '../../styles/pagesStyle/lawyerStyle/LawyerOrders.css';

const LawyerOrders = () => {
  const { profile } = useOutletContext();

  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const token = getToken();

      const ordersResponse = await fetch(
        'http://localhost:5000/api/consultations/lawyer/orders',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const ordersData = await ordersResponse.json();

      if (!ordersResponse.ok) {
        throw new Error(
          ordersData.message || 'حدث خطأ أثناء جلب الطلبات'
        );
      }

      const statsResponse = await fetch(
        'http://localhost:5000/api/lawyers/me/stats',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const statsData = await statsResponse.json();

      if (!statsResponse.ok) {
        throw new Error(
          statsData.message || 'حدث خطأ أثناء جلب الإحصائيات'
        );
      }

      setOrders(ordersData);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOrderAction = async (orderId, action) => {
    try {
      const token = getToken();

      let url = '';

      if (action === 'accept') {
        url = `http://localhost:5000/api/consultations/${orderId}/accept`;
      } else {
        url = `http://localhost:5000/api/consultations/${orderId}/reject`;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء تنفيذ العملية'
        );
      }

      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="lawyer-orders-page">
      <div className="lawyer-orders-container">

        <div className="lawyer-welcome-section">
          <div className="welcome-text">
            <h1>مرحباً، {profile?.name ?? ''}</h1>
            <p>إليك ملخص نشاطك اليوم</p>
          </div>
        </div>

        <div className="lawyer-stats-grid">

          <div className="stat-card">
            <div className="stat-icon case-icon">
              <Briefcase size={22} />
            </div>

            <div className="stat-value">
              {stats?.cases_count ?? '—'}
            </div>

            <div className="stat-label">
              إجمالي القضايا
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon star-icon">
              <Star size={22} />
            </div>

            <div className="stat-value">
              {stats
                ? Number(stats.rating_avg).toFixed(1)
                : '—'}
            </div>

            <div className="stat-label">
              التقييم العام
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon chat-icon">
              <MessageCircle size={22} />
            </div>

            <div className="stat-value">
              {stats?.month_consultations ?? '—'}
            </div>

            <div className="stat-label">
              استشارات الشهر
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon money-icon">
              <CreditCard size={22} />
            </div>

            <div className="stat-value">
              {stats?.month_earnings ?? '—'}
            </div>

            <div className="stat-label">
              أرباح الشهر (د.أ)
            </div>
          </div>

        </div>

        <section className="lawyer-orders-card">

          <header className="lawyer-orders-header">
            <div className="lawyer-orders-title-wrapper">
              <h1>طلبات واردة</h1>

              <span className="lawyer-orders-count">
                {orders.length} جديد
              </span>
            </div>
          </header>

          {loading ? (
            <div className="lawyer-orders-empty">
              <p>جارٍ التحميل...</p>
            </div>

          ) : error ? (
            <div className="lawyer-orders-empty">
              <p className="form-error">
                {error}
              </p>
            </div>

          ) : orders.length > 0 ? (
            <div className="lawyer-orders-list">

              {orders.map((order) => (
                <article
                  key={order.id}
                  className="lawyer-order-item"
                >

                  <div className="lawyer-order-client">

                    <div className="lawyer-order-avatar">
                      {initialOf(order.client_name)}
                    </div>

                    <div className="lawyer-order-info">

                      <h2>{order.client_name}</h2>

                      <div className="lawyer-order-details">

                        <span>
                          {consultationTypeLabel(order.type)}
                        </span>

                        <span className="order-separator">
                          •
                        </span>

                        <span>
                          {order.scheduled_time}
                        </span>

                        <span className="order-separator">
                          •
                        </span>

                        <span>
                          {formatDate(order.scheduled_date)}
                        </span>

                        <span className="order-separator">
                          •
                        </span>

                        <strong>
                          {order.price} د.أ
                        </strong>

                      </div>

                      <p className="lawyer-order-title">
                        {order.title}
                      </p>

                    </div>
                  </div>

                  <div className="lawyer-order-actions">

                    <button
                      type="button"
                      className="order-accept-btn"
                      onClick={() =>
                        handleOrderAction(
                          order.id,
                          'accept'
                        )
                      }
                    >
                      <span>قبول</span>
                      <Check size={17} />
                    </button>

                    <button
                      type="button"
                      className="order-reject-btn"
                      onClick={() =>
                        handleOrderAction(
                          order.id,
                          'reject'
                        )
                      }
                    >
                      <span>رفض</span>
                      <X size={17} />
                    </button>

                  </div>

                </article>
              ))}

            </div>

          ) : (
            <div className="lawyer-orders-empty">
              <h2>لا توجد طلبات جديدة</h2>
              <p>
                ستظهر طلبات العملاء الجديدة هنا.
              </p>
            </div>
          )}

        </section>

      </div>
    </div>
  );
};

export default LawyerOrders;