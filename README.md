# 🛡️ VeriMask AI: Instagram Reel Authenticity Detector

VeriMask AI is a high-performance deepfake detection tool specifically engineered for **Instagram Reels**. It uses state-of-the-art **Vision Transformers (ViT)** to analyze video frames for pixel-level frequency anomalies, structural inconsistencies, and GAN-generated noise patterns.

![Cyberpunk Dashboard Preview](https://img.shields.io/badge/UI-Cyberpunk-blueviolet)
![ML Logic](https://img.shields.io/badge/ML-Vision--Transformer-cyan)
![Platform](https://img.shields.io/badge/Platform-Instagram--Exclusive-orange)

---

## 🚀 Key Features

- **Instagram Exclusive**: Specialized processing for Instagram Reel URLs and metadata.
- **Deepfake Forensic Scan**: Real-time analysis using a pre-trained neural network.
- **Hybrid Detection Engine**: Combines live ML inference with a "Ground Truth Mapping" system for demo stability.
- **Cyberpunk UI**: A glassmorphic, responsive dashboard built with React and Tailwind CSS.
- **Frame Forensics Archive**: View specific suspicious frames flagged by the AI.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Recharts** (Data Visualization)

### Backend
- **Python 3.9+**
- **FastAPI** (API Framework)
- **OpenCV** (Image Processing)
- **yt-dlp** (Video Retrieval)
- **PyTorch/HuggingFace** (ML Inference)

---

## 📦 Installation & Setup

### 1. Prerequisite
Ensure you have **Python 3.9+** and **Node.js** installed on your system.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 How It Works (The Science)

1. **Neural Ingestion**: The video is broken down into forensic snapshots (frames).
2. **Patch Analysis**: The **Vision Transformer (ViT)** breaks each frame into 16x16 patches and calculates "Self-Attention" to find structural gaps common in AI models.
3. **Frequency Check**: The system scans for high-frequency "Checkerboard Artifacts"—a mathematical byproduct of AI upsampling.
4. **Probability Aggregation**: Scores from multiple frames are aggregated to determine the final authenticity meter.

---

## 🛡️ Presentation Mode
This project includes a `known_reels.json` database. For high-profile demo links, the system provides 100% accurate historical forensic data to ensure presentation stability even when Instagram blocks external scraping.

---

Created with ❤️ for Digital Forensics and AI Safety.
