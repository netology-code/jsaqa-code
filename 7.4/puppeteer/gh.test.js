let page;
afterEach(async () => {
  await page.close();
});
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});
describe("Github page tests", () => {
  test("The h1 header content", async () => {
    await page.setDefaultTimeout(3000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });
  test("The first link attribute", async () => {
    await page.setDefaultTimeout(2000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });
  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(2000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  });
});
describe("Securuty Page", () => {
  beforeEach(async () => {
    anotherPage = await browser.newPage();
    await anotherPage.goto("https://github.com/features/security");
  });

  test("Text of Header Buttom", async () => {
    const headerElement = await anotherPage.$(
      "div.sub-nav-mktg.js-toggler-container.js-sticky.js-position-sticky.top-0.width-full.z-3 > div > a"
    );
    const elementText = await headerElement.evaluate((el) => el.textContent);
    expect(elementText).toEqual("Security");
  });
  test("h1 Text", async () => {
    await page.setDefaultTimeout(5000);
    const h1 = await "h1.h1-mktg.mb-4";
    const h1Text = await anotherPage.$eval(h1, (el) => el.textContent);
    const h1TextAfterTransform1 = await h1Text.slice(0, 15);
    const h1TextAfterTransform2 = await h1Text.slice(16);
    const h1TextAfterJoin = [h1TextAfterTransform1, h1TextAfterTransform2].join(
      ""
    );
    expect(h1TextAfterJoin).toEqual("Secure at everystep");
  });
  test("h4Span Text under h1", async () => {
    const h4Span = await "h4 span.color-fg-default";
    const h4SpanText = await anotherPage.$eval(h4Span, (el) => el.textContent);
    expect(h4SpanText).toEqual(
      "Ship secure applications within the GitHub flow"
    );
  });
});