import React, { useState, useEffect } from 'react'
import {FormComponent} from '../../../../common/components'

function SignUpComponent(props) {
	return(
		<React.Fragment>
				<FormComponent values={{email:'', username:'' ,password: '', confirmPassword:''}} title={'Please Tell Us a Little About You'}  passwordRegex={props.passwordRegex} buttonTitle='SignUp' handleSubmit={values => {props.handleSubmit(values)}}/>
		</React.Fragment>	
	)
}



export default SignUpComponent