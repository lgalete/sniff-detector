import puppeteer, { CookieParam } from "puppeteer";

export async function getBrowser(cookies?: Array<CookieParam>) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  if (cookies && cookies.length) {
    for (const cookie of cookies) {
      await page.setCookie(cookie);
    }
  }

  page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  page.setViewport({ width: 1366, height: 768 });

  return {
    browser,
    page,
  };
}
