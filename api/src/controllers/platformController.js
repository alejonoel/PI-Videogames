const { Platform } = require ("../db");
const axios = require("axios");

const getPlatform = async () => {
    const platformsDB = await Platform.findAll();
    if (!platformsDB.length){
        const { data } = await axios.get("https://api.rawg.io/api/games?key=0b6d4c0bb3964f039ae9ec778e633865");
    const games = data.results;
    const allPlatforms = games.reduce((platforms, game) => {
        game.platforms.forEach((platform) => {
            if (!platforms.includes(platform.platform.name)) {
                platforms.push(platform.platform.name);
            }
        });
        return platforms;
    }, []);
        allPlatforms.forEach(async (i) => {
            await Platform.findOrCreate({
              where: { name: i },
            });
          });
        return allPlatforms;
    }
    return platformsDB.map( g => g.name);
}



module.exports = { getPlatform }