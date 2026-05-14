
        // Theme switcher
        (function() {
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('i');
            const themeText = document.getElementById('themeText');

            const getPreferredTheme = () => {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            };

            const applyTheme = (theme) => {
                if (theme === 'dark') {
                    document.body.classList.add('dark');
                    themeIcon.className = 'fas fa-sun';
                    themeText.innerText = 'Light Mode';
                } else {
                    document.body.classList.remove('dark');
                    themeIcon.className = 'fas fa-moon';
                    themeText.innerText = 'Dark Mode';
                }
                localStorage.setItem('theme', theme);
            };

            themeToggle.addEventListener('click', () => {
                const isDark = document.body.classList.contains('dark');
                applyTheme(isDark ? 'light' : 'dark');
            });

            applyTheme(getPreferredTheme());
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
            });
        })();

        // Animate progress bars on load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelectorAll('.progress-fill').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width && bar.style.width !== width + '%') {
                        bar.style.width = width + '%';
                    }
                });
            }, 200);
        });

        // SCROLL ANIMATION (Intersection Observer)
        const animatedElements = document.querySelectorAll('.left-panel, .right-panel, .summary-text, .exp-card, .skill-category, .core-strengths');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // فقط یکبار اجرا شود
                }
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }); // آستانه 20% نمایان شدن

        animatedElements.forEach(el => observer.observe(el));
