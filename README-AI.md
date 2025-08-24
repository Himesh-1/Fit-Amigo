# Fit-Amigo — AI Actionable README

Purpose: a short, exact, and machine-actionable README an AI agent can parse and execute to convert this project to a MERN stack and run basic verification steps.

Checklist (explicit requirements)
- Create `backend/` and `frontend/` scaffolds.
- Implement backend REST API with auth (JWT) and Mongoose models.
- Implement frontend React app (Vite) with Tailwind and auth UI.
- Provide seed script, tests, CI guidance, and deployment notes.

Instructions format
- Each step is atomic: action, exact PowerShell command(s), expected output / verification.
- Environment variables are provided as templates.
- A JSON task array is supplied at the end for programmatic consumption.

-- Tasks (atomic) --

1) Create monorepo folders
- Action: create folders
- Command (PowerShell):
  mkdir backend,frontend
- Verify: both paths exist (Test-Path backend; Test-Path frontend) -> True

2) Initialize backend
- Action: npm init and install server deps
- Commands (PowerShell):
  cd backend
  npm init -y
  npm i express mongoose dotenv cors helmet bcrypt jsonwebtoken express-validator
  npm i -D nodemon jest supertest mongodb-memory-server eslint prettier
- Verify: `node -e "console.log('node ok')"` returns `node ok`; package.json exists.

3) Add backend health endpoint
- Action: create `src/server.js` with basic express app and `/api/health`
- Verify: start server (npm run dev) and GET http://localhost:5000/api/health returns 200 and body `{"status":"ok"}`

4) Implement auth
- Action: add signup/login routes, `User` model, bcrypt hashing, JWT
- Verify: POST /api/auth/signup -> 201 and token; POST /api/auth/login -> 200 and token; GET /api/users/me with header `Authorization: Bearer <token>` -> 200 and user JSON

5) Seed DB
- Action: create `src/seed/seed.js` and add `npm run seed` script
- Verify: script logs counts and database has created documents (count > 0)

6) Scaffold frontend
- Action: create Vite React app with TypeScript and Tailwind
- Commands (PowerShell):
  cd ../frontend
  npm create vite@latest . -- --template react-ts
  npm i axios react-router-dom
  npm i -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
- Verify: npm run dev opens and serves the Vite welcome page (status 200)

7) Frontend auth integration
- Action: implement Login/Signup pages that call backend endpoints
- Verify: signup + login through UI stores token (localStorage) and redirects to /dashboard

8) Seed and smoke test
- Action: run backend seed, start backend and frontend
- Commands (PowerShell):
  cd backend; npm run seed; npm run dev
  cd ..\frontend; npm run dev
- Verify: frontend shows data from backend; protected routes require auth

9) Lint & tests
- Action: add ESLint and Jest tests for backend; add CI workflow
- Verify: npm test passes; GitHub Actions runs CI on push

Environment templates
- backend/.env.example:
  PORT=5000
  MONGO_URI=<YOUR_MONGO_URI>
  JWT_SECRET=<STRONG_SECRET>
  JWT_EXPIRES_IN=7d

- frontend/.env.example:
  VITE_API_BASE_URL=http://localhost:5000/api

Programmatic task array (JSON)
[
  {"id":1,"dir":"./","cmd":"mkdir backend,frontend","verifyCmd":"Test-Path backend; Test-Path frontend"},
  {"id":2,"dir":"./backend","cmd":"npm init -y && npm i express mongoose dotenv cors helmet bcrypt jsonwebtoken express-validator && npm i -D nodemon jest supertest mongodb-memory-server eslint prettier","verifyCmd":"Test-Path package.json"},
  {"id":3,"dir":"./backend","cmd":"create src/server.js with /api/health","verifyCmd":"curl http://localhost:5000/api/health"},
  {"id":4,"dir":"./backend","cmd":"implement auth routes and models","verifyCmd":"POST /api/auth/signup then POST /api/auth/login then GET /api/users/me"},
  {"id":5,"dir":"./backend","cmd":"npm run seed","verifyCmd":"db.collection('recipes').count() > 0"},
  {"id":6,"dir":"./frontend","cmd":"npm create vite@latest . -- --template react-ts && npm i axios react-router-dom && npx tailwindcss init -p","verifyCmd":"npm run dev responds 200"}
]

Notes for an AI agent
- Execute tasks in order; stop on failure and report error and logs.
- Use the provided env templates; do not commit secrets.
- Prefer local mongodb or Atlas with provided `MONGO_URI`.
- For quick iterations, local dev ports: backend 5000, frontend 5173.

Last updated: 2025-08-24
