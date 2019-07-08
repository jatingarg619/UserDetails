import React, { useState, useEffect } from 'react'
import {FormComponent} from '../../../../common/components'

function LoginComponent(props) {
	return(
		<React.Fragment>
			<FormComponent  values={{email:'', 	password: ''}}  title={'Welcome! Please Login to Continue'}  buttonTitle='Login'  passwordRegex={props.passwordRegex}  handleSubmit={values => {props.handleSubmit(values)}} />
       </React.Fragment>			 
		)

}



export default LoginComponent