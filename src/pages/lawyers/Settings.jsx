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
import lawyerImg from '../../assets/images/lawyer1.jpg';
import '../../styles/pagesStyle/lawyerStyle/LawyerSettings.css';

const Settings = () => {
  const { user, setUser } = useOutletContext();

  const [formData, setFormData] = useState({
    name: user?.name || 'صالح عذاربه',
    city: user?.city || 'عمان',
    specialty: user?.specialty || 'قانون تجاري',
    experience: user?.experience || 15,
    bio: user?.bio || 'محام متخصص في قانون تجاري مع خبرة تتجاوز 15 عاماً في المحاكم الأردنية. أتعامل مع القضايا بمهنية عالية. أهدف دائماً إلى تقديم حلول قانونية عملية وفعالة تساعد عملائي على تحقيق أهدافهم بأمان وثقة.',
    price: user?.price || 75,
    available: user?.available ?? true,
    specialties: user?.specialties || [
      'قانون تجاري وشركات',
      'قانون العمل',
      'قانون عقاري'
    ],
    consultationTypes: user?.consultationTypes || [
      'phone',
      'video',
      'office'
    ],
    image: user?.image || lawyerImg
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setSaved(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      image: imageUrl
    }));

    setSaved(false);
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

    if (!specialty?.trim()) {
      return;
    }

    const value = specialty.trim();

    if (formData.specialties.includes(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      specialties: [...prev.specialties, value]
    }));

    setSaved(false);
  };

  const toggleConsultationType = (type) => {
    setFormData((prev) => ({
      ...prev,
      consultationTypes: prev.consultationTypes.includes(type)
        ? prev.consultationTypes.filter((item) => item !== type)
        : [...prev.consultationTypes, type]
    }));

    setSaved(false);
  };

  const toggleAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      available: !prev.available
    }));

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name: formData.name.trim(),
      city: formData.city,
      specialty: formData.specialty,
      experience: Number(formData.experience),
      bio: formData.bio.trim(),
      price: Number(formData.price),
      available: formData.available,
      specialties: formData.specialties,
      consultationTypes: formData.consultationTypes,
      image: formData.image
    };

    setUser(updatedUser);
    localStorage.setItem('lawyerUser', JSON.stringify(updatedUser));
    setSaved(true);
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

            <p>إدارة معلومات حسابك وملفك المهني</p>
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
                  <img
                    src={formData.image}
                    alt={formData.name}
                  />
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
                  >
                    <option value="عمان">عمان</option>
                    <option value="إربد">إربد</option>
                    <option value="الزرقاء">الزرقاء</option>
                    <option value="العقبة">العقبة</option>
                    <option value="السلط">السلط</option>
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
                >
                  <option value="قانون تجاري">قانون تجاري</option>
                  <option value="قانون مدني">قانون مدني</option>
                  <option value="قانون العمل">قانون العمل</option>
                  <option value="قانون عقاري">قانون عقاري</option>
                  <option value="الملكية الفكرية">الملكية الفكرية</option>
                  <option value="قانون الأسرة">قانون الأسرة</option>
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
                        onClick={() => removeSpecialty(specialty)}
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
                <p>حدد سعر الاستشارة وأنواعها المتاحة</p>
              </div>

              <MessageSquare size={21} />
            </div>

            <div className="consultation-settings">

              <div className="settings-field price-field">
                <label htmlFor="price">
                  سعر الاستشارة <span>*</span>
                </label>

                <div className="price-input">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />

                  <span>د.أ</span>
                </div>
              </div>

              <div className="consultation-types">

                <label>أنواع الاستشارات المتاحة</label>

                <div className="consultation-options">

                  <button
                    type="button"
                    className={`consultation-option ${
                      formData.consultationTypes.includes('phone')
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => toggleConsultationType('phone')}
                  >
                    <span className="option-check">
                      {formData.consultationTypes.includes('phone') && '✓'}
                    </span>

                    <Phone size={16} />

                    <span>استشارة هاتفية</span>
                  </button>

                  <button
                    type="button"
                    className={`consultation-option ${
                      formData.consultationTypes.includes('video')
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => toggleConsultationType('video')}
                  >
                    <span className="option-check">
                      {formData.consultationTypes.includes('video') && '✓'}
                    </span>

                    <Video size={16} />

                    <span>استشارة فيديو</span>
                  </button>

                  <button
                    type="button"
                    className={`consultation-option ${
                      formData.consultationTypes.includes('office')
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => toggleConsultationType('office')}
                  >
                    <span className="option-check">
                      {formData.consultationTypes.includes('office') && '✓'}
                    </span>

                    <MapPin size={16} />

                    <span>استشارة حضورية</span>
                  </button>

                </div>

              </div>

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

          <button
            type="submit"
            className={`save-settings-btn ${
              saved ? 'saved' : ''
            }`}
          >
            <Save size={17} />

            <span>
              {saved ? 'تم حفظ التغييرات' : 'حفظ التغييرات'}
            </span>
          </button>

        </form>

      </div>
    </div>
  );
};

export default Settings;