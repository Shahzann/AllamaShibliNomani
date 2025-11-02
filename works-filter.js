// Works Filter JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    // Filter works based on category
    function initializeWorksFilter() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                filterWorks(filterValue);
            });
        });

        // Add animation to work items on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        workItems.forEach(item => {
            item.style.opacity = '0';
            observer.observe(item);
        });

        // Add smooth scrolling to work items when filtered
        document.querySelectorAll('.work-item h3').forEach(heading => {
            heading.addEventListener('click', function() {
                const workItem = this.closest('.work-item');
                workItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        });
    }

    function filterWorks(filterValue) {
        workItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.6s ease';
                }, 50);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.6s ease';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            }
        });

        // Update URL hash for deep linking
        if (filterValue !== 'all') {
            window.location.hash = `filter-${filterValue}`;
        } else {
            window.location.hash = '';
        }

        // Scroll to works section when filtering
        const worksSection = document.querySelector('.works-section');
        if (worksSection && filterValue !== 'all') {
            worksSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Check URL for filter parameters on page load
    function checkUrlFilter() {
        const hash = window.location.hash;
        if (hash) {
            const filterValue = hash.replace('#filter-', '');
            const correspondingButton = document.querySelector(`[data-filter="${filterValue}"]`);
            if (correspondingButton) {
                correspondingButton.click();
            }
        }
    }

    // Initialize the filter
    if (filterButtons.length > 0 && workItems.length > 0) {
        initializeWorksFilter();
        checkUrlFilter();
    }

    // Add category badges with click functionality
    workItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const categoryBadge = item.querySelector('.work-category');
        
        if (categoryBadge) {
            categoryBadge.style.cursor = 'pointer';
            categoryBadge.addEventListener('click', function(e) {
                e.stopPropagation();
                const correspondingButton = document.querySelector(`[data-filter="${category}"]`);
                if (correspondingButton) {
                    correspondingButton.click();
                }
            });
        }
    });

    // Add keyboard navigation for works
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            // Ctrl/Cmd + number to filter categories
            const key = parseInt(e.key);
            if (key >= 1 && key <= 6) {
                const categories = ['all', 'biography', 'history', 'literature', 'criticism', 'poetry'];
                if (categories[key - 1]) {
                    const correspondingButton = document.querySelector(`[data-filter="${categories[key - 1]}"]`);
                    if (correspondingButton) {
                        e.preventDefault();
                        correspondingButton.click();
                    }
                }
            }
        }
    });

    // Add search functionality (optional enhancement)
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'works-search';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" placeholder="Search works..." id="worksSearch">
                <i class="fas fa-search"></i>
            </div>
        `;
        
        searchContainer.style.cssText = `
            max-width: 400px;
            margin: 0 auto 2rem;
            position: relative;
        `;
        
        const searchBox = searchContainer.querySelector('.search-box');
        searchBox.style.cssText = `
            position: relative;
            width: 100%;
        `;
        
        const searchInput = searchContainer.querySelector('input');
        searchInput.style.cssText = `
            width: 100%;
            padding: 1rem 3rem 1rem 1.5rem;
            border: 2px solid var(--primary);
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
        `;
        
        const searchIcon = searchContainer.querySelector('.fa-search');
        searchIcon.style.cssText = `
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--primary);
        `;

        // Insert search box before the filter buttons
        const worksFilter = document.querySelector('.works-filter');
        if (worksFilter) {
            worksFilter.parentNode.insertBefore(searchContainer, worksFilter);
        }

        // Add search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterBySearch(searchTerm);
        });
    }

    function filterBySearch(searchTerm) {
        workItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const category = item.getAttribute('data-category');
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease';
            } else {
                item.style.display = 'none';
            }
        });

        // Update filter buttons to show "Search Results"
        if (searchTerm) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
        }
    }

    // Uncomment the line below to enable search functionality
    // addSearchFunctionality();
});