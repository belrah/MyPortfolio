// Project Search Functionality
(function() {
    'use strict';

    let allProjects = [];
    let searchInput;
    let searchResults;
    let projectContainer;

    // Initialize search functionality
    function initSearch() {
        searchInput = document.getElementById('projectSearch');
        searchResults = document.getElementById('searchResults');
        projectContainer = document.querySelector('#project .row.gy-4');

        if (!searchInput || !projectContainer) return;

        // Collect all project data
        collectProjectData();

        // Add search event listeners
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keyup', handleSearch);

        // Initial display
        updateSearchResults(allProjects.length, allProjects.length);
    }

    // Collect project data from DOM
    function collectProjectData() {
        const projectCards = document.querySelectorAll('.card-custom.project');
        
        projectCards.forEach((card, index) => {
            const titleElement = card.querySelector('.pro-header');
            const descriptionElement = card.querySelector('.cardbody');
            
            if (titleElement && descriptionElement) {
                allProjects.push({
                    index: index,
                    element: card.closest('.col-md-4'),
                    title: titleElement.textContent.trim(),
                    description: descriptionElement.textContent.trim(),
                    searchText: (titleElement.textContent + ' ' + descriptionElement.textContent).toLowerCase()
                });
            }
        });
    }

    // Handle search input
    function handleSearch(event) {
        const query = event.target.value.toLowerCase().trim();
        
        if (query === '') {
            // Show all projects
            showAllProjects();
            updateSearchResults(allProjects.length, allProjects.length);
        } else {
            // Filter projects
            const filteredProjects = allProjects.filter(project => 
                project.searchText.includes(query)
            );
            
            showFilteredProjects(filteredProjects);
            updateSearchResults(filteredProjects.length, allProjects.length);
        }
    }

    // Show all projects
    function showAllProjects() {
        // Remove any existing no-results message
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }

        allProjects.forEach(project => {
            project.element.style.display = 'block';
            project.element.classList.remove('search-hidden');
            project.element.style.animation = '';
        });
    }

    // Show filtered projects
    function showFilteredProjects(filteredProjects) {
        // Remove any existing no-results message
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }

        // Hide all projects first
        allProjects.forEach(project => {
            project.element.style.display = 'none';
            project.element.classList.add('search-hidden');
        });

        if (filteredProjects.length === 0) {
            // Show no results message
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'col-12 no-results';
            noResultsDiv.innerHTML = `
                <i class="fas fa-search"></i>
                <h4>No projects found</h4>
                <p>Try searching with different keywords like "AI", "Restaurant", "Gym", or "Fintech"</p>
            `;
            projectContainer.appendChild(noResultsDiv);
        } else {
            // Show matching projects with animation
            filteredProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.element.style.display = 'block';
                    project.element.classList.remove('search-hidden');
                    project.element.style.animation = 'fadeInUp 0.5s ease forwards';
                }, index * 100);
            });
        }
    }

    // Update search results text
    function updateSearchResults(showing, total) {
        if (searchResults) {
            if (showing === total) {
                searchResults.textContent = `Showing all ${total} projects`;
            } else {
                searchResults.textContent = `Showing ${showing} of ${total} projects`;
            }
        }
    }

    // Add CSS animations
    function addSearchStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .search-container {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
            }

            .search-container .form-control {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                transition: all 0.3s ease;
            }

            .search-container .form-control:focus {
                background: rgba(255, 255, 255, 0.15);
                border-color: var(--color-brand);
                box-shadow: 0 0 0 0.2rem rgba(184, 172, 241, 0.25);
                color: white;
            }

            .search-container .form-control::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }

            .search-hidden {
                opacity: 0;
                transform: scale(0.9);
                transition: all 0.3s ease;
            }

            #searchResults {
                font-size: 0.9rem;
                opacity: 0.8;
                transition: all 0.3s ease;
            }

            .fa-search {
                color: rgba(255, 255, 255, 0.5);
            }

            .no-results {
                text-align: center;
                padding: 3rem 1rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .no-results i {
                font-size: 3rem;
                margin-bottom: 1rem;
                opacity: 0.3;
            }

            .search-highlight {
                background: rgba(184, 172, 241, 0.3);
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                addSearchStyles();
                initSearch();
            });
        } else {
            addSearchStyles();
            initSearch();
        }
    }

    // Start initialization
    init();

})();