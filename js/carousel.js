document.addEventListener('DOMContentLoaded', function() {
    // Pause animation on hover for better UX
    const carouselTrack = document.querySelector('.logo-carousel-track');
    const carousel = document.querySelector('.logo-carousel');
    
    if (carousel && carouselTrack) {
        carousel.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            carouselTrack.style.animationPlayState = 'paused';
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            setTimeout(() => {
                carouselTrack.style.animationPlayState = 'running';
            }, 3000);
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance (in pixels)
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swiped right
                    const firstItem = carouselTrack.firstElementChild;
                    carouselTrack.style.transition = 'transform 0.5s ease-in-out';
                    carouselTrack.appendChild(firstItem);
                    carouselTrack.style.transform = 'translateX(0)';
                } else {
                    // Swiped left
                    const lastItem = carouselTrack.lastElementChild;
                    carouselTrack.insertBefore(lastItem, carouselTrack.firstChild);
                    carouselTrack.style.transition = 'none';
                    carouselTrack.style.transform = 'translateX(0)';
                }
            }
        }
        
        // Reset animation when it ends to create infinite loop
        carouselTrack.addEventListener('animationiteration', () => {
            // This ensures smooth continuous animation
            carouselTrack.style.animation = 'none';
            carouselTrack.offsetHeight; // Trigger reflow
            carouselTrack.style.animation = 'scroll 30s linear infinite';
        });
    }
});
