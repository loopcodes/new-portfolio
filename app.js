const tabsContainer = document.querySelector(".about-tabs");
const aboutSection = document.querySelector(".about-section");
const navToggler = document.querySelector(".nav-toggler");

const portfolioPopup = document.querySelector(".portfolio-popup");
const main = document.querySelector(".main");
const loader = document.querySelector(".pg-loader");
const overlay = document.querySelector(".overlay");
const header = document.querySelector(".header");
const ppClose = document.querySelector(".pp-close");


// ======================
// TAB SWITCHING
// ======================
tabsContainer.addEventListener("click", (e) => {
  const target = e.target;

  if (
    target.classList.contains("tab-item") &&
    !target.classList.contains("active")
  ) {
    tabsContainer.querySelector(".active").classList.remove("active");
    target.classList.add("active");

    const contentId = target.dataset.target;

    aboutSection
      .querySelector(".tab-content.active")
      .classList.remove("active");

    aboutSection.querySelector(contentId).classList.add("active");
  }
});


// ======================
// PORTFOLIO POPUP
// ======================
function togglePortfolioPopup() {
  portfolioPopup.classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
  main.classList.toggle("fade-out");
}

function portfolioItemDetails(item) {
  portfolioPopup.querySelector(".pp-thumbnail img").src =
    item.querySelector(".portfolio-thumbnail img").src;

  portfolioPopup.querySelector(".pp-header h3").textContent =
    item.querySelector(".portfolio-title").textContent;

  portfolioPopup.querySelector(".pp-body").innerHTML =
    item.querySelector(".portfolio-details").innerHTML;
}

ppClose.addEventListener("click", togglePortfolioPopup);


// ======================
// NAVIGATION
// ======================
function hideSection() {
  document.querySelector("section.active")?.classList.toggle("fade-out");
}

function toggleNavbar() {
  header.classList.toggle("active");
}

navToggler.addEventListener("click", () => {
  hideSection();
  toggleNavbar();
  document.body.classList.toggle("hide-scrolling");
});


// ======================
// GLOBAL CLICK HANDLER
// ======================
document.addEventListener("click", (e) => {
  const target = e.target;

  // Open project popup
  const projectBtn = target.closest(".view-project-btn");

  if (projectBtn) {
    togglePortfolioPopup();
    portfolioPopup.scrollTo(0, 0);
    portfolioItemDetails(projectBtn.parentElement);
  }

  // Close popup on outside click
  if (target.classList.contains("pp-inner")) {
    togglePortfolioPopup();
  }

  // Navigation links
  if (target.classList.contains("link-item") && target.hash !== "") {
    overlay.classList.add("active");
    navToggler.classList.add("hide");

    if (target.classList.contains("nav-item")) {
      toggleNavbar();
    } else {
      hideSection();
      document.body.classList.add("hide-scrolling");
    }

    setTimeout(() => {
      document
        .querySelector("section.active")
        ?.classList.remove("active", "fade-out");

      document.querySelector(target.hash)?.classList.add("active");

      window.scrollTo(0, 0);

      document.body.classList.remove("hide-scrolling");
      navToggler.classList.remove("hide");
      overlay.classList.remove("active");
    }, 500);
  }
});


// ======================
// PAGE LOAD
// ======================
window.addEventListener("load", () => {
  main.classList.remove("hidden");

  document.querySelector(".home-section").classList.add("active");

  loader.classList.add("fade-out");

  setTimeout(() => {
    loader.style.display = "none";
  }, 800);
});


// ======================
// TIMELINE SLIDER
// ======================
function updateButtons(timeline, prevBtn, nextBtn) {
  prevBtn.style.opacity = timeline.scrollLeft > 0 ? "1" : "0.3";

  nextBtn.style.opacity =
    timeline.scrollLeft + timeline.clientWidth < timeline.scrollWidth
      ? "1"
      : "0.3";
}

document.querySelectorAll(".timeline-wrapper").forEach((wrapper) => {
  const timeline = wrapper.querySelector(".timeline");
  const nextBtn = wrapper.querySelector(".next");
  const prevBtn = wrapper.querySelector(".prev");

  const scrollAmount = 400;

  nextBtn.addEventListener("click", () => {
    timeline.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    timeline.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  timeline.addEventListener("scroll", () => {
    updateButtons(timeline, prevBtn, nextBtn);
  });

  updateButtons(timeline, prevBtn, nextBtn);
});