export const governorates = [
  { en: "Cairo", ar: "القاهرة" },
  { en: "Alexandria", ar: "الإسكندرية" },
  { en: "Giza", ar: "الجيزة" },
  // ... (أضف الباقي زي ما في الرسالة السابقة, هنا مختصر عشان الطول)
  { en: "Damietta", ar: "دمياط" }
];

export const displayLocation = (item, lang) =>
  lang === 'ar' ? `${item.ar} (${item.en})` : `${item.en} (${item.ar})`;
