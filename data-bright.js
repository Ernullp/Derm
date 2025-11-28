// ========================================
// Shared Data - All Product & Category Data
// ========================================

// ===== PRODUCTS DATA =====
const products = [
    {
        id: 1,
        name: "کریم پودر Pro Finish",
        brand: "MAC",
        category: "face",
        price: 850000,
        discountedPrice: 595000,
        rating: 4.8,
        reviews: 234,
        image: "💄",
        description: "فاندیشن حرفهای با پوشش کامل و ماندگاری بالا. مناسب برای انواع پوست. ضد آب و عرق.",
        ingredients: "Water, Glycerin, Dimethicone, Titanium Dioxide",
        usage: "صبح و عصر بر روی صورت تمیز شده بمالید"
    },
    {
        id: 2,
        name: "ریمل Volume Express",
        brand: "Maybelline",
        category: "eyes",
        price: 180000,
        discountedPrice: 126000,
        rating: 4.5,
        reviews: 512,
        image: "✨",
        description: "ریمل حجمدهنده با فرمول ویژه برای مژههای بلند و پرپشت. بدون پخش شدن و ریزش."
    },
    {
        id: 3,
        name: "کرم مرطوبکننده Ultimate",
        brand: "Olay",
        category: "skincare",
        price: 420000,
        discountedPrice: 336000,
        rating: 4.7,
        reviews: 890,
        image: "🧴",
        description: "کرم مرطوبکننده قوی با ویتامین B3 و هیالورونیک اسید. مناسب انواع پوست، رفع خشکی پوست."
    },
    {
        id: 4,
        name: "شامپو Silky",
        brand: "Pantene",
        category: "hair",
        price: 95000,
        discountedPrice: 71000,
        rating: 4.6,
        reviews: 1200,
        image: "💇",
        description: "شامپو تقویتکننده و نرمکننده مو با پرو ویتامین B5. برای موهای آسیبدیده."
    },
    {
        id: 5,
        name: "عطر Midnight Rose",
        brand: "Chanel",
        category: "fragrance",
        price: 1200000,
        discountedPrice: 960000,
        rating: 4.9,
        reviews: 456,
        image: "🌸",
        description: "عطر لوکس و خاص با رایحه گل رز و وانیل. مناسب شبها و مجالس خاص. ماندگاری بالا."
    },
    {
        id: 6,
        name: "صابون بدن Luxe",
        brand: "Dove",
        category: "personal",
        price: 65000,
        discountedPrice: 48000,
        rating: 4.4,
        reviews: 678,
        image: "🧼",
        description: "صابون مرطوبکننده و نرمکننده بدن با کرم شیر. مناسب پوستهای حساس و خشک."
    },
    {
        id: 7,
        name: "ست بهداشتی Beauty Box",
        brand: "DermaRokh",
        category: "gifts",
        price: 890000,
        discountedPrice: 623000,
        rating: 4.5,
        reviews: 234,
        image: "🎁",
        description: "پکیج کامل محصولات بهداشتی و آرایشی شامل کرم، شامپو، رژ لب و ماسک صورت."
    },
    {
        id: 8,
        name: "افتر شیو Smooth",
        brand: "Gillette",
        category: "mens",
        price: 125000,
        discountedPrice: 93000,
        rating: 4.3,
        reviews: 345,
        image: "👨",
        description: "افتر شیو آرامشبخش و نرمکننده پوست پس از اصلاح. ضد التهاب و مرطوبکننده."
    },
    {
        id: 9,
        name: "رژ لب Matte Luxe",
        brand: "MAC",
        category: "face",
        price: 320000,
        discountedPrice: 256000,
        rating: 4.7,
        reviews: 890,
        image: "💋",
        description: "رژ لب مات با پوشش کامل و ماندگاری طولانی. دارای رنگهای متنوع و جذاب."
    },
    {
        id: 10,
        name: "سایه چشم Palette Pro",
        brand: "Maybelline",
        category: "eyes",
        price: 280000,
        discountedPrice: 196000,
        rating: 4.6,
        reviews: 567,
        image: "🎨",
        description: "پالت ۱۲ رنگ سایه چشم با کیفیت حرفهای. رنگهای مات و شاین برای هر مناسبت."
    },
    {
        id: 11,
        name: "ماسک صورت Hydrating",
        brand: "Olay",
        category: "skincare",
        price: 155000,
        discountedPrice: 124000,
        rating: 4.5,
        reviews: 423,
        image: "💆",
        description: "ماسک ورقهای آبرسان و روشنکننده پوست صورت. حاوی سرم ویتامین C."
    },
    {
        id: 12,
        name: "نرمکننده مو Keratin",
        brand: "Pantene",
        category: "hair",
        price: 98000,
        discountedPrice: 73500,
        rating: 4.4,
        reviews: 789,
        image: "✨",
        description: "نرمکننده غنی شده با کراتین برای موهای صاف و براق. بدون سولفات."
    },
    {
        id: 13,
        name: "عطر Light Blue",
        brand: "Chanel",
        category: "fragrance",
        price: 950000,
        discountedPrice: 760000,
        rating: 4.8,
        reviews: 312,
        image: "💙",
        description: "عطر تابستانی و ملایم با رایحه مرکبات و گلهای بهاری. مناسب روز."
    },
    {
        id: 14,
        name: "لوسیون بدن Soft Touch",
        brand: "Dove",
        category: "personal",
        price: 89000,
        discountedPrice: 66750,
        rating: 4.3,
        reviews: 956,
        image: "🧴",
        description: "لوسیون مرطوبکننده سریعالجذب برای پوست نرم و لطیف. حاوی روغن آرگان."
    },
    {
        id: 15,
        name: "ست هدیه عروس",
        brand: "DermaRokh",
        category: "gifts",
        price: 1200000,
        discountedPrice: 960000,
        rating: 4.9,
        reviews: 145,
        image: "👰",
        description: "پکیج ویژه عروس شامل آرایش کامل صورت، عطر، و محصولات مراقبت پوست."
    },
    {
        id: 16,
        name: "ژل اصلاح Cool",
        brand: "Gillette",
        category: "mens",
        price: 75000,
        discountedPrice: 56250,
        rating: 4.2,
        reviews: 567,
        image: "🧴",
        description: "ژل اصلاح خنککننده با رایحه منتول. برای اصلاح نرم و بدون سوزش."
    },
    {
        id: 17,
        name: "کانسیلر Cover Perfect",
        brand: "MAC",
        category: "face",
        price: 385000,
        discountedPrice: 269500,
        rating: 4.6,
        reviews: 678,
        image: "✨",
        description: "کانسیلر با پوشش بالا برای پنهانسازی عیوب و لکههای پوستی."
    },
    {
        id: 18,
        name: "مداد ابرو Brow Define",
        brand: "Maybelline",
        category: "eyes",
        price: 95000,
        discountedPrice: 71250,
        rating: 4.4,
        reviews: 890,
        image: "✏️",
        description: "مداد ابرو ضدآب با براش داخلی برای ابروهای طبیعی و منظم."
    },
    {
        id: 19,
        name: "سرم ویتامین C",
        brand: "Olay",
        category: "skincare",
        price: 560000,
        discountedPrice: 448000,
        rating: 4.8,
        reviews: 523,
        image: "🧪",
        description: "سرم قوی ویتامین C برای روشنسازی و رفع لکهای پوستی. ضد پیری."
    },
    {
        id: 20,
        name: "ماسک مو Repair",
        brand: "Pantene",
        category: "hair",
        price: 135000,
        discountedPrice: 101250,
        rating: 4.5,
        reviews: 712,
        image: "💆",
        description: "ماسک ترمیمکننده عمیق برای موهای خشک و آسیبدیده. حاوی روغن آرگان."
    }
];

// ===== CATEGORIES DATA =====
const categories = [
    { id: "face", name: "آرایش صورت", icon: "💄" },
    { id: "eyes", name: "چشم و ابرو", icon: "👁️" },
    { id: "skincare", name: "مراقبت از پوست", icon: "🧴" },
    { id: "hair", name: "مراقبت از مو", icon: "💇" },
    { id: "fragrance", name: "عطر و ادکلن", icon: "✨" },
    { id: "personal", name: "محصولات بهداشتی", icon: "🧼" },
    { id: "gifts", name: "پکیج هدیه", icon: "🎁" },
    { id: "mens", name: "محصولات آقایان", icon: "👨" }
];

// ===== GLOBAL STATE =====
let cart = [];
let wishlist = [];

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function calculateDiscount(original, discounted) {
    return Math.round(((original - discounted) / original) * 100);
}

function showNotification(message) {
    console.log("Notification:", message);
    // Can be enhanced with a toast notification library
}