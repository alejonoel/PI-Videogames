const { Router } = require("express");
const { getVideogamesHandler, createVideogameHandler, deleteVideogameHandler, getVideogameByIDHandler } = require("../handlers/videogamesHandler");
const videogamesRouter = Router();

videogamesRouter.get("/", getVideogamesHandler);
videogamesRouter.post("/", createVideogameHandler);
videogamesRouter.get("/:id", getVideogameByIDHandler);
videogamesRouter.delete("/:id", deleteVideogameHandler);

module.exports = videogamesRouter;
