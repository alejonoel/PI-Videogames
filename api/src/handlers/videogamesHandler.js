const { getVideogames , createVideogame, deleteVideogame, getVideogameByID } = require("../controllers/videogamesControllers");

const getVideogamesHandler = async ( req , res ) => {
    try {
        const { name } = req.query;
        const response = await getVideogames(name);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createVideogameHandler = async ( req , res ) => {
    try {
        const { name , description , platforms , image , date , rating , genres } = req.body
        const response = await createVideogame( name , description , platforms , image , date , rating , genres );
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getVideogameByIDHandler = async ( req , res ) => {
    const { id } = req.params;
    try {
        const response = await getVideogameByID(id);
        res.status(200).json(response) 
    } catch (error) {
        console.log(error) 
        res.status(400).json({ error: `Videogame with id: ${id} not found`})
    }
}

const deleteVideogameHandler = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await deleteVideogame(id);
        res.status(200).json(response)        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getVideogamesHandler , createVideogameHandler , getVideogameByIDHandler, deleteVideogameHandler}