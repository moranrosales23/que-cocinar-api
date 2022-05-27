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
let recipe = {};

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

test("Get Recipe by id -> GET /api/v1/recipe/:id", async () => {
  await supertest(app)
    .get("/api/v1/recipe?limit=1")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toEqual(1);
      recipe = response.body.data[0];
    });

  await supertest(app)
    .get(`/api/v1/recipe/${recipe._id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]._id).toBeDefined();
      expect(response.body.data[0].name).toBeDefined();
      expect(response.body.data[0].category).toBeDefined();
      expect(response.body.data[0].instructions).toBeDefined();
    });
});

test("Set favorite -> PATCH /api/v1/recipe/:id/favorites", async () => {
  await supertest(app)
    .patch(`/api/v1/recipe/${recipe._id}/favorites`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toEqual(1);
    });
});

test("Unset favorite -> PATCH /api/v1/recipe/:id/favorites", async () => {
  await supertest(app)
    .patch(`/api/v1/recipe/${recipe._id}/favorites`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toEqual(0);
    });
});

test("Register ingredient -> POST /api/v1/ingredient/", async () => {
  const data = {
    description: "manzana",
  };

  await supertest(app)
    .post("/api/v1/ingredient/")
    .set("Authorization", `Bearer ${token}`)
    .send(data)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data[0]._id).toBeDefined();
      expect(response.body.data[0].description).toEqual(data.description);
    });
});

test("Edit ingredient -> PATH /api/v1/ingredient/:id", async () => {
  const data = {
    register: { description: "pera" },
    update: { ingredient: "uva" },
    id: "",
  };

  await supertest(app)
    .post("/api/v1/ingredient/")
    .set("Authorization", `Bearer ${token}`)
    .send(data.register)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data[1]._id).toBeDefined();
      expect(response.body.data[1].description).toEqual(
        data.register.description
      );
      data.id = response.body.data[1]._id;
    });

  await supertest(app)
    .patch(`/api/v1/ingredient/${data.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(data.update)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data[1]._id).toBeDefined();
      expect(response.body.data[1]._id).toEqual(data.id);
      expect(response.body.data[1].description).toEqual(data.update.ingredient);
    });
});

test("Delete ingredient -> DELETE /api/v1/ingredient/:id", async () => {
  const data = {
    register: { description: "pera" },
    id: "",
  };

  await supertest(app)
    .post("/api/v1/ingredient/")
    .set("Authorization", `Bearer ${token}`)
    .send(data.register)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data[2]._id).toBeDefined();
      expect(response.body.data[2].description).toEqual(
        data.register.description
      );
      data.id = response.body.data[2]._id;
    });

  await supertest(app)
    .delete(`/api/v1/ingredient/${data.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toEqual(2);
    });
});

test("Edit profile -> PATH /api/v1/ingredient/:id", async () => {
  const data = {
    name: "Joao",
    lastname: "Moran",
    nickname: "Joaocancer23",
  };

  await supertest(app)
    .patch(`/api/v1/auth/user`)
    .set("Authorization", `Bearer ${token}`)
    .send(data)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toBeDefined();
      expect(response.body.data.name).toEqual(data.name);
      expect(response.body.data.lastname).toEqual(data.lastname);
      expect(response.body.data.nickname).toEqual(data.nickname);
    });
});

async function mock() {
  for (const recipe of dataRecipe) {
    await recipeModel.create(recipe);
  }
}
mock();
