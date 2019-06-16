import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import  {RightDrawer, Modal} from '../../../common/components'
import {getUserAction,getResetPasswordAction, logoutAction} from '../actions'


function UserDetails(props){
	const [toggle, setToggle] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	// useEffect(() => {
	// 	if(localStorage.getItem)
	// 	props.getUserAction()
	// }, [])
	console.log(props)
	useEffect(() => {
		
			props.getUserAction()
		
		
		
	}, [])
	const handleSubmit = (email, value) =>{
		setOpenModal(value)
		if(email){
			props.getResetPasswordAction({'email':email})
		}
	}

	const handleReset = () => {
		setOpenModal(true)
	}

	const handleLogout = (event) => {
			event.preventDefault()
			localStorage.clear()
			props.logoutAction()
	}

	return(
		  <div>
		  	user page
		  	<button onClick={() => {setToggle(true)}}>Show</button>
		  	<button onClick={handleLogout}>Logout</button>
		  	<RightDrawer open={toggle} data={props.userData} toggle={(value) => {setToggle(value)}}  handleReset={handleReset} />
		  	<Modal openModal={openModal} handleSubmit={handleSubmit} title='Reset Password here Enter Email'/>
		  </div>

		)

}


const mapStateToProps = (state) => {
  return {
  		userData:state.userData.data
  }
}

export default withRouter(connect(mapStateToProps, { getUserAction, getResetPasswordAction , logoutAction})(UserDetails))