const google = window.google = window.google ? window.google : {}
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import  {RightDrawer, Modal} from '../../../common/components'
import {getUserAction,getResetPasswordAction, logoutAction} from '../actions'





const data = [
		{	
			lat: 18.558503,
			lang: 73.802899,
			name: 'Panchsheel Park',
			address: 'Aundh Pune Maharashtra'
		},
		{
			lat: 18.548927,
			lang: 73.797984,
			name: 'Late Sanjay Mahadeo Park',
			address: 'Pashan Pune Maharashtra'
		},
		{
			lat: 18.568619,
			lang: 73.783224,
			name: 'Smart city park Baner',
			address:'Baner Pune Maharashtra'
		},
		{
			lat: 18.555433,
			lang:73.814464,
			name:'The Oval Garden',
			address:'Aundh Pune Maharashtra'
		},
		{
			lat: 18.545833,
			lang: 73.807596,
			name: 'IISER Park',
			address: 'Pashan Pune Maharashtra'
		}

]


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 18.5204, lng: 73.8567 }}
  >
  	{props.data.map((item, i) => {
  		return(<Marker
  			    position={{ lat: item.lat, lng: item.lang }}
  			    onMouseOver={() => {props.handleMouseOver(i)}}
  			    onMouseOut={() => {props.handleMouseOut(i)}}
  			    onClick={() => {props.handleClick(i)}}
  				 >
  				 { props.showInfoWindow === i ?
                    <InfoWindow>
                        <h4>{item.name}</h4>
                    </InfoWindow>: null}
                  
  				</Marker> 

  			   )
  		})}
  </GoogleMap>
))




// const MyMapComponent = compose(
//     withProps({
//         googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyADP5oEiu2kOKMklYVPda5Aytm&v=3.exp&libraries=geometry,drawing,places",
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `400px` }} />,
//         mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap,
//     withState('places', 'updatePlaces', ''),
//     withHandlers(() => {
//         const refs = {
//             map: undefined,
//         }

//         return {
//             onMapMounted: () => ref => {
//                 refs.map = ref
//             },
//             fetchPlaces: ({ updatePlaces }) => {
//                 let places;
//                 const bounds = refs.map.getBounds();
//                 const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
//                 const request = {
//                     bounds: bounds,
//                     type: ['hotel']
//                 };
//                 service.nearbySearch(request, (results, status) => {
//                     if (status == google.maps.places.PlacesServiceStatus.OK) {
//                         console.log(results);
//                         updatePlaces(results);
//                     }
//                 })
//             }
//         }
//     }),
// )((props) => {
//     return (
//         <GoogleMap
//             onTilesLoaded={props.fetchPlaces}
//             ref={props.onMapMounted}
//             onBoundsChanged={props.fetchPlaces}
//             defaultZoom={8}
//             defaultCenter={{ lat: 51.508530, lng: -0.076132 }}
//         >
//             {props.places && props.places.map((place, i) =>
//                 <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
//             )}
//         </GoogleMap>
//     )
// })



function UserDetails(props){
	const [toggle, setToggle] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [showInfoWindow, setShowInfoWindow] = useState(null)
	const [showClick, setShowClick] = useState(null)

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

	const handleMouseOver=(i) => {
		 
		 setShowInfoWindow(i)
	}

	const handleMouseOut = (i) => {
		setShowInfoWindow(null)
	}


	const handleClick = (i) => {
			setShowClick(i)
	}

	const renderTable = (showClick) => {
		 return data.map((item, i) => {
		 	return (
		 		    <tr className={showClick === i ? 'colorRed' : null} key={i}>
		 			  <td>{item.lat}</td>
		 			  <td>{item.lang}</td>
		 			  <td>{item.name}</td>
		 			  <td>{item.address}</td>
		 			</tr>
		 		   )	
		 })
	}


	return(
		  <div className="UserContainer">
		  	<div className="Left UserTitle">user page</div>
		  	<button className="button-secondary Right logoutButton" onClick={handleLogout}>Logout</button>
		  	<button className="button-secondary Right profileButton" onClick={() => {setToggle(true)}}>Profile Info</button>
		  
		  	<table className="table">
		  		<thead>
		  			<tr>
		  				<th>Lattitude</th>
		  				<th>Longitude</th>
		  				<th>Name</th>
		  				<th>Address</th>
		  			</tr>
		  		</thead>
		  		<tbody>
		  			{renderTable(showClick)}
		  		</tbody>	
		  	</table>
		  	{showClick ? <div>{data[showClick].name}</div>: null}
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