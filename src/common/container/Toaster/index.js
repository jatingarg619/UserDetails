import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { parse } from 'query-string';
import { errorCancel, successCancel } from '../actions'

const ToastNotify = ({ name, flag }) => <div>
  
  <span className='mainMsg'>
    {name}
  </span>
</div>;

function Toaster(props) {

  useEffect(() => {
      if(props.error.message !== '' && props.error.type !== 'Internal Server Error'){
          toast.error(<ToastNotify name={props.error.message} flag={false} />, {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          hideProgressBar: true,
          className: 'errorToast notification',
          autoClose: 2200
        });
        props.errorCancel()  
      }
       if(props.error.message !== '' && props.error.type === 'Internal Server Error'){
          toast.error(<ToastNotify name={props.error.message} flag={false} />, {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: false,
          hideProgressBar: true,
          className: 'errorToast notification',
          autoClose: 2200
        });
          
        window.location.href = window.location.origin
        
      }
      if(props.success.message !== '' && props.success.type !== 'logout' ){
           toast.success(<ToastNotify name={props.success.message} flag={true} />, {
           position: toast.POSITION.TOP_RIGHT,
           closeButton: false,
           hideProgressBar: true,
           className: 'successToast notification',
           autoClose: 2200
         });
           console.log(props, "in not logout")
        props.successCancel()
      }
      if(props.success.message !== '' && props.success.type === 'logout' ){
           toast.success(<ToastNotify name={props.success.message} flag={true} />, {
           position: toast.POSITION.TOP_RIGHT,
           closeButton: false,
           hideProgressBar: true,
           className: 'successToast notification',
           autoClose: 2200
         });
          console.log(props, "in logout") 
        props.successCancel()  
        window.location.href = window.location.origin
       }




  }, [props.error, props.success])


  return(
     <ToastContainer />
      )

}


const mapStateToProps = (state) => {
  return {
    error: state.error,
    success: state.success
  }
}

export default connect(mapStateToProps, {errorCancel, successCancel})(Toaster)