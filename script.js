const models = [
  {
    id: "leah_meow",
    displayName: "Leah Meow",
    modelImageFile: "leah-meow.png",
    statsImageFile: "info-leah-meow.png",
    socials: {
      instagram: "https://www.instagram.com/_leah.chan_/",
      x: "https://twitter.com/leah__meow",
      pornhub: "https://www.pornhub.com/model/leah-meow"
    }
  },
  {
    id: "alex_mucci",
    displayName: "Alex Mucci",
    modelImageFile: "alex-mucci.png",
    statsImageFile: "info-alex-mucci.png",
    socials: {
      tiktok: "https://www.tiktok.com/@alexismucci?lang=en",
      instagram: "https://www.instagram.com/alex_mucci/",
      telegram: "https://t.me/alexismucciofficial",
      x: "https://twitter.com/alexmucci_"
    }
  },
  {
    id: "eva_elfie",
    displayName: "Eva Elfie",
    modelImageFile: "eva.png",
    statsImageFile: "info-eva.png",
    socials: {
      tiktok: "https://www.tiktok.com/@theevaelfie",
      instagram: "https://www.instagram.com/theevaelfie/",
      telegram: "https://t.me/evaelfie_life",
      x: "https://x.com/evaelfie",
      facebook: "https://www.facebook.com/evaelfieofficialFB/"
    }
  },
  {
    id: "sola_zola",
    displayName: "Sola Zola",
    modelImageFile: "sola.png",
    statsImageFile: "info-sola.png",
    socials: {
      tiktok: "https://www.tiktok.com/@baby_sola",
      instagram: "https://www.instagram.com/solazolareal/",
      telegram: "https://t.me/solazolapage",
      x: "https://twitter.com/_SolaZola_",
      pornhub: "https://www.pornhub.com/model/solazola"
    }
  },
  {
    id: "reislin",
    displayName: "Reislin",
    modelImageFile: "reislin.png",
    statsImageFile: "info-reislin.png",
    socials: {
      instagram: "https://www.instagram.com/reislin_model",
      telegram: "https://t.me/badgirl_reislin",
      x: "https://twitter.com/reislin_model_",
      pornhub: "https://rt.pornhub.com/model/reislin"
    }
  },
  {
    id: "sofiia_rivers",
    displayName: "Sofiia Rivers",
    modelImageFile: "sofia.png",
    statsImageFile: "info-sofia.png",
    socials: {
      tiktok: "https://www.tiktok.com/@sofia.rivers14",
      instagram: "https://www.instagram.com/sofiia.rivers",
      telegram: "https://t.me/SofiiaRivers",
      x: "https://x.com/sonya_rivers_"
    }
  },
  {
    id: "sweetie_fox",
    displayName: "Sweetie Fox",
    modelImageFile: "fox.png",
    statsImageFile: "info-fox.png",
    socials: {
      tiktok: "https://www.tiktok.com/@swfx_real_fox",
      instagram: "https://www.instagram.com/swfx_real/",
      telegram: "https://t.me/sweetiefox_eng",
      x: "https://x.com/swfx_waifu",
      pornhub: "https://rt.pornhub.com/model/sweetie-fox/"
    }
  },
  {
    id: "diana_rider",
    displayName: "Diana Rider",
    modelImageFile: "diana.png",
    statsImageFile: "info-diana.png",
    socials: {
      tiktok: "https://www.tiktok.com/@dianariderph",
      instagram: "https://www.instagram.com/diriderx/",
      telegram: "https://t.me/+GVBjm9G7d9plZmUy",
      x: "https://x.com/_DianaRider_",
      pornhub: "https://rt.pornhub.com/model/diana-rider"
    }
  },
  {
    id: "katyonok",
    displayName: "Katyonok",
    modelImageFile: "katyonok.png",
    statsImageFile: "info-katyonok.png",
    socials: {
      tiktok: "https://www.tiktok.com/@clover_katya",
      instagram: "https://www.instagram.com/katyonok",
      x: "https://twitter.com/KatyaClover",
      facebook: "https://www.facebook.com/Katyonok.official/"
    }
  },
  {
    id: "fetching_butterfly",
    displayName: "Fetching Butterfly",
    modelImageFile: "butterfly.png",
    statsImageFile: "info-butterfly.png",
    socials: {
      tiktok: "https://www.tiktok.com/@fetching.butter",
      instagram: "https://www.instagram.com/fetching_butter",
      x: "https://twitter.com/fetchbutterfly"
    }
  }
];

const socialOrder = ["tiktok", "instagram", "telegram", "x", "youtube", "facebook", "pornhub"];
const socialLabels = {
  tiktok: "TikTok",
  instagram: "Instagram",
  telegram: "Telegram",
  x: "X",
  youtube: "YouTube",
  facebook: "Facebook",
  pornhub: "Pornhub"
};

const modelName = document.getElementById("modelName");
const statsImage = document.getElementById("statsImage");
const socials = document.getElementById("socials");
const track = document.getElementById("modelsTrack");
const carousel = document.querySelector(".carousel");

let slides = [];
let activeIndex = 1;
let logicalIndex = 0;
let slideStep = 0;
let currentTranslate = 0;
let startX = 0;
let startY = 0;
let startTranslate = 0;
let dragDelta = 0;
let isDragging = false;
let isHorizontalDrag = false;
let transitionEnabled = true;

function imagePath(folder, file) {
  return `./assets/${folder}/${file}`;
}

function createSlide(model, cloneType = "") {
  const slide = document.createElement("article");
  slide.className = "model-slide";
  slide.dataset.modelId = model.id;
  if (cloneType) {
    slide.dataset.clone = cloneType;
    slide.setAttribute("aria-hidden", "true");
  }

  const img = document.createElement("img");
  img.className = "model-photo";
  img.src = imagePath("models", model.modelImageFile);
  img.alt = model.displayName;
  img.draggable = false;

  slide.appendChild(img);
  return slide;
}

function buildSlides() {
  const last = models[models.length - 1];
  const first = models[0];
  track.appendChild(createSlide(last, "last"));
  models.forEach((model) => track.appendChild(createSlide(model)));
  track.appendChild(createSlide(first, "first"));
  slides = Array.from(track.children);
}

function measure() {
  if (slides.length < 2) return;
  slideStep = slides[1].offsetLeft - slides[0].offsetLeft;
  setPosition(activeIndex, false);
}

function setTransition(enabled) {
  transitionEnabled = enabled;
  track.style.transition = enabled ? "transform 380ms cubic-bezier(0.22, 0.72, 0.18, 1)" : "none";
}

function calculateTranslate(index) {
  const slide = slides[index];
  const carouselCenter = carousel.clientWidth / 2;
  const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
  return carouselCenter - slideCenter;
}

function applyTranslate(value) {
  currentTranslate = value;
  track.style.transform = `translate3d(${value}px, 0, 0)`;
}

function setPosition(index, animate = true) {
  setTransition(animate);
  applyTranslate(calculateTranslate(index));
  updateActiveClass(index);
}

function updateActiveClass(index) {
  slides.forEach((slide, slideIndex) => {
    const distance = Math.abs(slideIndex - index);
    slide.classList.toggle("is-active", distance === 0);
    slide.style.zIndex = String(20 - Math.min(distance, 10));
  });
}

function getLogicalIndex(index) {
  if (index === 0) return models.length - 1;
  if (index === slides.length - 1) return 0;
  return index - 1;
}

function renderDetails(index) {
  const model = models[index];
  logicalIndex = index;
  modelName.textContent = model.displayName;
  statsImage.src = imagePath("stats", model.statsImageFile);
  statsImage.alt = `${model.displayName} statistics`;
  socials.innerHTML = "";

  socialOrder.forEach((key) => {
    const url = model.socials[key];
    if (!url) return;

    const icon = key === "youtube" ? null : `./assets/icons/${key}.png`;
    if (!icon) return;

    const link = document.createElement("a");
    link.className = "social-link";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${model.displayName} on ${socialLabels[key]}`);

    const img = document.createElement("img");
    img.src = icon;
    img.alt = "";
    img.draggable = false;
    link.appendChild(img);
    socials.appendChild(link);
  });
}

function goTo(index, animate = true) {
  activeIndex = index;
  setPosition(activeIndex, animate);
  renderDetails(getLogicalIndex(activeIndex));
}

function normalizeAfterLoop() {
  if (activeIndex === 0) {
    activeIndex = models.length;
    setPosition(activeIndex, false);
    renderDetails(models.length - 1);
  } else if (activeIndex === slides.length - 1) {
    activeIndex = 1;
    setPosition(activeIndex, false);
    renderDetails(0);
  }
}

function getPointerX(event) {
  return event.touches ? event.touches[0].clientX : event.clientX;
}

function getPointerY(event) {
  return event.touches ? event.touches[0].clientY : event.clientY;
}

function beginDrag(event) {
  if (event.target.closest(".social-link")) return;
  isDragging = true;
  isHorizontalDrag = false;
  startX = getPointerX(event);
  startY = getPointerY(event);
  dragDelta = 0;
  startTranslate = currentTranslate;
  setTransition(false);
}

function moveDrag(event) {
  if (!isDragging) return;

  const x = getPointerX(event);
  const y = getPointerY(event);
  const dx = x - startX;
  const dy = y - startY;

  if (!isHorizontalDrag && Math.abs(dx) > 8) {
    isHorizontalDrag = Math.abs(dx) > Math.abs(dy);
  }

  if (!isHorizontalDrag) return;

  if (event.cancelable) {
    event.preventDefault();
  }

  dragDelta = dx;
  applyTranslate(startTranslate + dx);
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;

  const threshold = Math.max(42, slideStep * 0.22);
  if (dragDelta <= -threshold) {
    goTo(activeIndex + 1);
  } else if (dragDelta >= threshold) {
    goTo(activeIndex - 1);
  } else {
    goTo(activeIndex);
  }
}

function bindEvents() {
  track.addEventListener("transitionend", normalizeAfterLoop);
  window.addEventListener("resize", measure);
  window.addEventListener("orientationchange", () => setTimeout(measure, 250));

  carousel.addEventListener("mousedown", beginDrag);
  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("mouseup", endDrag);

  carousel.addEventListener("touchstart", beginDrag, { passive: true });
  carousel.addEventListener("touchmove", moveDrag, { passive: false });
  carousel.addEventListener("touchend", endDrag);
  carousel.addEventListener("touchcancel", endDrag);
}

function init() {
  buildSlides();
  bindEvents();
  renderDetails(0);
  requestAnimationFrame(() => {
    measure();
    setPosition(activeIndex, false);
    setTransition(true);
  });
}

init();
