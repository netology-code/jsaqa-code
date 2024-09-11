const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const {getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ /* headless: false , slowMo: 100 */ }); // параметры оставлю для себя
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

// Scenario: Book a standard place
Given("by the user on the page {string}", async function (string) {
  //переход на страницу
  try {
    await this.page.goto(string, { setTimeout: 5000 });
  } catch (error) {
    throw new Error(`Failed to navigate to ${string} error: ${error}`);
  }
});

When("the user selects the furthest available day", async function () {
  const elements = await this.page.$$("a.page-nav__day");
  const lastElement = elements[elements.length - 1]; // выбран самый дальний день
  await lastElement.click(); // тут нет возможности использовать clickElement
});

When("the user chooses a standard available seat", async function () {
  await this.page.waitForSelector("span.buying-scheme__chair", { visible: true });
  const seats = await this.page.$$("span.buying-scheme__chair");

  for (const seat of seats) {
    // Ищем стандартное свободное место
    const isTaken = await seat.evaluate(
      (seat) =>
        !seat.classList.contains("buying-scheme__chair_taken") &&
        !seat.classList.contains("buying-scheme__chair_vip")
    );
    if (isTaken) {
      // Если место свободно, выбираем его
      await seat.click();
      break;
    } else {
      // Если место занято, переходим к следующему месту
      continue;
    }
  }
});

When("the user confirms the choice", async function () {
  await clickElement(this.page, "button.acceptin-button");
});

Then("the user should see the movie title {string}", async function (string) {
   const ticket__title = await getText(this.page, "span.ticket__details.ticket__title");
    const expected = string;
    expect(ticket__title).to.equal(expected);
});

Then("the ticket cost should be {string}", async function (string) {
  const ticket__cost = await getText(this.page, "span.ticket__details.ticket__cost");
    const expected2 = string;
    expect(ticket__cost).to.equal(expected2);
});

When("the user selects the following day", async function () {
  const elements = await this.page.$$("a.page-nav__day");
  if (elements.length >= 2) {
    const lastElement = elements[1]; // выбераем завтра
    await lastElement.click();
    
  };
});

When("the user chooses a VIP available seat", async function () {
  await this.page.waitForSelector("span.buying-scheme__chair", { visible: true });
  const seats = await this.page.$$("span.buying-scheme__chair");

  for (const seat of seats) {
    const isTaken = await seat.evaluate(
      (seat) =>
        !seat.classList.contains("buying-scheme__chair_taken") &&
        seat.classList.contains("buying-scheme__chair_vip")
    );

    if (isTaken) {
      // Если место свободно, выбираем его
      await seat.click();
      break;
      
    } else {
      continue;
    }
  }
});

When("the user chooses a reserved seat", async function () {
  await this.page.waitForSelector("span.buying-scheme__chair", { visible: true });
  const seats = await this.page.$$("span.buying-scheme__chair");

  let isButtonDisabled = false;

  for (const seat of seats) {
    const isTaken = await seat.evaluate(
        (seat) => seat.classList.contains("buying-scheme__chair_taken")
    );

    if (isTaken) {
      // Если место свободно, выбираем его
      await seat.click();
      break;
    } else {
      // Если место занято, переходим к следующему месту
      continue;
    }
  }
});

When("the user selects a movie {string}", async function (string) {
  await clickElement(this.page, string);
});

When("the confirmation button should be disabled", async function () {
// Проверка, что кнопка не активна
    isButtonDisabled = await this.page.$eval('button.acceptin-button', (button) => button.disabled);
    expect(isButtonDisabled).to.equal(true);
});

//шаблон оставлю 
// When("", async function () { 

// });
