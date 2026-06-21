const divide = require("../math");

test("divides 10 / 2 to equal 5", () => {
  expect(divide(10, 2)).toBe(5);
});

test("throws error when dividing by zero", () => {
  expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
});