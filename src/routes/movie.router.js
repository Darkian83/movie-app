const {
  setDirectorMovies,
} = require("../controllers/director.controllers");
const {
  setGenresMovies,
} = require("../controllers/genre.controllers");
const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieActors,
  setMovieDirectors,
} = require("../controllers/movie.controllers");
const express = require("express");

const movieRouter = express.Router();

movieRouter.route("/").get(getAll).post(create);

movieRouter.route("/:id").get(getOne).delete(remove).put(update);

// movieRouter.route("/:id/actors").post(setMovieActors);

movieRouter.route("/:id/genres").post(setGenresMovies);
movieRouter.route("/:id/actors").post(setMovieActors);
movieRouter.route("/:id/directors").post(setDirectorMovies);
movieRouter.route("/:id/actors").post(setMovieDirectors);

module.exports = movieRouter;
