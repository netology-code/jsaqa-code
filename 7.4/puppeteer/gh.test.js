let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1", {
      timeout: 60000,
    });
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    await page.waitForSelector("a", {
      timeout: 60000,
    });
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 60000,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

describe("Github title pages tests", () => {
  test("Page actions title", async () => {
    await page.goto("https://github.com/features/actions");
    const title = await page.title();
    expect(title).toEqual("Features • GitHub Actions · GitHub");
  });

  test("Page packages title", async () => {
    await page.goto("https://github.com/features/packages");
    const title = await page.title();
    expect(title).toEqual(
      "GitHub Packages: Your packages, at home with their code · GitHub"
    );
  });

  test("Page documentation title", async () => {
    await page.goto("https://docs.github.com/en");
    const title = await page.title();
    expect(title).toEqual("GitHub Docs");
  });
});
