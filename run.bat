@echo off
echo ==========================================
echo Starting Personal Portfolio Application...
echo ==========================================

REM Start the FastAPI backend in a new terminal window
echo Starting Backend (FastAPI)...
start "Portfolio Backend" cmd /k "cd backend && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) && uvicorn main:app --reload --host 0.0.0.0 --port 8000"

REM Start the Vite frontend in a new terminal window
echo Starting Frontend (Vite)...
start "Portfolio Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting up in separate windows!
echo - Frontend will be available at http://localhost:5173
echo - Backend will be available at http://localhost:8000
echo.
