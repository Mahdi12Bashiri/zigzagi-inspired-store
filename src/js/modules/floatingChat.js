export const createFloatingChat = (data) => {
  if (!data) {
    return document.createDocumentFragment();
  }

  const link = document.createElement("a");
  link.href = data.link ?? "#";
  link.className =
    "fixed sm:bottom-8 sm:right-8 bottom-3 right-3 z-10 [@media(hover:hover)]:hover:scale-110 transition-transform duration-300";

  if (data.link) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  const img = document.createElement("img");
  img.src = data.image;
  img.alt = data.alt;
  img.loading = "eager";
  img.decoding = "async";
  img.className = "w-[60px]";

  link.appendChild(img);

  return link;
};
