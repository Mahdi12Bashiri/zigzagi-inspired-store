export const createStoreFeatures = (data) => {
  if (!data?.length) {
    return document.createDocumentFragment();
  }

  const features = data;

  const container = document.createElement("div");
  container.className =
    "storeFeatures__container w-full lg:max-w-[1170px] md:max-w-[750px] mx-auto lg:my-10 my-8 md:px-[10px] px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 gap-2";

  container.innerHTML = features
    .map(
      ({ title, subtitle, icon, alt }) => `
      <div class="feature__item flex md:flex-row flex-col items-center lg:justify-center md:justify-start gap-4 p-[10px]">
        
        <div class="feature__icon shrink-0 flex items-center justify-center">
          <img src="${icon}" alt="${alt}" loading="lazy" decoding="async" class="w-[50px] h-[50px] object-contain" />
        </div>

        <div class="feature__content flex flex-col md:items-start items-center justify-center gap-1 text-right">
          <h3 class="text-[#222] font-bold text-xs md:text-sm leading-tight">
            ${title}
          </h3>
          <p class="text-[#444] text-xs md:text-sm font-medium">
            ${subtitle}
          </p>
        </div>

      </div>
    `,
    )
    .join("");

  return container;
};
