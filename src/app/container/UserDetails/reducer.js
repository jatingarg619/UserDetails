import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  ERROR,
  URL
} from '../constants'



const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

export function getUserDataReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case GET_USER_DATA_SUCCESS:
    
      return {
        ...state,
        data: action.payload,
        error: false,
        loading: false
      }
    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        error: true,
        data: [],
        loading: false
      }
    default:
      return state
  }
}