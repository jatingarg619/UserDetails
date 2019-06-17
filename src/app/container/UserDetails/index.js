import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import  {RightDrawer, Modal} from '../../../common/components'
import {getUserAction,getResetPasswordAction, logoutAction} from '../actions'


function UserDetails(props){
	const [toggle, setToggle] = useState(false)
	const [openModal, setOpenModal] = useState(false)

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

	const handleLogout = () => {
			localStorage.clear()
			props.logoutAction()
	}

	return(
		  <div className="UserContainer">
		  	<div className="Left UserTitle">user page</div>
		  	<button className="button-secondary Right logoutButton" onClick={handleLogout}>Logout</button>
		  	<button className="button-secondary Right profileButton" onClick={() => {setToggle(true)}}>Profile Info</button>

		  	<RightDrawer open={toggle} data={props.userData} toggle={(value) => {setToggle(value)}}  handleReset={handleReset}  />
		  	<Modal openModal={openModal} handleSubmit={handleSubmit} title='Enter Email to Reset Password'/>
		  </div>

		)

}


const mapStateToProps = (state) => {
  return {
  		userData:state.userData.data
  }
}

export default withRouter(connect(mapStateToProps, { getUserAction, getResetPasswordAction , logoutAction})(UserDetails))