---
layout: none
title: "Research and Briefs | CNEI"
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Research and Briefs | CNEI</title>
    <link rel="icon" type="image/jpeg" href="favicon.jpeg">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <header>
        <div class="nav-container">
            <a href="index.html" class="logo-container">
                <img src="logo.jpeg" alt="CNEI Logo">
            </a>
            <button class="menu-toggle" id="mobile-menu" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav id="nav-menu">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="research.html" class="active">Research & Briefs</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <div class="container">
        <h2>Research and Briefs</h2>
        <p style="color: var(--text-muted); margin-bottom: 2.5rem;">Explore our analytical papers, data breakdowns, and energy policy evaluations on grid security and advanced nuclear deployment.</p>

        {% assign sorted_reports = site.reports | sort: 'date' | reverse %}
        
        {% if sorted_reports.size > 0 %}
            <!-- Featured Most Recent Report -->
            {% assign featured = sorted_reports.first %}
            <div class="featured-report">
                <span class="report-tag">{{ featured.category | default: "Featured Brief" }}</span>
                <div class="report-date">{{ featured.date | date: "%B %d, %Y" }}</div>
                <h3 style="font-size: 1.75rem; color: var(--primary-blue); margin: 0.5rem 0 1rem 0;">{{ featured.title }}</h3>
                <p style="margin-bottom: 1.5rem;">{{ featured.description }}</p>
                <a href="{{ featured.url }}" class="btn btn-primary">Read Full Brief &rarr;</a>
            </div>

            <!-- Remaining Reports Grid -->
            {% if sorted_reports.size > 1 %}
                <h3 style="color: var(--primary-blue); margin-top: 3rem; margin-bottom: 1.5rem; font-size: 1.5rem;">All Publications</h3>
                <div class="reports-grid">
                    {% for report in sorted_reports offset: 1 %}
                        <div class="report-card">
                            <div>
                                <span class="report-tag">{{ report.category | default: "Research" }}</span>
                                <div class="report-date">{{ report.date | date: "%B %d, %Y" }}</div>
                                <h3>{{ report.title }}</h3>
                                <p style="font-size: 0.95rem; color: var(--text-muted);">{{ report.description }}</p>
                            </div>
                            <div style="margin-top: 1.5rem;">
                                <a href="{{ report.url }}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Read Brief</a>
                            </div>
                        </div>
                    {% endfor %}
                </div>
            {% endif %}
        {% else %}
            <div style="text-align: center; padding: 4rem 0;">
                <p style="color: var(--text-muted);">Our analytical papers and reports are currently being compiled and will be published here soon.</p>
            </div>
        {% endif %}
    </div>

    <footer>
        <div class="footer-content">
            <div class="logo-container">
                <img src="logo.jpeg" alt="CNEI Logo" style="height: 35px;">
            </div>
            <div class="footer-links">
                <a href="legal.html">Legal Centre</a>
            </div>
        </div>
        <div class="copyright">
            &copy; 2026 Coalition of Nuclear Energy Initiatives (CNEI). All rights reserved.
        </div>
    </footer>

    <script>
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    </script>
</body>
</html>
