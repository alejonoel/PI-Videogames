import { GET_GAMES, GET_GENRES } from "../Actions-type";

let initialState= {
    allVideogames: [],
    allVideogamesBackUp: [],
    allGenres: [],
    
}

function rootReducer(state=initialState, action){
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                allVideogames: [...action.payload],
                allVideogamesBackUp: action.payload,
            }
        case GET_GENRES:
        return {
            ...state,
            allGenres: action.payload
        }
        default:
            return state;
    }
}

export default rootReducer;