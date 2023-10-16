const { Genre } = require ("../db");
const axios = require("axios");


const getGenres = async () => {
    const hayGeneros = await Genre.findAll();
    if (!hayGeneros.length){
        const { data } = await axios.get(
            'https://api.rawg.io/api/genres?key=0b6d4c0bb3964f039ae9ec778e633865'
            )
        const generos = [];
        data.results.forEach((g) => generos.push(g.name));
        generos.forEach(async (i) => {
            await Genre.findOrCreate({
              where: { name: i },
            });
          });
        return generos;
    }
    return hayGeneros.map( g => g.name);
}

module.exports = { getGenres }