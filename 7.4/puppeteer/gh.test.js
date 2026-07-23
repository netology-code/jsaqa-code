let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 60000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Change is constant. GitHub keeps you ahead. · GitHub",
    );
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 60000);
});

test("The Solutions page title", async () => {
  await page.goto("https://github.com/solutions");
  const title = await page.title();
  expect(title).toEqual(
    "GitHub · Scalable AI-Powered Enterprise Platform Solutions · GitHub",
  );
}, 60000);

test("The Resources page title", async () => {
  await page.goto("https://github.com/resources");
  const title = await page.title();
  expect(title).toEqual(
    "Resources to help you build, secure, and scale with GitHub · GitHub",
  );
}, 60000);

test("The Open Source page title", async () => {
  await page.goto("https://github.com/open-source");
  const title = await page.title();
  expect(title).toEqual("Power open source, together · GitHub");
}, 60000);
