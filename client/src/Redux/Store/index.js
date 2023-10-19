import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../Reducer/index.js';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
compose; // esta linea sirve para conectar la app con la extensión de google

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))); // esta linea sirve para que le
    // podamos hacer peticiones a una Api servidor

export default store;