import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducer/authReducer';
import { uiDispositiveReducer } from '../reducer/uiDispositiveReducer';
import { uiUserReducer } from '../reducer/uiUserReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducer = combineReducers({
    auth: authReducer,
    uiDispositive: uiDispositiveReducer,
    uiUser: uiUserReducer
})


export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
)