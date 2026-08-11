const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");

setDefaultTimeout(30000);

const { clickElement, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    slowMo: 50,
  });

  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on cinema page", async function () {
  await this.page.goto("http://qamid.tmweb.ru/client/index.php", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
});

When("user books one standard seat", async function () {
  await clickElement(
    this.page,
    ".movie-seances__time:not(.acceptin-button-disabled)",
  );

  await this.page.waitForSelector(".buying-scheme__chair_standart");

  await clickElement(this.page, ".buying-scheme__chair_standart");
  await clickElement(this.page, ".acceptin-button");
});

When("user books one vip seat", async function () {
  await clickElement(this.page, ".page-nav__day:not(.page-nav__day_chosen)");

  await clickElement(this.page, 'a[data-seance-id="243"]');

  await this.page.waitForSelector(".buying-scheme__chair_vip");

  await clickElement(this.page, ".buying-scheme__chair_vip");
  await clickElement(this.page, ".acceptin-button");
});

When("user chooses occupied seat", async function () {
  await clickElement(
    this.page,
    ".movie-seances__time:not(.acceptin-button-disabled)",
  );

  await this.page.waitForSelector(".buying-scheme__chair_taken");

  await clickElement(this.page, ".buying-scheme__chair_taken");
});

Then("user sees booking confirmation", async function () {
  await this.page.waitForSelector(".ticket__check-title");

  const actual = await getText(this.page, ".ticket__check-title");

  expect(actual).to.contain("Вы выбрали билеты");
});

Then("occupied seat remains occupied", async function () {
  const isOccupied = await this.page.$eval(
    ".buying-scheme__chair_taken",
    (chair) => chair.classList.contains("buying-scheme__chair_taken"),
  );

  expect(isOccupied).to.equal(true);
});
