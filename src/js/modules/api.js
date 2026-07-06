import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3016",
  timeout: 7000,
  headers: { "Content-Type": "application/json" },
});

export const getHeaderData = async () => {
  try {
    const { data } = await api.get("/header");
    return data;
  } catch (error) {
    return null;
  }
};

export const getSliderData = async () => {
  try {
    const { data } = await api.get("/slider");
    return data;
  } catch (error) {
    return null;
  }
};

export const getPromoBannerData = async () => {
  try {
    const { data } = await api.get("/promoBanners");
    return data;
  } catch (error) {
    return null;
  }
};

export const getNewProductsData = async () => {
  try {
    const { data } = await api.get("/newProducts");
    return data;
  } catch (error) {
    return null;
  }
};

export const getDoubleBannerData = async () => {
  try {
    const { data } = await api.get("/doubleBanner");
    return data;
  } catch (error) {
    return null;
  }
};

export const getDailyProductsData = async () => {
  try {
    const { data } = await api.get("/dailyProducts");
    return data;
  } catch (error) {
    return null;
  }
};

export const getDailyBannerData = async () => {
  try {
    const { data } = await api.get("/dailyBanner");
    return data;
  } catch (error) {
    return null;
  }
};

export const getGoldenOffersData = async () => {
  try {
    const { data } = await api.get("/goldenOffers");
    return data;
  } catch (error) {
    return null;
  }
};

export const getNewsMainData = async () => {
  try {
    const { data } = await api.get("/newsMain");
    return data;
  } catch (error) {
    return null;
  }
};

export const getStoreFeaturesData = async () => {
  try {
    const { data } = await api.get("/storeFeatures");
    return data;
  } catch (error) {
    return null;
  }
};

export const getFloatingChatData = async () => {
  try {
    const { data } = await api.get("/floatingChat");
    return data;
  } catch (error) {
    return null;
  }
};

export const getFooterData = async () => {
  try {
    const { data } = await api.get("/footer");
    return data;
  } catch (error) {
    return null;
  }
};
