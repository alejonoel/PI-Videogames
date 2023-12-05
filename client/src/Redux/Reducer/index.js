import { DELETE, FILTER, GET_GAMES, GET_GAMES_BY_ID, GET_GENRES, GET_PLATFORM, ORDER, PAGINATE, RESET, SEARCH } from "../Actions-type";

let initialState= {
    allVideogames: [],
    allVideogamesBackUp: [],
    allGenres: [],
    allPlatforms: [],
    videogameDetail:[],
    videogamesFiltered:[],
    filter:false,
    loading: true,
    currentPage:1,
    totalPages:0,
}

function rootReducer(state=initialState, action){
    const gamesXpage = 15;
    const calcualtePages = (totalGames, gamesXpage) => {
        return Math.ceil(totalGames.length/gamesXpage)
    }
    switch (action.type) {
        case GET_GAMES:
            const totalPages = calcualtePages(action.payload, gamesXpage)
            return {
                ...state,
                allVideogames: [...action.payload].splice(0, gamesXpage),
                allVideogamesBackUp: action.payload,
                totalPages: totalPages,
                loading: false,
            }
        case GET_GENRES:
            return {
                ...state,
                allGenres: action.payload
            }
        case GET_PLATFORM:
            return {
                ...state,
                allPlatforms: action.payload
            }
        case GET_GAMES_BY_ID:
            return {
                ...state,
                videogameDetail: action.payload,
            }
        case SEARCH:
            const totalPagesS = calcualtePages(action.payload, gamesXpage)
            return{
                ...state,
                allVideogames: [...action.payload].splice(0, gamesXpage),
                allVideogamesBackUp: action.payload,
                currentPage:1,
                totalPages: totalPagesS
            }
        case FILTER:
            switch (action.payload.type) {
                case "genre":
                    let filterByGenre = [...state.allVideogamesBackUp].filter((g)=>g.genres.includes(action.payload.value))
                    const totalPagesG = calcualtePages(filterByGenre, gamesXpage)
                    return{
                        ...state,
                        allVideogames: [...filterByGenre].splice(0,gamesXpage),
                        videogamesFiltered: filterByGenre,
                        filter:true,
                        currentPage:1,
                        totalPages:totalPagesG,
                    }
                case "origen":
                    let filterByOrigen = [...state.allVideogamesBackUp].filter((o)=>o.origen.includes(action.payload.value))
                    const totalPagesO = calcualtePages(filterByOrigen, gamesXpage)
                    return{
                        ...state,
                        allVideogames: [...filterByOrigen].splice(0,gamesXpage),
                        videogamesFiltered:filterByOrigen,
                        filter:true,
                        currentPage:1,
                        totalPages:totalPagesO,
                    }
                default: return state;
            }
        case ORDER:
            let who = state.filter?[...state.videogamesFiltered]:[...state.allVideogamesBackUp]
            switch(action.payload){
                case "AZ":
                    let asc = who.sort((first, second) => {
                        if(first?.name.toLowerCase() > second?.name.toLowerCase()) return 1;
                        if(first?.name.toLowerCase() < second?.name.toLowerCase()) return -1;
                        return 0;
                    })
                    return{
                        ...state,
                        allVideogames: [...asc].splice(0,gamesXpage),
                        allVideogamesBackUp: state.filter?state.allVideogamesBackUp:asc,
                        videogamesFiltered: state.filter?asc:state.allVideogamesBackUp,
                        currentPage:1
                    }
                case "ZA":
                    let des = who.sort((first, second) => {
                        if(first?.name.toLowerCase() > second?.name.toLowerCase()) return -1;
                        if(first?.name.toLowerCase() < second?.name.toLowerCase()) return 1;
                        return 0;
                    })
                    return{
                        ...state,
                        allVideogames: [...des].splice(0,gamesXpage),
                        allVideogamesBackUp: state.filter?state.allVideogamesBackUp:des,
                        videogamesFiltered: state.filter?des:state.allVideogamesBackUp,
                        currentPage:1
                        }
                case "ratingUp":
                    let up = who.sort((first, second) => {
                        if(first?.rating > second?.rating) return 1;
                        if(first?.rating < second?.rating) return -1;
                        return 0;
                    })
                    return{
                        ...state,
                        allVideogames: [...up].splice(0,gamesXpage),
                        allVideogamesBackUp: state.filter?state.allVideogamesBackUp:up,
                        videogamesFiltered: state.filter?up:state.allVideogamesBackUp,
                        currentPage:1
                    }
                case "ratingDown":
                    let down = who.sort((first, second) => {
                        if(first?.rating > second?.rating) return -1;
                        if(first?.rating < second?.rating) return 1;
                        return 0;
                    })
                    return{
                        ...state,
                        allVideogames: [...down].splice(0,gamesXpage),
                        allVideogamesBackUp: state.filter?state.allVideogamesBackUp:down,
                        videogamesFiltered: state.filter?down:state.allVideogamesBackUp,
                        currentPage:1
                    }
                default: return state
            }

        case PAGINATE: 
            const prevPage = state.currentPage - 1;
            const nextPage = state.currentPage + 1;
            const firstIndex = action.payload === "next" ? state.currentPage * gamesXpage : (prevPage-1) * gamesXpage;
            
            if (state.filter){
                if (action.payload === "next" && firstIndex >= state.videogamesFiltered.length) return state;
                else if (action.payload === "prev" && prevPage <= 0 ) return state;

                return {
                    ...state,
                    allVideogames: [...state.videogamesFiltered].splice(firstIndex, gamesXpage),
                    currentPage: action.payload === "next" ? nextPage : prevPage
                }
            }

            if (action.payload === "next" && firstIndex >= state.allVideogamesBackUp.length) return state;
            else if (action.payload === "prev" && prevPage <= 0 ) return state;

            return {
                ...state,
                allVideogames: [...state.allVideogamesBackUp].splice(firstIndex, gamesXpage),
                currentPage: action.payload === "next" ? nextPage : prevPage
            }
        case RESET:
            const totalPagesR = calcualtePages(state.allVideogamesBackUp, gamesXpage)
            return {
                ...state,
                allVideogames: [...state.allVideogamesBackUp].splice(0,gamesXpage),
                filter: false,
                videogamesFiltered: [],
                currentPage:1,
                totalPages:totalPagesR
            }
        case DELETE: 
            const  withoutGame = [...state.allVideogames].filter((g)=>g.id !== action.payload)
            const  withoutGameBackUp = [...state.allVideogamesBackUp].filter((g)=>g.id !== action.payload)
            return {
                ...state,
                allVideogames: [...withoutGame].splice(0,gamesXpage),
                allVideogamesBackUp: withoutGameBackUp,
            }
        default:
            return state;
    }
}

export default rootReducer;