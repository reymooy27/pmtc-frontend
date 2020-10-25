import React, { useCallback, useEffect, useState } from 'react'
import axios from '../axios'
import './Login.css'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../redux/reducers/userSlice'
import { useDispatch } from 'react-redux'

function Login() {

const initialState = {username: '', password: ''}
const [formValues, setFormValues] = useState(initialState)
 const [formErrors, setFormErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false)
const [loginSuccess, setLoginSuccess] = useState('')
const [redirectTo, setRedirectTo] = useState(false)

  const dispatch = useDispatch()

  const checkAuth = useCallback(
    async () => {
      const req = await axios.get('/status')
    if(req.status === 200){
      const r = await axios.post(`user/${req.data.user._id}`)
      dispatch(login(r.data))
      }
    },
    [dispatch],
  ) 
const submitForm = useCallback(
  () => {
    axios({
  method: 'post',
  url: '/login',
  data: {
    username: formValues.username,
    password: formValues.password
  },
  headers:{
    "Content-Type": "application/json"
  }
  }).then(res=> {
    setLoginSuccess(res.data.msg)
    checkAuth()
    setRedirectTo(true)
  })
  .catch(err=> {
    setFormErrors({err})
    console.log(err)
  })
  },
  [checkAuth,formValues.username,formValues.password,],
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
  return(<Redirect to='/'/>)
}

  return (
    <div className='login'>
      <form className="login_form" onSubmit={handleSubmit}>
        <div className='login-title'>
          <h2>Log In</h2>
          {loginSuccess ? loginSuccess : ''}
          {formErrors.err ? <span>{formErrors.err.response.data}</span> : ''}
        </div>
      <input
      className={formErrors.username || formErrors.err  ? 'login-input login-error' : 'login-input'}
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
      className={formErrors.password || formErrors.err ? 'login-input login-error' : 'login-input'}
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

      <button className="login-button" type="submit" disabled={Object.keys(formErrors).length === 0 && isSubmitting ? true : false}>Log In</button>
    </form>
    <br></br>
    <span>Belum punya akun ?, <Link to='/signup'>Sign Up</Link></span>
    </div>
  )
}

export default Login

