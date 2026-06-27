// Formulaire de qualification projet — PeakCL
(function() {
    let currentStep = 1;
    const totalSteps = 5;
    let projectData = {};

    const steps = document.querySelectorAll('.quiz-step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentStepEl = document.getElementById('current-step');
    const progressPercent = document.getElementById('progress-percent');
    const restartBtn = document.getElementById('restart-quiz');
    const quoteForm = document.getElementById('quote-form');

    init();

    function init() {
        setupEventListeners();
        updateProgress();
        showStep(1);
    }

    function setupEventListeners() {
        if (nextBtn) nextBtn.addEventListener('click', nextStep);
        if (prevBtn) prevBtn.addEventListener('click', prevStep);
        if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
        if (quoteForm) quoteForm.addEventListener('submit', handleFormSubmit);

        document.querySelectorAll('input[type="radio"]').forEach(function(input) {
            input.addEventListener('change', function() { validateStep(currentStep); });
        });
        document.querySelectorAll('input[type="checkbox"]').forEach(function(input) {
            input.addEventListener('change', function() { validateStep(currentStep); });
        });
    }

    function showStep(step) {
        steps.forEach(function(stepEl, index) {
            stepEl.classList.remove('active');
            if (index + 1 === step) stepEl.classList.add('active');
        });
        currentStep = step;
        updateProgress();
        updateNavigationButtons();
        validateStep(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (step === totalSteps) {
            updateSummary();
        }
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            saveStepData(currentStep);
            showStep(currentStep + 1);
        }
    }

    function prevStep() {
        if (currentStep > 1) showStep(currentStep - 1);
    }

    function updateProgress() {
        var progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        if (progressBar) progressBar.style.width = progress + '%';
        if (currentStepEl) currentStepEl.textContent = currentStep;
        if (progressPercent) progressPercent.textContent = Math.round(progress);
    }

    function updateNavigationButtons() {
        if (!prevBtn || !nextBtn) return;
        if (currentStep === 1) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }
        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    }

    function validateStep(step) {
        var isValid = false;
        switch (step) {
            case 1:
                isValid = document.querySelector('input[name="situation"]:checked') !== null;
                break;
            case 2:
                isValid = document.querySelector('input[name="objective"]:checked') !== null;
                break;
            case 3:
                isValid = true; // Optionnel
                break;
            case 4:
                isValid = document.querySelector('input[name="budget"]:checked') !== null;
                break;
            case 5:
                isValid = true;
                break;
        }
        if (!nextBtn) return;
        if (isValid) {
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            nextBtn.disabled = true;
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    function saveStepData(step) {
        var el;
        switch (step) {
            case 1:
                el = document.querySelector('input[name="situation"]:checked');
                if (el) {
                    projectData.situation = el.value;
                    var pEl = el.closest('label') && el.closest('label').querySelector('p');
                    projectData.situationLabel = pEl ? pEl.textContent.trim() : el.value;
                }
                break;
            case 2:
                el = document.querySelector('input[name="objective"]:checked');
                if (el) {
                    projectData.objective = el.value;
                    var pEl2 = el.closest('label') && el.closest('label').querySelector('p');
                    projectData.objectiveLabel = pEl2 ? pEl2.textContent.trim() : el.value;
                }
                break;
            case 3:
                var needs = [];
                var needLabels = [];
                document.querySelectorAll('input[name="needs"]:checked').forEach(function(cb) {
                    needs.push(cb.value);
                    var spanEl = cb.closest('label') && cb.closest('label').querySelector('span');
                    needLabels.push(spanEl ? spanEl.textContent.trim() : cb.value);
                });
                projectData.needs = needs;
                projectData.needLabels = needLabels;
                break;
            case 4:
                var budgetEl = document.querySelector('input[name="budget"]:checked');
                if (budgetEl) {
                    projectData.budget = budgetEl.value;
                    var bSpan = budgetEl.closest('label') && budgetEl.closest('label').querySelector('span');
                    projectData.budgetLabel = bSpan ? bSpan.textContent.trim() : budgetEl.value;
                }
                var deadlineEl = document.querySelector('input[name="deadline"]:checked');
                if (deadlineEl) {
                    projectData.deadline = deadlineEl.value;
                    var dSpan = deadlineEl.closest('label') && deadlineEl.closest('label').querySelector('span');
                    projectData.deadlineLabel = dSpan ? dSpan.textContent.trim() : deadlineEl.value;
                }
                break;
        }
    }

    function updateSummary() {
        saveStepData(4);
        var summaryEl = document.getElementById('project-summary');
        if (!summaryEl) return;
        var html = '';
        if (projectData.situationLabel) {
            html += '<p>• <strong>Situation :</strong> ' + projectData.situationLabel + '</p>';
        }
        if (projectData.objectiveLabel) {
            html += '<p>• <strong>Objectif :</strong> ' + projectData.objectiveLabel + '</p>';
        }
        if (projectData.needLabels && projectData.needLabels.length > 0) {
            html += '<p>• <strong>Besoins :</strong> ' + projectData.needLabels.join(', ') + '</p>';
        }
        if (projectData.budgetLabel) {
            html += '<p>• <strong>Budget :</strong> ' + projectData.budgetLabel + '</p>';
        }
        if (projectData.deadlineLabel) {
            html += '<p>• <strong>Délai :</strong> ' + projectData.deadlineLabel + '</p>';
        }
        if (html) summaryEl.innerHTML = html;

        var hiddenDetails = document.getElementById('hidden-project-details');
        if (hiddenDetails) {
            hiddenDetails.value = JSON.stringify(projectData);
        }
    }

    function handleFormSubmit() {
        var hiddenDetails = document.getElementById('hidden-project-details');
        if (hiddenDetails) {
            hiddenDetails.value = JSON.stringify(projectData);
        }
    }

    function restartQuiz() {
        currentStep = 1;
        projectData = {};
        document.querySelectorAll('input[type="radio"]').forEach(function(input) {
            input.checked = false;
        });
        document.querySelectorAll('input[type="checkbox"]').forEach(function(input) {
            input.checked = false;
        });
        if (quoteForm) quoteForm.reset();
        showStep(1);
    }
})();
