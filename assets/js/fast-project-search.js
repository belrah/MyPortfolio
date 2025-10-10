// Fast Project Search - Lightweight Version
(function() {
    'use strict';

    let projects = [];
    let searchInput, searchResults, projectContainer;

    function init() {
        searchInput = document.getElementById('projectSearch');
        searchResults = document.getElementById('searchResults');
        projectContainer = document.querySelector('#project .row.gy-4');

        if (!searchInput || !projectContainer) return;

        // Collect project data efficiently
        const cards = projectContainer.querySelectorAll('.card-custom.project');
        cards.forEach((card, index) => {
            const title = card.querySelector('.pro-header')?.textContent || '';
            const desc = card.querySelector('.cardbody')?.textContent || '';
            projects.push({
                element: card.closest('.col-md-4'),
                searchText: (title + ' ' + desc).toLowerCase(),
                title: title
            });
        });

        // Add search listener with debouncing
        let timeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => handleSearch(e.target.value), 150);
        });

        updateResults(projects.length, projects.length);
    }

    function handleSearch(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            showAll();
            return;
        }

        const matches = projects.filter(p => p.searchText.includes(query));
        showFiltered(matches);
    }

    function showAll() {
        projects.forEach(p => {
            p.element.style.display = 'block';
            p.element.style.opacity = '1';
        });
        removeNoResults();
        updateResults(projects.length, projects.length);
    }

    function showFiltered(matches) {
        removeNoResults();
        
        projects.forEach(p => {
            p.element.style.display = 'none';
        });

        if (matches.length === 0) {
            showNoResults();
        } else {
            matches.forEach(p => {
                p.element.style.display = 'block';
                p.element.style.opacity = '1';
            });
        }
        
        updateResults(matches.length, projects.length);
    }

    function showNoResults() {
        const noResults = document.createElement('div');
        noResults.className = 'col-12 text-center py-5 no-results-msg';
        noResults.innerHTML = `
            <div class="text-muted">
                <i class="fas fa-search fa-3x mb-3 opacity-25"></i>
                <h4>No projects found</h4>
                <p>Try "AI", "Restaurant", "Gym", or "Fintech"</p>
            </div>
        `;
        projectContainer.appendChild(noResults);
    }

    function removeNoResults() {
        const existing = document.querySelector('.no-results-msg');
        if (existing) existing.remove();
    }

    function updateResults(showing, total) {
        if (searchResults) {
            searchResults.textContent = showing === total ? 
                `${total} projects` : `${showing} of ${total} projects`;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();