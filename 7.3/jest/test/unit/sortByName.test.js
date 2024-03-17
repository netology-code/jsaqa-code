const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {

    const input = [
      "Гарри Поттер",
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Властелин Колец", // Добавляем элемент с повторяющимся значением
    ];

    const expected = [
      "Властелин Колец",
      "Властелин Колец", 
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ];

    const output = sorting.sortByName(input);

    expect(output).toEqual(expected);

  });
});
