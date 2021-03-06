
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from "redux-thunk"
import {
    productListReducer
    , productDetailsReducer
}
    from "./reducer/productReducer";
const initialState = {};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
})
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, initialState,
    composeEnchancer(applyMiddleware(thunk)));

export default store;
