const tabsContainer = document.querySelector(".about-tabs");
const aboutSection = document.querySelector(".about-section");
const navToggler = document.querySelector(".nav-toggler");




tabsContainer.addEventListener("click", (e) =>{
    if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
});


document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("view-project-btn")){
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTo(0,0);
        portfolioItemDetails(e.target.parentElement);
    }
})
function togglePortfolioPopup(){
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);


document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("pp-inner")){
        togglePortfolioPopup();
    }
});


function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp-thumbnail img").src =
    portfolioItem.querySelector(".portfolio-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML =
    portfolioItem.querySelector(".portfolio-title").innerHTML;

    document.querySelector(".pp-body").innerHTML =
    portfolioItem.querySelector(".portfolio-details").innerHTML;
}


navToggler.addEventListener("click", () =>{
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});
function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar(){
    document.querySelector(".header").classList.toggle("active");
}

document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("link-item") && e.target.hash !== ""){
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        }
        else{
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() =>{
            document.querySelector("section.active").classList.remove("active","fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        },500);
    }
});


window.addEventListener("load", () =>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");

    document.querySelector(".pg-loader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".pg-loader").style.display = "none";
    },800);

});

document.querySelectorAll('.timeline-wrapper').forEach(wrapper => {
  const timeline = wrapper.querySelector('.timeline');
  const nextBtn = wrapper.querySelector('.next');
  const prevBtn = wrapper.querySelector('.prev');

  const scrollAmount = 400; // adjust if needed

  nextBtn.addEventListener('click', () => {
    timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    timeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
});

function updateButtons(timeline, prevBtn, nextBtn) {
  prevBtn.style.opacity = timeline.scrollLeft > 0 ? "1" : "0.3";
  nextBtn.style.opacity =
    timeline.scrollLeft + timeline.clientWidth < timeline.scrollWidth
      ? "1"
      : "0.3";
}

document.querySelectorAll('.timeline-wrapper').forEach(wrapper => {
  const timeline = wrapper.querySelector('.timeline');
  const nextBtn = wrapper.querySelector('.next');
  const prevBtn = wrapper.querySelector('.prev');

  updateButtons(timeline, prevBtn, nextBtn);

  timeline.addEventListener('scroll', () => {
    updateButtons(timeline, prevBtn, nextBtn);
  });
});