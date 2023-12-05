import axios from "axios";
import { GET_GAMES, GET_GENRES, POST_VIDEOGAME, GET_PLATFORM, GET_GAMES_BY_ID, PAGINATE, SEARCH, FILTER, ORDER, RESET, DELETE } from "../Actions-type";

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

export function getPlatforms(){
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/platform")
            dispatch({
                type:GET_PLATFORM,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function postVidegame(state){
    return async function(dispatch){
        try {
            const response = await axios.post("http://localhost:3001/videogames", state)
            dispatch({
                type:POST_VIDEOGAME,
                payload: response.data
            })
            
            alert("added Videogame")
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function getGamesByID(id){
    return async function(dispatch){
        try {
            const response = await axios.get (`http://localhost:3001/videogames/${id}`);
            dispatch({
                type:GET_GAMES_BY_ID,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function deleteGameFromBD(id){
    return async function(dispatch){
        try {
            const response = await axios.delete(`http://localhost:3001/videogames/${id}`);
            dispatch({
                type:DELETE,
                payload: id
            })
            alert(response.data)
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function searchVideogames(name){
    return async function(dispatch){
        try {
            const response = await axios.get (`http://localhost:3001/videogames?name=${name}`);
            console.log(response)
            dispatch({
                type:SEARCH,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function paginate(order){
    return async function(dispatch){
        try {
            dispatch({
                type:PAGINATE,
                payload: order
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function filterByGenre(genre){
    return async function(dispatch){
        try {
            dispatch({
                type:FILTER,
                payload: {value: genre,
                          type:"genre"}
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function filterByOrigen(origen){
    return async function(dispatch){
        try {
            dispatch({
                type:FILTER,
                payload: {value: origen,
                          type:"origen"}
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function order(order){
    return async function(dispatch){
        try {
            dispatch({
               type: ORDER,
               payload: order
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function reset(){
    return async function(dispatch){
        try {
            dispatch({
                type:RESET,
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}