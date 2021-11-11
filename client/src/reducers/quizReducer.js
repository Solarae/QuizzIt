import {
  GET_QUIZ,
  GET_QUIZ_FAIL,
  QUIZ_LOADING,
  CREATE_QUIZ_REQ,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_FAIL,
  ADD_QUIZ_QUESTION,
  ADD_QUIZ_QUESTION_FAIL,
  EDIT_QUIZ_QUESTION,
  EDIT_QUIZ_QUESTION_FAIL,
  DELETE_QUIZ_QUESTION,
  DELETE_QUIZ_QUESTION_FAIL,
  EDIT_QUIZ,
} from "../actions/types";

const initialState = {
  isLoading: true,
  isCreateLoading: false,
  quiz: null,
  errors: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUIZ:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        errors: null,
      };
    case GET_QUIZ_FAIL:
      return {
        ...state,
        quiz: null,
        isLoading: false,
      };
    case ADD_QUIZ_QUESTION:
      return {
        ...state,
        ...action.payload,
        errors: null,
      };
    case ADD_QUIZ_QUESTION_FAIL:
      return {
        ...state,
        ...action.payload,
      };

    case EDIT_QUIZ:
      return {
        ...state,
        ...action.payload,
      };
    case EDIT_QUIZ_QUESTION:
      return {
        ...state,
        ...action.payload,
        errors: null,
      };
    case EDIT_QUIZ_QUESTION_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_QUIZ_QUESTION:
      return {
        ...state,
        ...action.payload,
        errors: null,
      };
    case DELETE_QUIZ_QUESTION_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    case QUIZ_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_QUIZ_REQ:
      return {
        ...state,
        isCreateLoading: true,
      };
    case CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isCreateLoading: false,
        errors: null,
      };
    case CREATE_QUIZ_FAIL:
      return {
        ...state,
        ...action.payload,
        isCreateLoading: false,
      };
    default:
      return state;
  }
};

export default quizReducer;
