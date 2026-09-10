import React, { useEffect, useState } from 'react';
import {
  FileText,
  UserRound,
  CalendarDays,
  CircleCheck,
  RotateCcw,
  CreditCard
} from 'lucide-react';

import { getToken } from '../../utils/auth';

import {
  PAYMENT_STATUS_LABELS,
  formatDate,
  formatPrice
} from '../../utils/labels';

import '../../styles/pagesStyle/clientStyle/Payments.css';
import {API_URL} from "../../config"
const getStatusIcon = (status) => {
  return status === 'paid'
    ? <CircleCheck size={15} />
    : <RotateCcw size={15} />;
};

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError('');

        const token = getToken();

        const response = await fetch(
          `${API_URL}/payments/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'حدث خطأ أثناء تحميل المدفوعات'
          );
        }

        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="payments-page">

      <div className="payments-container">

        <div className="payments-header">

          <span className="payments-eyebrow">
            المعاملات المالية
          </span>

          <h1 className="payments-title">
            سجل المدفوعات
          </h1>

          <p className="payments-description">
            عرض جميع عمليات الدفع المرتبطة باستشاراتك القانونية
          </p>

        </div>

        <div className="payments-card">

          <div className="payments-table-wrapper">

            <table className="payments-table">

              <colgroup>
                <col className="payment-column-id" />
                <col className="payment-column-consultation" />
                <col className="payment-column-lawyer" />
                <col className="payment-column-amount" />
                <col className="payment-column-date" />
                <col className="payment-column-status" />
              </colgroup>

              <thead>
                <tr>
                  <th>رقم العملية</th>
                  <th>الاستشارة</th>
                  <th>المحامي</th>
                  <th>المبلغ</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                </tr>
              </thead>

              <tbody>

                {(loading ||
                  error ||
                  payments.length === 0) && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: 'center',
                        color: '#94a3b8'
                      }}
                    >
                      {loading
                        ? 'جارٍ التحميل...'
                        : error ||
                          'لا توجد مدفوعات حتى الآن'}
                    </td>
                  </tr>
                )}

                {payments.map((payment) => (
                  <tr key={payment.id}>

                    <td>
                      <span className="payment-id">
                        PAY-
                        {String(payment.id).padStart(3, '0')}
                      </span>
                    </td>

                    <td>
                      <div className="consultation-cell">

                        <div className="consultation-icon">
                          <FileText size={18} />
                        </div>

                        <span className="consultation-name">
                          {payment.consultation_title}
                        </span>

                      </div>
                    </td>

                    <td>
                      <div className="lawyer-cell">

                        <div className="lawyer-icon">
                          <UserRound size={17} />
                        </div>

                        <span className="lawyer-name">
                          {payment.lawyer_name}
                        </span>

                      </div>
                    </td>

                    <td>
                      <span className="payment-amount">
                        {formatPrice(payment.amount)}
                      </span>
                    </td>

                    <td>
                      <div className="payment-date">

                        <CalendarDays size={16} />

                        <span>
                          {formatDate(payment.created_at)}
                        </span>

                      </div>
                    </td>

                    <td>
                      <span
                        className={`payment-status ${
                          payment.status === 'paid'
                            ? 'status-paid'
                            : 'status-refunded'
                        }`}
                      >
                        {getStatusIcon(payment.status)}

                        {PAYMENT_STATUS_LABELS[
                          payment.status
                        ]}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="payments-footer">

            <div className="payments-footer-info">
              <CreditCard size={18} />

              <span>
                جميع المدفوعات مرتبطة باستشاراتك القانونية
              </span>
            </div>

            <span className="payments-count">
              {payments.length} عمليات
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Payments;