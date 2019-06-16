import { GET_LOGIN_DATA, GET_PASSWORD_DATA , GET_SIGNUP_DATA, GET_RESETPASSWORD_DATA} from '../constants'

export function FormSubmitAction(activeComponent,value) {
   switch(activeComponent){
		 	 case 'Login':
		 	 return {
  				  type: GET_LOGIN_DATA,
    				payload: {
    						  'email': value.email,
    						  'password': value.password	
  						}
    				}
		 	 break;
		 	 case 'Signup':
		 	  return {
    				type: GET_SIGNUP_DATA,
    				payload: {
    						  'display_name': value.username,
    						  'email': value.email,
    						  'password': value.password	
  						}
 					 }
		 	 break;
		 	 case 'forgotPassword':
		 	   return {
   					 type: GET_RESETPASSWORD_DATA,
   					 payload: {
    						  'email': value.email
  						}
					  }
		 	 break;
		 	 default:
		 	 return null
		 	 break;
		 }
 
}




export function getPasswordAction() {
  return {
    type: GET_PASSWORD_DATA
  }
}


export function getSignupAction(value) {
  return {
    type: GET_SIGNUP_DATA,
    payload: value
  }
}


export function getResetPasswordAction(value) {
  return {
    type: GET_RESETPASSWORD_DATA,
    payload: value
  }
}