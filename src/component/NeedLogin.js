import React from 'react'
import './NeedLogin.css'
import { Link } from 'react-router-dom'
import {IoLogInOutline} from 'react-icons/io5'

function NeedLogin({title}) {
  return (
    <div className='need--login'>
      <h1>{title}</h1>
      <div className="need--login--wraper">
        <IoLogInOutline fontSize='36px'/>
        <span>Anda harus login</span>
        <p>Anda harus login terlebih dahulu</p>
        <div className="need--login--buttons--wraper">
          <Link to='/login'>Login</Link>
          <Link to='/signup'>SignUp</Link>
        </div>
      </div>
    </div>
  )
}

export default NeedLogin
