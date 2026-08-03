const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(async () => {
  await page.close();
});

describe("Movie ticket booking", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Should book one standard seat", async () => {
    // Act

    await clickElement(
      page,
      ".movie-seances__time:not(.acceptin-button-disabled)",
    );

    await page.waitForSelector(".buying-scheme__chair_standart");

    await clickElement(page, ".buying-scheme__chair_standart");
    await clickElement(page, ".acceptin-button");

    // Assert
    await page.waitForSelector(".ticket__check-title");

    const actual = await getText(page, ".ticket__check-title");

    expect(actual).toContain("Вы выбрали билеты");
  });

  test("Should book one vip seat", async () => {
    // Act
    await clickElement(page, ".page-nav__day:not(.page-nav__day_chosen)");

    await clickElement(page, 'a[data-seance-id="243"]');

    await page.waitForSelector(".buying-scheme__chair_vip");
    await clickElement(page, ".buying-scheme__chair_vip");
    await clickElement(page, ".acceptin-button");

    // Assert
    await page.waitForSelector(".ticket__check-title");

    const actual = await getText(page, ".ticket__check-title");

    expect(actual).toContain("Вы выбрали билеты");
  });

  test("Should not allow booking occupied seat", async () => {
    // Act
    await clickElement(
      page,
      ".movie-seances__time:not(.acceptin-button-disabled)",
    );

    await page.waitForSelector(".buying-scheme__chair_taken");

    await clickElement(page, ".buying-scheme__chair_taken");

    // Assert
    const isOccupied = await page.$eval(
      ".buying-scheme__chair_taken",
      (chair) => chair.classList.contains("buying-scheme__chair_taken"),
    );

    expect(isOccupied).toBe(true);
  });
});
