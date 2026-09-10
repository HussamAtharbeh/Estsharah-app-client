import React, { useEffect, useState } from 'react';
import {API_URL} from "../../config"
const Stats = () => {
  const [lawyersCount, setLawyersCount] = useState(0);
  const [consultationsCount, setConsultationsCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const lawyersResponse = await fetch(
          `${API_URL}/lawyers/count`
        );

        const lawyersData = await lawyersResponse.json();

        if (!lawyersResponse.ok) {
          throw new Error(
            lawyersData.message || 'حدث خطأ أثناء جلب عدد المحامين'
          );
        }

        setLawyersCount(Number(lawyersData.count));

        const consultationsResponse = await fetch(
          `${API_URL}/consultations/count`
        );

        const consultationsData = await consultationsResponse.json();

        if (!consultationsResponse.ok) {
          throw new Error(
            consultationsData.message || 'حدث خطأ أثناء جلب عدد الاستشارات'
          );
        }

        setConsultationsCount(Number(consultationsData.count));
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const STATS_DATA = [
    {
      id: 1,
      number: `+${consultationsCount}`,
      label: 'استشارة مكتملة'
    },
    {
      id: 2,
      number: '24/7',
      label: 'دعم متواصل'
    },
    {
      id: 3,
      number: '99%',
      label: 'نسبة الرضا'
    },
    {
      id: 4,
      number: `+${lawyersCount}`,
      label: 'محام معتمد'
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {STATS_DATA.map((stat) => (
          <div className="stat-item" key={stat.id}>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;