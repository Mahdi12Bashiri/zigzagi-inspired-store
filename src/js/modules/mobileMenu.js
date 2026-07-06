export const createMobileMenu = (barsData) => {
  const menu = barsData?.menu || [];
  const footer = barsData?.footer || {};

  const wrapper = document.createElement("div");
  wrapper.className =
    "mobileMenu fixed inset-0 z-[200] invisible opacity-0 transition-opacity duration-300";

  const backdrop = document.createElement("div");
  backdrop.className = "mobileMenu__backdrop absolute inset-0 bg-black/50";

  const panel = document.createElement("div");
  panel.className =
    "mobileMenu__panel relative h-full w-[85%] max-w-[340px] bg-white shadow-2xl translate-x-full transition-transform duration-300 ease-out overflow-hidden flex flex-col";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className =
    "mobileMenu__close absolute top-3 left-3 z-20 flex items-center justify-center w-9 h-9 text-xl text-black";
  closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  const screensContainer = document.createElement("div");
  screensContainer.className =
    "mobileMenu__screens relative flex-1 overflow-hidden";

  const rootScreen = document.createElement("div");
  rootScreen.className =
    "mobileMenu__screen mobileMenu__screen--root absolute inset-0 flex flex-col justify-between overflow-y-auto translate-x-0 transition-transform duration-300 ease-out pt-14";

  const rootListHtml = menu
    .map((item) => {
      const chevron = item.hasSubmenu
        ? `<i class="fa-solid fa-chevron-left text-xs text-gray-400"></i>`
        : "";

      return `
        <li data-id="${item.id}" data-has-submenu="${!!item.hasSubmenu}" class="mobileMenu__item flex items-center justify-between px-6 py-3 text-sm font-medium text-black cursor-pointer border-b border-gray-50 last:border-none">
          <a href="${item.link ?? "#"}" class="flex-1">${item.title}</a>
          ${chevron}
        </li>
      `;
    })
    .join("");

  rootScreen.innerHTML = `
    <ul class="mobileMenu__list flex flex-col">
      ${rootListHtml}
    </ul>

    <div class="mobileMenu__footer flex flex-col gap-4 px-6 py-5 border-t border-gray-100 mt-4">
      ${
        footer.description
          ? `<p class="text-xs text-gray-500 leading-6">${footer.description}</p>`
          : ""
      }

      <a href="${footer.contact?.link ?? "#"}" class="flex items-center gap-2 text-sm font-bold text-black">
        <i class="fa-solid ${footer.contact?.icon ?? "fa-phone"}"></i>
        <span>${footer.contact?.title ?? "تماس با ما"}</span>
      </a>

      <div class="flex items-center justify-around gap-3">
        <a href="${footer.login?.link ?? "#"}" class="flex items-center justify-center rounded-full border border-black px-8 py-2 text-sm font-bold text-black">
          ${footer.login?.title ?? "ورود"}
        </a>
        <a href="${footer.register?.link ?? "#"}" class="text-sm py-2 px-8 font-medium text-black">
          ${footer.register?.title ?? "عضویت"}
        </a>
      </div>
    </div>
  `;

  screensContainer.appendChild(rootScreen);
  panel.appendChild(closeBtn);
  panel.appendChild(screensContainer);
  wrapper.appendChild(backdrop);
  wrapper.appendChild(panel);

  let activeSubScreen = null;

  const buildSubScreen = (item) => {
    const sub = item.submenu;

    const itemsHtml = (sub?.items || [])
      .map(
        (subItem) => `
        <li data-id="${subItem.id}" class="mobileMenu__subItem px-6 py-3 text-sm font-medium text-black border-b border-gray-50 last:border-none">
          <a href="${subItem.link ?? "#"}">${subItem.title}</a>
        </li>
      `,
      )
      .join("");

    const screen = document.createElement("div");
    screen.className =
      "mobileMenu__screen mobileMenu__screen--sub absolute inset-0 flex flex-col overflow-y-auto translate-x-full transition-transform duration-300 ease-out bg-white pt-14";

    screen.innerHTML = `
      <button type="button" class="mobileMenu__back flex items-center gap-2 px-6 pb-4 text-sm font-bold text-black shrink-0">
        <i class="fa-solid fa-chevron-right text-xs"></i>
        <span>${sub?.backButton?.title ?? "برگشت"}</span>
      </button>

      <ul class="mobileMenu__subList flex flex-col">
        ${itemsHtml}
      </ul>

      ${
        sub?.button
          ? `
        <div class="px-6 mt-6 flex justify-center">
          <a href="${sub.button.link ?? "#"}" class="flex items-center justify-center w-fit p-3 rounded-full border border-black py-3 text-sm font-bold text-black">
            ${sub.button.title}
          </a>
        </div>
      `
          : ""
      }
    `;

    screen
      .querySelector(".mobileMenu__back")
      .addEventListener("click", closeSubScreen);

    return screen;
  };

  const openSubScreen = (item) => {
    if (activeSubScreen) {
      activeSubScreen.remove();
      activeSubScreen = null;
    }

    const screen = buildSubScreen(item);
    screensContainer.appendChild(screen);
    activeSubScreen = screen;

    requestAnimationFrame(() => {
      rootScreen.classList.remove("translate-x-0");
      rootScreen.classList.add("-translate-x-full");
      screen.classList.remove("translate-x-full");
      screen.classList.add("translate-x-0");
    });
  };

  function closeSubScreen() {
    if (!activeSubScreen) return;

    rootScreen.classList.remove("-translate-x-full");
    rootScreen.classList.add("translate-x-0");
    activeSubScreen.classList.remove("translate-x-0");
    activeSubScreen.classList.add("translate-x-full");

    const screenToRemove = activeSubScreen;
    activeSubScreen = null;

    setTimeout(() => {
      screenToRemove.remove();
    }, 300);
  }

  rootScreen.querySelectorAll(".mobileMenu__item").forEach((el) => {
    el.addEventListener("click", (e) => {
      const hasSubmenu = el.dataset.hasSubmenu === "true";
      if (!hasSubmenu) return;

      e.preventDefault();
      const id = el.dataset.id;
      const item = menu.find((m) => String(m.id) === String(id));
      if (item) openSubScreen(item);
    });
  });

  const open = () => {
    wrapper.classList.remove("invisible", "opacity-0");
    wrapper.classList.add("opacity-100");
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      panel.classList.remove("translate-x-full");
      panel.classList.add("translate-x-0");
    });
  };

  const close = () => {
    panel.classList.remove("translate-x-0");
    panel.classList.add("translate-x-full");

    wrapper.classList.remove("opacity-100");
    wrapper.classList.add("opacity-0");
    document.body.style.overflow = "";

    setTimeout(() => {
      wrapper.classList.add("invisible");
      closeSubScreen();
    }, 300);
  };

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  return { element: wrapper, open, close };
};
