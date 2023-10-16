const { Router } = require('express');
// Importar todos los routers;
const genresRouter = require("./genres");
const videogamesRouter = require('./videogames');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genres", genresRouter )
router.use('/videogames', videogamesRouter )


module.exports = router;
