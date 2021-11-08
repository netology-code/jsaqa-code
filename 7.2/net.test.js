let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru");
});

afterEach(() => {
  page.close();
});

describe("Netology.ru tests", () => {
  test("The first test'", async () => {
    const title = await page.title();
    console.log("Page title: " + title);
    const firstLink = await page.$("header a + a");
    // const firstLinkText = await page.$eval(
    //   "header a + a",
    //   (link) => link.textContent
    // );
    await firstLink.click();
    await page.waitForNavigation();
    const title2 = await page.title();
    console.log("Page title: " + title2);
    const pageList = await browser.newPage();
    await pageList.goto("https://netology.ru/navigation");
    await pageList.waitForSelector("h1");
  });

  test("The first link text 'Медиа Нетологии'", async () => {
    const actual = await page.$eval("header a + a", (link) => link.textContent);
    expect(actual).toContain("Медиа Нетологии");
  });

  test("The first link leads on 'Медиа' page", async () => {
    await page.click("header a + a");
    await page.waitForSelector(".logo__media", {
      visible: true,
    });
    const actual = await page.$eval(".logo__media", (link) => link.textContent);
    expect(actual).toContain("Медиа");
  });
});
