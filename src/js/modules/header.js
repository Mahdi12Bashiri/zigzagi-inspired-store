import { createMobileMenu } from "./mobileMenu.js";

export const createLogo = (data) => {
  const link = document.createElement("a");

  if (data.external) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  link.href = data.link ?? "#";
  link.className =
    "top__banner block transition-transform duration-500 will-change-transform";

  const picture = document.createElement("picture");

  const source = document.createElement("source");
  source.media = "(max-width: 767px)";
  source.srcset = data.mobileImage;

  const img = document.createElement("img");
  img.src = data.image;
  img.alt = data.alt;
  img.loading = "eager";
  img.decoding = "async";
  img.className = "block w-full";

  picture.append(source, img);

  link.appendChild(picture);

  let lastScroll = 0;

  let ticking = false;

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 50) {
      link.classList.add("-translate-y-full");
    } else if (currentScroll <= 50) {
      link.classList.remove("-translate-y-full");
    }

    lastScroll = currentScroll;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    },
    { passive: true },
  );

  return link;
};

const renderNavItems = (navItems) => {
  return navItems
    .map((item) => {
      if (item.hasSubmenu) {
        const subLinks = item.submenu.links
          .map(
            (sub) =>
              `
                <li class="block py-1">
                    <a href="${sub.link ?? "#"}" class="menu-link transition text-[#1A1A1A] lg:hover:text-amber-400 text-sm">${sub.title}</a>
                </li>
        `,
          )
          .join("");

        return `
            <li class="relative group py-5 px-[10px] text-xs font-bold text-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-center after:transition-transform after:duration-300 lg:hover:after:scale-x-100">
                <a href="${item.link ?? "#"}" class="menu-link">${item.title}</a>
                <div class="submenu absolute flex invisible opacity-0 translate-y-3 pointer-events-none lg:group-hover:visible lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:pointer-events-auto bg-white shadow-xl p-6 gap-8 top-full right-[-200px] z-50 min-w-[1000px] h-[300px] rounded-b-xl transition-all duration-300 ease-out">
                    <div class="flex-1">
                        <ul class="grid grid-cols-2 gap-x-4 gap-y-2">
                            ${subLinks}
                        </ul>
                    </div>
                    <div class="w-[250px] h-[250px] overflow-hidden rounded-lg bg-gray-100">
                        <a href="${item.submenu.href ?? "#"}">
                            <img src="${item.submenu.image}" alt="منو" class="w-full h-full object-cover" />
                        </a>
                    </div>
                </div>
            </li>
      `;
      }

      return `
        <li class="relative group py-5 px-[10px] text-xs font-bold text-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-center after:transition-transform after:duration-300 lg:hover:after:scale-x-100">
            <a href="${item.link ?? "#"}" class="menu-link">${item.title}</a>
        </li>
    `;
    })
    .join("");
};

export const createHeaderMenu = (data) => {
  const heroDivElem = document.createElement("div");
  heroDivElem.className = "w-full shadow-lg";

  const navItems = renderNavItems(data.menu);
  const mobileMenu = createMobileMenu(data.bars);

  heroDivElem.innerHTML = `
    <div class="flex items-center relative justify-between w-full mx-auto lg:max-w-[1170px] md:max-w-[760px] p-[10px]">
      <div class="flex items-center justify-center">
        <a href="#" class="bars lg:hidden text-2xl">
            <i class="fa-solid fa-bars text-black"></i>
        </a>

        <a href="${data.logo.link ?? "#"}" class="logo relative bottom-[2px] lg:shrink-0 lg:mr-0 mr-3">
            <img src="${data.logo.image}" alt="${data.logo.alt}" class="lg:w-[60px] lg:h-[60px] w-7 h-7 object-cover" />
        </a>
      </div>

      <nav class="nav lg:flex hidden items-center">
          <ul class="nav__ul flex items-center gap-6 text-sm font-medium text-gray-700">
              ${navItems}
          </ul>
      </nav>

      <div class="searchBox sm:static absolute left-[84px] max-w-sm mx-4 lg:block md:w-[254px] md:h-[35px]">
          <form action="" class="relative items-center w-full md:flex hidden">
              <input type="text" placeholder="${data.searchPlaceholder}" class="w-full h-[35px] pr-10 pl-4 py-2 text-[#4d4d4d] bg-[#ECEDEF] rounded-full text-xs outline-none focus:shadow-lg font-bold transition-shadow duration-300"
              />
              <button type="button" class="absolute right-3 text-gray-400 lg:hover:text-black">
                  <i class="fa-solid fa-magnifying-glass text-black"></i>
              </button>
          </form>

          <label class="md:hidden sm:flex hidden items-center overflow-hidden w-[40px] h-[35px] sm:focus-within:w-[220px] focus-within:shadow-lg bg-[#ECEDEF] shadow-sm rounded-full p-2.5 transition-all duration-300 ease-in-out cursor-pointer group">
              <div class="flex items-center justify-center shrink-0 text-white fill-current">
                  <i class="fa-solid fa-magnifying-glass text-black"></i>
              </div>
              <input type="text" placeholder="${data.searchPlaceholderMd}" class="flex outline-none text-xs bg-transparent w-full text-white pr-3 pl-1 font-bold caret-black" />
          </label>

          <button id="mobileSearchTrigger" type="button" class="flex sm:hidden text-lg items-center justify-center w-[40px] h-[35px] text-gray-800">
              <i class="fa-solid fa-magnifying-glass text-black"></i>
              <span class="line h-6 border-l-[.8px] border-l-[#d9d9d9] mr-[10px]"></span>
          </button>
      </div>

      <div id="searchModal" class="fixed inset-0 bg-black/50 z-[100] hidden items-start justify-center p-4 pt-12 backdrop-blur-sm transition-all duration-300">
          <div class="bg-white w-full max-w-md rounded-2xl p-4 shadow-2xl flex flex-col gap-4">
              <div class="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span class="text-xs font-bold text-gray-800">جستجوی محصول</span>
                  <button id="closeSearchModal" type="button" class="text-gray-400 lg:hover:text-black">
                      <i class="fa-solid fa-xmark text-lg"></i>
                  </button>
              </div>
              <form action="" class="relative flex items-center w-full">
                  <input type="text" placeholder="${data.searchPlaceholder ?? "کد یا نام محصول مورد نظر را وارد کنید"}" class="w-full h-[40px] pr-10 pl-4 py-2 text-gray-800 bg-[#ECEDEF] rounded-full text-xs outline-none font-bold" />
                  <button type="submit" class="absolute right-3 text-gray-500">
                      <i class="fa-solid fa-magnifying-glass"></i>
                  </button>
              </form>
          </div>
      </div>

      <div class="login h-6 flex items-center text-lg font-medium text-gray-700 shrink-0">
          <a href="#" class="flex justify-center items-center h-full md:px-[15px] px-[10px] border-l-[.8px] border-l-[#d9d9d9] text-black transition">
              <i class="fa-solid fa-user text-black"></i>
              <span class="mr-2 md:inline-block hidden text-xs font-bold text-black">ورود</span>
          </a>

          <a href="#" class="flex items-center h-full md:px-[15px] px-[10px] pr-5">
              <div class="relative flex items-center justify-center">
                  <i class="fa-solid fa-cart-shopping text-black"></i>
                  <span class="basket-num absolute -top-1.5 -right-2 bg-yellow-400 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">${data.basketCount}</span>
              </div>
              <span class="mr-2 md:flex hidden text-xs font-bold text-black">سبد خرید</span>
          </a>
      </div>
    </div>
  `;

  heroDivElem.appendChild(mobileMenu.element);

  const trigger = heroDivElem.querySelector("#mobileSearchTrigger");
  const bars = heroDivElem.querySelector(".bars");
  const modal = heroDivElem.querySelector("#searchModal");
  const closeBtn = heroDivElem.querySelector("#closeSearchModal");
  const modalInput = modal?.querySelector("input");

  const closeModal = () => {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  const openModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      modalInput.focus();
    });
  };

  const setupEscapeListener = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("flex")) {
        closeModal();
      }
    });
  };

  if (trigger && modal && closeBtn) {
    bars?.addEventListener("click", (e) => {
      e.preventDefault();
      mobileMenu.open();
    });

    trigger.addEventListener("click", openModal);

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    setupEscapeListener();
  }

  heroDivElem.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');

    if (!link) return;

    e.preventDefault();
  });

  return heroDivElem;
};
