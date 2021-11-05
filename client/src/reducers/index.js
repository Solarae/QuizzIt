import { combineReducers } from 'redux'
import authReducer from './authReducer'
import platformReducer from './platformReducer'
import quizReducer from './quizReducer'
import awardReducer from './awardReducer'
import searchReducer from './searchReducer'
import submissionReducer from './submissionReducer'

export default combineReducers({
    auth: authReducer,
    platforms: platformReducer,
    quiz: quizReducer,
    awards: awardReducer,
    search: searchReducer,
    submission: submissionReducer
})
