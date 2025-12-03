// Global state
let detectionResult = null;
let selectedTreatmentType = null;

// DOM Elements
const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const analyzeBtn = document.getElementById('analyzeBtn');
const loading = document.getElementById('loading');
const resultsSection = document.getElementById('resultsSection');
const treatmentForm = document.getElementById('treatmentForm');
const organicForm = document.getElementById('organicForm');
const inorganicForm = document.getElementById('inorganicForm');
const treatmentResults = document.getElementById('treatmentResults');

// Upload area click handler
uploadArea.addEventListener('click', () => {
    imageInput.click();
});

// Drag and drop handlers
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
});

// File input change handler
imageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

// Handle file selection
function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) {
        showAlert('Please select an image file', 'error');
        return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        imagePreview.classList.add('active');
        analyzeBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

// Analyze image
analyzeBtn.addEventListener('click', async () => {
    const file = imageInput.files[0];
    if (!file) {
        showAlert('Please select an image first', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    loading.classList.add('active');
    analyzeBtn.disabled = true;
    resultsSection.classList.remove('active');

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            detectionResult = data.detection;
            displayResults(data.detection);
        } else {
            showAlert(data.error || 'Failed to analyze image', 'error');
        }
    } catch (error) {
        showAlert('Error connecting to server: ' + error.message, 'error');
    } finally {
        loading.classList.remove('active');
        analyzeBtn.disabled = false;
    }
});

// Display detection results
function displayResults(detection) {
    document.getElementById('diseaseName').textContent = detection.disease_name;
    document.getElementById('diseaseDescription').textContent = detection.description;

    const severityBadge = document.getElementById('severityBadge');
    severityBadge.textContent = detection.severity.toUpperCase();
    severityBadge.className = `severity-badge severity-${detection.severity}`;

    document.getElementById('confidenceValue').textContent = `${detection.confidence}%`;

    resultsSection.classList.add('active');
    treatmentForm.classList.remove('active');
    treatmentResults.classList.remove('active');
}

// Treatment type selection
function selectTreatment(type) {
    selectedTreatmentType = type;

    // Update UI
    document.querySelectorAll('.treatment-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.getElementById(`${type}Option`).classList.add('selected');

    // Show appropriate form
    treatmentForm.classList.add('active');
    organicForm.classList.remove('active');
    inorganicForm.classList.remove('active');
    treatmentResults.classList.remove('active');

    if (type === 'organic') {
        getOrganicTreatment();
    } else {
        inorganicForm.classList.add('active');
        loadChemicalOptions();
    }
}

// Get organic treatment
async function getOrganicTreatment() {
    if (!detectionResult) return;

    loading.classList.add('active');

    try {
        const response = await fetch('/api/treatment/organic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                disease_id: detectionResult.disease_id
            })
        });

        const data = await response.json();

        if (data.error) {
            showAlert(data.error, 'error');
        } else {
            displayOrganicRecipe(data.recipe);
        }
    } catch (error) {
        showAlert('Error fetching treatment: ' + error.message, 'error');
    } finally {
        loading.classList.remove('active');
    }
}

// Display organic recipe
function displayOrganicRecipe(recipe) {
    organicForm.classList.add('active');

    let html = `
        <div class="recipe-section">
            <h3>📋 ${recipe.name}</h3>
        </div>
        
        <div class="recipe-section">
            <h3>🌿 Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
        
        <div class="recipe-section">
            <h3>🔬 Preparation Steps</h3>
            <ol>
                ${recipe.preparation.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <div class="recipe-section">
            <h3>💧 Application Instructions</h3>
            <ul>
                <li><strong>Method:</strong> ${recipe.application.method}</li>
                <li><strong>Frequency:</strong> ${recipe.application.frequency}</li>
                <li><strong>Timing:</strong> ${recipe.application.timing}</li>
                <li><strong>Duration:</strong> ${recipe.application.duration}</li>
            </ul>
        </div>
    `;

    document.getElementById('organicRecipe').innerHTML = html;
    treatmentResults.classList.add('active');
}

// Load chemical options
async function loadChemicalOptions() {
    if (!detectionResult) return;

    try {
        const response = await fetch('/api/treatment/inorganic/options', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                disease_id: detectionResult.disease_id
            })
        });

        const data = await response.json();

        if (data.available_chemicals) {
            const select = document.getElementById('chemicalSelect');
            select.innerHTML = '<option value="">Select a chemical...</option>';

            data.available_chemicals.forEach(chemical => {
                const option = document.createElement('option');
                option.value = chemical.name;
                option.textContent = `${chemical.name} (${chemical.concentration})`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        showAlert('Error loading chemicals: ' + error.message, 'error');
    }
}

// Calculate inorganic dosage
document.getElementById('calculateBtn').addEventListener('click', async () => {
    const chemicalName = document.getElementById('chemicalSelect').value;
    const motorCapacity = document.getElementById('motorCapacity').value;
    const waterAmount = document.getElementById('waterAmount').value;

    if (!chemicalName || !motorCapacity) {
        showAlert('Please fill in all required fields', 'error');
        return;
    }

    loading.classList.add('active');

    try {
        const response = await fetch('/api/treatment/inorganic/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                disease_id: detectionResult.disease_id,
                chemical_name: chemicalName,
                motor_capacity: parseFloat(motorCapacity),
                water_amount: waterAmount ? parseFloat(waterAmount) : null
            })
        });

        const data = await response.json();

        if (data.error) {
            showAlert(data.error, 'error');
        } else {
            displayInorganicDosage(data);
        }
    } catch (error) {
        showAlert('Error calculating dosage: ' + error.message, 'error');
    } finally {
        loading.classList.remove('active');
    }
});

// Display inorganic dosage
function displayInorganicDosage(data) {
    const mixing = data.mixing_instructions;
    const chemical = data.chemical_details;

    let html = `
        <div class="dosage-info">
            <h3>⚗️ Chemical Details</h3>
            <div class="dosage-row">
                <span class="dosage-label">Chemical Name:</span>
                <span class="dosage-value">${chemical.name}</span>
            </div>
            <div class="dosage-row">
                <span class="dosage-label">Active Ingredient:</span>
                <span class="dosage-value">${chemical.active_ingredient}</span>
            </div>
            <div class="dosage-row">
                <span class="dosage-label">Concentration:</span>
                <span class="dosage-value">${chemical.concentration}</span>
            </div>
        </div>
        
        <div class="dosage-info" style="margin-top: 1rem;">
            <h3>📊 Mixing Instructions</h3>
            <div class="dosage-row">
                <span class="dosage-label">Water Amount:</span>
                <span class="dosage-value">${mixing.water_amount} ${mixing.water_unit}</span>
            </div>
            <div class="dosage-row">
                <span class="dosage-label">Chemical Amount:</span>
                <span class="dosage-value">${mixing.chemical_amount} ${mixing.chemical_unit}</span>
            </div>
            <div class="dosage-row">
                <span class="dosage-label">Mixing Ratio:</span>
                <span class="dosage-value">${mixing.mixing_ratio}</span>
            </div>
            <div class="dosage-row">
                <span class="dosage-label">Motor Capacity:</span>
                <span class="dosage-value">${data.motor_capacity} liters</span>
            </div>
            <div class="dosage-row">
                <span class="dosage-label">Remaining Capacity:</span>
                <span class="dosage-value">${mixing.remaining_capacity} liters</span>
            </div>
        </div>
        
        <div class="recipe-section" style="margin-top: 1rem;">
            <h3>📝 Application Steps</h3>
            <ol>
                ${data.application_steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <div class="recipe-section" style="margin-top: 1rem;">
            <h3>⚠️ Safety Precautions</h3>
            <ul>
                ${data.safety_precautions.map(precaution => `<li>${precaution}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('inorganicDosage').innerHTML = html;
    treatmentResults.classList.add('active');
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Reset application
function resetApp() {
    detectionResult = null;
    selectedTreatmentType = null;
    imageInput.value = '';
    imagePreview.classList.remove('active');
    resultsSection.classList.remove('active');
    treatmentForm.classList.remove('active');
    treatmentResults.classList.remove('active');
    analyzeBtn.disabled = true;
}
