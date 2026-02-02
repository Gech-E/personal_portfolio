# Personal Portfolio - Python Full Stack & AI/ML Engineer

A modern, responsive personal portfolio website showcasing Python full stack development and AI/ML engineering projects.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Python
- **Database**: PostgreSQL
- **Skills Highlighted**: React, Next.js, Flask, FastAPI, ML, DL, CV, NLP

## Features

- 🎨 Modern, responsive design with smooth animations
- 📱 Mobile-first approach
- 🚀 Fast performance with Next.js
- 🔒 RESTful API with FastAPI
- 💾 PostgreSQL database for data persistence
- 📧 Contact form with backend integration
- 🎯 Skills showcase with progress bars
- 💼 Project portfolio with filtering

## Project Structure

```
personal_portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills section
│   ├── Projects.tsx       # Projects section
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
├── backend/                # FastAPI backend
│   ├── main.py            # FastAPI application
│   ├── database.py        # Database configuration
│   ├── models.py          # SQLAlchemy models
│   ├── requirements.txt   # Python dependencies
│   └── init_db.py         # Database initialization script
└── package.json           # Node.js dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.9+
- PostgreSQL 12+

### Installation

#### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal_portfolio
   ```

2. **Start PostgreSQL with Docker**
   ```bash
   docker-compose up -d
   ```

3. **Install frontend dependencies**
   ```bash
   npm install
   ```

4. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

5. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

6. **Configure environment variables**
   
   **Backend** (from `backend/` directory):
   ```bash
   cp .env.example .env
   # The default DATABASE_URL should work with Docker
   ```
   
   **Frontend** (from root directory):
   ```bash
   cp .env.example .env.local
   # Update NEXT_PUBLIC_API_URL if your backend runs on a different port
   ```

7. **Initialize the database**
   ```bash
   python init_db.py
   ```

#### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal_portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb portfolio_db
   ```

4. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

5. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

6. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

7. **Initialize the database**
   ```bash
   python init_db.py
   ```

### Running the Application

1. **Start PostgreSQL** (if using Docker)
   ```bash
   docker-compose up -d
   ```

2. **Start the backend server** (from `backend/` directory)
   ```bash
   # On Windows
   run.bat
   
   # On macOS/Linux
   chmod +x run.sh
   ./run.sh
   
   # Or manually
   python main.py
   # or
   uvicorn main:app --reload
   ```
   Backend will run on `http://localhost:8000`

3. **Start the frontend server** (from root directory)
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/{id}` - Get a specific project
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages
- `GET /api/skills` - Get all skills

## Customization

### Update Personal Information

1. **Hero Section**: Edit `components/Hero.tsx`
2. **About Section**: Edit `components/About.tsx`
3. **Skills**: Edit the `skills` array in `components/Skills.tsx` or use the API
4. **Projects**: Edit the `projects` array in `components/Projects.tsx` or use the API
5. **Contact Email**: Update email addresses in `components/Hero.tsx`, `components/Contact.tsx`, and `components/Footer.tsx`

### Styling

- Colors: Edit `tailwind.config.js` to customize the color scheme
- Global styles: Modify `app/globals.css`

## Deployment

### Frontend (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy to Vercel or Netlify
3. Update API URLs in production

### Backend (Railway/Heroku/Render)

1. Set environment variables (DATABASE_URL)
2. Deploy the FastAPI application
3. Run database migrations

### Database

- Use managed PostgreSQL services like:
  - AWS RDS
  - Railway
  - Supabase
  - Render

## License

MIT License - feel free to use this portfolio for your own projects!

## Contact

For questions or suggestions, please open an issue or contact via the portfolio contact form.
