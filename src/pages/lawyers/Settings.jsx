import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  User,
  BriefcaseBusiness,
  MessageSquare,
  Clock3,
  Camera,
  Plus,
  X,
  Save,
  Phone,
  Video,
  MapPin
} from 'lucide-react';
import { getToken } from '../../utils/auth';
import { CITIES, SPECIALIZATIONS } from '../../utils/labels';
import '../../styles/pagesStyle/lawyerStyle/LawyerSettings.css';

const CONSULTATION_TYPES = [
  { key: 'phone', label: 'استشارة هاتفية', icon: Phone },
  { key: 'video', label: 'استشارة فيديو', icon: Video },
  { key: 'office', label: 'استشارة حضورية', icon: MapPin }
];

const Settings = () => {
  const { profile, setProfile } = useOutletContext();

  const [formData, setFormData] = useState({
    name: profile?.name ?? '',
    city: profile?.city ?? '',
    specialty: profile?.specialty ?? '',
    experience: profile?.experience ?? 0,
    bio: profile?.bio ?? '',
    prices: profile?.prices ?? {},
    available: profile?.available ?? true,
    specialties: profile?.specialties ?? [],
    consultationTypes: profile?.consultation_types ?? [],
    image: profile?.image ?? ''
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setSaved(false);
  };

  const handlePriceChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [type]: value
      }
    }));

    setSaved(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return;

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result
      }));

      setSaved(false);
    };

    reader.readAsDataURL(file);
  };

  const removeSpecialty = (specialty) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter(
        (item) => item !== specialty
      )
    }));

    setSaved(false);
  };

  const addSpecialty = () => {
    const specialty = window.prompt('أدخل التخصص الجديد');

    if (!specialty?.trim()) return;

    const value = specialty.trim();

    if (formData.specialties.includes(value)) return;

    setFormData((prev) => ({
      ...prev,
      specialties: [...prev.specialties, value]
    }));

    setSaved(false);
  };

 const toggleConsultationType = (type) => {
  const types = formData.consultationTypes;

  if (types.includes(type)) {
    setFormData({
      ...formData,
      consultationTypes: types.filter((item) => item !== type)
    });
  } else {
    setFormData({
      ...formData,
      consultationTypes: [...types, type]
    });
  }

  setSaved(false);
};

  const toggleAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      available: !prev.available
    }));

    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSaving(true);

    const cleanPrices = Object.fromEntries(
      Object.entries(formData.prices).map(
        ([key, value]) => [key, Number(value) || 0]
      )
    );

    try {
      const token = getToken();

      const response = await fetch(
        'http://localhost:5000/api/lawyers/me',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            city: formData.city,
            specialty: formData.specialty,
            experience: Number(formData.experience),
            bio: formData.bio.trim(),
            prices: cleanPrices,
            specialties: formData.specialties,
            consultationTypes: formData.consultationTypes,
            available: formData.available,
            image: formData.image || undefined
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'حدث خطأ أثناء حفظ التغييرات'
        );
      }

      setProfile(data);
      setSaved(true);

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="lawyer-settings-page">
      <div className="lawyer-settings-container">

        <header className="lawyer-settings-header">
          <div>
            <div className="settings-title">
              <h1>الإعدادات</h1>
              <Clock3 size={21} />
            </div>

            <p>
              إدارة معلومات حسابك وملفك المهني
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit}>

          <section className="settings-card">

            <div className="settings-card-header">
              <div>
                <h2>المعلومات الشخصية</h2>
                <p>قم بتحديث معلوماتك الشخصية الأساسية</p>
              </div>

              <User size={21} />
            </div>

            <div className="personal-settings">

              <div className="profile-image-area">

                <h3>الصورة الشخصية</h3>

                <div className="profile-image-box">
  {formData.image ? (
    <img
      src={formData.image}
      alt={formData.name}
      className="card-avatar"
    />
  ) : (
    <div className="card-avatar">
      <User size={40} />
    </div>
  )}
</div>
                <label className="change-image-btn">
                  <Camera size={14} />
                  <span>تغيير الصورة</span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleImageChange}
                  />
                </label>

                <small>
                  يفضل صورة احترافية بخلفية واضحة
                  <br />
                  JPG, PNG (Max 5MB)
                </small>

              </div>

              <div className="settings-fields">

                <div className="settings-field">
                  <label htmlFor="name">
                    الاسم الكامل <span>*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="city">
                    المدينة <span>*</span>
                  </label>

                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر المدينة</option>

                    {CITIES.map((city) => (
                      <option
                        key={city.value}
                        value={city.value}
                      >
                        {city.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

            </div>

          </section>

          <section className="settings-card">

            <div className="settings-card-header">
              <div>
                <h2>المعلومات المهنية</h2>
                <p>هذه المعلومات المهنية التي تظهر في ملفك</p>
              </div>

              <BriefcaseBusiness size={21} />
            </div>

            <div className="professional-fields">

              <div className="settings-field">
                <label htmlFor="specialty">
                  التخصص الرئيسي <span>*</span>
                </label>

                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر التخصص</option>

                  {SPECIALIZATIONS.map((spec) => (
                    <option
                      key={spec.value}
                      value={spec.value}
                    >
                      {spec.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="settings-field">
                <label htmlFor="experience">
                  سنوات الخبرة <span>*</span>
                </label>

                <div className="experience-input">

                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />

                  <span>سنة</span>

                </div>
              </div>

            </div>

            <div className="specialties-section">

              <label>التخصصات الفرعية</label>

              <div className="specialties-content">

                <div className="specialties-list">

                  {formData.specialties.map((specialty) => (
                    <div
                      key={specialty}
                      className="specialty-tag"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          removeSpecialty(specialty)
                        }
                      >
                        <X size={12} />
                      </button>

                      <span>{specialty}</span>
                    </div>
                  ))}

                </div>

                <button
                  type="button"
                  className="add-specialty-btn"
                  onClick={addSpecialty}
                >
                  <Plus size={14} />
                  <span>إضافة تخصص</span>
                </button>

              </div>

            </div>

            <div className="bio-section">

              <label htmlFor="bio">
                نبذة عن المحامي <span>*</span>
              </label>

              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={500}
                rows={4}
                required
              />

              <span className="bio-counter">
                {formData.bio.length}/500
              </span>

            </div>

          </section>

          <section className="settings-card">

            <div className="settings-card-header">
              <div>
                <h2>الاستشارات والأسعار</h2>
                <p>حدد سعر كل نوع استشارة على حدة</p>
              </div>

              <MessageSquare size={21} />
            </div>

            <div className="consultation-types-list">

              {CONSULTATION_TYPES.map(
                ({ key, label, icon: Icon }) => {

                  const isSelected =
                    formData.consultationTypes.includes(key);

                  return (
                    <div
                      key={key}
                      className={`consultation-type-row ${
                        isSelected ? 'selected' : ''
                      }`}
                    >

                      <button
                        type="button"
                        className="consultation-type-toggle"
                        onClick={() =>
                          toggleConsultationType(key)
                        }
                      >
                        <span className="option-check">
                          {isSelected && '✓'}
                        </span>

                        <Icon size={16} />

                        <span>{label}</span>
                      </button>

                      <div
                        className={`consultation-price-input ${
                          isSelected ? '' : 'disabled'
                        }`}
                      >
                        <input
                          type="number"
                          min="1"
                          value={formData.prices[key] ?? ''}
                          onChange={(e) =>
                            handlePriceChange(
                              key,
                              e.target.value
                            )
                          }
                          disabled={!isSelected}
                          required={isSelected}
                          placeholder="0"
                        />

                        <span>د.أ</span>
                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </section>

          <section className="settings-card">

            <div className="settings-card-header">
              <div>
                <h2>التوفر</h2>
                <p>تحكم في حالة توفرك للاستشارات</p>
              </div>

              <Clock3 size={21} />
            </div>

            <div className="availability-section">

              <div className="availability-box">

                <div>
                  <span>الحالة الحالية</span>

                  <strong>
                    {formData.available
                      ? 'متاح الآن للاستشارات'
                      : 'غير متاح حالياً'}
                  </strong>

                  <small>
                    سيظهر هذا في ملفك العام للمحامين
                  </small>
                </div>

                <button
                  type="button"
                  className={`availability-toggle ${
                    formData.available ? 'active' : ''
                  }`}
                  onClick={toggleAvailability}
                >
                  <span />
                </button>

              </div>

              <div
                className={`availability-message ${
                  formData.available ? 'active' : 'inactive'
                }`}
              >
                <span className="availability-dot" />

                <div>
                  <strong>
                    {formData.available
                      ? 'أنت متاح الآن للاستشارات'
                      : 'أنت غير متاح حالياً'}
                  </strong>

                  <small>
                    {formData.available
                      ? 'سيتمكن العملاء من حجز استشارة معك'
                      : 'لن يتمكن العملاء من حجز استشارة جديدة معك'}
                  </small>
                </div>
              </div>

            </div>

          </section>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`save-settings-btn ${
              saved ? 'saved' : ''
            }`}
            disabled={saving}
          >
            <Save size={17} />

            <span>
              {saving
                ? 'جارٍ الحفظ...'
                : saved
                  ? 'تم حفظ التغييرات'
                  : 'حفظ التغييرات'}
            </span>
          </button>

        </form>

      </div>
    </div>
  );
};

export default Settings;