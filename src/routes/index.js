const express = require("express");
const actorRouter = require("./actor.router");
const genreRouter = require("./genre.router");
const directorRouter = require("./director.router");
const movieRouter = require("./movie.router");
const router = express.Router();

// colocar las rutas aquí
router.use("/movies", movieRouter);
router.use("/actors", actorRouter);
router.use("/genres", genreRouter);
router.use("/directors", directorRouter);

module.exports = router;
