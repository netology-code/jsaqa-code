let page;

describe("Github page tests", () => {
  
  beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
  });
  
  afterEach(() => {
  page.close();
  });
  
  test("The h1 header content'", async () => {
  const firstLink = await page.$("header div div a");
  await firstLink.click();
  await page.waitForSelector("h1");
  const title2 = await page.title();
  expect(title2).toEqual(
  "GitHub for teams · Build like the best teams on the planet · GitHub"
  );
  }, 4000);
  

  test("The first link attribute", async () => {
  const actual = await page.$eval("a", (link) => link.getAttribute("href"));
  expect(actual).toEqual("#start-of-content");
  }, 2000);
  

  test("The page contains Sign in button", async () => {
  const btnSelector = ".btn-large-mktg.btn-mktg";
  await page.waitForSelector(btnSelector, {
  visible: true,
  });
  const actual = await page.$eval(btnSelector, (link) =>
  link.textContent.trim()
  );
  expect(actual).toContain("Get started with Team");
  }, 2000);
  });
  
  describe("Additional Github tests", () => {
  
  beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com");
  });
  
  afterEach(() => {
  page.close();
  });
  
  test("Verify h1 header content on About page", async () => {
  const firstLink = await page.$('[href="https://github.com/about"]');
  await firstLink.click();
  await page.waitForSelector("h1");
  const title2 = (await page.title()).trim();
  expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 3000);
  

  test("Choose a trial plan", async () => {
  const startTrialButton = await page.waitForSelector(
  "a[data-test-selector='start-trial-button']"
  );
  await startTrialButton.click();
  const Selector = ".d-md-block.mb-3";
  await page.waitForSelector(Selector, {
  visible: true,
  });
  const actual = await page.$eval(Selector, (link) =>
  link.textContent.trim()
  );
  expect(actual).toContain("Pick your trial plan");
  }, 3000);
  

  test("Subscribe to our developer newsletter", async () => {
  const firstLink = await page.$(".btn-mktg.mb-4");
  firstLink.click();
  const title = await page.waitForSelector("#hero-section-brand-heading");
  const actual = await page.evaluate((el) => el.textContent, title);
  expect(actual).toContain("Subscribe to our developer newsletter");
  }, 3000);
  });