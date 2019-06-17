
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';



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
 
  return(
    <div className='FormContainer'>
       <div className='FormTitle'>{props.title}</div>
       <Formik
           initialValues={props.values}
           onSubmit={values => {
            props.handleSubmit(values)
           }}
           validationSchema={props.buttonTitle === 'Login' ? LoginSchema: props.buttonTitle ==='SignUp' ? SignupSchema: ForgotPasswordSchema }
        >
         {({ errors, touched,  isValidating  }) => (
           <Form className="FormContent">
                {props.values['email'] !== undefined? <React.Fragment> <Field className="FormInput" type="email" name="email" placeholder='Email'    />
                {errors.email && touched.email && <div className="FormError">{errors.email}</div>}</React.Fragment>: null}

                {props.values['username'] !== undefined ? <React.Fragment> <Field className="FormInput" name="username" placeholder='Display Name'  />
                {errors.username && touched.username && <div className="FormError">{errors.username}</div>}</React.Fragment>: null}

                {props.values['password'] !== undefined ? <React.Fragment> <Field className="FormInput" type="password" name="password" placeholder='Password'  />
                {errors.password && touched.password && <div className="FormError">{errors.password}</div>}</React.Fragment>: null} 
          
                {props.values['confirmPassword'] !== undefined ? <React.Fragment> <Field className="FormInput" name="confirmPassword" type="password" placeholder='ConfirmPassword'  />
              {errors.confirmPassword && touched.confirmPassword && <div className="FormError">{errors.confirmPassword}</div>}</React.Fragment>: null} 

          <button className="button-primary" type="submit">{props.buttonTitle}</button>
          </Form>
      )}
    </Formik>
  </div>
  )
};

export default FormComponent