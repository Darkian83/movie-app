const request = require("supertest");
const app = require("../app");
require("../models");
const Movie = require("../models/Movie");

let id;

test("GET /actors debe traer todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async () => {
  const actor = {
    firstName: "Joaquin",
    lastName: "Phoenix",
    nationality: "USA",
    image: "https://m.media-amazon.com/images/I/51G8gMejK-L._AC_.jpg",
    birthday: "1974-10-28",
  };
  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.statusCode).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("PUT /actors/:id debe actualizar un actor", async () => {
  const actor = {
    nationality: "Argentina",
  };
  const res = await request(app).put(`/actors/${id}`).send(actor);
  expect(res.statusCode).toBe(200);
  expect(res.body.nationality).toEqual(actor.nationality);
});

test("POST /actors/:id actors debe de insertar las peliuculas del actor", async () => {
  const movie = await Movie.create({
    name: "Joker",
    image: "https://m.media-amazon.com/images/I/51G8gMejK-L._AC_.jpg",
    synopsis: "A mentally ill comedian murders people",
    releaseYear: 2019,
  });
  const res = await request(app)
    .post(`/actors/${id}/movies`)
    .send([movie.id]);
  await movie.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.statusCode).toBe(204);
});
