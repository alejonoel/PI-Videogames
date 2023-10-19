import axios from "axios";
import { GET_GAMES, GET_GENRES } from "../Actions-type";

export function getVideogames(){
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/videogames")
            dispatch({
                type:GET_GAMES,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function getGenres(){
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/genres")
            dispatch({
                type:GET_GENRES,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}