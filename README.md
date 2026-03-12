# ROIFirst — Results-First Digital Marketing

A pay-after-performance digital marketing agency, academy, and education marketing specialist.

## Project Structure

```
├── frontend/          # React + Vite frontend app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── App.tsx        # Root component with routing
│   │   ├── main.tsx       # App entry point
│   │   └── index.css      # Global styles & Tailwind config
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── routes/
│   │   │   └── contact.ts     # Contact form API
│   │   └── server.ts          # Express server entry
│   ├── data/                  # Form submissions (auto-created)
│   ├── tsconfig.json
│   └── package.json
│
├── package.json       # Root orchestrator (runs both with concurrently)
└── .gitignore
```

## Getting Started

### Install all dependencies
```bash
npm install                    # Root dependencies (concurrently)
npm run install:all            # Frontend + Backend dependencies
```

### Development
```bash
npm run dev                    # Start both frontend & backend
npm run dev:frontend           # Start frontend only (port 3000)
npm run dev:backend            # Start backend only (port 5000)
```

### Build
```bash
npm run build                  # Build frontend for production
```

## Tech Stack

**Frontend:** React 19, Vite, TypeScript, Tailwind CSS 4, Framer Motion, React Router  
**Backend:** Express.js, TypeScript, Node.js  

## Pages

- `/` — Agency home page (PPC services, reviews, process)
- `/course` — Academy page (digital marketing courses)
- `/education` — Education marketing for institutions
- `/thank-you` — Post-form submission page
- `/privacy-policy` — Privacy policy
- `/terms-of-service` — Terms of service

## API Endpoints

- `GET /api/health` — Server health check
- `POST /api/contact` — Submit contact form
- `GET /api/contacts` — List all submissions
