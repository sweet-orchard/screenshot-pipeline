const puppeteer = require("puppeteer");

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // These flags are required on Linux CI environments like GitHub Actions
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto("http://localhost:3000");
  await page.screenshot({ path: "screenshots/new_homepage.png" });

  console.log("Page Opened. Yey))))");
  await browser.close();
}

takeScreenshot();
