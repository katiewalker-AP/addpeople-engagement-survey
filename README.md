# Add People Employee Engagement Survey

A staff-facing anonymous engagement and eNPS survey that writes to Google Sheets, with a protected results dashboard for the People and Leadership teams.

---

## What this does

- **Survey** (`/`) — 13-question anonymous survey covering team, 10 engagement pillars, eNPS, and open feedback
- **Results dashboard** (`/results`) — protected with Google login, showing engagement scores, team breakdowns, eNPS, and feedback
- **Google Sheets** — all submissions are stored automatically; the dashboard reads live from the same sheet

---

## Setup guide (step by step)

### Step 1 — Set up the Google Apps Script

This script receives survey submissions and writes them to the Google Sheet.

1. Go to [script.google.com](https://script.google.com) and sign in with your Google account
2. Click **New project**
3. Delete any existing code in the editor
4. Open the file `apps-script.js` in this project and copy all of its contents
5. Paste it into the Apps Script editor
6. Click **Save** (Ctrl/Cmd + S) — name the project something like "AP Engagement Survey"
7. Click **Deploy** → **New deployment**
8. Under *Select type*, choose **Web app**
9. Fill in the settings:
   - Description: `AP Engagement Survey`
   - Execute as: **Me**
   - Who has access: **Anyone**
10. Click **Deploy**
11. Copy the **Web app URL** — it looks like `https://script.google.com/macros/s/ABC.../exec`
12. You'll need this URL in Step 3

> **Note:** If you change the Apps Script code later, you must click Deploy → **New deployment** again (not "Manage deployments") and use the new URL.

---

### Step 2 — Set up Google OAuth (for the results dashboard)

This lets authorised team members sign in with their Google account to view results.

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or select an existing one) — call it something like `AP Engagement Survey`
3. In the left menu, go to **APIs & Services** → **Library**
4. Search for **Google Sheets API** and click **Enable**
5. Go to **APIs & Services** → **OAuth consent screen**
   - User type: **Internal** (if your organisation uses Google Workspace) or **External**
   - Fill in the app name (`Add People Engagement Results`), user support email, and developer contact email
   - Click **Save and Continue** through the scopes screen (no extra scopes needed)
   - Click **Save and Continue**
6. Go to **APIs & Services** → **Credentials**
7. Click **Create Credentials** → **OAuth 2.0 Client ID**
8. Application type: **Web application**
9. Name: `AP Engagement Survey`
10. Under **Authorised redirect URIs**, add:
    - `http://localhost:3000/api/auth/callback/google` (for development)
    - `https://your-app.vercel.app/api/auth/callback/google` (for production — use your actual Vercel URL)
11. Click **Create**
12. Copy the **Client ID** and **Client Secret** — you'll need these in Step 3

---

### Step 3 — Create your API key (for reading the Google Sheet)

1. Still in Google Cloud Console → **Credentials**
2. Click **Create Credentials** → **API key**
3. Click **Edit API key** (the pencil icon)
4. Under **API restrictions**, select **Restrict key** and choose **Google Sheets API**
5. Under **Website restrictions**, you can optionally restrict to your Vercel domain
6. Click **Save** and copy the API key

---

### Step 4 — Set up environment variables

1. Copy `.env.local.example` to `.env.local`:
   ```
   cp .env.local.example .env.local
   ```
2. Open `.env.local` and fill in the values:

   ```
   NEXT_PUBLIC_FORM_ENDPOINT=   ← paste the Apps Script Web App URL from Step 1
   GOOGLE_SHEETS_API_KEY=       ← paste the API key from Step 3
   GOOGLE_SHEETS_ID=1-0gYSDljette59hXF0YTql0cf06CfMxI34eZh7TDkh4
   NEXTAUTH_SECRET=             ← generate one at https://generate-secret.vercel.app/32
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=            ← paste from Step 2
   GOOGLE_CLIENT_SECRET=        ← paste from Step 2
   ```

---

### Step 5 — Run locally to test

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to test the survey.
Open [http://localhost:3000/results](http://localhost:3000/results) to test the dashboard.

**To test the full flow:** submit a response through the survey, then check the Google Sheet and the results dashboard.

---

### Step 6 — Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. In the **Environment Variables** section, add all the variables from `.env.local` — but set `NEXTAUTH_URL` to your Vercel deployment URL (e.g. `https://ap-engagement-survey.vercel.app`)
5. Click **Deploy**

After deployment:
- Go back to Google Cloud Console → Credentials → your OAuth Client ID
- Add your Vercel URL to **Authorised redirect URIs**: `https://your-app.vercel.app/api/auth/callback/google`
- Save

---

## Google Sheet setup

The sheet ID is already set in the code: `1-0gYSDljette59hXF0YTql0cf06CfMxI34eZh7TDkh4`

Make sure:
- The sheet is accessible to the Google account that runs the Apps Script (it should be if you own it)
- The sheet is **shared** with "Anyone with the link can view" for the API key to read it — or share it specifically with your service account if you prefer

The Apps Script will automatically add a header row on the first submission.

---

## Who can access the results dashboard

Access is restricted to these email addresses (hardcoded in `lib/auth.ts`):

- kerry.matthewman@thrivemediagroup.co.uk
- katie.walker@addpeople.co.uk
- chloe.potts@addpeople.co.uk
- richard.poskitt@addpeople.co.uk

To add or remove someone, edit the `ALLOWED_EMAILS` array in `lib/auth.ts` and redeploy.

---

## Environment variables reference

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Apps Script Web App URL for survey submissions |
| `GOOGLE_SHEETS_API_KEY` | Google Cloud API key with Sheets API enabled |
| `GOOGLE_SHEETS_ID` | The Google Sheet ID |
| `NEXTAUTH_SECRET` | Random secret for NextAuth session encryption |
| `NEXTAUTH_URL` | Your app's base URL |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |

---

## Tech stack

- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **NextAuth.js v4** for Google OAuth
- **Google Sheets API v4** for reading results
- **Google Apps Script** for writing submissions
- **Vercel** for deployment (no server required)
