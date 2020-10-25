import React from 'react'
import {selectUser} from '../redux/reducers/userSlice'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './Profile.css'
import { Avatar } from '@material-ui/core'

function Profile() {
  const user = useSelector(selectUser)

  return (
    <>
    {user ?
      <div className='profile'>
        <Avatar src={user.profilePicture} alt={user.username}/>
        <h3>{user.username}</h3>
      </div> 
    : <Redirect to='/login'/>}
    </>
  )
}

export default Profile
