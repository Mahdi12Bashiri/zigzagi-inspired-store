import axios from "axios";

// تشخیص اینکه پروژه روی سیستم خودت اجرا میشه یا آنلاین (Production)
const isDev = import.meta.env.DEV;

// برای حالت لوکال
const api = axios.create({
  baseURL: "http://localhost:3016",
  timeout: 7000,
  headers: { "Content-Type": "application/json" },
});

// برای حالت آنلاین: دیتابیس رو یک‌بار کش میکنه تا سرعت لود بالا بمونه
let cachedDb = null;
const getProdData = async (key) => {
  if (!cachedDb) {
    try {
      // در حالت آنلاین، فایل db.json رو مستقیم می‌خونه
      const { data } = await axios.get("./db.json");
      cachedDb = data;
    } catch (e) {
      console.error("خطا در بارگذاری دیتابیس آنلاین:", e);
      return null;
    }
  }
  return cachedDb ? cachedDb[key] : null;
};

export const getHeaderData = async () => {
  if (!isDev) return getProdData("header");
  try {
    const { data } = await api.get("/header");
    return data;
  } catch (error) {
    return null;
  }
};

export const getSliderData = async () => {
  if (!isDev) return getProdData("slider");
  try {
    const { data } = await api.get("/slider");
    return data;
  } catch (error) {
    return null;
  }
};

export const getPromoBannerData = async () => {
  if (!isDev) return getProdData("promoBanners");
  try {
    const { data } = await api.get("/promoBanners");
    return data;
  } catch (error) {
    return null;
  }
};

export const getNewProductsData = async () => {
  if (!isDev) return getProdData("newProducts");
  try {
    const { data } = await api.get("/newProducts");
    return data;
  } catch (error) {
    return null;
  }
};

export const getDoubleBannerData = async () => {
  if (!isDev) return getProdData("doubleBanner");
  try {
    const { data } = await api.get("/doubleBanner");
    return data;
  } catch (error) {
    return null;
  }
};

export const getDailyProductsData = async () => {
  if (!isDev) return getProdData("dailyProducts");
  try {
    const { data } = await api.get("/dailyProducts");
    return data;
  } catch (error) {
    return null;
  }
};

export const getDailyBannerData = async () => {
  if (!isDev) return getProdData("dailyBanner");
  try {
    const { data } = await api.get("/dailyBanner");
    return data;
  } catch (error) {
    return null;
  }
};

export const getGoldenOffersData = async () => {
  if (!isDev) return getProdData("goldenOffers");
  try {
    const { data } = await api.get("/goldenOffers");
    return data;
  } catch (error) {
    return null;
  }
};

export const getNewsMainData = async () => {
  if (!isDev) return getProdData("newsMain");
  try {
    const { data } = await api.get("/newsMain");
    return data;
  } catch (error) {
    return null;
  }
};

export const getStoreFeaturesData = async () => {
  if (!isDev) return getProdData("storeFeatures");
  try {
    const { data } = await api.get("/storeFeatures");
    return data;
  } catch (error) {
    return null;
  }
};

export const getFloatingChatData = async () => {
  if (!isDev) return getProdData("floatingChat");
  try {
    const { data } = await api.get("/floatingChat");
    return data;
  } catch (error) {
    return null;
  }
};

export const getFooterData = async () => {
  if (!isDev) return getProdData("footer");
  try {
    const { data } = await api.get("/footer");
    return data;
  } catch (error) {
    return null;
  }
};
