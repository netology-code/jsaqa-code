const { beforeAll } = require('@jest/globals');
const { clickElement, getText } = require("./lib/commands.js");


let page;
beforeEach(async() => {
await page.goto("https://qamid.tmweb.ru/client/index.php");
});
beforeAll(async () => {
  page = await browser.newPage();
  
  // await page.setDefaultNavigationTimeout(60000);
});

afterAll(() => {
  if (page) {
    page.close();
  }
 
});

describe("Go to the cinema,happy path test ", () => {
  test("Book a standard place", async () => {
    const elements = await page.$$("a.page-nav__day");
    const lastElement = elements[elements.length - 1]; // выбран самый дальний день
    await lastElement.click(); // тут нет возможности использовать clickElement
    await clickElement(page, '[data-seance-start="1020"]');
    await page.waitForSelector("span.buying-scheme__chair", { visible: true });
    const seats = await page.$$("span.buying-scheme__chair");

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
    await clickElement(page, "button.acceptin-button");

    const ticket__title = await getText(page, "span.ticket__details.ticket__title");
    const expected = "Унесенные ветром.";
    expect(ticket__title).toBe(expected);

    const ticket__cost = await getText(page, "span.ticket__details.ticket__cost");
    const expected2 = "150";
    expect(ticket__cost).toBe(expected2);
  });

  test("Book a VIP place", async () => {
    const elements = await page.$$("a.page-nav__day");
    if (elements.length >= 2) {
      const lastElement = elements[1]; // выбераем завтра
      await lastElement.click(); // тут нет возможности использовать clickElement
    };
    await clickElement(page, '[data-seance-start="1080"]');
    await page.waitForSelector("span.buying-scheme__chair", { visible: true });
    const seats = await page.$$("span.buying-scheme__chair");

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
    await clickElement(page, "button.acceptin-button");

    const ticket__title = await getText(page, "span.ticket__details.ticket__title");
    const expected = "Микки маус";
    expect(ticket__title).toBe(expected);

    const ticket__cost = await getText(page, "span.ticket__details.ticket__cost");
    const expected2 = "1000";
    expect(ticket__cost).toBe(expected2);
  });
});

test("Book a reserved seat", async () => {
  const elements = await page.$$("a.page-nav__day");
    if (elements.length >= 2) {
      const lastElement = elements[1];
      await lastElement.click();
    };
    await clickElement(page, '[data-seance-start="720"]');
    await page.waitForSelector("span.buying-scheme__chair", { visible: true });
    const seats = await page.$$("span.buying-scheme__chair");

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
    // Проверка, что кнопка не активна
    isButtonDisabled = await page.$eval('button.acceptin-button', (button) => button.disabled);
    expect(isButtonDisabled).toEqual(true);
});

