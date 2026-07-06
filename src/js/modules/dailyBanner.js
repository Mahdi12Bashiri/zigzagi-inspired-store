export const createDailyBanner = (data) => {
  if (!data || data.length < 2) {
    return document.createDocumentFragment();
  }

  const desktopBanner = data[0];
  const mobileBanner = data[1];
  const bannerLink = desktopBanner.link ?? "#";

  const container = document.createElement("div");
  container.className = "daily-banner-container w-full p-5";
  container.innerHTML = `
    <style>
      @keyframes rippleEffect {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 0;
        }
      }
      
      @media (hover: hover) {
        .banner-item-link:hover .ripple-circle {
          animation: rippleEffect 0.8s ease-out forwards;
        }
      }
    </style>

    <div class="daily-banner flex md:flex-row flex-col gap-4 justify-center items-center xl:w-[1170px] lg:w-[970px] md:w-[750px] w-full mx-auto">
      <div class="banner-item w-full md:w-auto">
        <a href="${bannerLink}" class="banner-item-link block rounded-3xl overflow-hidden xl:w-[1170px] lg:w-[970px] md:w-[750px] w-full group relative isolation-isolate">
          
          <div class="ripple-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/25 opacity-0 pointer-events-none z-10">
          </div>
          
          <picture>
            <source media="(min-width: 640px)" srcset="${desktopBanner.image}">
            <img src="${mobileBanner.image}" alt="${mobileBanner.alt}" loading="lazy" decoding="async" class="w-full h-full object-cover" />
          </picture>

        </a>
      </div>
    </div>
  `;
  return container;
};
