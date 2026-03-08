# 📸 Screenshot Pipeline

An automated CI/CD pipeline that takes a screenshot of a webpage on every push to `main` and commits it back to the repository — so your README always shows a live, up-to-date preview.

Built with **Puppeteer** + **GitHub Actions**.

---

## 🖼️ Live Preview

![Homepage Screenshot](https://raw.githubusercontent.com/sweet-orchard/screenshot-pipeline/main/screenshots/new_homepage.png)

> This image is automatically updated on every push to `main`.

---

## 🚀 How It Works

1. GitHub Actions starts an Ubuntu runner on every push to `main`
2. It installs Node.js dependencies and a headless Chrome browser
3. It starts a local web server (`http-server`) serving `index.html`
4. **Puppeteer** opens the page and takes a full-resolution screenshot
5. The screenshot is committed back to the repo automatically
6. The `README.md` always shows the latest screenshot via a raw GitHub URL

---

## 📁 Project Structure

```
screenshot-pipeline/
├── index.html                  # The webpage being screenshotted
├── styles.css                  # Page styles
├── script.js                   # Optional client-side JS for the page
├── scripts/
│   └── screenshot.js           # Puppeteer script that takes the screenshot
├── screenshots/
│   └── new_homepage.png        # Auto-updated screenshot (committed by CI)
├── package.json                # Node dependencies
└── .github/
    └── workflows/
        └── screenshot.yml      # GitHub Actions pipeline definition
```

---

## 🛠️ Getting It Running Yourself

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A GitHub repository with Actions enabled

### 1. Fork or Clone This Repo

```bash
git clone https://github.com/sweet-orchard/screenshot-pipeline.git
cd screenshot-pipeline
```

### 2. Install Dependencies

```bash
npm install
```

This installs:

- **`http-server`** — a simple local web server
- **`puppeteer`** — headless Chrome for taking screenshots

### 3. Run Locally

Start the web server in one terminal:

```bash
npm start
# → Serving files at http://127.0.0.1:3000
```

Take a screenshot in another terminal:

```bash
node scripts/screenshot.js
# → Saves screenshots/new_homepage.png
```

Open the screenshot to verify it:

```bash
open screenshots/new_homepage.png   # macOS
xdg-open screenshots/new_homepage.png  # Linux
```

---

## ⚙️ GitHub Actions Setup (One-Time)

For the pipeline to commit the screenshot back to the repo, you need to grant it write access:

1. Go to your repo on GitHub
2. Click **Settings** → **Actions** → **General**
3. Under **Workflow permissions**, select **"Read and write permissions"**
4. Click **Save**

That's it. Now every push to `main` will trigger the pipeline automatically.

---

## 🔄 Triggering the Pipeline

The pipeline runs automatically on:

- Every **push to `main`**
- Manually via **Actions → "Screenshot Pipeline" → "Run workflow"**

---

## 🧩 Customising It

### Change what page gets screenshotted

Edit `scripts/screenshot.js`:

```js
await page.goto("http://localhost:3000"); // change this URL
await page.screenshot({ path: "screenshots/new_homepage.png" }); // change output path
```

### Change the viewport / resolution

```js
await page.setViewport({ width: 1920, height: 1080 }); // change dimensions
```

### Take multiple screenshots

```js
await page.goto("http://localhost:3000");
await page.screenshot({ path: "screenshots/desktop.png" });

await page.setViewport({ width: 375, height: 812 });
await page.screenshot({ path: "screenshots/mobile.png" });
```

### Run on a schedule (e.g. every day at 9am UTC)

Add this to `.github/workflows/screenshot.yml` under `on:`:

```yaml
schedule:
  - cron: "0 9 * * *"
```

---

## 🐛 Troubleshooting

| Problem                                       | Fix                                                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ERR_CONNECTION_REFUSED` when running locally | Make sure `npm start` is running before `node scripts/screenshot.js`                                       |
| Screenshot is blank / white                   | Add `await new Promise(r => setTimeout(r, 1000))` after `page.goto()` to wait for the page to fully render |
| GitHub Actions fails on `git push`            | Enable **Read and write permissions** in Settings → Actions → General                                      |
| Chrome not found in CI                        | The `npx puppeteer browsers install chrome` step handles this — don't remove it from the workflow          |

---

## 📄 License

MIT — use it however you like.
