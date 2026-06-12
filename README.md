# TrialMatch — Clinical Trial Recommender

Healthcare recommender system for **FWP-3 Data Analysis and Data Mining**. Users complete a health profile questionnaire; the system fetches trials from **ClinicalTrials.gov** and ranks them by eligibility match score.

**Stack:** Laravel 13 · Inertia.js · React · Tailwind CSS v4 · SQLite

## Flow

1. Register / log in  
2. Fill **health profile** (condition, age, sex, country, keywords)  
3. View **ranked clinical trials** with match % and reasons  
4. Open trial detail → link to ClinicalTrials.gov  

## GitHub Codespaces

1. Open the repo on GitHub
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait until the terminal shows **TrialMatch is ready!**
4. Start the app:

```bash
bash .devcontainer/start.sh
```

5. Open the **port 8000** URL (Ports tab, or the browser tab that opens)

### Demo account

| Email | Password |
|-------|----------|
| demo@trialmatch.test | password |

### If the codespace fails to build

**Ctrl+Shift+P** → **Codespaces: Rebuild Container**, then run `bash .devcontainer/start.sh` again.

## Local development

```bash
cp .env.example .env
composer install
php artisan key:generate
touch database/database.sqlite
php artisan migrate:fresh --seed
npm install
npm run build
php artisan serve
```

For hot reload locally, run `npm run dev` in a second terminal.

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
