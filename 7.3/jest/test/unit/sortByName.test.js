const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});
describe("Return 0", () => {
  it("Books names should be sorted in ascending order 2", () => {
    expect(
      sorting.sortByName([
        "Властелин Колец",
        "Властелин Колец"
      ])
    ).toEqual([
      "Властелин Колец",
      "Властелин Колец"
    ]);
  });
});
