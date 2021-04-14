import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCheckUser, selectUser } from '../redux/reducers/userSlice'
import './ProfileSetting.css'
import axios from '../axios'
import {setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice'

function ProfileSetting() {

  document.title = `Profile - Setting`

  const user = useSelector(selectUser)

  const [username, setUsername] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [bio, setBio] = useState('')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [youtube, setYoutube] = useState('')

  useEffect(() => {
    if(user !== null){
      setUsername(user?.username)
      setBirthDate(user?.birthDate?.slice(0,10))
      setBio(user?.bio)
      setFacebook(user?.socialMedia?.facebook)
      setInstagram(user?.socialMedia?.instagram)
      setTwitter(user?.socialMedia?.twitter)
      setYoutube(user?.socialMedia?.youtube)
    }
  }, [user])

  const dispatch = useDispatch()

  const saveProfile= async ()=>{
    await axios.patch(`/user/${user?._id}/update`,{
    username,
    bio,
    birthDate,
    socialMedia:{
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      youtube: youtube,
    }
    })
    .then(res=> {
      dispatch(setOpenSuccessSnackbar(true))
      dispatch(setSuccessMessage(res.data))
      dispatch(fetchCheckUser())
    })
    .catch(err=>{
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))

    })
  }
  return (
    <>
        <div className='profile-setting'>
          <h1>Setting</h1>
          <form id="profil" className='profile-setting-form'>
            <div className='profile-setting-inputContainer'>
              <label>Username</label>
              <input name='username' className='profile-setting-input' type='text' value={username} onChange={(e)=> setUsername(e.target.value)}/>
            </div>
            <div className='profile-setting-inputContainer'>
              <label>Tanggal Lahir</label>
              <input name='birthdate' className='profile-setting-input' type='date' value={birthDate} onChange={(e)=> setBirthDate(e.target.value)}/>
            </div>
            <div className='profile-setting-inputContainer'>
              <label>Bio</label>
              <textarea name='bio' className='profile-setting-textarea' rows="6" cols="50" value={bio} onChange={(e)=> setBio(e.target.value)}></textarea>
            </div>
            <div id='social-media' className='profile-setting-social-media'>
              <h3>Sosial Media</h3>
            <div className='profile-setting-inputContainer'>
              <label>Facebook</label>
              <input name='facebook' placeholder='https://www.facebook.com/...' 
                      className='profile-setting-input' 
                      type='text' 
                      value={facebook} 
                      onChange={(e)=> setFacebook(e.target.value)}/>
            </div>
            <div className='profile-setting-inputContainer'>
              <label>Instagram</label>
              <input name='instagram' placeholder='https://www.instagram.com/...' 
                      className='profile-setting-input' 
                      type='text' 
                      value={instagram} 
                      onChange={(e)=> setInstagram(e.target.value)}/>
            </div>
            <div className='profile-setting-inputContainer'>
              <label>Twitter</label>
              <input name='twitter' placeholder='https://www.twitter.com/...' 
                      className='profile-setting-input' 
                      type='text' 
                      value={twitter} 
                      onChange={(e)=> setTwitter(e.target.value)}/>
            </div>
            <div className='profile-setting-inputContainer'>
              <label>Youtube</label>
              <input name='youtube' placeholder='https://www.youtube.com/channel/...' 
                      className='profile-setting-input' 
                      type='text' 
                      value={youtube} 
                      onChange={(e)=> setYoutube(e.target.value)}/>
            </div>
          </div>
            <button className='profile-setting-save-button' onClick={(e)=>{
              e.preventDefault()
              saveProfile()}
              }>SAVE</button>
          </form>
        </div>                        
    </>
    
  )
}

export default ProfileSetting
