import { ERROR_CANCEL, SUCCESS_CANCEL } from '../constants'

export function errorCancel () {
  return { type: ERROR_CANCEL}
}

export function successCancel () {
  return {
    type: SUCCESS_CANCEL
  }
}