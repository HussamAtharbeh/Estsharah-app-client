import React, { useState } from 'react';

const ManageLawyers = () => {
  const [lawyers, setLawyers] = useState([
    { id: 1, name: 'خالد العمري', initials: 'خ', spec: 'قانون تجاري', date: '2024-01-15', status: 'نشط' },
    { id: 2, name: 'سارة الطراونة', initials: 'س', spec: 'قانون الأسرة', date: '2024-03-20', status: 'نشط' },
    { id: 3, name: 'يوسف الزعبي', initials: 'ي', spec: 'قانون العقارات', date: '2024-06-10', status: 'معلق' },
    { id: 4, name: 'ريم الشوبكي', initials: 'ر', spec: 'القانون الجزائي', date: '2024-02-05', status: 'نشط' }
  ]);

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <div className="header-title">
          <h1>إدارة حسابات المحامين</h1>
          <p>تعليق أو حذف حسابات المحامين المسجلين</p>
        </div>
      </header>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>المحامي</th>
              <th>التخصص</th>
              <th>تاريخ الانضمام</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {lawyers.map((lawyer) => (
              <tr key={lawyer.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">{lawyer.initials}</div>
                    <span className="user-name">{lawyer.name}</span>
                  </div>
                </td>
                <td>{lawyer.spec}</td>
                <td className="date-cell">{lawyer.date}</td>
                <td>
                  <span className={`status-badge ${lawyer.status === 'نشط' ? 'active' : 'suspended'}`}>
                    {lawyer.status}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className={`action-btn ${lawyer.status === 'نشط' ? 'btn-suspend' : 'btn-activate'}`}>
                      {lawyer.status === 'نشط' ? 'تعليق' : 'تفعيل'}
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

export default ManageLawyers;