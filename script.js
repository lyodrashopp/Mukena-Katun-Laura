// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('bg-white', 'shadow-md');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('bg-white', 'shadow-md');
                header.classList.add('bg-transparent');
            }
        });
    }
    
    // Animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    // Create error message
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'text-red-500 text-sm mt-1';
                    errorMsg.textContent = 'Field ini wajib diisi';
                    if (!field.parentNode.querySelector('.error-message')) {
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('border-red-500');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
    // Quantity selector for product variants
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    quantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.minus');
        const plusBtn = selector.querySelector('.plus');
        const input = selector.querySelector('input');
        
        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            input.value = value + 1;
        });
    });
    
    // Image gallery lightbox
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
            lightbox.innerHTML = `
                <div class="relative max-w-4xl max-h-full">
                    <button class="absolute top-4 right-4 text-white text-3xl">&times;</button>
                    <img src="${this.src}" alt="${this.alt}" class="max-w-full max-h-full object-contain">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.textContent === '×') {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
    
    // WhatsApp order button
    const whatsappButtons = document.querySelectorAll('.whatsapp-order');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = '+6281234567890'; // Replace with actual number
            const message = encodeURIComponent('Halo, saya ingin memesan Mukena Katun Laura');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });
    
    // Add to cart animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i data-feather="check"></i> Ditambahkan!';
            this.classList.add('bg-green-500');
            feather.replace();
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('bg-green-500');
                feather.replace();
            }, 2000);
        });
    });
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Dark mode toggle
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or respect OS setting
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && darkModeMediaQuery.matches)) {
        document.documentElement.classList.add('dark');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            
            // Save theme preference
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Call dark mode initialization
initDarkModeToggle();

// Exit intent popup
document.addEventListener('mouseout', function(e) {
    if (e.clientY < 0 && !sessionStorage.getItem('exitIntentShown')) {
        // Show exit intent popup
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        popup.innerHTML = `
            <div class="bg-white rounded-2xl p-8 max-w-md w-full">
                <h3 class="text-2xl font-bold mb-4">Jangan Lewatkan Penawaran Ini!</h3>
                <p class="mb-6">Dapatkan diskon 50% untuk pembelian pertama Anda. Penawaran terbatas!</p>
                <div class="flex gap-3">
                    <button class="flex-1 bg-[#d4af37] text-[#1a3b1a] py-3 rounded-lg font-bold">Ya, Saya Mau</button>
                    <button class="flex-1 border border-gray-300 py-3 rounded-lg font-bold">Tidak, Terima Kasih</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Mark as shown
        sessionStorage.setItem('exitIntentShown', 'true');
        
        // Close popup
        popup.addEventListener('click', function(e) {
            if (e.target.closest('button')) {
                document.body.removeChild(popup);
            }
        });
    }
});

// Sticky CTA button
window.addEventListener('scroll', function() {
    const ctaButton = document.getElementById('sticky-cta');
    if (ctaButton) {
        if (window.scrollY > 500) {
            ctaButton.classList.remove('hidden');
            ctaButton.classList.add('block');
        } else {
            ctaButton.classList.add('hidden');
            ctaButton.classList.remove('block');
        }
    }
});
