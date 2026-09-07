import lawyerImg from '../assets/images/lawyer1.jpg';
export const lawyers = {
  'LAW-001': {
    id: 'LAW-001',
    name: 'فارس البشير',
    spec: 'الملكية الفكرية',
    specialties: ['الملكية الفكرية', 'عقود', 'قانون مدني'],
    rating: 4.8,
    reviews: 83,
    city: 'عمان',
    exp: 11,
    cases: 207,
    time: 'أقل من ساعتين',
    price: 80,
    image: lawyerImg,
    available: true

  },
  'LAW-002': {
    id: 'LAW-002',
    name: 'صالح عذاربه',
    spec: 'قانون تجاري',
    specialties: ['قانون تجاري وشركات', 'قانون العمل', 'قانون عقاري'],
    rating: 4.9,
    reviews: 128,
    city: 'عمان',
    exp: 15,
    cases: 342,
    time: 'أقل من ساعة',
    price: 75,
    image: lawyerImg,
    available: true
  }
};
export const consultationTypes = [
  {
    id: 'video',
    title: 'استشارة عبر الفيديو',
    description: 'تواصل مباشرة مع المحامي عبر مكالمة فيديو.',
    price: 90
  },
  {
    id: 'phone',
    title: 'استشارة هاتفية',
    description: 'تحدث مع المحامي مباشرة عبر مكالمة هاتفية.',
    price: 75
  },
  {
    id: 'office',
    title: 'استشارة مكتبية',
    description: 'زيارة مكتب المحامي وحضور الاستشارة بشكل مباشر.',
    price: 100
  }
];

export const availableTimes = [
  '9:00 ص',
  '10:00 ص',
  '11:00 ص',
  '12:00 م',
  '1:00 م',
  '2:00 م',
  '3:00 م',
  '4:00 م',
  '5:00 م'
];

const getAvailableDays = () => {
  const days = [];
  const formatter = new Intl.DateTimeFormat('ar-JO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    let dayName;

    if (i === 0) {
      dayName = 'اليوم';
    } else if (i === 1) {
      dayName = 'غداً';
    } else {
      dayName = formatter.format(date).split('،')[0];
    }

    const formattedDate = new Intl.DateTimeFormat('ar-JO', {
      day: 'numeric',
      month: 'long'
    }).format(date);

    days.push({
      id: date.toISOString().split('T')[0],
      day: dayName,
      date: formattedDate,
      value: date.toISOString().split('T')[0]
    });
  }

  return days;
};

export const availableDays = getAvailableDays();

export const bookingSteps = [
  { id: 1, title: 'المحامي' },
  { id: 2, title: 'نوع الاستشارة' },
  { id: 3, title: 'الموعد' },
  { id: 4, title: 'تفاصيل الطلب' },
  { id: 5, title: 'معلومات الدفع' }
];
