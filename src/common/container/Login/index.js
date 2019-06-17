import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FormSubmitAction, getPasswordAction } from '../actions'
import {LoginComponent, ForgotPasswordComponent, SignUpComponent} from './components'

function Login(props) {
	
	const [activeComponent, setActiveComponent] = useState('Login')
	const [passwordRegex, setPasswordRegex] = useState('')

	useEffect(() => {
		if(localStorage.getItem('authToken')){
			props.history.push('/User')
		}else{
			props.getPasswordAction()
		}
		
	}, [])


	useEffect(() => {
		if(Object.keys(props.loginData).length > 0){
			props.history.push('/User')
		}
		if(Object.keys(props.signupData).length > 0){
			props.history.push('/User')
		}
		if(props.passwordData && Object.keys(props.passwordData).length >0){
			
			let passwordRegex = '/^'
			if(props.passwordData['require_number']){
				passwordRegex += '(?=.*\d)'
			}
			if(props.passwordData['require_lowercase']){
				passwordRegex += '(?=.*[a-z])'
			}
			if(props.passwordData['require_uppercase']){
				passwordRegex += '(?=.*[A-Z])'
			}
			if(props.passwordData['require_special']){
				passwordRegex += '(?=.*[!@#$%^&*(),.?":{}|<>])'
			}
			passwordRegex += '.{' + props.passwordData['min_chars'] + ',' + props.passwordData['max_chars'] + '}$/'
			setPasswordRegex(passwordRegex)
		}
	},[props.loginData, props.signupData, props.passwordData])

	


	const handleSubmit = (values) =>{
		props.FormSubmitAction(activeComponent, values)
	}

	const handleToggle = () =>{
		if(activeComponent === 'Login'){
			setActiveComponent('Signup')
		}else{
			setActiveComponent('Login')
		}
	}


	

	const renderComponent = () => {
		 switch(activeComponent){
		 	 case 'Login':
		 	 return <LoginComponent passwordRegex={passwordRegex} handleSubmit={handleSubmit}/>
		 	 break;
		 	 case 'Signup':
		 	 return <SignUpComponent passwordRegex={passwordRegex} handleSubmit={handleSubmit}/>
		 	 break;
		 	 case 'forgotPassword':
		 	 return <ForgotPasswordComponent  handleSubmit={handleSubmit}/>
		 	 break;
		 	 default:
		 	 return null
		 	 break;
		 }
	}




	 return(
	 		<div className={activeComponent === 'Login' ? 'LoginContainer' : activeComponent === 'Signup' ? 'SignupContainer' : 'LoginContainer'}>

	 			{renderComponent()}
	 			
	 			<div className="BottomContainer">
	 				<button className="button-secondary Left" onClick={handleToggle}>{activeComponent === 'Login' ? 'Signup' : 'Login'} </button>
	 				{activeComponent !== 'forgotPassword' ? <a className="ForgotLink Right" onClick={() => {setActiveComponent('forgotPassword')}}> Forgot Password?</a>: null}
	 			</div>
	 			
	 		</div>
		  )


}


const mapStateToProps = (state) => {
  return {
    loginData: state.login.data,
    passwordData: state.passwordData.data,
    signupData: state.signupData.data
  }
}

export default withRouter(connect(mapStateToProps, { FormSubmitAction, getPasswordAction })(Login))
