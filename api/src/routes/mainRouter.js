const { Router } = require('express');
// Importar todos los routers;
const genresRouter = require("./genres");
const videogamesRouter = require('./videogames');
const platformRouter = require("./platform")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genres", genresRouter )
router.use('/videogames', videogamesRouter )
router.use("/platform", platformRouter)


module.exports = router;
