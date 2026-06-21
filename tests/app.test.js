const request = require("supertest");
const app = require("../app");

describe("Users API with mock DB", () => {
  it("GET /api/users → returns array", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("POST /api/users → creates user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ username: "patrick" });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.username).toBe("patrick");
  });

  it("POST /api/users → fails without username", async () => {
    const res = await request(app).post("/api/users").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Username required");
  });
});
