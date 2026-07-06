export const createSlider = (data) => {
  const sliderElem = document.createElement("div");
  sliderElem.className =
    "slider-container relative w-full overflow-hidden group transition-all duration-[1000ms] ease-in-out";

  const slidesHTML = data
    .map(
      (item, i) => `
    <a href="${item.link ?? "#"}" class="slide-item absolute top-0 left-0 w-full h-auto transition-all duration-[1000ms] ease-in-out ${
      i === 0
        ? "opacity-100 scale-100 z-10 pointer-events-auto"
        : "opacity-0 scale-125 z-0 pointer-events-none"
    }">
        <img src="${item.image}" loading="eager" decoding="async" class="w-full h-auto hidden md:block" alt="${item.alt}" />
        
        <img src="${item.mobileImage}" loading="eager" decoding="async" class="w-full h-auto block md:hidden" alt="${item.alt}" />
    </a>
  `,
    )
    .join("");

  sliderElem.innerHTML = `
    ${slidesHTML}
    
    <div class="controls absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-3 pointer-events-none z-20">
        <button type="button" aria-label="اسلاید بعدی" class="slider-next pointer-events-auto text-white cursor-pointer flex items-center justify-center transition-all duration-200 [@media(hover:hover)]:hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-14 size-12"><path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" /></svg>
        </button>
        <button type="button" aria-label="اسلاید قبلی" class="slider-prev pointer-events-auto text-white cursor-pointer flex items-center justify-center transition-all duration-200 [@media(hover:hover)]:hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:size-14 size-12"><path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" /></svg>
        </button>
    </div>
  `;

  const slides = sliderElem.querySelectorAll(".slide-item");
  const prevBtn = sliderElem.querySelector(".slider-prev");
  const nextBtn = sliderElem.querySelector(".slider-next");

  let index = 0;
  let autoplayTimer = null;

  const adjustHeight = () => {
    const activeSlide = slides[index];
    if (activeSlide) {
      sliderElem.style.height = `${activeSlide.offsetHeight}px`;
    }
  };

  const updateSlide = (offset) => {
    index = (index + offset + data.length) % data.length;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.className =
          "slide-item absolute top-0 left-0 w-full h-auto transition-all duration-[1000ms] ease-in-out opacity-100 scale-100 z-10 pointer-events-auto";
      } else {
        slide.className =
          "slide-item absolute top-0 left-0 w-full h-auto transition-all duration-[1000ms] ease-in-out opacity-0 scale-125 z-0 pointer-events-none";
      }
    });
  };

  const startAutoplay = () => {
    stopAutoplay();

    autoplayTimer = setTimeout(() => {
      updateSlide(1);
      startAutoplay();
    }, 7000);
  };

  const stopAutoplay = () => {
    clearTimeout(autoplayTimer);
  };
  const change = (offset) => {
    updateSlide(offset);
    startAutoplay();
  };

  sliderElem.querySelectorAll("img").forEach((img) => {
    if (img.complete) {
      adjustHeight();
    } else {
      img.addEventListener("load", adjustHeight);
    }
  });

  const resizeObserver = new ResizeObserver(adjustHeight);
  resizeObserver.observe(sliderElem);

  prevBtn.addEventListener("click", () => {
    change(-1);
    prevBtn.classList.add("animate-ping");
    setTimeout(() => prevBtn.classList.remove("animate-ping"), 1000);
  });

  nextBtn.addEventListener("click", () => {
    change(1);
    nextBtn.classList.add("animate-ping");
    setTimeout(() => nextBtn.classList.remove("animate-ping"), 1000);
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(adjustHeight);
  });
  startAutoplay();

  return sliderElem;
};
