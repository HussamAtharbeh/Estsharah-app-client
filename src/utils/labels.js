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

export const CONSULTATION_TYPES = [
  { value: "video", label: "استشارة فيديو", description: "تواصل مباشرة مع المحامي عبر مكالمة فيديو." },
  { value: "phone", label: "استشارة هاتفية", description: "تحدث مع المحامي مباشرة عبر مكالمة هاتفية." },
  { value: "office", label: "استشارة حضورية", description: "زيارة مكتب المحامي وحضور الاستشارة بشكل مباشر." },
];

const getLabel = (list, value) =>
  list.find((item) => item.value === value)?.label || value || "";

export const specializationLabel = (value) =>
  getLabel(SPECIALIZATIONS, value);

export const cityLabel = (value) =>
  getLabel(CITIES, value);

export const consultationTypeLabel = (value) =>
  getLabel(CONSULTATION_TYPES, value);

export const CONSULTATION_STATUS_LABELS = {
  pending: "قيد الانتظار",
  confirmed: "نشطة",
  completed: "مكتملة",
  cancelled: "ملغاة",
};

export const USER_STATUS_LABELS = {
  active: "نشط",
  suspended: "معلق",
};

export const PAYMENT_STATUS_LABELS = {
  paid: "مدفوع",
  refunded: "مسترجع",
};

export const COMPLAINT_STATUS_LABELS = {
  open: "مفتوحة",
  resolved: "تم الحل",
};

export const ROLE_LABELS = {
  client: "عميل",
  lawyer: "محامي",
  admin: "إدارة",
};

export const consultationStatusClass = (status) => {
  if (status === "completed") return "completed";
  if (status === "cancelled") return "cancelled";
  return "active";
};

export const formatDate = (value) =>
  value ? String(value).slice(0, 10) : "";

export const formatPrice = (amount) =>
  `${amount ?? 0} د.أ`;

export const initialOf = (name) =>
  name?.trim()?.[0] || "؟";