// Calculateur de devis interactif
(function() {
    let currentStep = 1;
    const totalSteps = 6;
    let estimatedPrice = 0;
    let projectData = {};

    // Éléments DOM
    const steps = document.querySelectorAll('.quiz-step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentStepEl = document.getElementById('current-step');
    const progressPercent = document.getElementById('progress-percent');
    const restartBtn = document.getElementById('restart-quiz');
    const quoteForm = document.getElementById('quote-form');

    // Initialisation
    init();

    function init() {
        setupEventListeners();
        updateProgress();
        showStep(1);
    }

    function setupEventListeners() {
        // Navigation
        nextBtn.addEventListener('click', nextStep);
        prevBtn.addEventListener('click', prevStep);
        
        // Restart
        if (restartBtn) {
            restartBtn.addEventListener('click', restartQuiz);
        }

        // Form submission
        if (quoteForm) {
            quoteForm.addEventListener('submit', handleFormSubmit);
        }

        // Options selection - radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', () => {
                validateStep(currentStep);
            });
        });

        // Checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.addEventListener('change', () => {
                validateStep(currentStep);
            });
        });
    }

    function showStep(step) {
        steps.forEach((stepEl, index) => {
            stepEl.classList.remove('active');
            if (index + 1 === step) {
                stepEl.classList.add('active');
            }
        });

        currentStep = step;
        updateProgress();
        updateNavigationButtons();
        validateStep(step);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Si on arrive à la dernière étape, calculer et afficher l'estimation
        if (step === totalSteps) {
            calculateEstimate();
            displayResults();
        }
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            saveStepData(currentStep);
            showStep(currentStep + 1);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }

    function updateProgress() {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = progress + '%';
        currentStepEl.textContent = currentStep;
        progressPercent.textContent = Math.round(progress);
    }

    function updateNavigationButtons() {
        // Bouton précédent
        if (currentStep === 1) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        // Bouton suivant
        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    }

    function validateStep(step) {
        let isValid = false;

        switch(step) {
            case 1:
                isValid = document.querySelector('input[name="project_type"]:checked') !== null;
                break;
            case 2:
                isValid = document.querySelector('input[name="page_count"]:checked') !== null;
                break;
            case 3:
                isValid = document.querySelector('input[name="design_type"]:checked') !== null &&
                         document.querySelector('input[name="logo"]:checked') !== null &&
                         document.querySelector('input[name="content"]:checked') !== null;
                break;
            case 4:
                isValid = true; // Optionnel
                break;
            case 5:
                isValid = document.querySelector('input[name="deadline"]:checked') !== null;
                // Budget est optionnel
                break;
            case 6:
                isValid = true;
                break;
        }

        // Activer/désactiver le bouton suivant
        if (isValid) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            nextBtn.disabled = true;
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    function saveStepData(step) {
        switch(step) {
            case 1:
                const projectType = document.querySelector('input[name="project_type"]:checked');
                if (projectType) {
                    projectData.projectType = projectType.value;
                    projectData.projectTypeLabel = projectType.parentElement.querySelector('h3').textContent;
                }
                break;
            case 2:
                const pageCount = document.querySelector('input[name="page_count"]:checked');
                if (pageCount) {
                    projectData.pageCount = pageCount.value;
                }
                
                const features = [];
                document.querySelectorAll('input[name="features"]:checked').forEach(checkbox => {
                    features.push(checkbox.value);
                });
                projectData.features = features;
                break;
            case 3:
                const designType = document.querySelector('input[name="design_type"]:checked');
                if (designType) {
                    projectData.designType = designType.value;
                }
                
                const logo = document.querySelector('input[name="logo"]:checked');
                if (logo) {
                    projectData.logo = logo.value;
                }
                
                const content = document.querySelector('input[name="content"]:checked');
                if (content) {
                    projectData.content = content.value;
                }
                break;
            case 4:
                const services = [];
                document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
                    services.push(checkbox.value);
                });
                projectData.services = services;
                break;
            case 5:
                const deadline = document.querySelector('input[name="deadline"]:checked');
                if (deadline) {
                    projectData.deadline = deadline.value;
                }
                
                const budget = document.querySelector('input[name="budget"]:checked');
                if (budget) {
                    projectData.budget = budget.value;
                }
                break;
        }
    }

    function calculateEstimate() {
        let basePrice = 0;
        let additionalCosts = 0;
        let multiplier = 1;

        // Prix de base selon le type de projet
        const projectType = document.querySelector('input[name="project_type"]:checked');
        if (projectType) {
            basePrice = parseInt(projectType.getAttribute('data-price')) || 0;
        }

        // Nombre de pages
        const pageCount = document.querySelector('input[name="page_count"]:checked');
        if (pageCount) {
            additionalCosts += parseInt(pageCount.getAttribute('data-price')) || 0;
        }

        // Fonctionnalités
        document.querySelectorAll('input[name="features"]:checked').forEach(checkbox => {
            additionalCosts += parseInt(checkbox.getAttribute('data-price')) || 0;
        });

        // Design
        const designType = document.querySelector('input[name="design_type"]:checked');
        if (designType) {
            additionalCosts += parseInt(designType.getAttribute('data-price')) || 0;
        }

        // Logo
        const logo = document.querySelector('input[name="logo"]:checked');
        if (logo) {
            additionalCosts += parseInt(logo.getAttribute('data-price')) || 0;
        }

        // Contenu
        const content = document.querySelector('input[name="content"]:checked');
        if (content) {
            additionalCosts += parseInt(content.getAttribute('data-price')) || 0;
        }

        // Services
        document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
            additionalCosts += parseInt(checkbox.getAttribute('data-price')) || 0;
        });

        // Délais
        const deadline = document.querySelector('input[name="deadline"]:checked');
        if (deadline) {
            additionalCosts += parseInt(deadline.getAttribute('data-price')) || 0;
        }

        // Multiplicateur budget
        const budget = document.querySelector('input[name="budget"]:checked');
        if (budget && budget.hasAttribute('data-multiplier')) {
            multiplier = parseFloat(budget.getAttribute('data-multiplier')) || 1;
        }

        // Calcul final
        const totalPrice = (basePrice + additionalCosts) * multiplier;
        
        // Fourchette : -15% / +20%
        const minPrice = Math.round(totalPrice * 0.85 / 100) * 100; // Arrondi à 100€
        const maxPrice = Math.round(totalPrice * 1.20 / 100) * 100;

        projectData.estimatedMin = minPrice;
        projectData.estimatedMax = maxPrice;

        return { min: minPrice, max: maxPrice };
    }

    function displayResults() {
        const estimate = calculateEstimate();
        
        // Afficher les prix
        document.getElementById('estimated-price-min').textContent = estimate.min.toLocaleString('fr-FR');
        document.getElementById('estimated-price-max').textContent = estimate.max.toLocaleString('fr-FR');

        // Générer le récapitulatif
        const summary = generateSummary();
        document.getElementById('project-summary').innerHTML = summary;
    }

    function generateSummary() {
        let html = '';

        // Type de projet
        if (projectData.projectTypeLabel) {
            html += `<div><strong>Type :</strong> ${projectData.projectTypeLabel}</div>`;
        }

        // Pages
        const pageLabels = {
            'small': '5-10 pages',
            'medium': '10-20 pages',
            'large': '20+ pages'
        };
        if (projectData.pageCount) {
            html += `<div><strong>Envergure :</strong> ${pageLabels[projectData.pageCount]}</div>`;
        }

        // Fonctionnalités
        if (projectData.features && projectData.features.length > 0) {
            const featureLabels = {
                'contact_form': 'Formulaire contact',
                'blog': 'Blog',
                'booking': 'Réservation en ligne',
                'member_area': 'Espace membre',
                'multilingual': 'Multilingue',
                'gallery': 'Galerie photos'
            };
            const featuresText = projectData.features.map(f => featureLabels[f]).join(', ');
            html += `<div><strong>Fonctionnalités :</strong> ${featuresText}</div>`;
        }

        // Design
        const designLabels = {
            'template': 'Template adapté',
            'semi_custom': 'Semi-personnalisé',
            'full_custom': '100% sur-mesure'
        };
        if (projectData.designType) {
            html += `<div><strong>Design :</strong> ${designLabels[projectData.designType]}</div>`;
        }

        // Logo
        const logoLabels = {
            'exists': 'Logo existant',
            'modernize': 'Modernisation logo',
            'create': 'Création logo'
        };
        if (projectData.logo) {
            html += `<div><strong>Logo :</strong> ${logoLabels[projectData.logo]}</div>`;
        }

        // Contenu
        const contentLabels = {
            'provided': 'Contenus fournis',
            'collaboration': 'Collaboration rédaction',
            'full_writing': 'Rédaction complète SEO'
        };
        if (projectData.content) {
            html += `<div><strong>Contenus :</strong> ${contentLabels[projectData.content]}</div>`;
        }

        // Services
        if (projectData.services && projectData.services.length > 0) {
            const serviceLabels = {
                'seo': 'SEO avancé',
                'gmb': 'Google My Business',
                'social_media': 'Réseaux sociaux',
                'photos': 'Photos pro',
                'training': 'Formation',
                'maintenance': 'Maintenance'
            };
            const servicesText = projectData.services.map(s => serviceLabels[s]).join(', ');
            html += `<div><strong>Services :</strong> ${servicesText}</div>`;
        }

        // Délais
        const deadlineLabels = {
            'urgent': 'Urgent (2-4 semaines)',
            'normal': 'Normal (1-2 mois)',
            'flexible': 'Flexible (2-3 mois+)'
        };
        if (projectData.deadline) {
            html += `<div><strong>Délai :</strong> ${deadlineLabels[projectData.deadline]}</div>`;
        }

        return html;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Remplir les champs cachés avec les données du projet
        const hiddenMinField = document.getElementById('hidden-estimate-min');
        const hiddenMaxField = document.getElementById('hidden-estimate-max');
        const hiddenDetailsField = document.getElementById('hidden-project-details');
        
        if (hiddenMinField) hiddenMinField.value = projectData.estimatedMin || 0;
        if (hiddenMaxField) hiddenMaxField.value = projectData.estimatedMax || 0;
        if (hiddenDetailsField) {
            hiddenDetailsField.value = JSON.stringify(projectData, null, 2);
        }
        
        // Soumettre le formulaire à Netlify
        const form = document.getElementById('quote-form');
        if (form) {
            // Enlever le listener pour éviter la boucle
            form.removeEventListener('submit', handleFormSubmit);
            // Soumettre le formulaire
            form.submit();
        }
    }

    function restartQuiz() {
        currentStep = 1;
        projectData = {};
        estimatedPrice = 0;
        
        // Reset tous les inputs
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });
        document.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        
        // Reset le formulaire
        if (quoteForm) {
            quoteForm.reset();
        }
        
        // Retour à l'étape 1
        showStep(1);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
})();
