// src/utils/locations.js

export const governorates = [
  { en: "Cairo", ar: "القاهرة" },
  { en: "Alexandria", ar: "الإسكندرية" },
  { en: "Giza", ar: "الجيزة" },
  { en: "Dakahlia", ar: "الدقهلية" },
  { en: "Sharkia", ar: "الشرقية" },
  { en: "Qalyubia", ar: "القليوبية" },
  { en: "Beheira", ar: "البحيرة" },
  { en: "Gharbia", ar: "الغربية" },
  { en: "Monufia", ar: "المنوفية" },
  { en: "Kafr El Sheikh", ar: "كفر الشيخ" },
  { en: "Faiyum", ar: "الفيوم" },
  { en: "Beni Suef", ar: "بني سويف" },
  { en: "Minya", ar: "المنيا" },
  { en: "Asyut", ar: "أسيوط" },
  { en: "Sohag", ar: "سوهاج" },
  { en: "Qena", ar: "قنا" },
  { en: "Luxor", ar: "الأقصر" },
  { en: "Aswan", ar: "أسوان" },
  { en: "Red Sea", ar: "البحر الأحمر" },
  { en: "New Valley", ar: "الوادي الجديد" },
  { en: "Matruh", ar: "مرسى مطروح" },
  { en: "North Sinai", ar: "شمال سيناء" },
  { en: "South Sinai", ar: "جنوب سيناء" },
  { en: "Ismailia", ar: "الإسماعيلية" },
  { en: "Suez", ar: "السويس" },
  { en: "Port Said", ar: "بورسعيد" },
  { en: "Damietta", ar: "دمياط" }
];

// دالة مساعدة لو عايز تعرض الاسم بالعربي أو الإنجليزي
export const displayGovernorate = (gov, lang = 'ar') => {
  return lang === 'ar' ? gov.ar : gov.en;
};
