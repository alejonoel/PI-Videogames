const { Videogame , Genre , Platform } = require ("../db");
const { Op } = require('sequelize');
const axios = require("axios");


const getVideogamesBD = async () => {
    const gamesFromBD = await Videogame.findAll({
        include: [{
                model: Genre,
                attributes:['name'],
                through: { attributes: [] }},
            {
                model: Platform,
                attributes: ['name'],
                as: 'platforms'
            }]
    });
    const finalModel = gamesFromBD.map((game) => {
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms.map((p) => p.name ),
            image: game.image,
            date: game.date,
            rating: game.rating,
            genres: game.genres.map((g) => g.name ),
            origen: "BD"
        }
    })
    return finalModel;
}

const getVideogamesApi = async () => {
    let allResults = [];
    for( let i = 1; i<=5; i++){
        const { data }= await axios.get(`https://api.rawg.io/api/games?page=${i}&key=0b6d4c0bb3964f039ae9ec778e633865`);
        allResults = [...allResults, ...data.results];
    }
    const finalModel = allResults.map((game)=>{
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms?.map((p) => p.platform.name),
            image: game.background_image,
            date: game.released,
            rating: game.rating,
            genres: game.genres.map((g) => g.name ),
            origen: "API"
        }
    });
    return finalModel;
}

const getVideogames = async () => {
    const gamesDB = await getVideogamesBD();
    const gamesAPI = await getVideogamesApi();
    const gamesALL = [...gamesDB, ...gamesAPI];
    
    return gamesALL
}

const getVideogamesbyNameBD = async (name) => {
    const gamesFromBD = await Videogame.findAll({
        include: [{
                model: Genre,
                attributes:['name'],
                through: { attributes: [] }},
            {
                model: Platform,
                attributes: ['name'],
                as: 'platforms'
            }],
        where:  {
            name: {
                // iLike: indistinción entre mayúsculas/minúsculas
                [Op.iLike]: `%${name}%`,
            }
        }
    });
    
    if(gamesFromBD)
    {const finalModel = gamesFromBD.map((game) => {
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms.map((p) => p.name ),
            image: game.image,
            date: game.date,
            rating: game.rating,
            genres: game.genres.map((g) => g.name ),
            origen: "BD"
        }
    })
    return finalModel;
}
}

const getVideogameByNameApi = async (name) => {
    const { data } = await axios.get(`https://api.rawg.io/api/games?search=${name}&page_size=15&key=0b6d4c0bb3964f039ae9ec778e633865`)
    const finalModel = data.results.map((game)=>{
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms?.map((p) => p.platform.name),
            image: game.background_image,
            date: game.released,
            rating: game.rating,
            genres: game.genres.map((g) => g.name ),
            origen: "API"
        }
    });
    return finalModel.splice(0,15);
}

const getVideogamesByName = async (name) => {
    const gamesDB = await getVideogamesbyNameBD(name);
    console.log(gamesDB)
    const gamesAPI = await getVideogameByNameApi(name);
    const gamesALL = [...gamesDB, ...gamesAPI];

    return gamesALL;
} 

const createVideogame = async ( name , description , platforms , image , date , rating , genres ) => {
    const newVideogame = await Videogame.create({ name , description , image , date , rating });
    genres.forEach( async (g) => {
        const addGeneros = await Genre.findOne({
            where: {name: g}
        })
    await newVideogame.addGenres(addGeneros)
    });
    
    const platformsDB = await Platform.findAll({ 
        where: {
            name: platforms
        }
    });
    await newVideogame.addPlatforms(platformsDB);
    
    return newVideogame
}

function checkUUID(id) {
    const uuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuid.test(id);
  }

const getVideogameByID = async (id) => {
    let found = false
    if(checkUUID(id)){
        const fromDB = await Videogame.findOne({where: {id: id},
                                                include: [{
                                                        model: Genre,
                                                        attributes:['name'],
                                                        through: { attributes: [] }},
                                                    {
                                                        model: Platform,
                                                        attributes: ['name'],
                                                        as: 'platforms'
                                                    }]})
        if(fromDB){
            const withGenres = {
                id: fromDB.id,
                name: fromDB.name,
                description: fromDB.description,
                platforms: fromDB.platforms.map((p) => p.name ),
                image: fromDB.image,
                date: fromDB.date,
                rating: fromDB.rating,
                genres: fromDB.genres.map((g) => g.name )
            }
            return withGenres
        }
    } 
    if(!found) {
        const { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=0b6d4c0bb3964f039ae9ec778e633865`);
        const fromAPI = {
            id: data.id,
            name: data.name,
            description: data.description,
            platforms: data.platforms.map((p) => p.platform.name),
            image: data.background_image,
            date: data.released,
            rating: data.rating,
            genres: data.genres.map((g) => g.name )  
            }
        return fromAPI;
    }

}

const deleteVideogame = async (id) => {
    return Videogame.destroy({
        where: { id },
      }).then((response) => {
        if (response === 0) {
          throw new Error("The videogame could not be deleted or does not exist");
        }
        return `Game with id: ${id} successfully removed`;
      });
}

module.exports = { getVideogames , createVideogame , getVideogameByID, deleteVideogame, getVideogamesByName}