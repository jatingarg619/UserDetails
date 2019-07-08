import { GET_USER_DATA, LOGOUT_SUCCESS} from '../constants'


export function getUserAction() {
  return {
    type: GET_USER_DATA
  }
}


export function logoutAction() {
  return {
    type: LOGOUT_SUCCESS
  }
}

