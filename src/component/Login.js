import React, { useCallback, useEffect, useState } from 'react'
import axios from '../axios'
import './Login.css'
import { Link, Redirect } from 'react-router-dom'
import { fetchCheckUser, selectUser } from '../redux/reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';


function Login() {

const user  = useSelector(selectUser)

const initialState = {username: '', password: ''}
const [formValues, setFormValues] = useState(initialState)
const [formErrors, setFormErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false)
const [loginSuccess, setLoginSuccess] = useState('')
const [redirectTo, setRedirectTo] = useState(false)

  const dispatch = useDispatch()

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
    dispatch(fetchCheckUser())
    setRedirectTo(true)
  })
  .catch(err=> {
    setFormErrors({err})
    console.log(err)
  })
  },
  [formValues.username,formValues.password,dispatch],
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

  const responseFacebook = async (response) => {
    await axios.post('/login/facebook',{
      accessToken: response.accessToken,
      userID: response.userID
    })
    .then(res=> {
      dispatch(fetchCheckUser())
      setRedirectTo(true)
    })
    .catch(err=> console.log(err))
  }

  const responseGoogle = async (response) => {
  await axios.post('/login/google',{tokenId: response.tokenId})
    .then(res=> {
      dispatch(fetchCheckUser())
      setRedirectTo(true)
    })
    .catch(err=> console.log(err))
  }

  const responseErrorGoogle = (response) => {
  console.log(response);
}
  
if(redirectTo){
  return(<Redirect to='/'/>)
}

  return (
    <>
      {user && <Redirect to='/'/>}
      <div className='login'>
      <div className='login-title'>
        <h2>Log In</h2>
      </div>
      <div className='facebook-login'>
          <FacebookLogin
          appId="728992861379711"
          autoLoad={false}
          callback={responseFacebook}
          render={renderProps => (
            <button className='login-with-facebook login-button' onClick={renderProps.onClick}>Login dengan Facebook</button>
          )}
        />
      </div>
      <div className='google-login'>
        <GoogleLogin
          clientId="808552961676-l3cjjdu8eh5j7sor56nj86m64hvfb1os.apps.googleusercontent.com"
          render={renderProps => (
            <button className='login-button login-with-google' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login dengan Google</button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />
      </div>
        <span>atau</span>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className='login-title'>
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
        <Link to='/'>Lupa Password ?</Link>
        <div className='login-button-container'>
          <span>Belum punya akun ? <Link to='/signup'>Sign Up</Link></span>
          <button className="login-button" type="submit" disabled={Object.keys(formErrors).length === 0 && isSubmitting ? true : false}>{Object.keys(formErrors).length === 0 && isSubmitting ? <Loader
              type="ThreeDots"
              color="black"
              height={20}
              width={30}
            /> : 'Login'}</button>
        </div>
      </form>
    </div>
    </> 
  )
}

export default Login

