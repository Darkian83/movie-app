const request = require("supertest");
const app = require("../app");
require("../models");

let id;

test("GET /directors debe traer todas las películas", async () => {
  const res = await request(app).get("/directors");
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un director", async () => {
  const director = {
    firstName: "Quentin",
    lastName: "Tarantino",
    nationality: "USA",
    image: "https://m.media-amazon.com/images/I/51G8gMejK-L._AC_.jpg",
    birthday: "1974-10-28",
  };
  const res = await request(app).post("/directors").send(director);
  id = res.body.id;
  console.log(res.body);
  expect(res.statusCode).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("PUT /directors/:id debe actualizar un director", async () => {
  const director = {
    nationality: "Argentina",
  };
  const res = await request(app)
    .put(`/directors/${id}`)
    .send(director);
  expect(res.statusCode).toBe(200);
  expect(res.body.nationality).toBe(director.nationality);
});

test("DELETE /directors/:id debe eliminar un director", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.statusCode).toBe(204);
});
