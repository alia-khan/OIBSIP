// ======================
// Dynamic Footer Year
// ======================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ======================
// Dark / Light Theme
// ======================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.innerHTML = "☀ Light Mode";
    } else {
        themeBtn.innerHTML = "🌙 Dark Mode";
    }

});


// ======================
// Back To Top Button
// ======================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ======================
// Timeline Card Animation
// ======================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }

    });

}, {
    threshold: 0.2
});


cards.forEach((card) => {
    observer.observe(card);
});


// ======================
// Image Zoom Effect
// ======================

const heroImage = document.querySelector(".hero img");

heroImage.addEventListener("click", () => {

    heroImage.classList.toggle("zoomed");

});


// ======================
// Typing Effect
// ======================

const tagline = document.querySelector(".tagline");

const originalText = tagline.textContent;

tagline.textContent = "";

let index = 0;

function typeWriter() {

    if (index < originalText.length) {

        tagline.textContent += originalText.charAt(index);

        index++;

        setTimeout(typeWriter, 50);
    }

}

window.addEventListener("load", typeWriter);


// ======================
// Smooth Scrolling
// ======================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});