import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import gameReducer from './gameReducer.js';
// import * as types from '../actions/types';

const rootReducer = combineReducers({
    gameState: gameReducer,
    routing
});

export default rootReducer;
