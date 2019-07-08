import { combineEpics } from 'redux-observable';
import {getLoginDataEpic, getPasswordDataEpic,getSignUpDataEpic, getResetPasswordDataEpic} from '../../common/container/epics'
import {getUserDataEpic} from  './UserDetails/epic'


export const rootEpic = combineEpics(
	getLoginDataEpic,
	getPasswordDataEpic,
	getSignUpDataEpic,
	getResetPasswordDataEpic,
	getUserDataEpic
)