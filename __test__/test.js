const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
require("dotenv").config({ path: ".env.test" });
const dataRecipe = require("../mock.json");
const recipeModel = require("../models/recipe");

beforeAll((done) => {
  mongoose.connect(process.env.DB_URI, () => done());
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

let token = "";

test("Create User -> POST /api/v1/auth/register/", async () => {
  const data = {
    email: "moranrosales23@hotmail.com",
    password: "A123456s@",
  };

  await supertest(app)
    .post("/api/v1/auth/register/")
    .send(data)
    .expect(201)
    .then(async (response) => {
      expect(response.body.message).toEqual("User created");
      expect(response.body.data._id).toBeDefined();
      expect(response.body.data.email).toBe(data.email);
    });
});

test("Error Create User -> POST /api/v1/auth/register/", async () => {
  const data = {
    email: "moranrosales23@hotmail.com",
  };

  await supertest(app).post("/api/v1/auth/register/").send(data).expect(400);
});

test("Login -> POST /api/v1/auth/", async () => {
  const data = {
    email: "moranrosales23@hotmail.com",
    password: "A123456s@",
  };

  await supertest(app)
    .post("/api/v1/auth/")
    .send(data)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      token = response.body.data.tk;
    });
});

test("Error Login -> POST /api/v1/auth/", async () => {
  const data = {
    email: "moranrosales23@hotmail.com",
    password: "A123456s@-",
  };
  await supertest(app).post("/api/v1/auth/").send(data).expect(404);
});

test("Get All Recipes -> GET /api/v1/recipe", async () => {
  await supertest(app)
    .get("/api/v1/recipe")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toEqual(4);
    });
});

test("Search Recipes -> GET /api/v1/recipe", async () => {
  await supertest(app)
    .get("/api/v1/recipe?search=manzana")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toEqual(2);
    });
});

async function mock() {
  for (const recipe of dataRecipe) {
    await recipeModel.create(recipe);
  }
}
mock();
