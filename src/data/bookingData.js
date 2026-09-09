export const availableTimes = [
  "9:00 ص",
  "10:00 ص",
  "11:00 ص",
  "12:00 م",
  "1:00 م",
  "2:00 م",
  "3:00 م",
  "4:00 م",
  "5:00 م",
];

export const availableDays = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);

  const value = date.toISOString().split("T")[0];

  let day;

  if (i === 0) {
    day = "اليوم";
  } else if (i === 1) {
    day = "غداً";
  } else {
    day = new Intl.DateTimeFormat("ar-JO", {
      weekday: "long",
    }).format(date);
  }

  const formattedDate = new Intl.DateTimeFormat("ar-JO", {
    day: "numeric",
    month: "long",
  }).format(date);

  return {
    id: value,
    day,
    date: formattedDate,
    value,
  };
});

export const bookingSteps = [
  { id: 1, title: "المحامي" },
  { id: 2, title: "نوع الاستشارة" },
  { id: 3, title: "الموعد" },
  { id: 4, title: "تفاصيل الطلب" },
  { id: 5, title: "معلومات الدفع" },
];