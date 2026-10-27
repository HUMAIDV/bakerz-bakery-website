
const menuToggle = document.querySelector("#menu-toggle");
const navbar = document.querySelector("#navbar");

menuToggle.addEventListener("click", function () {
    const isOpen = navbar.classList.toggle("active");

    menuToggle.innerHTML = isOpen
        ? `<i class="fa-regular fa-circle-xmark"></i>`
        : `<i class="fa-solid fa-bars-staggered"></i>`;

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

navbar.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("active");
        menuToggle.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// ----------------------------------------------------------------------------

const HeroImages = [
    { src: "images/breadHero.avif", alt: "Bread" },
    { src: "images/butterCross.avif", alt: "Croissant" },
    { src: "images/cakeHero.avif", alt: "Cake" }
]

const frontCard = document.querySelector("#card-front")
const backCard = document.querySelector("#card-back")
const backCard2 = document.querySelector("#card-back-2")
const prevBtn = document.querySelector("#prevBtn")
const nextBtn = document.querySelector("#nextBtn")

let cIndex = 0;

function showHeroImage(index) {
    cIndex = index;

    const nIndex = (cIndex + 1) % HeroImages.length;
    const pIndex = (cIndex - 1 + HeroImages.length) % HeroImages.length;

    frontCard.src = HeroImages[cIndex].src;
    frontCard.alt = HeroImages[cIndex].alt;

    backCard.src = HeroImages[nIndex].src;
    backCard.alt = HeroImages[nIndex].alt;

    backCard2.src = HeroImages[pIndex].src;
    backCard2.alt = HeroImages[pIndex].alt;
}

prevBtn.addEventListener("click", function () {
    const pIndex = (cIndex - 1 + HeroImages.length) % HeroImages.length;
    showHeroImage(pIndex)
})
nextBtn.addEventListener("click", function () {
    const nIndex = (cIndex + 1) % HeroImages.length;
    showHeroImage(nIndex)
})

// ----------------------------------------------------------------------------

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.category;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        productCards.forEach((card) => {
            const productCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                productCategory === selectedCategory
            ) {
                card.hidden = false;
            } else {
                card.hidden = true;
            }
        });
    });
});

// ----------------------------------------------------------------------------

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {
        formFeedback.textContent = "Please fill in all fields.";
        formFeedback.style.color = "red";
        return;
    }
    formFeedback.textContent =
        `Thank you, ${name}! Your message has been received.`;

    formFeedback.style.color = "green";

    contactForm.reset();

    setTimeout(() => {
        formFeedback.textContent = ""
    }, 5000)

});

// ----------------------------------------------------------------------------

const galleryImages = [
    {
        src: "images/bakery1.avif",
        alt: "Freshly baked croissant"
    },
    {
        src: "images/bakery2.avif",
        alt: "Delicious bakery cupcakes"
    },
    {
        src: "images/bakery3.avif",
        alt: "Freshly decorated cake"
    },
    {
        src: "images/bakery4.avif",
        alt: "Bakery interior and display"
    }
];

const galleryImage = document.querySelector("#gallery-image");
const prevButton = document.querySelector("#prev-btn");
const nextButton = document.querySelector("#next-btn");
const galleryCounter = document.querySelector("#gallery-counter");
const thumbnailButtons = document.querySelectorAll(".gallery-thumb");

let currentIndex = 0;

thumbnailButtons.forEach(function (button) {

    const selectedIndex = Number(button.dataset.index);
    button.classList.toggle("active", currentIndex === selectedIndex)
})


function showImage(index) {
    currentIndex = index;


    galleryImage.src = galleryImages[currentIndex].src;
    galleryImage.alt = galleryImages[currentIndex].alt;

    galleryCounter.textContent =
        `${currentIndex + 1} / ${galleryImages.length}`;


    thumbnailButtons.forEach(function (button) {

        const selectedIndex = Number(button.dataset.index);
        button.classList.toggle("active", currentIndex === selectedIndex)
    })

}

nextButton.addEventListener("click", function () {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    showImage(nextIndex);
});

prevButton.addEventListener("click", function () {
    const prevIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;


    showImage(prevIndex);

});

thumbnailButtons.forEach(function (button) {

    const selectedIndex = Number(button.dataset.index);

    button.addEventListener("click", function () {
        showImage(selectedIndex);

        thumbnailButtons.forEach((btn) => {
            btn.classList.remove("active")
        })
        button.classList.add("active")

    });
});

// ----------------------------------------------------------------------------

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector("#lightbox-close");

galleryImage.addEventListener("click", function () {
    lightboxImage.src = galleryImage.src;
    lightboxImage.alt = galleryImage.alt;


    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");


});

lightboxClose.addEventListener("click", function () {
    closeLightbox();
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
}

// ----------------------------------------------------------------------------

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
        const answerId = question.getAttribute("aria-controls");
        const answer = document.getElementById(answerId);
        const icon = question.querySelector(".faq-icon");

        const isExpanded = question.getAttribute("aria-expanded") === "true";

        if (!isExpanded) {
            answer.classList.remove('max-h-0', 'opacity-0', 'pb-0');
            answer.classList.add('max-h-40', 'opacity-100', 'pb-5');
        } else {
            answer.classList.add('max-h-0', 'opacity-0', 'pb-0');
            answer.classList.remove('max-h-40', 'opacity-100', 'pb-5');
        }

        question.setAttribute("aria-expanded", String(!isExpanded));

        icon.textContent = isExpanded ? "+" : "−";
    });
});

