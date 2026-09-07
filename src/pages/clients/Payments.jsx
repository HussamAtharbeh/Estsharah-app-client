import React from 'react';
import {
  FileText,
  UserRound,
  CalendarDays,
  CircleCheck,
  RotateCcw,
  CreditCard
} from 'lucide-react';
import '../../styles/pagesStyle/clientStyle/Payments.css';

const payments = [
  {
    id: 'PAY-001',
    consultation: 'نزاع عقاري - مراجعة العقود',
    lawyer: 'خالد العمري',
    amount: '95 د.أ',
    date: '2025-01-10',
    status: 'مدفوع'
  },
  {
    id: 'PAY-002',
    consultation: 'استشارة قانون الأسرة',
    lawyer: 'سارة الطراونة',
    amount: '55 د.أ',
    date: '2025-01-08',
    status: 'مدفوع'
  },
  {
    id: 'PAY-003',
    consultation: 'مراجعة عقد تجاري دولي',
    lawyer: 'ريم الشوبكي',
    amount: '140 د.أ',
    date: '2025-01-05',
    status: 'مدفوع'
  },
  {
    id: 'PAY-004',
    consultation: 'تأسيس شركة ذات مسؤولية محدودة',
    lawyer: 'خالد العمري',
    amount: '125 د.أ',
    date: '2024-12-15',
    status: 'مسترجع'
  }
];

const getStatusIcon = (status) => {
  return status === 'مدفوع'
    ? <CircleCheck size={15} />
    : <RotateCcw size={15} />;
};

const Payments = () => {
  return (
    <div className="payments-page">
      <div className="payments-container">
        <div className="payments-header">
          <span className="payments-eyebrow">المعاملات المالية</span>

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
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <span className="payment-id">
                        {payment.id}
                      </span>
                    </td>

                    <td>
                      <div className="consultation-cell">
                        <div className="consultation-icon">
                          <FileText size={18} />
                        </div>

                        <span className="consultation-name">
                          {payment.consultation}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="lawyer-cell">
                        <div className="lawyer-icon">
                          <UserRound size={17} />
                        </div>

                        <span className="lawyer-name">
                          {payment.lawyer}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="payment-amount">
                        {payment.amount}
                      </span>
                    </td>

                    <td>
                      <div className="payment-date">
                        <CalendarDays size={16} />
                        <span>{payment.date}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`payment-status ${
                          payment.status === 'مدفوع'
                            ? 'status-paid'
                            : 'status-refunded'
                        }`}
                      >
                        {getStatusIcon(payment.status)}
                        {payment.status}
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