import React from 'react'
import {selectUser} from '../redux/reducers/userSlice'
import {useSelector } from 'react-redux'

function ProfileFriends() {
  const user = useSelector(selectUser)
  const friends = user.friends.map(f=> <span>{f.username}</span>)

  return (
    <div>
      {user.friends.length < 1 ? <h1>Tidak ada teman</h1> : friends }
      
    </div>
  )
}

export default ProfileFriends
