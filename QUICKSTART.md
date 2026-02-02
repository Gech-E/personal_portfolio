# Quick Start Guide

Get your portfolio up and running in minutes!

## Prerequisites Check

- ✅ Node.js 18+ installed (`node --version`)
- ✅ Python 3.9+ installed (`python --version`)
- ✅ Docker installed (optional, for easy PostgreSQL setup)

## Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cd ..
```

### 2. Start PostgreSQL

**Option A: Using Docker (Easiest)**
```bash
docker-compose up -d
```

**Option B: Local PostgreSQL**
```bash
# Create database
createdb portfolio_db
```

### 3. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
cd ..

# Frontend
cp .env.example .env.local
```

### 4. Initialize Database

```bash
cd backend
python init_db.py
cd ..
```

### 5. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Open Your Portfolio

- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

## Customization

1. **Update Personal Info**: Edit `components/Hero.tsx`, `components/About.tsx`
2. **Update Skills**: Edit `components/Skills.tsx` or use the API
3. **Update Projects**: Edit `components/Projects.tsx` or use the API
4. **Update Contact Email**: Search for "your.email@example.com" and replace

## Troubleshooting

**Port 8000 already in use?**
- Change port in `backend/main.py` or use: `uvicorn main:app --port 8001`

**Port 3000 already in use?**
- Next.js will automatically use the next available port

**Database connection error?**
- Check PostgreSQL is running: `docker ps` (if using Docker)
- Verify DATABASE_URL in `backend/.env`

**Module not found errors?**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

## Next Steps

- Deploy frontend to Vercel/Netlify
- Deploy backend to Railway/Heroku/Render
- Use managed PostgreSQL (AWS RDS, Supabase, etc.)
- Add your real projects and update content

Happy coding! 🚀
