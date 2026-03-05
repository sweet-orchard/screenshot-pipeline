const puppeteer = require("puppeteer");

async function takeScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto("http://localhost:3000");
  await page.screenshot({ path: "screenshots/new_homepage.png" });

  console.log("Page Opened. Yey))))");
  await browser.close();
}

takeScreenshot();
