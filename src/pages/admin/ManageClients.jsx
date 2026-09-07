import React, { useState } from 'react';

const ManageClients = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'محمد أحمد', initials: 'م', email: 'm.ahmed@mail.com', count: 12, status: 'نشط' },
    { id: 2, name: 'فاطمة العلي', initials: 'ف', email: 'f.ali@mail.com', count: 5, status: 'نشط' },
    { id: 3, name: 'عبدالله صالح', initials: 'ع', email: 'a.saleh@mail.com', count: 3, status: 'معلق' }
  ]);

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
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar client-avatar">{client.initials}</div>
                    <span className="user-name">{client.name}</span>
                  </div>
                </td>
                <td className="email-cell">{client.email}</td>
                <td className="count-cell">{client.count}</td>
                <td>
                  <span className={`status-badge ${client.status === 'نشط' ? 'active' : 'suspended'}`}>
                    {client.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className={`action-btn ${client.status === 'نشط' ? 'btn-suspend' : 'btn-activate'}`}>
                      {client.status === 'نشط' ? 'تعليق' : 'تفعيل'}
                    </button>
                    <button className="action-btn btn-delete">حذف</button>
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