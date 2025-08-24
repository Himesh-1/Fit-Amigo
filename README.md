## Task receipt

I will add a complete, actionable MERN conversion masterplan and an AI-friendly implementation task list into this `README.md` so an automated agent can follow it end-to-end. Below is the plan, checklist, commands, verification steps, and acceptance criteria.

## Checklist (requirements)
- Convert the existing static site into a MERN (MongoDB, Express, React, Node) application.
- Deliver a premium-looking frontend with Tailwind CSS and a reusable component system.
- Implement a secure backend with auth (JWT + bcrypt), REST APIs, and Mongoose models.
- Provide seed scripts, tests, CI, and deployment guidance.
- Write the README in a format an AI agent can execute (atomic tasks, commands, verification criteria).

---

## High-level plan (phases)
1. Restructure repo into `backend/` and `frontend/` (monorepo-style).
2. Build backend: Express, Mongoose, auth, REST endpoints, tests, seed script.
3. Build frontend: React (Vite), Tailwind CSS, pages (Home, Login, Signup, Dashboard, Recipes), API integration.
4. Design & polish: Tailwind theme tokens, Google Fonts, dark mode, component library.
5. Quality: ESLint/Prettier, unit + integration tests, CI with GitHub Actions.
6. Deploy: Dockerfiles, GitHub Actions, host frontend (Vercel/Netlify) and backend (Render/Heroku/GCP), MongoDB Atlas.

## Recommended repo structure
```
/backend
  package.json
  src/
    server.js
    config/db.js
    models/{User,Recipe,Workout}.js
    routes/{auth,users,recipes,workouts}.js
    controllers/
    middleware/{auth,errorHandler}.js
    seed/seed.js
  .env.example
  Dockerfile

/frontend
  package.json
  src/
    main.tsx
    App.tsx
    pages/{Home,Dashboard,Login,Signup,Recipes}.tsx
    components/{NavBar,Card,Modal,ThemeToggle}.tsx
    services/api.ts
    styles/tailwind.css
  tailwind.config.js
  vite.config.ts
  Dockerfile

README.md (root)
.github/workflows/ci.yml
```

## API contract (minimal)
- Auth
  - POST /api/auth/signup { name, email, password } -> { token, user }
  - POST /api/auth/login { email, password } -> { token, user }
- Users
  - GET /api/users/me (auth)
  - PUT /api/users/:id (auth)
- Recipes
  - GET /api/recipes?query&page&limit
  - GET /api/recipes/:id
  - POST /api/recipes (admin)
  - PUT /api/recipes/:id (admin)
  - DELETE /api/recipes/:id (admin)
- Workouts
  - GET /api/workouts
  - GET /api/workouts/:id
  - POST /api/workouts (admin)

Auth: Authorization: Bearer <token>

## Core data models (summary)
- User: { name, email, passwordHash, role, avatarUrl, preferences, stats, createdAt }
- Recipe: { title, description, ingredients[], steps[], tags[], dietFlags[], calories, cookTime, images[], createdBy }
- Workout: { title, level, duration, steps[], targetMuscles[], equipment[], createdBy }

Detailed Mongoose schemas should be created in `backend/src/models/` during implementation.

## Styling & UX guidelines
- Use Tailwind CSS with custom theme tokens (colors, spacing, shadows).
- Fonts: Inter (UI) + Playfair Display (headings) or similar.
- Spacing: 8px scale, consistent card system.
- Movement: subtle transitions, hover states, focus-visible outlines for accessibility.
- Images: use the existing `/images` and `/food` assets with lazy-loading and placeholders.

## Security & best practices
- Passwords hashed with bcrypt; never store plain passwords.
- Input validation with express-validator or Joi.
- Helmet, CORS, rate-limiting on auth endpoints.
- Secrets in `.env`; provide `.env.example`.
- Use HTTPS in production; sign JWTs with a secure secret.

## Testing strategy
- Backend: Jest + Supertest + mongodb-memory-server for fast isolated tests.
- Frontend: React Testing Library + Jest; Cypress for critical E2E flows.
- Linting: ESLint + Prettier; enforce in CI.

## CI/CD and deployment
- GitHub Actions: workflows to lint/test/build for both `backend` and `frontend`.
- Backend deploy options: Render, Heroku, Cloud Run, or Docker on any host.
- Frontend: Vercel or Netlify (Vite build output).
- Mongo: MongoDB Atlas cluster; use connection string in `MONGO_URI` environment variable.

## Seed & migration
- Create `backend/src/seed/seed.js` to import sample recipes, workouts, and an admin user.
- Use existing static HTML files as a reference for content; prefer manual curation for high-quality entries.

## Acceptance criteria (smoke tests)
- Backend responds on `/api/health` with 200.
- Signup + Login returns JWT and allows access to `/api/users/me`.
- Frontend runs with `npm run dev` and can call backend APIs (CORS configured).
- CRUD for recipes through API works and is verifiable with simple curl or Postman.

---

## AI-friendly, step-by-step implementation tasks (atomic tasks an agent can execute)
Follow these exactly and verify each acceptance item before moving on.

1) Create repo layout

- Task: create directories `backend/` and `frontend/` and move existing static assets into `frontend/public`.
- Command (PowerShell):
```powershell
mkdir backend,frontend
mkdir frontend\public
```
- Verify: `Test-Path backend` and `Test-Path frontend` return True.

2) Scaffold backend

- Task: initialize npm, install dependencies, create basic server and health endpoint.
- Commands:
```powershell
cd backend
npm init -y
npm i express mongoose bcrypt jsonwebtoken dotenv cors helmet express-validator
npm i -D nodemon jest supertest mongodb-memory-server eslint prettier
```
- Files to create: `src/server.js` with an `/api/health` endpoint, `src/config/db.js` to connect to Mongo.
- Verify: `npm run dev` (script added) starts and `curl http://localhost:5000/api/health` returns status 200.

3) Implement auth (backend)

- Task: add signup/login routes, bcrypt password hashing, JWT issuance, auth middleware.
- Files: `src/routes/auth.js`, `src/controllers/authController.js`, `src/middleware/auth.js`, `src/models/User.js`.
- Verify: signup -> login returns token; token used to access `/api/users/me`.

4) Models & seed

- Task: Add `Recipe` and `Workout` Mongoose models; implement `src/seed/seed.js` and `npm run seed`.
- Verify: seed script logs inserted counts and DB contains expected documents.

5) Tests (backend)

- Task: write Jest+Supertest tests for auth and recipes; run `npm test`.
- Verify: tests pass locally and in CI.

6) Scaffold frontend (React + Tailwind)

- Task: create Vite React app with TypeScript, configure Tailwind, and set `VITE_API_BASE_URL` env var.
- Commands (PowerShell):
```powershell
cd ../frontend
npm create vite@latest . -- --template react-ts
npm i axios react-router-dom
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Create `src/services/api.ts` with axios baseURL pointing to `import.meta.env.VITE_API_BASE_URL`.
- Verify: `npm run dev` opens frontend and shows the welcome page.

7) Auth UI integration (frontend)

- Task: create `pages/Login.tsx` and `pages/Signup.tsx` hooking to backend API; store token securely (start with localStorage for speed).
- Verify: login redirects to protected `/dashboard` and token appears in storage.

8) Build core pages

- Task: implement `Recipes` list + detail pages calling backend endpoints; create `Dashboard` that reads `/api/dashboard`.
- Verify: pages load, list data from backend, and pages are responsive.

9) Styling and theme

- Task: add theme tokens in `tailwind.config.js`, Google Fonts, and `ThemeToggle` component storing preference in user profile.
- Verify: toggling theme updates UI and persists on reload.

10) Linting, tests, CI

- Task: add ESLint/Prettier configuration, GitHub Actions workflow `.github/workflows/ci.yml` to run tests and builds.
- Verify: push triggers Actions and CI passes.

11) Docker & deployment

- Task: add `Dockerfile` for backend and frontend and example `docker-compose.yml` for local dev (optional). Document deploy steps.
- Verify: `docker build` for backend completes and container runs serving API on port 5000.

12) Docs & OpenAPI

- Task: add `backend/docs/openapi.yaml` describing main endpoints and update root README with final usage.
- Verify: OpenAPI file exists and matches implemented endpoints.

---

## Example environment variable templates
- `backend/.env.example`:
```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d
```
- `frontend/.env.example`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Quick verification commands (PowerShell)
```powershell
# Run backend dev server
cd backend; npm install; npm run dev
# Run frontend dev server
cd ..\frontend; npm install; npm run dev
# Seed DB (from backend)
cd ..\backend; npm run seed
# Run backend tests
cd ..\backend; npm test
```

## Prioritization & rough estimates
- Phase 1 (scaffold + basic auth + frontend auth pages): 2–4 days
- Phase 2 (models, CRUD, seed + tests): 3–5 days
- Phase 3 (polish UI, dashboards, design system): 2–4 days
- Phase 4 (CI/CD, Docker, deploy): 1–2 days

## Next actions I can take for you
- Implement backend scaffold and auth now (create files & run tests).
- Or scaffold the frontend with Vite + Tailwind and create login/signup pages.
- Or create an AI-targeted file `README-AI.md` with the atomic tasks exported as JSON for automation.

Pick one (backend, frontend, or generate AI task file) and I'll start creating the files, running installs, and verifying locally.

---

Requirements coverage: All requested items are included in this document as tasks and verification steps (Done).

Contact & authoring note: This README is written to be both human-readable and machine-actionable; each step is atomic and verifiable.
