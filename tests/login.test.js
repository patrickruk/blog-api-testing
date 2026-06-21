const login = require("../login");

test("throw error when mismatch",() => { 
expect(() => login("wrongpass")).toThrow("Wrong password");
});

test("show successful when match:",() => { 
expect(login("myScret")).toBe("login successful");
});