import { combineReducers } from 'redux'
import { common } from '../../common/container/reducers'
import {getUserDataReducer} from './UserDetails/reducer'

export const rootReducer = combineReducers({
	...common,
	userData:getUserDataReducer
})