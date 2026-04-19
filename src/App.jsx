import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  AlertTriangle,
  Bell,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Clock,
  CloudSun,
  CreditCard,
  Eye,
  FileCheck,
  GraduationCap,
  Headphones,
  Heart,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldAlert,
  Siren,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";

const villages = [
  "היישוב שלי",
  "אור הנר",
  "איבים",
  "ארז",
  "ברור חיל",
  "גבים",
  "דורות",
  "חוות שקמים",
  "יכיני",
  "כפר עזה",
  "מפלסים",
  "נחל עוז",
  "ניר עם",
  "רוחמה",
];

const wastePickupByVillage = {
  "אור הנר": "ראשון ורביעי",
  איבים: "שני",
  ארז: "שני וחמישי",
  "ברור חיל": "ראשון ורביעי",
  גבים: "שני וחמישי",
  דורות: "ראשון ורביעי",
  "חוות שקמים": "בתיאום מול המועצה",
  יכיני: "ראשון ורביעי",
  "כפר עזה": "שני וחמישי",
  מפלסים: "ראשון ורביעי",
  "נחל עוז": "שני וחמישי",
  "ניר עם": "ראשון ורביעי",
  רוחמה: "שני וחמישי",
};

const weatherByVillage = {
  "אור הנר": { temp: 26, status: "בהיר" },
  איבים: { temp: 25, status: "בהיר" },
  ארז: { temp: 24, status: "מעט עננות" },
  "ברור חיל": { temp: 25, status: "בהיר" },
  גבים: { temp: 24, status: "בהיר" },
  דורות: { temp: 26, status: "בהיר" },
  "חוות שקמים": { temp: 25, status: "בהיר" },
  יכיני: { temp: 25, status: "מעט עננות" },
  "כפר עזה": { temp: 24, status: "בהיר" },
  מפלסים: { temp: 25, status: "בהיר" },
  "נחל עוז": { temp: 24, status: "בהיר" },
  "ניר עם": { temp: 25, status: "בהיר" },
  רוחמה: { temp: 23, status: "מעט עננות" },
};

const villageNotices = {
  "אור הנר": "איסוף גזם יתבצע השבוע ביום שלישי.",
  איבים: "מוקד השירות זמין לעדכוני תברואה וביטחון.",
  ארז: "עבודות תחזוקה מתוכננות ליד מבנה הציבור.",
  "ברור חיל": "עדכון הסעות חינוך יישלח הערב.",
  גבים: "פינוי גזם יתבצע מחר בשעות הבוקר.",
  דורות: "מפגש קהילה יתקיים במועדון היישובי.",
  "חוות שקמים": "שירותים מוניציפליים מתואמים מראש דרך מוקד המועצה.",
  יכיני: "מוקד השירות זמין לעדכוני תברואה וביטחון.",
  "כפר עזה": "מחר יתקיים פינוי גזם ביישוב שלכם.",
  מפלסים: "פעילות ילדים תתקיים השבוע במועדון.",
  "נחל עוז": "עדכון קהילתי חדש זמין באזור האישי.",
  "ניר עם": "פעילות ותיקים תתקיים ביום חמישי.",
  רוחמה: "פינוי פסולת גושית יתקיים בתחילת השבוע.",
};

const quickActions = [
  {
    title: "תשלומים וגבייה",
    description: "ארנונה, מים ואישורים",
    icon: CreditCard,
    bubble: "bg-blue-100/70 text-blue-500 group-hover:bg-blue-200/70 group-hover:text-blue-600",
    card: "bg-gradient-to-br from-blue-50 to-blue-100/70 hover:from-blue-100 hover:to-blue-200/70",
  },
  {
    title: "מוקד 106",
    description: "דיווח על מפגע או תקלה",
    icon: Headphones,
    bubble: "bg-rose-100/70 text-rose-500 group-hover:bg-rose-200/70 group-hover:text-rose-600",
    card: "bg-gradient-to-br from-rose-50 to-rose-100/70 hover:from-rose-100 hover:to-rose-200/70",
    featured: true,
  },
  {
    title: "אישור תושב",
    description: "הפקה מקוונת ומהירה",
    icon: FileCheck,
    bubble: "bg-white/70 text-slate-500 group-hover:bg-white group-hover:text-slate-600",
    card: "bg-gradient-to-br from-white to-slate-100/80 hover:from-slate-50 hover:to-slate-200/70",
  },
  {
    title: "רישום לחינוך",
    description: "גנים, בתי ספר והסעות",
    icon: GraduationCap,
    bubble: "bg-emerald-100/70 text-emerald-500 group-hover:bg-emerald-200/70 group-hover:text-emerald-600",
    card: "bg-gradient-to-br from-emerald-50 to-emerald-100/70 hover:from-emerald-100 hover:to-emerald-200/70",
  },
];

const serviceBubbles = [
  { label: "מה קורה השבוע", icon: CalendarDays, bg: "bg-blue-50", color: "text-blue-400" },
  { label: "דיווח על מפגע", icon: Headphones, bg: "bg-rose-50", color: "text-rose-400" },
  { label: "תיק תושב", icon: UserRound, bg: "bg-slate-50", color: "text-slate-400" },
  { label: "הודעות ווטסאפ", icon: MessageCircle, bg: "bg-emerald-50", color: "text-emerald-400" },
];

const departments = [
  {
    name: "חינוך וקהילה",
    icon: Users,
    services: ["רישום לגני ילדים ובתי ספר", "צהרונים ומועדוניות", "הסעות תלמידים", "מלגות סטודנטים", "תנועות נוער"],
  },
  {
    name: "הנדסה, בנייה ותשתיות",
    icon: Home,
    services: ["הוועדה לתכנון ובנייה", "בקשת היתרי בנייה", "מידע הנדסי וארכיון", "רישוי עסקים", "פיקוח ובנייה"],
  },
  {
    name: "גבייה, מים וארנונה",
    icon: CreditCard,
    services: ["תשלום ארנונה", "בקשת הנחה בארנונה", "הנפקת אישור תושב", "דיווח על נזילת מים", "החלפת משלמים בנכס"],
  },
  {
    name: "חזות היישוב ותברואה",
    icon: Trash2,
    services: ["פינוי אשפה וגזם", "מרכז מיחזור אזורי", "תאורת רחוב", "איכות הסביבה", "וטרינריה וחיסוני כלבת"],
  },
  {
    name: "רווחה ושירותים חברתיים",
    icon: Heart,
    services: ["היחידה לטיפול משפחתי", "ותיקים ומועדוני דורות", "תמיכה באנשים עם מוגבלויות", "התנדבות בקהילה", "מרכז חוסן"],
  },
  {
    name: "ביטחון וחירום",
    icon: ShieldAlert,
    services: ["מוקד רואה 24/7", "צוותי חירום יישוביים (צח\"י)", "הנחיות התגוננות", "רבש\"צים וביטחון שוטף"],
  },
];

const personalizedFeed = [
  {
    type: "חשוב לדעת",
    title: "שינוי במועדי פינוי",
    text: "בשל החג, פינוי האשפה יוקדם ליום ב׳ במספר יישובים.",
    icon: Trash2,
    tone: "bg-amber-50/70 text-amber-700",
  },
  {
    type: "קורה השבוע",
    title: "ערב קהילה וחוסן",
    text: "22.04 · מרכז חוסן שער הנגב",
    icon: CalendarDays,
    tone: "bg-blue-50/70 text-blue-500",
  },
  {
    type: "בשבילכם",
    title: "יום חיסוני כלבת מרוכז",
    text: "מחר יתקיים יום חיסונים אזורי בקיבוץ ארז.",
    icon: Bell,
    tone: "bg-emerald-50/70 text-emerald-500",
  },
];

const popularSearches = ["ארנונה", "אישור תושב", "רישום לגן", "מוקד 106", "הנחה בארנונה", "היתר בנייה"];

const emergencyActions = [
  { label: "מוקד 106", href: "tel:106", icon: Phone },
  { label: "מד״א 101", href: "tel:101", icon: AlertTriangle },
  { label: "מרכז חוסן", href: "#", icon: Heart },
];

function useScrolled() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
}

export default function App() {
  const [selectedVillage, setSelectedVillage] = useState("היישוב שלי");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [openDept, setOpenDept] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [emergencyMenuOpen, setEmergencyMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const isScrolled = useScrolled();

  useEffect(() => {
    const savedVillage = window.localStorage.getItem("sngUserVillage");
    if (savedVillage && villages.includes(savedVillage)) setSelectedVillage(savedVillage);
  }, []);

  const selectedWeather = weatherByVillage[selectedVillage];
  const selectedWasteDay = wastePickupByVillage[selectedVillage];
  const selectedNotice = villageNotices[selectedVillage];
  const isVillageSelected = selectedVillage !== "היישוב שלי";

  const searchResults = useMemo(() => {
    const cleanQuery = searchQuery.trim();
    if (!cleanQuery) return [];

    const actionResults = quickActions.map((item) => ({
      label: item.title,
      type: "פעולה מהירה",
      icon: item.icon,
      keywords: `${item.title} ${item.description}`,
    }));

    const departmentResults = departments.flatMap((department) =>
      department.services.map((service) => ({
        label: service,
        type: department.name,
        icon: department.icon,
        keywords: `${department.name} ${service}`,
      }))
    );

    const feedResults = personalizedFeed.map((item) => ({
      label: item.title,
      type: item.type,
      icon: item.icon,
      keywords: `${item.title} ${item.text} ${item.type}`,
    }));

    return [...actionResults, ...departmentResults, ...feedResults]
      .filter((item) => `${item.label} ${item.type} ${item.keywords}`.includes(cleanQuery))
      .slice(0, 6);
  }, [searchQuery]);

  const handleVillageChange = (event) => {
    const value = event.target.value;
    setSelectedVillage(value);
    window.localStorage.setItem("sngUserVillage", value);
  };

  const hasNoResults = searchQuery.trim().length > 0 && searchResults.length === 0;
  const displayWeather = selectedWeather || { temp: 24, status: "שמיים בהירים" };
  const displayWaste = isVillageSelected ? selectedWasteDay : "בחרו יישוב";

  return (
    <main
      dir="rtl"
      className={`min-h-screen font-['Heebo'] antialiased ${
        highContrast ? "bg-black text-yellow-300" : "bg-[#F8FAFC] text-slate-600"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-slate-900 focus:shadow-lg"
      >
        דילוג לתוכן המרכזי
      </a>

      <AnimatePresence>
        {emergencyMode && (
          <motion.section
            initial={{ y: -36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -36, opacity: 0 }}
            className="sticky top-0 z-[60] border-b border-red-200 bg-red-600/95 text-white shadow-sm backdrop-blur-xl"
            aria-label="מידע חירום"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-8 py-3">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Siren className="h-5 w-5" aria-hidden="true" />
                מידע בטחוני דחוף וטלפונים חיוניים
              </div>
              <a href="tel:106" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-red-700">
                חיוג 106
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <nav
        className={`sticky ${emergencyMode ? "top-[49px]" : "top-0"} z-50 border-b transition-all duration-300 ${
          highContrast
            ? "border-yellow-300 bg-black/90 text-yellow-300"
            : isScrolled
              ? "border-white/30 bg-white/70 shadow-sm backdrop-blur-xl"
              : "border-white/20 bg-white/60 backdrop-blur-xl"
        }`}
        aria-label="ניווט ראשי"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <a href="#main-content" className="flex items-center gap-4 text-inherit" aria-label="מועצה אזורית שער הנגב - מעבר לדף הבית">
            <img
              src="https://www.sng.org.il/sites/shaar-hanegev/UserContent/HeaderLogo.png"
              alt="לוגו מועצה אזורית שער הנגב"
              className="h-10 w-auto object-contain opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
            <span className="hidden border-r border-slate-200 pr-4 sm:block">
              <span className="block text-xl font-light tracking-tight text-slate-800">
                שער הנגב <span className="font-bold text-sky-400/70">דיגיטל</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">הבית שלך בדיגיטל</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            {["שירותים", "חירום", "קהילה"].map((item) => (
              <a key={item} href="#" className="text-slate-500 transition-colors hover:text-sky-400">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => setHighContrast((value) => !value)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                highContrast ? "bg-yellow-300 text-black" : "bg-white/70 text-slate-500 shadow-sm hover:bg-white"
              }`}
              aria-pressed={highContrast}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              ניגודיות
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-slate-700">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              אזור אישי
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-2xl p-2 text-slate-500 transition hover:bg-white/80 focus:outline-none focus:ring-4 focus:ring-sky-100 md:hidden"
            aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-100 bg-white/90 md:hidden"
            >
              <div className="grid gap-2 px-6 py-4">
                {["שירותים", "חירום", "קהילה", "אזור אישי"].map((item) => (
                  <a key={item} href="#" className="rounded-2xl px-4 py-3 font-medium text-slate-600 hover:bg-slate-50">
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="border-b border-white/60 bg-white/50 py-2 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8 text-[12px] font-medium text-slate-500">
          <div className="flex flex-wrap gap-5">
            <span className="flex items-center gap-1.5">
              <CloudSun className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
              {displayWeather.temp}°C {displayWeather.status}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              המועצה פתוחה עד 16:00
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Trash2 className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              פינוי קרוב: {displayWaste || "יתעדכן"}
            </span>
          </div>
          <div className="hidden italic text-slate-400 sm:block">״שער הנגב - קהילה בונה חוסן״</div>
        </div>
      </div>

      <section id="main-content" className="relative overflow-hidden px-6 py-20 md:py-24">
        <div className="absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl" aria-hidden="true" />
        <div className="absolute left-10 bottom-12 -z-10 h-72 w-72 rounded-full bg-amber-100/25 blur-3xl" aria-hidden="true" />

        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <h1 className="text-4xl font-light tracking-tight text-slate-800 md:text-5xl">
              מה נוכל לעשות <span className="font-bold">עבורך</span> היום?
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              שירותים, טפסים, עדכונים וחירום — בעיצוב שקט ונגיש לתושבי שער הנגב.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className="relative mx-auto mt-12 max-w-2xl"
          >
            <div className="relative group">
              <Search className="pointer-events-none absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-sky-400" aria-hidden="true" />
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.18 }}
                id="site-search"
                type="search"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="חיפוש שירות מהיר..."
                className="w-full rounded-full border border-white/70 bg-white/75 py-6 pl-8 pr-14 text-lg text-slate-700 shadow-2xl shadow-slate-200/50 outline-none backdrop-blur-xl transition-all placeholder:text-slate-300 focus:bg-white/90 focus:ring-4 focus:ring-sky-100"
                aria-label="חיפוש שירות או טופס באתר"
              />
            </div>

            {(searchFocused || searchQuery) && (
              <div className="mt-4 rounded-[2rem] bg-white/90 p-3 text-right shadow-sm ring-1 ring-slate-100 backdrop-blur-xl">
                {!searchQuery && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="ml-1 text-sm font-medium text-slate-400">חיפושים נפוצים:</span>
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-sky-50 hover:text-sky-400"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div className="grid gap-2">
                    {searchResults.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={`${item.label}-${item.type}`}
                          className="flex items-center justify-between rounded-2xl p-3 text-right transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                              <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                            </span>
                            <span>
                              <span className="block font-bold text-slate-700">{item.label}</span>
                              <span className="block text-xs font-medium text-slate-400">{item.type}</span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {hasNoResults && (
                  <div className="rounded-2xl bg-amber-50/60 p-4 text-center text-sm text-slate-600">
                    <p className="font-bold text-slate-700">לא מצאת את מה שחיפשת?</p>
                    <p className="mt-1">דברי איתנו במוקד 106, ונכוון אותך לשירות הנכון.</p>
                    <div className="mt-3">
                      <a href="tel:106" className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 font-bold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        לא מצאת? דברי איתנו במוקד 106
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <label htmlFor="village-select" className="sr-only">
                בחירת יישוב להצגת מידע מקומי
              </label>
              <select
                id="village-select"
                value={selectedVillage}
                onChange={handleVillageChange}
                className="cursor-pointer rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-500 shadow-sm outline-none transition hover:bg-white focus:ring-4 focus:ring-sky-100"
              >
                {villages.map((village) => (
                  <option key={village} value={village}>
                    {village}
                  </option>
                ))}
              </select>
            </div>

            <AnimatePresence>
              {isVillageSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-5 rounded-full bg-white/70 px-5 py-3 text-sm text-slate-500 shadow-sm backdrop-blur-xl"
                >
                  <span className="flex items-center gap-1.5 font-bold text-sky-400">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {selectedVillage}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trash2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    פינוי אשפה: {selectedWasteDay || "יתעדכן"}
                  </span>
                  {selectedWeather && (
                    <span className="flex items-center gap-1.5">
                      <CloudSun className="h-4 w-4 text-sky-400" aria-hidden="true" />
                      {selectedWeather.temp}°C, {selectedWeather.status}
                    </span>
                  )}
                  {selectedNotice && <span className="basis-full text-center text-xs text-slate-400">{selectedNotice}</span>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {serviceBubbles.map((bubble) => {
                const Icon = bubble.icon;
                return (
                  <button
                    key={bubble.label}
                    type="button"
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-500 shadow-sm ring-1 ring-white/60 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-md ${bubble.bg}`}
                  >
                    <Icon className={`h-4 w-4 ${bubble.color}`} strokeWidth={1.5} aria-hidden="true" />
                    {bubble.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-8" aria-labelledby="quick-actions-title">
        <h2 id="quick-actions-title" className="sr-only">
          פעולות מהירות
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
            className="grid grid-cols-2 gap-4 md:col-span-2"
          >
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.title}
                  variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex min-h-40 flex-col items-center justify-center gap-4 rounded-[2.5rem] p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-sky-100 ${action.card}`}
                  aria-label={`מעבר אל ${action.title}`}
                >
                  <span className={`rounded-2xl p-4 transition-all ${action.bubble}`}>
                    <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-700">{action.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-400">{action.description}</span>
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <aside className="rounded-[2.5rem] bg-amber-50/50 p-8 shadow-sm ring-1 ring-amber-100/50" aria-label="חשוב לדעת">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-amber-900/70">
              <Bell className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              חשוב לדעת
            </h2>
            <ul className="space-y-4">
              <li className="border-b border-amber-100 pb-3 text-sm leading-snug text-amber-800/65">
                <strong>שינוי במועדי פינוי:</strong> בשל החג, פינוי האשפה יוקדם ליום ב׳.
              </li>
              <li className="text-sm leading-snug text-amber-800/65">
                <strong>חיסוני כלבת:</strong> מחר יתקיים יום חיסונים מרוכז בקיבוץ ארז.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-8 py-20 md:py-24" aria-labelledby="feed-title">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-sky-400">קורה עכשיו בשער הנגב</p>
            <h2 id="feed-title" className="mt-1 text-3xl font-light tracking-tight text-slate-800">
              עדכונים <span className="font-bold">בשבילך</span>
            </h2>
          </div>
          <a href="#" className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm transition hover:bg-slate-50 md:inline-flex">
            צפה בהכל
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {personalizedFeed.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[2rem] bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white focus-within:ring-4 focus-within:ring-sky-100">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}>
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400">{item.type}</span>
                <h3 className="mt-4 text-xl font-bold text-slate-700">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-8 py-20 md:py-24" aria-labelledby="departments-title">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold text-sky-400">השירותים שלנו עבורך</p>
          <h2 id="departments-title" className="mt-1 text-3xl font-light tracking-tight text-slate-800">
            כל השירותים <span className="font-bold">לפי אגפים</span>
          </h2>
          <p className="mt-3 text-slate-400">פותחים רק את מה שצריך, בלי להציף את העמוד.</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
          className="space-y-4"
        >
          {departments.map((department, index) => {
            const Icon = department.icon;
            const isOpen = openDept === index;
            return (
              <motion.div
                key={department.name}
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                className="group overflow-hidden rounded-3xl bg-white/50 transition-all hover:bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenDept(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-right transition-colors focus:outline-none focus:ring-4 focus:ring-sky-100"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-all group-hover:bg-sky-50 group-hover:text-sky-400">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-medium text-slate-700">{department.name}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 text-slate-300 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden bg-white/50"
                    >
                      <div className="grid gap-2 px-6 pb-5 sm:grid-cols-2">
                        {department.services.map((service) => (
                          <a key={service} href="#" className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-sky-50 hover:text-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-200" />
                            {service}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-8 py-20 md:py-24" aria-labelledby="villages-title">
        <div className="rounded-[2.5rem] bg-white/60 p-8 shadow-sm md:p-10">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-sky-400">הבית של כולנו</p>
              <h2 id="villages-title" className="mt-1 text-2xl font-light text-slate-800">
                היישובים <span className="font-bold">שלנו</span>
              </h2>
            </div>
            <a href="#" className="w-fit rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm transition hover:bg-slate-50">
              לכל דפי היישובים
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {villages.filter((village) => village !== "היישוב שלי").map((village) => (
              <button key={village} className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-sky-50 hover:text-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100">
                {village}
              </button>
            ))}
          </div>
        </div>
      </section>


      <button
        type="button"
        onClick={() => setHighContrast((value) => !value)}
        className="fixed right-5 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-sky-400 text-white shadow-xl shadow-sky-200/50 transition hover:scale-105 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 md:flex"
        aria-label="הפעלת מצב ניגודיות גבוהה"
        aria-pressed={highContrast}
      >
        <Accessibility className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <div className="fixed bottom-24 left-5 z-50 md:bottom-6">
        <AnimatePresence>
          {emergencyMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              className="mb-3 w-64 rounded-3xl bg-white p-3 shadow-2xl"
            >
              <p className="px-2 pb-2 text-sm font-bold text-slate-600">פעולות חירום</p>
              <div className="grid gap-2">
                {emergencyActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <a key={action.label} href={action.href} className="flex items-center gap-3 rounded-2xl p-3 text-right transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-400">
                        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="font-bold text-slate-700">{action.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setEmergencyMenuOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setEmergencyMenuOpen(false);
          }}
          className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-100 ${
            emergencyMode ? "animate-pulse bg-rose-500" : "bg-slate-800"
          }`}
          aria-label="פתיחת תפריט חירום מהיר"
          aria-expanded={emergencyMenuOpen}
        >
          {emergencyMenuOpen ? <X className="h-7 w-7" aria-hidden="true" /> : <Siren className="h-7 w-7" aria-hidden="true" />}
        </button>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 bg-white/90 p-3 pb-5 shadow-[0_-8px_30px_rgb(15,23,42,0.06)] backdrop-blur-xl md:hidden" aria-label="ניווט תחתון מהיר">
        <div className="grid grid-cols-4 gap-1">
          {[
            { label: "בית", icon: Home, active: true, action: () => document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" }) },
            { label: "ביטחון", icon: ShieldAlert, action: () => setEmergencyMode((value) => !value) },
            { label: "פניות", icon: ClipboardList, action: () => setEmergencyMenuOpen(true) },
            { label: "אישי", icon: UserRound, action: () => {} },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className={`flex flex-col items-center gap-1 rounded-2xl p-2 text-[10px] font-bold transition focus:outline-none focus:ring-4 focus:ring-sky-100 ${
                  item.active ? "text-sky-400" : "text-slate-300 hover:bg-slate-50 hover:text-sky-400"
                }`}
                aria-label={`ניווט אל ${item.label}`}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <footer className="bg-white/60 pb-24 pt-12 text-center text-sm text-slate-400 md:pb-12">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-bold text-slate-500">אנחנו כאן לכל שאלה</p>
          <p className="mt-2">© 2026 מועצה אזורית שער הנגב · שירותים, חירום, קהילה ושקיפות</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-sky-400">הצהרת נגישות</a>
            <a href="#" className="hover:text-sky-400">חופש המידע</a>
            <a href="#" className="hover:text-sky-400">מכרזים</a>
            <button type="button" onClick={() => setHighContrast((value) => !value)} className="inline-flex items-center gap-1 hover:text-sky-400">
              <Accessibility className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              ניגודיות גבוהה
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
