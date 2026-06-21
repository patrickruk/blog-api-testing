const request = require("supertest");
const app = require("../app");

describe("Blog API CRUD", () => {
  it("POST → creates post", async () => {
    const res = await request(app).post("/api/posts").send({ title: "Test", content: "Hello" });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe("Test");
  });

  it("GET → returns posts array", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("PUT → updates post", async () => {
    const res = await request(app).put("/api/posts/1").send({ title: "Updated" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Updated");
  });

  it("DELETE → removes post", async () => {
    const res = await request(app).delete("/api/posts/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Updated");
  });
});
