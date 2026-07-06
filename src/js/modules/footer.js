export const createFooter = (data) => {
  const footerData = data?.footer ? data.footer : data;

  if (!footerData) return document.createElement("footer");

  const logo = footerData.logo ?? "";
  const socials = footerData.socials ?? [];
  const columns = footerData.columns ?? [];
  const newsletter = footerData.newsletter ?? {};
  const enamad = footerData.enamad ?? [];
  const copyright = footerData.copyright ?? "";

  const container = document.createElement("div");
  container.className =
    "w-full bg-[#cbcbcb] text-[#222] pt-12 pb-6 mt-12 font-sans selection:bg-yellow-200";
  container.style.direction = "rtl";

  container.innerHTML = `
    <div class="xl:max-w-[1170px] lg:max-w-[990px] md:max-w-[750px] mx-auto md:px-[10px] px-5 flex flex-col gap-10">
      
      <div class="grid grid-cols-1 lg:grid-cols-[160px_1fr_300px] gap-8 items-start w-full">
        
        <div class="flex flex-col md:grid md:grid-cols-4 gap-8 md:gap-6 items-start w-full lg:col-span-2">
          
          <div class="logo flex flex-col items-center md:items-start gap-4 w-full md:col-span-1 mx-auto md:mx-0">
            <img src="${logo}" alt="Zigzag Logo" class="w-16 h-auto object-contain mix-blend-multiply" />
            <h2 class="text-xl font-black tracking-wider text-[#222]">ZIGZAGI</h2>
            
            <div class="flex flex-row items-center gap-4 text-gray-700">
              ${socials
                .map(
                  (social) => `
                  <a
                      href="${social.link}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="lg:hover:text-black transition-colors"
                      title="${social.name}"
                  >
                      <i class="fab ${social.iconClass ?? (social.name.toLowerCase() === "instagram" ? "fa-instagram" : "fa-telegram")} text-xl"></i>
                  </a>
                  `,
                )
                .join("")}
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 w-full md:col-span-3">
            ${columns
              .map(
                (col) => `
              <div class="flex flex-col items-start gap-4 text-right w-full">
                  <h3 class="font-bold text-base text-gray-900 pb-1">
                    ${col.title}
                  </h3>
                  <ul class="flex flex-col gap-2.5 w-full">
                  ${col.links
                    .map(
                      (link) => `
                      <li>
                      <a href="${link.url}" class="text-sm text-gray-700 lg:hover:text-[#ffd50d] lg:hover:font-semibold transition-all duration-150 block">
                          ${link.text}
                      </a>
                      </li>
                  `,
                    )
                    .join("")}
                  </ul>
              </div>
              `,
              )
              .join("")}
          </div>

        </div>
        
        <div class="newsletter flex flex-col items-center lg:items-start gap-6 w-full lg:col-span-1 md:mt-6 lg:mt-0">
          
          <div class="w-full flex flex-col gap-3 items-center lg:items-start">
            <h3 class="font-bold text-base text-gray-900 text-center lg:text-right w-full">
              ${newsletter.title ?? "عضویت در خبرنامه"}
            </h3>

            <form id="newsletter-form" class="w-full lg:max-w-[300px]">
              <div class="relative flex items-center bg-white rounded-full overflow-hidden shadow-sm border border-transparent transition-colors">
                <input
                  id="newsletter-input"
                  type="tel"
                  inputmode="numeric"
                  autocomplete="tel"
                  placeholder="${newsletter.placeholder ?? "شماره همراه خود را وارد کنید"}"
                  class="w-full bg-transparent px-5 py-3 text-xs text-right text-gray-800 outline-none placeholder-gray-400"
                />

                <button type="submit" class="w-10 h-10 shrink-0 bg-[#ffd50d] rounded-full flex items-center justify-center m-1 lg:hover:bg-black transition group focus:outline-none"
                >
                  <i class="fas fa-arrow-left text-black lg:group-hover:text-[#ffd50d] pointer-events-none"></i>
                </button>
              </div>

              <p
                id="newsletter-message"
                class="hidden mt-2 text-xs font-medium text-right"
              ></p>
            </form>
          </div>

          <div class="flex flex-row items-center justify-center lg:justify-start gap-4 w-full lg:max-w-[300px]">
            ${enamad
              .map(
                (item) => `
              <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="lg:w-full max-w-[141px] bg-white rounded-xl p-2 flex items-center justify-center shadow-sm lg:hover:shadow-md transition-shadow" title="${item.alt}">
                <img src="${item.image}" alt="${item.alt}" class="max-w-full max-h-full object-contain" />
              </a>
            `,
              )
              .join("")}
          </div>

        </div>

      </div>
      
      <div class="w-full h-[1px] bg-gray-400 opacity-40 mt-4"></div>

      <div class="w-full flex items-center justify-between text-xs md:text-sm text-gray-700">

        <div class="group flex items-center cursor-pointer overflow-hidden">
          <button
            class="w-10 h-10 flex items-center justify-center shrink-0"
            aria-label="Menu"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>

          <span
            class="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out lg:group-hover:max-w-[260px] lg:group-hover:mr-3"
          >
            طراحی سایت و برنامه نویسی :  مهدی بشیری
          </span>
        </div>

        <p class="font-medium text-right">
          ${copyright}
        </p>

      </div>

    </div>
  `;

  const form = container.querySelector("#newsletter-form");
  const input = container.querySelector("#newsletter-input");
  const message = container.querySelector("#newsletter-message");
  const wrapper = input.parentElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mobile = input.value.trim();

    // ریست کردن وضعیت قبلی
    wrapper.classList.remove("border-red-500", "border-green-500");
    message.classList.remove("hidden", "text-red-500", "text-green-600");

    // خالی بودن
    if (!mobile) {
      wrapper.classList.add("border-red-500");

      message.textContent = "لطفا شماره همراه خود را وارد نمایید.";
      message.classList.add("text-red-500");

      input.focus();
      return;
    }

    // اعتبارسنجی شماره موبایل ایران
    const regex = /^09\d{9}$/;

    if (!regex.test(mobile)) {
      wrapper.classList.add("border-red-500");

      message.textContent = "شماره همراه وارد شده معتبر نیست.";
      message.classList.add("text-red-500");

      input.focus();
      return;
    }

    // موفقیت
    wrapper.classList.add("border-green-500");

    message.textContent = "شما با موفقیت در خبرنامه پیامکی عضو شدید.";
    message.classList.add("text-green-600");

    input.value = "";
  });

  return container;
};
