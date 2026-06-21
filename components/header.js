document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.querySelector('nav[data-component="header"]');
    if (headerPlaceholder) {
        // Appending a cache-buster to ensure the browser doesn't load a stale header.html
        fetch('/components/header.html?v=' + new Date().getTime())
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                highlightActiveLink();
                initTheme();
                initSupportButton(); 
            })
            .catch(error => console.error('Error loading header:', error));
    } else {
        initTheme();
    }
});

function initSupportButton() {
    const supportBtn = document.getElementById('support-button');
    const supportBtnMobile = document.getElementById('support-button-mobile');
    
    const goToDonate = () => { window.location.href = 'donate.html'; };

    if (supportBtn) supportBtn.addEventListener('click', goToDonate);
    if (supportBtnMobile) supportBtnMobile.addEventListener('click', goToDonate);
}



function initTheme() {
    const themeToggleDarkIcons = document.querySelectorAll('#theme-toggle-dark-icon, #theme-toggle-dark-icon-mobile');
    const themeToggleLightIcons = document.querySelectorAll('#theme-toggle-light-icon, #theme-toggle-light-icon-mobile');
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');

    if (localStorage.getItem('color-theme') === 'light' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        themeToggleLightIcons.forEach(icon => icon.classList.remove('hidden'));
        document.documentElement.classList.add('light-mode');
    } else {
        themeToggleDarkIcons.forEach(icon => icon.classList.remove('hidden'));
        document.documentElement.classList.remove('light-mode');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            themeToggleDarkIcons.forEach(icon => icon.classList.toggle('hidden'));
            themeToggleLightIcons.forEach(icon => icon.classList.toggle('hidden'));

            let newTheme = 'dark';
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.remove('light-mode');
                    newTheme = 'dark';
                } else {
                    document.documentElement.classList.add('light-mode');
                    newTheme = 'light';
                }
            } else {
                if (document.documentElement.classList.contains('light-mode')) {
                    document.documentElement.classList.remove('light-mode');
                    newTheme = 'dark';
                } else {
                    document.documentElement.classList.add('light-mode');
                    newTheme = 'light';
                }
            }
            localStorage.setItem('color-theme', newTheme);
            
            // Dispatch custom event for other scripts (like charts) to react
            document.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }));
        });
    });
}

function highlightActiveLink() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Normalize current path (e.g. "/percentile.html" OR "/percentile" -> "percentile")
    let currentName = path.split('/').pop().replace('.html', '');
    if (!currentName || currentName === '') currentName = 'index';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Normalize href (e.g. "index.html" -> "index")
        let linkName = href.split('/').pop().replace('.html', '');
        if (!linkName || linkName === '') linkName = 'index';
        
        if (currentName === linkName) {
            setActive(link);
        }
    });
}

function setActive(el) {
    // Make text prominent
    el.classList.add('text-[var(--text-primary)]');
    el.classList.remove('text-[var(--text-secondary)]', 'hover:text-[var(--text-primary)]');
    
    // Desktop indicator: Clean minimalist bottom border
    el.classList.remove('lg:border-none');
    el.classList.add('lg:border-0', 'lg:border-b-2', 'lg:border-solid', 'lg:border-[#00d084]', 'lg:rounded-none', 'lg:pb-1');
    
    // Mobile indicator: Subtle background lift instead of a heavy box
    el.classList.remove('border-[var(--border-color)]');
    el.classList.add('border-transparent', 'bg-[#00d084]/10');
}







