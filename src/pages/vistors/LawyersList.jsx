import React, { useEffect, useState } from 'react';
import { Award, AlertCircle } from 'lucide-react';
import LawyerCard from '../../components/lawyers/LawyerCard';
import LawyerFilterBar from '../../components/lawyers/LawyerFilterBar';
import '../../styles/pagesStyle/vistorsStyle/Lawyers.css';

const LawyersList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');

      
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (specialization) params.set('specialization', specialization);
      if (city) params.set('city', city);
      if (sortBy) params.set('sortBy', sortBy);
      if (isAvailableOnly) params.set('availableOnly', 'true');

      try {
        const res = await fetch(`http://localhost:5000/api/lawyers?${params.toString()}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'حدث خطأ أثناء جلب المحامين');
        }

        if (!cancelled) setLawyers(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchTerm, specialization, city, sortBy, isAvailableOnly]);

  return (
    <div className="lawyers-page">
      <div className="lawyers-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Award size={16} />
            <span>شركاء النجاح</span>
          </div>
          <h1>المحامون</h1>
          <p>نخبة من المحامين والمستشارين القانونيين المعتمدين، تم اختيارهم بعناية لتقديم أفضل الحلول القانونية وحماية مصالحك بأعلى معايير الاحترافية والسرية.</p>
        </div>
      </div>

      <div className="lawyers-container">
        <LawyerFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          specialization={specialization}
          setSpecialization={setSpecialization}
          city={city}
          setCity={setCity}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isAvailableOnly={isAvailableOnly}
          setIsAvailableOnly={setIsAvailableOnly}
        />

        {loading ? (
          <div className="no-results">
            <h3>جارٍ تحميل المحامين...</h3>
          </div>
        ) : error ? (
          <div className="no-results">
            <AlertCircle size={48} />
            <h3>تعذّر تحميل المحامين</h3>
            <p>{error}</p>
          </div>
        ) : lawyers.length > 0 ? (
          <div className="lawyers-grid">
            {lawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <AlertCircle size={48} />
            <h3>لا توجد نتائج</h3>
            <p>يرجى محاولة تغيير فلاتر البحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyersList;