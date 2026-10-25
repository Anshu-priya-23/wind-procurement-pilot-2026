# UK Day-Ahead Wind Power Intelligence Platform
*Elexon BMRS Wind Generation Forecasts vs. Actuals Analysis (January 2026)*

An enterprise-grade full-stack data intelligence and procurement decision-support application built for UK energy utilities and power traders. The platform analyzes National Grid BMRS (Balancing Mechanism Reporting Service) telemetry streams—specifically comparing Day-Ahead wind power forecasts (`WINDFOR`) against true metered generation (`FUELHH`) for January 2026—to quantify forecasting error bounds and optimize day-ahead thermal reserve scheduling.

---
## 🚀 Live Demo
* **Frontend (Vercel):
* ** [https://wind-procurement-pilot-2026-drab.vercel.app](https://wind-procurement-pilot-2026-drab.vercel.app)
* **Backend API (Render):** [https://wind-procurement-pilot-2026.onrender.com/docs](https://wind-procurement-pilot-2026.onrender.com/docs)[cite: 3, 5]
* 
## 🚀 Key Features

* **Advanced Error Analytics**: Computes real-time statistical metrics including Mean Absolute Error (MAE), Root Mean Square Error (RMSE), Normalized MAE (%), and Mean Bias Error (MBE).
* **Interactive Trading Dashboard**: Built with React, Tailwind CSS, and Recharts to visualize high-resolution generation variance over time.
* **Robust FastAPI Backend**: High-performance Python backend serving structured JSON telemetry streams and analytics endpoints.
* **Containerized Architecture**: Fully orchestrated using Docker and Docker Compose for seamless local deployment and cloud scalability.

---

## 📊 System Architecture & Tech Stack

* **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide Icons
* **Backend**: Python 3.11+, FastAPI, Uvicorn, Pandas, NumPy
* **Containerization**: Docker, Docker Compose, Nginx (Alpine production server)
* **Data Domain**: UK Energy Market / Day-Ahead Procurement (Elexon BMRS API integration)

---

## 🛠️ Local Development Setup

### Prerequisites
* Python 3.11+ & pip
* Node.js & npm
* Docker Desktop (optional for containerized run)

### 1. Clone the Repository
```
git clone [https://github.com/your-username/wind-procurement-pilot-2026.git](https://github.com/your-username/wind-procurement-pilot-2026.git)
cd wind-procurement-pilot-2026
```
### 2. Run the Backend

Open your terminal and run the following commands:

```bash
cd backend
python -m pip install --upgrade pip setuptools wheel
pip install --only-binary :all: numpy pandas fastapi uvicorn requests
uvicorn app.main:app --reload --port 8000
```
* **Backend API will : http://localhost:8000
* **Interactive API Docs (Swagger): http://localhost:8000/docs3. 


### 3. Run the Frontend
Open a second terminal window:Bashcd frontend
```
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```
* **Frontend development server will be available at: http://localhost:5173🐳 


### Running with Docker
To spin up both the FastAPI backend and Nginx-served React frontend in isolated containers, run:
```
docker-compose up --build
Access the containerized application via http://localhost:3000 (frontend) and http://localhost:8000 (backend API).
```

## 📈 Procurement Decision Support & Metrics

| Metric | Value (Jan 2026 Pilot) | Procurement Impact |
| :--- | :--- | :--- |
| **Mean Absolute Error (MAE)** | 4,316.33 MW | Defines base capacity buffer required for unhedged imbalances. |
| **Root Mean Square Error (RMSE)** | 4,328.38 MW | Penalizes large divergence spikes during sudden weather fronts. |
| **Normalized MAE** | 36.48% | Relative error benchmark against peak national wind capacity. |
| **Mean Bias Error (MBE)** | +4,316.33 MW | Indicates systematic forecasting skew requiring downward correction models. |

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
