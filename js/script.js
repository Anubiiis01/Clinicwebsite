<script>
    const statsSection = document.getElementById('stats-section');
    const stats = document.querySelectorAll('.stat-number');
    let started = false; // Ensures animation only runs once

    const startCounting = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds for the animation
            const increment = target / (duration / 16); // 60fps approx

            const updateCount = () => {
                const current = +stat.innerText;
                if (current < target) {
                    stat.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 16);
                } else {
                    stat.innerText = target.toLocaleString(); // Adds commas (e.g., 10,000)
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to trigger when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                startCounting();
                started = true;
            }
        });
    }, { threshold: 0.5 }); // Starts when 50% of the section is visible

    observer.observe(statsSection);
</script>