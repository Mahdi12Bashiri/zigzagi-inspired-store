export function createNewProducts(products) {
  if (!products || products.length <= 1)
    return document.createDocumentFragment();

  const iconSrc = products[0].icon;
  const actualProducts = products.slice(1);

  const container = document.createElement("div");
  container.className =
    "container w-full max-w-[1350px] mr-auto ml-0 lg:my-9 md:my-5 my-3 pr-[10px] lg:pl-0 lg:py-6 py-3 flex flex-col lg:flex-row items-stretch gap-8 overflow-hidden";

  const CLONE_COUNT = 6;
  const GAP = 16;
  const AUTOPLAY_DELAY = 6000;
  const TRANSITION_DURATION = 450;

  const loopedProducts = [
    ...actualProducts.slice(-CLONE_COUNT),
    ...actualProducts,
    ...actualProducts.slice(0, CLONE_COUNT),
  ];

  container.innerHTML = `
    <div class="w-full lg:w-[200px] flex flex-col items-center justify-center text-center gap-3.5 shrink-0">
      <div class="flex items-center justify-center overflow-hidden p-1">
        <img src="${iconSrc}" alt="Logo" class="w-full h-full object-contain" />
      </div>
      <h2 class="text-[22px] font-bold text-[#222] my-4 leading-tight">جدیدترین محصولات</h2>
      <a href="${products[0].link ?? "#"}" class="px-[18px] py-2 border border-[#222] rounded-[20px] bg-transparent text-sm cursor-pointer transition-colors duration-200 lg:hover:bg-[#222] lg:hover:text-white inline-block">
        مشاهده بیشتر
      </a>
    </div>

    <div class="product-slider relative flex-1 min-w-0">
      <div class="slider-viewport overflow-hidden w-full md:py-6 py-0">
        <div class="slider-track flex gap-4 will-change-transform pt-2 cursor-grab active:cursor-grabbing select-none">
          ${loopedProducts
            .map(
              (p) => `
              <div class="card box-border shrink-0 group">
                <a href="${p.link ?? "#"}" class="block w-full cursor-pointer" draggable="false">
                  <div class="w-full overflow-hidden relative rounded-xl transition-all duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.02] [@media(hover:hover)]:group-hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]">
                    <img src="${p.image}" alt="${p.title}" class="w-full aspect-[3/4] object-cover pointer-events-none" draggable="false" />
                  </div>
                  
                  <div class="p-3 text-center">
                    <div class="md:text-sm text-xs text-[#333] my-4 truncate">${p.title}</div>
                    <div class="md:text-[16px] text-sm font-bold text-[#111]">${p.price}</div>
                  </div>
                </a>
              </div>
            `,
            )
            .join("")}
        </div>
      </div>
      <button
        type="button"
        aria-label="محصول بعدی"
        class="arrow next absolute top-[42%] -translate-y-1/2 left-[10px] w-10 h-10 border-none rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center text-xl z-10 cursor-pointer text-[#333] transition-colors duration-200 lg:hover:bg-[#f2c94c]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
          <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="محصول قبلی"
        class="arrow prev absolute top-[42%] -translate-y-1/2 right-[10px] w-10 h-10 border-none rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center text-xl z-10 cursor-pointer text-[#333] transition-colors duration-200 lg:hover:bg-[#f2c94c]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
          <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  `;

  const viewport = container.querySelector(".slider-viewport");
  const track = container.querySelector(".slider-track");
  const nextBtn = container.querySelector(".arrow.next");
  const prevBtn = container.querySelector(".arrow.prev");
  const cards = container.querySelectorAll(".card");

  let current = CLONE_COUNT;
  let isTransitioning = false;
  let autoplayTimer = null;
  let cardPxWidth = 0;

  const VISIBLE_COUNT_BREAKPOINTS = [
    { minWidth: 1280, count: 5.3 },
    { minWidth: 1024, count: 4.3 },
    { minWidth: 768, count: 3.15 },
    { minWidth: 640, count: 2.8 },
    { minWidth: 480, count: 2.6 },
    { minWidth: 0, count: 2.4 },
  ];

  function getVisibleCount(width) {
    for (const bp of VISIBLE_COUNT_BREAKPOINTS) {
      if (width >= bp.minWidth) return bp.count;
    }
    return VISIBLE_COUNT_BREAKPOINTS[VISIBLE_COUNT_BREAKPOINTS.length - 1]
      .count;
  }

  function applyCardSizes() {
    const viewportWidth = viewport.clientWidth;
    if (!viewportWidth) return;

    const count = getVisibleCount(viewportWidth);
    const widthWithGap = (viewportWidth - GAP) / count;
    const cardOnlyWidth = Math.round((widthWithGap - GAP) * 100) / 100;

    cardPxWidth = widthWithGap;

    cards.forEach((card) => {
      card.style.flex = `0 0 ${cardOnlyWidth}px`;
      card.style.width = `${cardOnlyWidth}px`;
    });
  }

  function currentBaseTranslate() {
    return current * cardPxWidth;
  }

  function moveTo(index, animate = true) {
    if (animate) {
      isTransitioning = true;
      track.classList.add("transition-transform", "ease-in-out");

      track.style.transitionDuration = `${TRANSITION_DURATION}ms`;
    } else {
      track.classList.remove("transition-transform", "ease-in-out");

      track.style.transitionDuration = "";
    }
    track.style.transform = `translateX(${index * cardPxWidth}px)`;
  }

  function nextSlide() {
    if (isTransitioning) return;
    current++;
    moveTo(current);
  }

  function prevSlide() {
    if (isTransitioning) return;
    current--;
    moveTo(current);
  }

  function startAutoplay() {
    stopAutoplay();

    autoplayTimer = setTimeout(() => {
      nextSlide();
      startAutoplay();
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearTimeout(autoplayTimer);
  }

  function handleTransitionEnd() {
    isTransitioning = false;

    if (current >= CLONE_COUNT + actualProducts.length) {
      current -= actualProducts.length;
      moveTo(current, false);
    } else if (current < CLONE_COUNT) {
      current += actualProducts.length;
      moveTo(current, false);
    }
  }

  track.addEventListener("transitionend", handleTransitionEnd);

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  let isDragging = false;
  let dragStartX = 0;
  let dragCurrentX = 0;
  let baseTranslateX = 0;
  let hasMoved = false;

  function getClientX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function dragStart(e) {
    if (isTransitioning) return;
    isDragging = true;
    hasMoved = false;
    dragStartX = getClientX(e);
    dragCurrentX = dragStartX;
    baseTranslateX = currentBaseTranslate();

    track.classList.remove("transition-transform", "ease-in-out");

    track.style.transitionDuration = "";
    stopAutoplay();
  }

  function dragMove(e) {
    if (!isDragging) return;

    dragCurrentX = getClientX(e);
    const delta = dragCurrentX - dragStartX;

    if (Math.abs(delta) > 5) {
      hasMoved = true;
    }

    if (e.touches && hasMoved) {
      e.preventDefault();
    }

    track.style.transform = `translateX(${baseTranslateX + delta}px)`;
  }

  function suppressClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;

    const delta = dragCurrentX - dragStartX;

    const rawPosition = baseTranslateX + delta;

    let targetIndex = Math.round(rawPosition / cardPxWidth);
    if (targetIndex > current + 1) targetIndex = current + 1;
    if (targetIndex < current - 1) targetIndex = current - 1;
    current = targetIndex;

    moveTo(current, true);
    startAutoplay();

    if (hasMoved) {
      track.addEventListener("click", suppressClick, {
        capture: true,
        once: true,
      });
    }
  }

  track.addEventListener("mousedown", dragStart);

  window.addEventListener("mousemove", dragMove);
  window.addEventListener("mouseup", dragEnd);

  track.addEventListener("touchstart", dragStart, { passive: true });
  track.addEventListener("touchmove", dragMove, { passive: false });
  track.addEventListener("touchend", dragEnd, { passive: true });
  track.addEventListener("touchcancel", dragEnd, { passive: true });

  function layout() {
    applyCardSizes();
    moveTo(current, false);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      layout();
      startAutoplay();
    });
  });

  const resizeObserver = new ResizeObserver(() => {
    layout();
  });
  resizeObserver.observe(viewport);

  window.addEventListener("resize", layout);
  function destroy() {
    stopAutoplay();

    resizeObserver.disconnect();

    window.removeEventListener("resize", layout);

    window.removeEventListener("mousemove", dragMove);
    window.removeEventListener("mouseup", dragEnd);

    track.removeEventListener("mousedown", dragStart);

    track.removeEventListener("touchstart", dragStart);
    track.removeEventListener("touchmove", dragMove);
    track.removeEventListener("touchend", dragEnd);
    track.removeEventListener("touchcancel", dragEnd);

    track.removeEventListener("transitionend", handleTransitionEnd);
  }

  container.destroy = destroy;

  return container;
}
