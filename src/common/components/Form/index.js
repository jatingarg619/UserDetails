
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';


// function validateEmail(value) {
//   let error;
//   if (!value) {
//     error = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//     error = 'Invalid email address';
//   }
//   return error;
// }

// function validateUsername(value) {
//   let error;
//   if (value === 'admin') {
//     error = 'Nice try!';
//   }
//   return error;
// }


// function validatePassword(value) {
//   let error;
//   if (value === 'admin') {
//     error = 'Nice try!';
//   }
//   return error;
// }


// function validateConfirmPassword(value) {
//   let error;
//   if (value === 'admin') {
//     error = 'Nice try!';
//   }
//   return error;
// }



const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required(),
  password: yup
    .string()
    .required()
    .min(2, 'Seems a bit short...')
    .max(20, 'We prefer insecure system, try a shorter password.')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,1024}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});


const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required(),
});




const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required(),  
  password: yup
    .string()
    .required('Please Enter a Password')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,1024}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required('Please Enter a Confirm Password')
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ya fool', function(value) {
      return this.parent.password === value;
    }),
  username: yup
    .string()
    .required('Please Enter a username')
    .label('Display Name')
    .required()
});


function FormComponent (props) {
  console.log(props.values)
return(
  <div className='FormContainer'>
    <div className='FormTitle'>{props.title}</div>
    <Formik
      initialValues={props.values}
      onSubmit={values => {
        console.log(values)
        props.handleSubmit(values)
      }}
    validationSchema={props.buttonTitle === 'Login' ? LoginSchema: props.buttonTitle ==='SignUp' ? SignupSchema: ForgotPasswordSchema }
    >
      {({ errors, touched,  isValidating  }) => (
        <Form>
         {props.values['email'] !== undefined? <React.Fragment> <Field type="email" name="email" placeholder='Email'    />
          {errors.email && touched.email && <div>{errors.email}</div>}</React.Fragment>: null}

         {props.values['username'] !== undefined ? <React.Fragment> <Field name="username" placeholder='Display Name'  />
          {errors.username && touched.username && <div>{errors.username}</div>}</React.Fragment>: null}

         {props.values['password'] !== undefined ? <React.Fragment> <Field type="password" name="password" placeholder='Password'  />
          {errors.password && touched.password && <div>{errors.password}</div>}</React.Fragment>: null} 
          
         {props.values['confirmPassword'] !== undefined ? <React.Fragment> <Field name="confirmPassword" type="password" placeholder='ConfirmPassword'  />
          {errors.confirmPassword && touched.confirmPassword && <div>{errors.confirmPassword}</div>}</React.Fragment>: null} 

          <button type="submit">{props.buttonTitle}</button>
        </Form>
      )}
    </Formik>
  </div>
  )
};

export default FormComponent