import { combineReducers } from 'redux'
import authReducer from './authReducer'
import platformReducer from './platformReducer'
import quizReducer from './quizReducer'

export default combineReducers({
    auth: authReducer,
    platforms: platformReducer,
    quiz: quizReducer 
})
