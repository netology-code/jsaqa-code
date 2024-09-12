const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");
jest.setTimeout(60000)
let page;
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});
afterEach(() => {
  page.close();
});
describe("test TiketSite", () => {
  test.only("test Buy 1 ticket", async ({page}) => {
    await page.$("body > nav > a:nth-child(3)").click();
    await page.$("div.movie-seances__hall > ul > li:nth-child(2) > a").click();
    await page.waitForTimeout(1000);
  //class="buying-scheme__chair buying-scheme__chair_standart"
    await page.$("class='buying-scheme__chair buying-scheme__chair_standart'").click();
    await page.$("acceptin-button").click(); 
    await page.waitForTimeout(1000); 
    await page.$("acceptin-button").click();
    const actual = await page.getText('h2');
    expect(actual).toContain("ЭЛЕКТРОННЫЙ БИЛЕТ");

  });

  test("The first link leads on 'Медиа' page", async () => {
    await clickElement(page, "header a + a");
    const actual = await getText(page, ".logo__media");
    await expect(actual).toContain("Медиа");
  });
});

test("Should look for a course", async () => {
  //class="buying-scheme__chair buying-scheme__chair_disabled
  await page.goto("https://netology.ru/navigation");
  await putText(page, "input", "тестировщик");
  const actual = await page.$eval("a[data-name]", (link) => link.textContent);
  const expected = "Тестировщик ПО";
  expect(actual).toContain(expected);
});

test("Should show warning if login is not email", async () => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await putText(page, 'input[type="email"]', generateName(5));
});
