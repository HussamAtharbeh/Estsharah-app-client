import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Upload, AlertCircle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AuthSidebar } from '../../components/shared/AuthSidebar';
import '../../styles/pagesStyle/loginStyle/SignUp.css';
import '../../styles/pagesStyle/loginStyle/SignUpLawyer.css';

const SPECIALIZATIONS = [
  { value: "commercial", label: "قانون تجاري وشركات" },
  { value: "civil", label: "قانون مدني" },
  { value: "criminal", label: "قانون جنائي" },
  { value: "family", label: "قانون أحوال شخصية" },
  { value: "labor", label: "قانون العمل" },
  { value: "real-estate", label: "قانون عقاري" },
];

const CITIES = [
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

const SignUpLawyer = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    barNumber: '',
    specialization: '',
    experience: '',
    city: ''
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('نوع الملف غير مدعوم');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('حجم الملف يجب ألا يتجاوز 10MB');
      return;
    }

    setFile(selectedFile);
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    if (!file) {
      alert("يرجى رفع صورة الهوية أو بطاقة النقابة");
      return;
    }
    console.log({ ...formData, document: file });
    navigate("/signin");
  };

  return (
    <div className="signup-layout">
      <div className="signup-form-section">
        <div className="signup-container lawyer-form-container">

          <Link to="/signup" className="lawyer-back-link">
            <ChevronRight size={18} />
            <span>رجوع</span>
          </Link>

          <div className="lawyer-header">
            <h1>تسجيل محامي جديد</h1>
            <p>الخطوة {step} من 3</p>
          </div>

          <div className="steps-progress">
            <div className={`step-line ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
          </div>

          {step === 1 && (
            <form className="lawyer-form-card" onSubmit={nextStep}>
              <h2>البيانات الأساسية</h2>
              <Input label="الاسم الرباعي" name="fullName" placeholder="كما هو مسجل في النقابة" type="text" dir="auto" value={formData.fullName} onChange={handleChange} required />
              <Input label="البريد الإلكتروني" name="email" placeholder="name@email.com" type="email" dir="ltr" value={formData.email} onChange={handleChange} required />
              <Input label="كلمة المرور" name="password" placeholder="8 أحرف على الأقل" type="password" dir="ltr" value={formData.password} onChange={handleChange} required />
              <Button type="submit">المتابعة</Button>
            </form>
          )}

          {step === 2 && (
            <form className="lawyer-form-card" onSubmit={nextStep}>
              <h2>التفاصيل المهنية</h2>
              <Input label="رقم القيد في نقابة المحامين" name="barNumber" placeholder="JBA-XXXXX" type="text" dir="ltr" value={formData.barNumber} onChange={handleChange} required />

              <div className="lawyer-field">
                <label>مجال التخصص الرئيسي</label>
                <select name="specialization" value={formData.specialization} onChange={handleChange} required>
                  <option value="">اختر مجال التخصص</option>
                  {SPECIALIZATIONS.map((spec) => (
                    <option key={spec.value} value={spec.value}>{spec.label}</option>
                  ))}
                </select>
              </div>

              <Input label="سنوات الخبرة" name="experience" placeholder="مثال: 5" type="number" min="0" value={formData.experience} onChange={handleChange} required />

              <div className="lawyer-field">
                <label>المدينة</label>
                <select name="city" value={formData.city} onChange={handleChange} required>
                  <option value="">اختر المدينة</option>
                  {CITIES.map((city) => (
                    <option key={city.value} value={city.value}>{city.label}</option>
                  ))}
                </select>
              </div>

              <div className="lawyer-buttons">
                <button type="button" className="secondary-button" onClick={previousStep}>السابق</button>
                <Button type="submit">المتابعة</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="lawyer-form-card documents-card" onSubmit={submitRegistration}>
              <h2>الوثائق الرسمية</h2>

              <div className="important-alert">
                <AlertCircle size={22} />
                <div>
                  <strong>تنبيه هام</strong>
                  <p>يجب رفع صورة الهوية الشخصية لمطابقتها مع رقم القيد، ولن يتم عرضها لأي شخص باستثناء الإدارة.</p>
                </div>
              </div>

              <div className="document-label">صورة الهوية أو بطاقة النقابة</div>

              <label className="upload-box">
                <input type="file" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={handleFileChange} />
                <Upload size={38} />
                {file ? (
                  <>
                    <strong>{file.name}</strong>
                    <span>تم اختيار الملف</span>
                  </>
                ) : (
                  <>
                    <strong>اسحب الملفات أو انقر للاختيار</strong>
                  </>
                )}
              </label>

            

              <div className="lawyer-buttons">
                <button type="button" className="secondary-button" onClick={previousStep}>السابق</button>
                <Button type="submit">تقديم طلب التسجيل</Button>
              </div>
            </form>
          )}

        </div>
      </div>

      <AuthSidebar />

    </div>
  );
};

export default SignUpLawyer;