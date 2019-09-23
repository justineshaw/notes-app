process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("test-db.json");
const db = low(adapter);

// setup database
beforeAll(async () => {
  await db.defaults({ notes: [], count: 0 }).write();
});

// seed with some data
beforeEach(async () => {
  let count = db.get('count') + 1;
  await db.get("notes")
    .push({ id: count, message: "test message" })
    .write();
  db.update("count", n => n + 1).write();
});

// There should be a response with value(s)
describe("GET /api/1 ", () => {
  test("API responds with the requested note", async () => {
    const response = await request(app).get("/api/1");
    expect(response.body.message).toEqual({ id: 1, message: "Test Message" });
    expect(response.statusCode).toBe(200);
  });
});

// There should be a list of all notes.
describe("GET /api", () => {
  test("API responds with a list of all notes", async () => {
    const response = await request(app).get("/api/1");

    expect(response.body.message).toHaveProperty("id");
    expect(response.body.message).toHaveProperty("message");
    expect(response.statusCode).toBe(200);
  });
});

//You should be able to add a note.
describe("POST /api", () => {
  test("API responds with 200 status", async () => {
    const response = await request(app)
      .post("/api/")
      .send({
        message: "Test Message"
      });

    expect(response.statusCode).toBe(200);
  });
});

//You should be able to edit a note.
describe("PUT /api", () => {
  test("API responds with 200 status", async () => {
    const response = await request(app)
      .put("/api/")
      .send({
        message: "New String"
      });

    expect(response.statusCode).toBe(200);
  });
});