import { applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore} from 'redux';
import thunk from "redux-thunk";
import { userReducer } from './reducers/userReducer';
let initialState = {

}

let reducers = combineReducers({
    user: userReducer

})

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store;