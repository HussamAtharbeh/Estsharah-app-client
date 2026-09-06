import React from 'react';
import { Search, MapPin, Briefcase, Filter } from 'lucide-react';
import '../../styles/componentsStyle/lawersStyle/LawyerFilterBar.css';

export const SPECIALIZATIONS = [
  { value: "commercial", label: "قانون تجاري وشركات" },
  { value: "civil", label: "قانون مدني" },
  { value: "criminal", label: "قانون جنائي" },
  { value: "family", label: "قانون أحوال شخصية" },
  { value: "labor", label: "قانون العمل" },
  { value: "real-estate", label: "قانون عقاري" },
];

export const CITIES = [
  { value: "amman", label: "عمان" },
  { value: "zarqa", label: "الزرقاء" },
  { value: "irbid", label: "إربد" },
  { value: "aqaba", label: "العقبة" },
  { value: "salt", label: "السلط" },
  { value: "madaba", label: "مادبا" },
  { value: "jerash", label: "جرش" },
  { value: "ajloun", label: "عجلون" },
  { value: "karak", label: "الكرك" },
  { value: "tafilah", label: "الطفيلة" },
  { value: "maan", label: "معان" },
  { value: "mafraq", label: "المفرق" },
];

const LawyerFilterBar = ({ 
  searchTerm, 
  setSearchTerm,
  specialization,
  setSpecialization,
  city,
  setCity,
  sortBy,
  setSortBy,
  isAvailableOnly, 
  setIsAvailableOnly 
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-inputs">
        <div className="filter-group search-group">
          <label>بحث ذكي</label>
          <div className="input-with-icon">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="الاسم، التخصص..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              dir="auto" 
            />
          </div>
        </div>

        <div className="filter-group">
          <label>التخصص القانوني</label>
          <div className="input-with-icon">
            <Briefcase size={18} />
            <select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
              <option value="">الكل</option>
              {SPECIALIZATIONS.map((spec) => (
                <option key={spec.value} value={spec.value}>
                  {spec.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label>المدينة</label>
          <div className="input-with-icon">
            <MapPin size={18} />
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">الكل</option>
              {CITIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label>ترتيب حسب</label>
          <div className="input-with-icon">
            <Filter size={18} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rating">الأعلى تقييماً</option>
              <option value="price_asc">السعر: من الأقل للأعلى</option>
              <option value="price_desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>
      </div>

      <div className="filter-bottom">
        <div className="toggle-wrapper" onClick={() => setIsAvailableOnly(!isAvailableOnly)}>
          <div className={`custom-toggle ${isAvailableOnly ? 'active' : ''}`}>
            <div className="toggle-knob"></div>
          </div>
          <span>عرض المحامين المتاحين فوراً فقط</span>
        </div>
      </div>
    </div>
  );
};

export default LawyerFilterBar;