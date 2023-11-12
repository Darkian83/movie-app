const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Genre = require("../models/Genre");
const Director = require("../models/Director");

const getAll = catchError(async (req, res) => {
  const results = await Movie.findAll({
    include: [Actor, Genre, Director],
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  console.log(req.body);
  const result = await Movie.create(req.body);
  // console.log(result);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Movie.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setMovieActors = catchError(async (req, res) => {
  console.log("Entró a setMovieActors");
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie)
    return res.sendStatus(404).json({ message: "Movie not found" });
  await movie.setActors(req.body);
  const actors = await movie.getActors();
  return res.json(actors);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieActors,
};
