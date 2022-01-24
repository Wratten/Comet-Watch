// PICTURE SLIDESHOW JS//
const carouselSlideshow = document.querySelector(".slideshow-carousel");
const carouselImages = document.querySelectorAll(".slideshow-carousel img");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
var imageCounter = 1;
const imageSize = carouselImages[0].clientWidth;

carouselSlideshow.style.transform = 'translateX(' + (-imageSize * imageCounter) + 'px)';

nextBtn.addEventListener ('click', function () {
    if (imageCounter >= carouselImages.length -1) return;
    carouselSlideshow.style.transition = "transform 0.3s ease-in-out";
    imageCounter++;
    carouselSlideshow.style.transform = 'translateX(' + (-imageSize * imageCounter) + 'px)';
});

prevBtn.addEventListener ('click', function () {
    if (imageCounter <= 0) return;
    carouselSlideshow.style.transition = "transform 0.3s ease-in-out";
    imageCounter--;
    carouselSlideshow.style.transform = 'translateX(' + (-imageSize * imageCounter) + 'px)';
});

carouselSlideshow.addEventListener('transitioned', function (){
    if (carouselImages[imageCounter].id === 'last-img') {
        carouselSlideshow.style.transition = "none";
        imageCounter = carouselImages.length - 2;
        carouselSlideshow.style.transform = 'translateX(' + (-imageSize * imageCounter) + 'px)';
    }
    if (carouselImages[imageCounter].id === 'first-img') {
        carouselSlideshow.style.transition = "none";
        imageCounter = carouselImages.length - imageCounter;
        carouselSlideshow.style.transform = 'translateX(' + (-imageSize * imageCounter) + 'px)';
    }
});

//

