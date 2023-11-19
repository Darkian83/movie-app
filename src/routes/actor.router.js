const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setActorsMovies,
} = require("../controllers/actor.controllers");
const express = require("express");

const actorRouter = express.Router();

actorRouter.route("/").get(getAll).post(create);

actorRouter.route("/:id").get(getOne).delete(remove).put(update);

actorRouter.route("/:id/movies").post(setActorsMovies);

module.exports = actorRouter;
