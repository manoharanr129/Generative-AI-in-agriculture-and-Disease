# 🌱 Plant Disease Detection & Treatment Advisor

A comprehensive web application that uses computer vision (OpenCV) to detect plant diseases from images and provides personalized treatment recommendations based on fertilizer type preferences (organic or inorganic).

## ✨ Features

- **🔍 AI-Powered Disease Detection**: Upload plant images and get instant disease identification using OpenCV
- **📊 Severity Analysis**: Automatic assessment of disease severity (mild, moderate, severe)
- **🌿 Organic Treatment Recipes**: Detailed natural fertilizer recipes with preparation and application instructions
- **⚗️ Inorganic Dosage Calculator**: Precise chemical fertilizer calculations based on spray motor capacity
- **💎 Premium UI**: Modern glassmorphism design with smooth animations and responsive layout
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd C:\Users\manoh\.gemini\antigravity\scratch\plant-disease-app
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

4. **Open your browser** and visit:
   ```
   http://localhost:5000
   ```

## 📖 How to Use

### Step 1: Upload Plant Image
- Click the upload area or drag and drop an image of the affected plant part
- Supported formats: JPG, PNG, GIF, BMP

### Step 2: Analyze Disease
- Click the "Analyze Disease" button
- The system will process the image and identify the disease
- View detection results including disease name, severity, and confidence level

### Step 3: Choose Treatment Type

#### Option A: Organic Treatment
1. Select "Organic" treatment option
2. View the complete natural fertilizer recipe including:
   - Ingredients list
   - Preparation steps
   - Application instructions
   - Frequency and timing

#### Option B: Inorganic Treatment
1. Select "Inorganic" treatment option
2. Choose a chemical fertilizer from the dropdown
3. Enter your spray motor capacity (in liters)
4. Optionally specify water amount
5. Click "Calculate Dosage"
6. View detailed mixing instructions including:
   - Exact chemical amount needed
   - Water-to-chemical ratio
   - Step-by-step application guide
   - Safety precautions

## 🗂️ Project Structure

```
plant-disease-app/
├── app.py                      # Flask application server
├── disease_detector.py         # OpenCV-based disease detection
├── treatment_advisor.py        # Treatment recommendation engine
├── requirements.txt            # Python dependencies
├── data/
│   ├── diseases.json          # Disease database
│   ├── organic_recipes.json   # Organic fertilizer recipes
│   └── inorganic_chemicals.json # Chemical fertilizer data
├── static/
│   ├── css/
│   │   └── style.css          # Premium styling
│   └── js/
│       └── app.js             # Frontend logic
├── templates/
│   └── index.html             # Main UI template
└── uploads/                    # Uploaded images storage
```

## 🔬 Supported Diseases

The system can detect the following plant diseases:

1. **Leaf Blight** - Fungal disease with brown spots and lesions
2. **Powdery Mildew** - White powdery fungal growth
3. **Bacterial Spot** - Dark spots with yellow halos
4. **Rust Disease** - Orange-brown pustules
5. **Mosaic Virus** - Mottled leaf patterns
6. **Anthracnose** - Dark sunken lesions

## 🛠️ Technology Stack

- **Backend**: Flask (Python web framework)
- **Computer Vision**: OpenCV (image processing and analysis)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with glassmorphism effects
- **Data Storage**: JSON files

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect with backdrop blur
- **Agricultural Color Palette**: Green and earth tones for natural feel
- **Smooth Animations**: Fade-in effects and micro-interactions
- **Responsive Layout**: Adapts to all screen sizes
- **Dark Mode**: Eye-friendly dark theme by default

## 📊 API Endpoints

- `POST /api/upload` - Upload and analyze plant image
- `POST /api/treatment/organic` - Get organic treatment recipe
- `POST /api/treatment/inorganic/options` - Get available chemical options
- `POST /api/treatment/inorganic/calculate` - Calculate chemical dosage
- `GET /api/disease/<disease_id>` - Get disease information

## ⚠️ Important Notes

- **Image Quality**: For best results, upload clear, well-lit images of affected plant parts
- **Safety First**: Always follow safety precautions when handling chemical fertilizers
- **Consultation**: This tool provides recommendations but should not replace professional agricultural advice
- **Pre-harvest Intervals**: Always observe recommended waiting periods before harvesting

## 🔮 Future Enhancements

- Integration with machine learning models for improved accuracy
- Support for more plant diseases
- Multi-language support
- Mobile app version
- User accounts and treatment history
- Community forum for farmers

## 📝 License

This project is created for educational and agricultural assistance purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📧 Support

For questions or support, please open an issue in the project repository.

---

**Made with 💚 for sustainable agriculture**
