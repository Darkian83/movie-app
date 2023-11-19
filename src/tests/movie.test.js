const request = require("supertest");
const app = require("../app");
require("../models");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

let id;

test("GET /movies debe traer todas las películas", async () => {
  const res = await request(app).get("/movies");
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear un actor", async () => {
  const movie = {
    name: "Joker",
    image: "https://m.media-amazon.com/images/I/51G8gMejK-L._AC_.jpg",
    synopsis: "A mentally ill comedian murders people",
    releaseYear: 2019,
  };
  const res = await request(app).post("/movies").send(movie);
  id = res.body.id;
  expect(res.statusCode).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("PUT /movies/:id debe actualizar una película", async () => {
  const movie = {
    releaseYear: 2020,
  };
  const res = await request(app).put(`/movies/${id}`).send(movie);
  expect(res.statusCode).toBe(200);
  expect(res.body.releaseYear).toEqual(movie.releaseYear);
});

test("POST/movies/:id/actors debe agregar un actor a una película", async () => {
  const actor = await Actor.create({
    firstName: "Joaquin",
    lastName: "Phoenix",
    nationality: "USA",
    image: "https://m.media-amazon.com/images/I/51G8gMejK-L._AC_.jpg",
    birthday: "1974-10-28",
  });
  const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST movies/:id/directors debe agregar un director a una película", async () => {
  const director = await Director.create({
    firstName: "Quentin",
    lastName: "Tarantino",
    nationality: "USA",
    image: "https://m.media-amazon.com/images/I/51G8gMejK-L._AC_.jpg",
    birthday: "1974-10-28",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/genres debe agregar un género a una película", async () => {
  const genre = await Genre.create({
    name: "Drama",
  });
  const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("DELETE /movies/:id debe eliminar una película", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.statusCode).toBe(204);
});
