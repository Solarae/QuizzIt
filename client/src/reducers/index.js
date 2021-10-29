import { combineReducers } from 'redux'
import authReducer from './authReducer'
import platformReducer from './platformReducer'

export default combineReducers({
    auth: authReducer,
    platforms: platformReducer
})
