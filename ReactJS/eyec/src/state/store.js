import {createStore, applyMiddleware, compose} from 'redux'
import  AllReducers from './reducers/'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig ={
    key:'main-root',
    storage,
}

const persistedReducer =persistReducer(persistConfig, AllReducers)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware())
)

const persistor = persistStore(store)

export {persistor}
export default store