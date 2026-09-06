import React, { useState, useMemo } from 'react';
import { Award, AlertCircle } from 'lucide-react';
import LawyerCard from '../../components/lawyers/LawyerCard';
import LawyerFilterBar from '../../components/lawyers/LawyerFilterBar';
import '../../styles/pagesStyle/vistorsStyle/Lawyers.css';
import lawyerImg from '../../assets/images/lawyer1.jpg';

const LAWYERS_DATA = [
  { 
    id: 1, 
    name: "فارس البشير", 
    spec: "الملكية الفكرية", 
    rating: 4.8, 
    reviews: 83, 
    city: "عمان", 
    exp: 11, 
    cases: 207, 
    time: "أقل من ساعتين", 
    price: 80, 
    available: true, 
    image: lawyerImg 
  },
  { 
    id: 2, 
    name: "خالد العمري", 
    spec: "قانون تجاري", 
    rating: 4.9, 
    reviews: 128, 
    city: "عمان", 
    exp: 15, 
    cases: 342, 
    time: "أقل من ساعة", 
    price: 75, 
    available: true, 
    image: lawyerImg 
  }
];

const LawyersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  const filteredLawyers = useMemo(() => {
    return LAWYERS_DATA.filter((lawyer) => {
      if (isAvailableOnly && !lawyer.available) return false;
      if (specialization && lawyer.spec !== specialization) return false;
      if (city && lawyer.city !== city) return false;
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!lawyer.name.toLowerCase().includes(term) && !lawyer.spec.toLowerCase().includes(term)) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return b.rating - a.rating;
    });
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

        {filteredLawyers.length > 0 ? (
          <div className="lawyers-grid">
            {filteredLawyers.map((lawyer) => (
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