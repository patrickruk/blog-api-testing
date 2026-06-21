const subtract = require("../subtract");
test("subtracts 10 - 4 to equal 6", () => {
  expect(subtract(10, 4)).toBe(6);
});