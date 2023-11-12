const catchError = require("../utils/catchError");
const Genre = require("../models/Genre");
const Movie = require("../models/Movie");

const getAll = catchError(async (req, res) => {
  const results = await Genre.findAll({ include: [Movie] });

  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Genre.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Genre.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Genre.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Genre.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

setGenresMovies = catchError(async (req, res) => {
  console.log("Entró a setGenresMovies");
  const { id } = req.params; // este de es de la movie
  const movie = await Movie.findByPk(id);
  // console.log(movie);
  if (!movie)
    return res.sendStatus(404).json({ message: "Movie not found" });
  console.log(req.body);
  await movie.setGenres(req.body);
  const genre = await movie.getGenres();
  return res.json(genre);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenresMovies,
};
