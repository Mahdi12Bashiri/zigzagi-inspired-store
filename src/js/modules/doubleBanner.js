export const createDoubleBanner = (data) => {
  if (!data || data.length < 2) {
    return document.createDocumentFragment();
  }

  const firstBanner = data[0];
  const secondBanner = data[1];
  const firstBannerLink = firstBanner.link ?? "#";
  const secondBannerLink = secondBanner.link ?? "#";

  const container = document.createElement("div");

  container.className = "w-full px-5";

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
          animation: rippleEffect .8s ease-out forwards;
        }
      }
    </style>

    <div
      class="
        mx-auto
        flex
        flex-col
        md:flex-row
        justify-center
        items-center
        gap-4
        w-full
        md:max-w-[766px]
        lg:max-w-[986px]
        xl:max-w-[1170px]
      "
    >

      <div class="w-full md:w-auto">
        <a
          href="${firstBannerLink}"
          class="banner-item-link relative isolate block overflow-hidden rounded-3xl
          md:w-[375px]
          lg:w-[485px]
          xl:w-[565px]"
        >
          <div
            class="ripple-circle pointer-events-none absolute top-1/2 left-1/2 z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 opacity-0">
          </div>

          <img
            src="${firstBanner.image}"
            loading="lazy"
            decoding="async"
            alt="${firstBanner.alt ?? "Banner 1"}"
            class="block w-full object-cover"
          >
        </a>
      </div>

      <div class="w-full md:w-auto">
        <a
          href="${secondBannerLink}"
          class="banner-item-link relative isolate block overflow-hidden rounded-3xl
          md:w-[375px]
          lg:w-[485px]
          xl:w-[565px]"
        >
          <div
            class="ripple-circle pointer-events-none absolute top-1/2 left-1/2 z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 opacity-0">
          </div>

          <img
            src="${secondBanner.image}"
            loading="lazy"
            decoding="async"
            alt="${secondBanner.alt ?? "Banner 2"}"
            class="block w-full object-cover"
          >
        </a>
      </div>

    </div>
  `;

  return container;
};
