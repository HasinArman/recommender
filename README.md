# TrialMatch — Clinical Trial Recommender

Healthcare recommender system for **FWP-3 Data Analysis and Data Mining**. Users complete a health profile questionnaire; the system fetches trials from **ClinicalTrials.gov** and ranks them by eligibility match score.

**Stack:** Laravel 13 · Inertia.js · React · Tailwind CSS v4 · SQLite

## Flow

1. Register / log in  
2. Fill **health profile** (condition, age, sex, country, keywords)  
3. View **ranked clinical trials** with match % and reasons  
4. Open trial detail → link to ClinicalTrials.gov  

## Quick start (local)

```bash
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate:fresh --seed
npm install
npm run dev
```

```bash
php artisan serve --port=8002
```

Open **http://127.0.0.1:8002**

## GitHub Codespaces

1. Push repo to GitHub
2. **Code** → **Codespaces** → **Create codespace on main**
3. Wait for auto-setup (`.devcontainer` runs migrate + seed + build)
4. In terminal, start Laravel + Vite in **one command**:

```bash
bash .devcontainer/start.sh
```

Or, if setup already finished:

```bash
npm start
```

5. Open the forwarded **port 8000** URL in the browser

SQLite DB is created automatically with demo data.

**If you see `composer: command not found` or `npx: command not found`:** pull latest, then run:

```bash
git pull
bash .devcontainer/start.sh
```

That installs PHP, Composer, and Node automatically. If it still fails, press **Ctrl+Shift+P** → **Codespaces: Rebuild Container**, then run `bash .devcontainer/start.sh` again.

### Demo account

| Email | Password |
|-------|----------|
| demo@trialmatch.test | password |

(Demo user already has a health profile — goes straight to trial results.)

## Algorithm (content-based / profile matching)

| Signal | Weight |
|--------|--------|
| Condition in trial text | 35% |
| Age in eligibility range | 25% |
| Location (country/city) | 20% |
| Sex eligibility | 10% |
| User keywords | 5% each |
| Recruiting status | 5% |

## API

- [ClinicalTrials.gov API v2](https://clinicaltrials.gov/data-api/about)
- Falls back to demo trials if API is unreachable

## Paper mapping (Prof. Ge)

| Section | Content |
|---------|---------|
| Motivation | Help patients discover relevant clinical trials |
| Architecture | Laravel + Inertia React + API service |
| Algorithm | Profile-based content matching |
| Mock-up | This UI |
| Data | ClinicalTrials.gov API |

## Disclaimer

For academic research only — not medical advice.
