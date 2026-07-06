import Swiper from "swiper/bundle";

export const createNewsMain = (data) => {
  const {
    right: { head, bottom },
    left: { mobile, video },
  } = data.instMockup;

  const blogSlides = data.blogzigzag ?? [];

  const container = document.createElement("div");
  container.className =
    "newsMain__container w-full xl:max-w-[1170px] mx-auto lg:my-9 my-5 md:px-[10px] px-5 py-3 flex xl:flex-row flex-col justify-center items-center md:gap-5 gap-10";

  container.innerHTML = `

      <div class="instMockup xl:w-[662px] md:w-[730px] w-full md:h-[473px] relative flex md:flex-row flex-col-reverse items-center md:justify-start md:gap-0 gap-5">

        <div class="right md:w-full sm:w-[406px] w-full md:bg-transparent bg-[#f5f5f5] md:rounded-none rounded-[30px] p-8 flex flex-col md:gap-0 gap-8 items-center justify-start ">
          <div class="head overflow-hidden relative bg-cover w-full h-full flex items-center justify-start">
            <img src="${head.cover.image}" alt="${head.cover.alt}" loading="lazy" decoding="async" class="md:block hidden w-[342px] h-[77px] object-cover" />
            <a href="${head.link ?? "#"}" target="_blank" rel="noopener noreferrer" class="flex md:flex-row flex-row-reverse md:justify-start justify-center items-center gap-4 md:mr-6 md:absolute inset-0 w-full h-full">
              <img src="${head.icon.image}" alt="${head.icon.alt}" loading="lazy" decoding="async" class="w-10 h-auto object-cover" />
              <h3 class="text-black text-xl font-bold">zigzagi.dress</h3>
            </a>
          </div>

          <div class="md:hidden flex items-center justify-center text-sm">
            <span class="text-center">
              برای مشاهده آخرین تخفیفات ما را در اینستاگرام دنبال کنید
            </span>
          </div>

          <div class="bottom md:bg-[#f5f5f5] w-full md:rounded-[30px] md:rounded-tr-none md:-mt-[2px] flex flex-col md:items-start justify-center items-center gap-7 md:pl-[58px] md:pr-[25px] md:pt-[50px] md:pb-[38px]">
            <div class="md:w-[277px] w-full h-auto flex -mt-[2px] flex-col items-start justify-start gap-7">
              <img src="${bottom.image}" alt="${bottom.alt}" loading="lazy" decoding="async" class="md:block hidden w-[277px] rounded-xl h-[229px] object-cover" />
              <a href="${bottom.link ?? "#"}" target="_blank" rel="noopener noreferrer" class="w-full font-bold h-[3.12rem] flex justify-center items-center px-[18px] py-2 rounded-full bg-[#ffd50d] text-sm cursor-pointer transition-all duration-[400ms] lg:hover:bg-[#222] lg:hover:text-[#ffd50d] lg:hover:shadow-[0_2px_8px_#171717cb] lg:hover:scale-[1.015]">
                مشاهده اینستاگرام ما
              </a>
            </div>
          </div>
        </div>
        <div class="left md:absolute md:left-12 md:bottom-9">
          <img src="${mobile.image}" alt="${mobile.alt}" loading="lazy" decoding="async" class="block md:w-full w-[280px] object-cover" />
          <video autoplay muted loop playsinline preload="metadata" class="absolute md:p-[7%] md:pb-12 w-[280px] p-5 top-2 md:top-[7px] md:left-0 md:w-full md:h-full object-cover">
            <source src="${video.video}" type="video/mp4" />
          </video>
        </div>

      </div>

      <div class="newsMain__slider relative xl:w-[468px] md:w-[730px] w-full xl:h-[473px] h-auto flex flex-col items-start justify-center gap-4">

        <div class="newsMain__slider-head w-full flex flex-row items-center justify-between gap-2">
          <h2 class="text-[#222] text-[1.5rem] font-bold">بلاگ زیگزاگی</h2>
          <a href="${bottom.link ?? "#"}" target="_blank" rel="noopener noreferrer" class="w-fit font-bold h-[3.12rem] flex justify-center items-center px-[18px] py-2 rounded-full bg-[#ffd50d] text-sm cursor-pointer transition-all duration-[400ms] lg:hover:bg-[#222] lg:hover:text-[#ffd50d] lg:hover:shadow-[0_2px_8px_#171717cb] lg:hover:scale-[1.015]">
            مشاهده آرشیو
          </a>
        </div>

        <div class="newsMain__slider-slide w-full h-full flex flex-col items-start justify-start gap-4 overflow-hidden rounded-[30px]">
          <div class="newsMain__swiper swiper relative w-full h-full">
            <div class="swiper-wrapper">
              ${blogSlides
                .map(
                  (slide) => `
                <div class="swiper-slide relative w-full h-full">
                  <img src="${slide.image}" alt="${slide.alt}" loading="lazy" decoding="async" class="block w-full h-full object-cover" />

                  <a href="${slide.link ?? "#"}" target="_blank" rel="noopener noreferrer" class="absolute top-10 -right-3 whitespace-nowrap bg-[#1e1e2f]/80 text-white text-sm font-medium pl-5 pr-8 py-2 rounded-full">
                    ${slide.alt}
                  </a>

                  <div class="absolute bottom-3 left-3 right-3 bg-white rounded-[24px] px-5 pt-4 pb-9 flex flex-col gap-3">
                    <h3 class="text-[#222] font-bold text-base leading-6 text-right">${slide.title}</h3>
                    <div class="flex flex-row items-center justify-between gap-3">
                      <a href="${slide.link ?? "#"}" target="_blank" rel="noopener noreferrer" class="shrink-0 whitespace-nowrap font-bold text-xs px-4 py-2.5 rounded-full bg-[#ffd50d] cursor-pointer transition-all duration-[400ms] lg:hover:shadow-[0_2px_8px_#171717cb] lg:hover:bg-[#222] lg:hover:text-[#ffd50d]">
                        مقالات
                      </a>
                      <span class="text-gray-400 text-sm">${slide.data}</span>
                    </div>
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
            <div class="newsMain__pagination swiper-pagination !absolute !w-auto !left-1/2 !-translate-x-1/2 !bottom-6 !flex !items-center !justify-center z-10"></div>
          </div>
        </div>

      </div>
  `;

  const initSwiperWhenReady = () => {
    if (!document.body.contains(container)) {
      requestAnimationFrame(initSwiperWhenReady);
      return;
    }

    const swiperEl = container.querySelector(".newsMain__swiper");
    if (!swiperEl) return;

    new Swiper(swiperEl, {
      effect: "fade",
      loop: blogSlides.length >= 3,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: swiperEl.querySelector(".newsMain__pagination"),
        clickable: true,
        renderBullet: (index, className) =>
          `<span class="${className}" style="width:8px;height:8px;margin:0 3px;border-radius:9999px;background:#d1d5db;opacity:1;display:inline-block;transition:background .3s;"></span>`,
      },
    });

    if (!document.getElementById("newsMain-swiper-style")) {
      const style = document.createElement("style");
      style.id = "newsMain-swiper-style";

      style.textContent = `
    .newsMain__swiper .swiper-pagination-bullet {
      transition: width 0.3s ease, background-color 0.3s ease !important;
    }
    .newsMain__swiper .swiper-pagination-bullet-active { 
      background: #ffd50d !important; 
      width: 20px !important; /* عرض نقطه فعال چقدر بیشتر شود */
    }
  `;
      document.head.appendChild(style);
    }
  };

  requestAnimationFrame(initSwiperWhenReady);

  return container;
};
