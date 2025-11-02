// Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const galleryData = [
        {
            id: 1,
            image: '/images/shibli-portrait.jpeg',
            title: 'Official Portrait',
            description: 'Allama Shibli Nomani in his scholarly attire',
            category: 'portraits'
        },
        {
            id: 2,
            image: '/images/academy-building.jpg',
            title: 'Shibli Academy Building',
            description: 'Darul Musannefin Shibli Academy in Azamgarh - Premier research institution founded by Shibli Nomani',
            category: 'institutions'
        },
        {
            id: 3,
            image: '/images/shibli-national-college.jpg',
            title: 'Shibli National College',
            description: 'Shibli National College in Azamgarh - Educational institution named in his honor, promoting modern education',
            category: 'institutions'
        },
       
        {
            id: 4,
            image: '/images/with-scholars.jpg',
            title: 'With Contemporary Scholars',
            description: 'Group photo with other intellectuals and scholars of his time',
            category: 'historical'
        },
        {
            id: 5,
            image: '/images/personal-library.png',
            title: 'Personal Library',
            description: 'Collection of books from his personal library showing his vast knowledge',
            category: 'historical'
        },
        {
            id: 6,
            image: '/images/commemorative-stamp.png',
            title: 'Commemorative Stamp',
            description: 'Postage stamp issued by India Post in his honor',
            category: 'portraits'
        },
        {
            id: 7,
            image: '/images/young-shibli.jpeg',
            title: 'Young Shibli Nomani',
            description: 'Early photograph from his student days showing his scholarly demeanor',
            category: 'portraits'
        },
        {
            id: 8,
            image: '/images/academy-library.JPG',
            title: 'Academy Library',
            description: 'The main library at Darul Musannefin Shibli Academy with rare manuscripts',
            category: 'institutions'
        },
        {
            id: 9,
            image: '/images/national-college-campus.jpg',
            title: 'College Campus',
            description: 'Beautiful campus of Shibli National College in Azamgarh',
            category: 'institutions'
        },
       
        {
            id: 10,
            image: '/images/academic-event.jpeg',
            title: 'College Event',
            description: 'Workshop at Shibli National College for BCA students',
            category: 'institutions'
        }
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Initialize Gallery
    function initGallery() {
        renderGallery(galleryData);
        filteredImages = galleryData;
        setupEventListeners();
    }

    // Render Gallery Items
    function renderGallery(images) {
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        
        images.forEach((item, index) => {
            const galleryItem = createGalleryItem(item, index);
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Create Gallery Item
    function createGalleryItem(item, index) {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.setAttribute('data-category', item.category);
        galleryItem.setAttribute('data-index', index);
        
        galleryItem.innerHTML = `
            <div class="gallery-category">${formatCategoryName(item.category)}</div>
            <div class="gallery-image-container">
                <img src="${item.image}" alt="${item.title}" class="gallery-img" 
                     onerror="this.src='https://via.placeholder.com/400x500/1a5276/ffffff?text=Image+Loading'">
            </div>
            <div class="gallery-caption">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(index));
        return galleryItem;
    }

    // Format category name for display
    function formatCategoryName(category) {
        const categoryMap = {
            'portraits': 'Portrait',
            'institutions': 'Institution',
            'manuscripts': 'Manuscript',
            'historical': 'Historical'
        };
        return categoryMap[category] || category;
    }

    // Filter Gallery Items
    function setupEventListeners() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                filterGallery(filter);
            });
        });

        // Lightbox event listeners
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

        // Close lightbox when clicking outside the image
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox && lightbox.style.display === 'block') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            }
        });
    }

    // Filter gallery based on category
    function filterGallery(filter) {
        if (filter === 'all') {
            filteredImages = galleryData;
        } else {
            filteredImages = galleryData.filter(item => item.category === filter);
        }
        
        renderGallery(filteredImages);
        
        // Add animation to new items
        setTimeout(() => {
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.animation = 'fadeInUp 0.6s ease';
            });
        }, 50);
    }

    // Lightbox Functions
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        if (lightbox) {
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    function updateLightbox() {
        if (!filteredImages[currentImageIndex]) return;
        
        const currentImage = filteredImages[currentImageIndex];
        if (lightboxImg) lightboxImg.src = currentImage.image;
        if (lightboxTitle) lightboxTitle.textContent = currentImage.title;
        if (lightboxDesc) lightboxDesc.textContent = currentImage.description;
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    }

    // Preload images for better performance
    function preloadImages() {
        galleryData.forEach(item => {
            const img = new Image();
            img.src = item.image;
        });
    }

    // Initialize the gallery
    initGallery();
    preloadImages();

    // Add scroll animation to gallery items
    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe gallery items after they are rendered
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            galleryObserver.observe(item);
        });
    }, 100);
});