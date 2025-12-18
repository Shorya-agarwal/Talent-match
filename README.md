# SmartFinance: AI-Powered Financial Analytics Platform

![Status](https://img.shields.io/badge/Status-MVP_Complete-success)
![Stack](https://img.shields.io/badge/Tech-React_FastAPI_PostgreSQL_Docker-blue)
![AI](https://img.shields.io/badge/GenAI-Google_Gemini_2.0-orange)

## 🚀 Executive Summary
SmartFinance is a full-stack financial SaaS platform designed to mimic core functionalities of **QuickBooks** and **Mint**. It leverages **Generative AI (LLMs)** to automate transaction categorization, solving the "cold start" problem in personal finance tracking.

Unlike standard CRUD apps, SmartFinance features a **Fault-Tolerant Hybrid Architecture**: it uses Google's Gemini 2.0 Flash for intelligent data enrichment but automatically fails over to a deterministic Rule-Based Engine if API rate limits or latency issues occur.

## 🏗️ Technical Architecture
The system is built on a loosely coupled Monorepo architecture to ensure scalability and separation of concerns.

* **Frontend:** React.js + Vite (Client-side rendering for sub-100ms interactions).
* **Backend:** FastAPI (Python) - Chosen for high-concurrency async capabilities.
* **Database:** PostgreSQL (Containerized via Docker) - Relational data integrity for financial records.
* **AI Layer:** Google Gemini 2.0 Flash with a custom prompt engineering pipeline.
* **DevOps:** Docker Compose for orchestration.

## ✨ Key Features

### 1. Intelligent Transaction Categorization (GenAI)
Instead of forcing users to manually select categories, the system uses an LLM agent to analyze unstructured text (e.g., "Uber to SFO") and map it to standardized financial ledgers (e.g., "Transportation").
* *Tech:* Prompt Engineering, Context Awareness, JSON output parsing.

### 2. Resilient "Graceful Degradation" Pattern
Designed for high availability. The categorization engine implements a fallback strategy:
* **Primary:** Calls Google Gemini API for context-aware classification.
* **Secondary:** If the API fails (429/500 errors), a local keyword heuristic engine takes over instantly.
* *Result:* Zero downtime for the user, even during API outages.

### 3. Financial Data Visualization
Real-time dashboard rendering of expense aggregation and historical trends using React state management.

## 🛠️ Installation & Setup

### Prerequisites
* Node.js & npm
* Python 3.10+
* Docker Desktop

### 1. Database Setup
```bash
docker-compose up -d
# Starts PostgreSQL on port 5432
```
### 2. Backend Setup
``` bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
Note: Create a .env file in /backend with GEMINI_API_KEY=your_key

### 3.Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔮 Future Roadmap
* **OCR Receipt Scanning:** Integrating Tesseract for image-to-text transaction entry.
* **Anomaly Detection:** Using Isolation Forests (Scikit-Learn) to flag fraudulent transactions.
* **CI/CD:** GitHub Actions pipeline for automated testing.
