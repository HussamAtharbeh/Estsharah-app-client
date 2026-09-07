import React, { useState } from 'react';
import { Check, X, Briefcase, Star, MessageCircle, CreditCard } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pagesStyle/lawyerStyle/LawyerOrders.css';

const LawyerOrders = () => {
  const context = useOutletContext();
  const user = context?.user || { name: 'صالح عذاربه' };

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      client: 'عبدالله صالح',
      type: 'استشارة هاتفية',
      time: '10:30 صباحاً',
      date: 'اليوم',
      price: 75,
      initials: 'ع'
    },
    {
      id: 'ORD-002',
      client: 'مؤسسة الأفق',
      type: 'مراجعة عقد',
      time: '01:00 ظهراً',
      date: 'غداً',
      price: 125,
      initials: 'م'
    },
    {
      id: 'ORD-003',
      client: 'سمير الحداد',
      type: 'استشارة فيديو',
      time: '04:00 عصراً',
      date: 'غداً',
      price: 95,
      initials: 'س'
    }
  ]);

  const handleOrderAction = (orderId) => {
    setOrders((currentOrders) =>
      currentOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <div className="lawyer-orders-page">
      <div className="lawyer-orders-container">
        
        <div className="lawyer-welcome-section">
          <div className="welcome-text">
            <h1>مرحباً، {user.name}</h1>
            <p>إليك ملخص نشاطك اليوم</p>
          </div>
        </div>

        <div className="lawyer-stats-grid">
          <div className="stat-card">
            <div className="stat-icon case-icon">
              <Briefcase size={22} />
            </div>
            <div className="stat-value">342</div>
            <div className="stat-label">إجمالي القضايا</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon star-icon">
              <Star size={22} />
            </div>
            <div className="stat-value">4.9</div>
            <div className="stat-label">التقييم العام</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon chat-icon">
              <MessageCircle size={22} />
            </div>
            <div className="stat-value">28</div>
            <div className="stat-label">استشارات الشهر</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon money-icon">
              <CreditCard size={22} />
            </div>
            <div className="stat-value">1,240</div>
            <div className="stat-label">أرباح الشهر (د.أ)</div>
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

          {orders.length > 0 ? (
            <div className="lawyer-orders-list">
              {orders.map((order) => (
                <article key={order.id} className="lawyer-order-item">
                  <div className="lawyer-order-client">
                    <div className="lawyer-order-avatar">
                      {order.initials}
                    </div>

                    <div className="lawyer-order-info">
                      <h2>{order.client}</h2>
                      <div className="lawyer-order-details">
                        <span>{order.type}</span>
                        <span className="order-separator">•</span>
                        <span>{order.time}</span>
                        <span className="order-separator">•</span>
                        <span>{order.date}</span>
                        <span className="order-separator">•</span>
                        <strong>{order.price} د.أ</strong>
                      </div>
                    </div>
                  </div>

                  <div className="lawyer-order-actions">
                    <button
                      type="button"
                      className="order-accept-btn"
                      onClick={() => handleOrderAction(order.id)}
                    >
                      <span>قبول</span>
                      <Check size={17} />
                    </button>

                    <button
                      type="button"
                      className="order-reject-btn"
                      onClick={() => handleOrderAction(order.id)}
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
              <p>ستظهر طلبات العملاء الجديدة هنا.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default LawyerOrders;