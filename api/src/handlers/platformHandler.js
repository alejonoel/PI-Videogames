const { getPlatform } = require("../controllers/platformController");

const getPlatformHandler = async ( req , res ) => {
    try {
        const response = await getPlatform();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getPlatformHandler }