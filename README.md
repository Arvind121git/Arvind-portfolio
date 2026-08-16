# Arvind - Premium Next.js Full-Stack Developer Portfolio

A modern, high-aesthetic, responsive developer portfolio built with **Next.js App Router**, featuring sleek dark glassmorphic design, vibrant gradients, dynamic animations, comprehensive public pages, and a secure **Admin Dashboard** to manage all data dynamically.

---

## ✨ Features

- **High-Aesthetic Dark Theme UI**: Glassmorphic cards, glowing borders, smooth hover animations, curated typography & color palettes.
- **Dynamic Content & API Routes**: Full CRUD support for Projects, Skills, Experience, Education, Certificates, About info, and Contact Messages.
- **Out-of-the-Box Local Database**: Uses a local JSON/In-memory store automatically so you don't need to configure MongoDB to run locally. (Can be switched to MongoDB by setting `MONGODB_URI` in `.env.local`).
- **Admin Dashboard (`/admin/login`)**: Manage projects, skills, certificates, experience, education, resume, and view contact form submissions.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 🔐 Admin Panel Access

1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. **Default Credentials** (configured in `.env.local`):
   - **Email**: `admin@arvind.dev`
   - **Password**: `admin123`

---

## 📁 Project Architecture

- `app/` — Public Next.js App Router pages, Admin panel pages (`/admin/*`), and API endpoints (`/api/*`).
- `components/` — Modular UI components (Navbar, Footer, Hero, About, Skills, Projects, Experience, Education, Certificate, Contact, Admin, Card, Button, Loader).
- `lib/` — Database adapter (`db.js`), JWT (`jwt.js`), Auth helper (`auth.js`), Upload handler (`upload.js`).
- `services/` — Frontend client API services.
- `hooks/` & `context/` — Custom React hooks (`useAuth`, `useProjects`, `useSkills`) and `AuthContext`.
- `utils/` — Constants, helper functions, and input validation.
