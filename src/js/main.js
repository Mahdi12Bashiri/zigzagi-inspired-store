import "../css/style.css";
import "../css/tailwind.css";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createLogo, createHeaderMenu } from "./modules/header.js";
import { createSlider } from "./modules/heroSlider.js";
import { createPromoBanner } from "./modules/promoBanner.js";
import { createNewProducts } from "./modules/newProducts.js";
import { createDoubleBanner } from "./modules/doubleBanner.js";
import { createDailyProducts } from "./modules/dailyProducts.js";
import { createDailyBanner } from "./modules/dailyBanner.js";
import { createGoldenOffers } from "./modules/goldenOffers.js";
import { createNewsMain } from "./modules/newsMain.js";
import { createStoreFeatures } from "./modules/storeFeatures.js";
import { createFloatingChat } from "./modules/floatingChat.js";
import { createFooter } from "./modules/footer.js";
import {
  getHeaderData,
  getSliderData,
  getPromoBannerData,
  getNewProductsData,
  getDailyProductsData,
  getDoubleBannerData,
  getDailyBannerData,
  getGoldenOffersData,
  getNewsMainData,
  getStoreFeaturesData,
  getFloatingChatData,
  getFooterData,
} from "./modules/api.js";

const initApp = async () => {
  let hElem = document.getElementById("header");
  let topElem = document.getElementById("topBanner");
  const hData = await getHeaderData();

  if (hElem && hData && topElem) {
    hElem.innerHTML = "";

    const banner = createLogo(hData.topBanner);
    topElem.appendChild(banner);

    const headerMenu = createHeaderMenu(hData);
    hElem.appendChild(headerMenu);
  }

  let sElem = document.getElementById("hero-slider");
  const sData = await getSliderData();

  if (sElem && sData) {
    sElem.innerHTML = "";

    const slider = createSlider(sData);
    sElem.appendChild(slider);
  }

  let bElem = document.getElementById("banner-section");
  const bData = await getPromoBannerData();

  if (bElem && bData) {
    bElem.innerHTML = "";

    const banners = createPromoBanner(bData);
    bElem.appendChild(banners);
  }

  let nElem = document.getElementById("new-products");
  const nData = await getNewProductsData();

  if (nElem && nData) {
    nElem.innerHTML = "";

    const newProducts = createNewProducts(nData);
    nElem.appendChild(newProducts);
  }

  let dElem = document.getElementById("double-banner");
  const dData = await getDoubleBannerData();

  if (dElem && dData) {
    dElem.innerHTML = "";

    const doubleBanner = createDoubleBanner(dData);
    dElem.appendChild(doubleBanner);
  }

  let dailyElem = document.getElementById("daily-products");
  const dailyData = await getDailyProductsData();

  if (dailyElem && dailyData) {
    dailyElem.innerHTML = "";

    const dailyProducts = createDailyProducts(dailyData);
    dailyElem.appendChild(dailyProducts);
  }

  let dailyBannerElem = document.getElementById("daily-banner");
  const dailyBannerData = await getDailyBannerData();

  if (dailyBannerElem && dailyBannerData) {
    dailyBannerElem.innerHTML = "";

    const dailyBanner = createDailyBanner(dailyBannerData);
    dailyBannerElem.appendChild(dailyBanner);
  }

  let goldenOffersElem = document.getElementById("golden-offers");
  const goldenOffersData = await getGoldenOffersData();

  if (goldenOffersElem && goldenOffersData) {
    goldenOffersElem.innerHTML = "";

    const goldenOffers = createGoldenOffers(goldenOffersData);
    goldenOffersElem.appendChild(goldenOffers);
  }

  let newsMainElem = document.getElementById("newsMain");
  const newsMainData = await getNewsMainData();

  if (newsMainElem && newsMainData) {
    newsMainElem.innerHTML = "";

    const newsMain = createNewsMain(newsMainData);
    newsMainElem.appendChild(newsMain);
  }

  let storeFeaturesElem = document.getElementById("store-features");
  const storeFeaturesData = await getStoreFeaturesData();

  if (storeFeaturesElem && storeFeaturesData) {
    storeFeaturesElem.innerHTML = "";

    const storeFeatures = createStoreFeatures(storeFeaturesData);
    storeFeaturesElem.appendChild(storeFeatures);
  }

  let floatingChatElem = document.getElementById("floating-chat");
  const floatingChatData = await getFloatingChatData();

  if (floatingChatElem && floatingChatData) {
    floatingChatElem.innerHTML = "";

    const floatingChat = createFloatingChat(floatingChatData);
    floatingChatElem.appendChild(floatingChat);
  }

  let footerElem = document.getElementById("footer");
  const footerData = await getFooterData();

  if (footerElem && footerData) {
    footerElem.innerHTML = "";

    const footer = createFooter(footerData);
    footerElem.appendChild(footer);
  }
};

document.addEventListener("DOMContentLoaded", initApp);
