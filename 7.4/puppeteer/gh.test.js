let page;
beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});
describe("Github/team page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(1500);
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub"); // изменилась главная страница, переделан ожидаемый текст
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    //селектор изменён
    const btnSelector =
      "div.position-relative.position-md-absolute.top-md-0.right-md-0.bottom-md-0.left-md-0.z-1 > div > div > div > div > a";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  });
});
describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com");
  });
  test("Github headers Sing Up check", async () => {
    const singUpLink = await page.$(
      "div.HeaderMenu--logged-out > div > div > a"
    );
    await singUpLink.click();
    await page.waitForTimeout(1000);
    const title2 = await page.title();
    expect(title2).toEqual("Join GitHub · GitHub");
  });
  test("GitHub headers Pricing check", async () => {
    const pricingLink = await page.$(
      "div.HeaderMenu--logged-out > div > nav > ul > li:nth-child(4) > a"
    );
    await pricingLink.click();
    await page.waitForTimeout(1000);
    const title2 = await page.title();
    expect(title2).toEqual("Pricing · Plans for every developer · GitHub");
  });
  test("GitHub headers Sing In check", async () => {
    const singInLink = await page.$(
      "div.HeaderMenu--logged-out > div > div > div > a"
    );
    await singInLink.click();
    await page.waitForTimeout(1000);
    const title2 = await page.title();
    expect(title2).toEqual("Sign in to GitHub · GitHub");
  });
});
