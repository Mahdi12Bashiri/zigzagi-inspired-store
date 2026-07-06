export const createPromoBanner = (data) => {
  if (!data?.items?.length) {
    return document.createDocumentFragment();
  }

  const { icon, items } = data;

  const topBanners = items.slice(0, 2);
  const bottomBanners = items.slice(2);

  const containerElem = document.createElement("div");
  containerElem.className =
    "banner-container xl:w-[1170px] md:gap-[30px] gap-[10px] lg:w-[970px] md:w-[750px] w-full mx-auto flex flex-col px-[10px] pt-[30px] pb-[15px] justify-center items-center flex-nowrap";

  const hoverBadge = `
    <div class="absolute w-[84px] h-[72px] top-0 right-0 z-30 flex bg-[#ffd50d] backdrop-blur-sm rounded-[0_20px_0_100px] text-black opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none">
        <img src="${icon.image}" alt="${icon.alt}" loading="lazy" decoding="async" class="absolute top-2 right-3 w-[45px] h-[47px]" />
    </div>
  `;

  const yellowHoverHTML = `
    <div class="absolute inset-0 z-10 opacity-0 group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 transition-all duration-300 bg-[linear-gradient(180deg,rgba(255,213,13,0)_0%,#ffd50d_100%)] pointer-events-none"></div>
  `;

  const renderBannerItem = (item, type = "top") => {
    const titleSizeClass =
      type === "top" ? "md:text-[28px] text-xl" : "md:text-2xl text-xl";

    return `
      <a href="${item.link ?? "#"}" class="banner-item flex-1 relative block w-full rounded-[24px] overflow-hidden group select-none bg-gray-100">
          
          ${hoverBadge}

          ${yellowHoverHTML}

          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" class="relative z-0 w-full h-auto object-cover" />
          
          <div class="absolute inset-0 z-20 text-4xl flex items-end justify-center pb-8 opacity-0 translate-y-3 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
              <h3 class="text-black ${titleSizeClass} font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">${item.title}</h3>
          </div>
      </a>
    `;
  };

  const topRowHTML = topBanners
    .map((item) => renderBannerItem(item, "top"))
    .join("");
  const bottomRowHTML = bottomBanners
    .map((item) => renderBannerItem(item, "bottom"))
    .join("");

  containerElem.innerHTML = `
    <div class="flex md:gap-5 gap-[10px] w-full">
        ${topRowHTML}
    </div>
    <div class="flex md:gap-5 gap-[10px] w-full">
        ${bottomRowHTML}
    </div>
  `;

  return containerElem;
};
