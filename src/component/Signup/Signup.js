import React, { useCallback, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { Link, Redirect } from 'react-router-dom';
import axios from '../../axios'
import './Signup.css'
function Signup() {

document.title = `Signup`

  const initialState = {email: '', username: '', password: ''}
  const [formValues, setFormValues] = useState(initialState)
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState('')
  const [redirectTo, setRedirectTo] = useState(false)

  const submitForm = useCallback(
    () => {
      axios({
  method: 'post',
  url: '/signup',
  data: {
    email: formValues.email,
    username: formValues.username,
    password: formValues.password
  },
  headers:{
    "Content-Type": "application/json"
  }
  }).then(res=> {
    setSignupSuccess(res.data.msg)
    setRedirectTo(true)
  })
  .catch(err=> {
    setFormErrors({err})
    console.log(err)
  })
    },
    [formValues.email,formValues.username,formValues.password],
  )
  
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

   const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Tidak boleh kososng";
    }

    if (!values.email) {
      errors.email = "Tidak boleh kososng";
    }

    if (!values.password) {
      errors.password = "Tidak boleh kososng";
    } else if (values.password.length < 5) {
      errors.password = "Tidak boleh kurang dari 5 karakter";
    }
    return errors;
  };

    useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors, isSubmitting, submitForm]);

  if(redirectTo){
  return(<Redirect to='/login'/>)
}

  return (
    <div className='signup'>
      <form className="signup_form" onSubmit={handleSubmit}>
        <div className='signup-title'>
          <h2>Sign Up</h2>
          {signupSuccess ? signupSuccess : ''}
          {formErrors.err ? <span>{formErrors.err.response.data}</span> : ''}
        </div>
      <input
      className={formErrors.username || formErrors.err  ? 'signup-input signup-error' : 'signup-input'}
        type="text"
        id="username"
        name="username"
        autoFocus
        autoComplete="username"
        placeholder="Username"
        value={formValues.username}
        onChange={handleChange}
      />
      <span className="error-msg" style={{opacity:formErrors.username ? 1 : 0 }}>{formErrors.username ? formErrors.username : 'error'}</span>

      <input
      className={formErrors.email || formErrors.err  ? 'signup-input signup-error' : 'signup-input'}
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleChange}
      />
      <span className="error-msg" style={{opacity:formErrors.email ? 1 : 0 }}>{formErrors.email ? formErrors.email : 'error'}</span>

      <input
      className={formErrors.password || formErrors.err ? 'signup-input signup-error' : 'signup-input'}
        type="password"
        id="password"
        name="password"
        maxLength='10'
        autoComplete="current-password"
        placeholder="Password"
        value={formValues.password}
        onChange={handleChange}
      />
      <span className="error-msg" style={{opacity:formErrors.password ? 1 : 0 }}>{formErrors.password ? formErrors.password : 'error'}</span>

      <div className='signup--button-container'>
      <span>Sudah punya akun ?, <Link to='/login'>Login</Link></span>
      <button className="signup-button" type="submit" disabled={Object.keys(formErrors).length === 0 && isSubmitting ? true : false}>{Object.keys(formErrors).length === 0 && isSubmitting ? <Loader
          type="ThreeDots"
          color="black"
          height={20}
          width={30}
        /> : 'Sign Up'}</button>
      </div>
    </form>
    <br></br>
    </div>
  )
}

export default Signup
