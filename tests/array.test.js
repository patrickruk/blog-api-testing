const getFruits = require("../array");

test("returns array of fruits", () => {
  expect(getFruits()).toEqual(["apple", "banana"]);
});