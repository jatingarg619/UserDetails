import React, { useState, useEffect } from 'react'
import {FormComponent} from '../../../../common/components'

function ForgotPasswordComponent(props) {
	return(
		<React.Fragment>
				<FormComponent values={{email:''}} title={'Please Enter Email to Reset Password'}  buttonTitle=' Reset Password' handleSubmit={values => {props.handleSubmit(values)}}/>
		</React.Fragment>
		)

}



export default ForgotPasswordComponent