// Timeline JavaScript for biography page
document.addEventListener('DOMContentLoaded', function() {
    const timelineData = [
        {
            year: "1857",
            title: "Birth in Bindwal",
            description: "Born on June 3, 1857 in Bindwal, Azamgarh district, Uttar Pradesh into a family of Mughal administrators and scholars",
            icon: "fas fa-baby"
        },
        {
            year: "1865-1870",
            title: "Early Education",
            description: "Memorized Quran and received traditional Islamic education in Arabic, Persian and Islamic sciences in Azamgarh",
            icon: "fas fa-book"
        },
        {
            year: "1871-1875",
            title: "Higher Studies",
            description: "Studied under Maulana Muhammad Farooq Chirayakoti who introduced him to rationalist thought and critical methodology",
            icon: "fas fa-user-graduate"
        },
        {
            year: "1883",
            title: "Joins Aligarh Movement",
            description: "Appointed as professor of Arabic and Persian at Muhammadan Anglo-Oriental College, Aligarh",
            icon: "fas fa-university"
        },
        {
            year: "1883-1898",
            title: "Aligarh Period",
            description: "15 years of teaching and research. Collaborated with Sir Syed Ahmed Khan while developing independent scholarly approach",
            icon: "fas fa-chalkboard-teacher"
        },
        {
            year: "1894",
            title: "Founding of Nadwatul Ulama",
            description: "Played key role in establishing Nadwatul Ulama in Lucknow as a reformist educational institution",
            icon: "fas fa-mosque"
        },
        {
            year: "1898",
            title: "Leaves Aligarh",
            description: "Resigned from Aligarh due to ideological differences and focused on independent research and writing",
            icon: "fas fa-sign-out-alt"
        },
        {
            year: "1900-1910",
            title: "Major Literary Period",
            description: "Produced his most important works including Al-Farooq, Al-Mamoon, and began Sirat-un-Nabi",
            icon: "fas fa-pen-fancy"
        },
        {
            year: "1910",
            title: "European Tour",
            description: "Visited Europe to study Orientalist research methods and access manuscript collections",
            icon: "fas fa-globe-europe"
        },
        {
            year: "1914",
            title: "Founding of Darul Musannefin",
            description: "Established Darul Musannefin (House of Writers) in Azamgarh, later renamed Shibli Academy",
            icon: "fas fa-landmark"
        },
        {
            year: "1914",
            title: "Passing Away",
            description: "Died on November 18, 1914 in Azamgarh, leaving behind a rich scholarly legacy and institutions",
            icon: "fas fa-star-of-david"
        },
        {
            year: "Post-1914",
            title: "Legacy Continues",
            description: "Shibli Academy continues his mission. Syed Sulaiman Nadvi completes his unfinished works including Sirat-un-Nabi",
            icon: "fas fa-infinity"
        }
    ];

    const timelineContainer = document.getElementById('mainTimeline');

    function createTimeline() {
        if (!timelineContainer) return;
        
        timelineContainer.innerHTML = '';
        
        timelineData.forEach((item, index) => {
            const timelineItem = createTimelineItem(item, index);
            timelineContainer.appendChild(timelineItem);
        });

        // Add animation to timeline items
        setTimeout(() => {
            document.querySelectorAll('.timeline-item').forEach(item => {
                item.style.animation = 'fadeInUp 0.8s ease';
            });
        }, 100);
    }

    function createTimelineItem(item, index) {
        const timelineItem = document.createElement('div');
        const isEven = index % 2 === 0;
        timelineItem.className = `timeline-item ${isEven ? 'left' : 'right'}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-icon">
                    <i class="${item.icon}"></i>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        return timelineItem;
    }

    // Add scroll animation to timeline
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initialize timeline
    createTimeline();

    // Observe timeline items after they are created
    setTimeout(() => {
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.8s ease';
            timelineObserver.observe(item);
        });
    }, 200);

    // Add click functionality to timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
});