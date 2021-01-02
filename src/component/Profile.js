import React, {useEffect, useState } from 'react'
import {fetchCheckUser, selectUser} from '../redux/reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Profile.css'
import { Avatar, Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ProfileTabs from './ProfileTabs'
import ProfileOverview from './ProfileOverview'
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import ProfileTournaments from './ProfileTournaments'
import ProfileFriends from './ProfileFriends'
import ProfileTeam from './ProfileTeam'
import ProfileStats from './ProfileStats'
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../axios'
import { setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice'

const useStyles = makeStyles(() => ({
  root: {
    width: '130px',
    height: '130px'
  },
  paper:{
      backgroundColor: '#2d303e',
      width: '600px'
    },
    title:{
      color: 'white',
      '& h2':{
        fontFamily: 'Open Sans',
        fontWeight: 600
      }
    },
    content:{
      overflow: 'hidden'
    },
    action:{
      margin: '20px',
      justifyContent: 'flex-end'
    },
}));


function Profile() {
  const user = useSelector(selectUser)
  const classes = useStyles()
  let { path } = useRouteMatch();
  const dispatch = useDispatch()
  const {id} = useParams()
  const isUserLoggedIn = id === user?._id ? true : false

  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null)
  const [user_, setUser_] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validImageRes = (e) => {
    const img = new Image();
    img.src = window.URL.createObjectURL(e.target.files[0]);

    img.addEventListener("load", () => {
      window.URL.revokeObjectURL(img.src);
      if (img.naturalWidth > 500 || img.naturalHeight > 500) {
        return false;
      }
    });
    return true;
  };

   const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      if (validImageRes(e)) {
        setProfilePicture(e.target.files[0])
      } else {
        console.log("salah");
      }
    }
  };

  const formData = new FormData()
  formData.append('profilePicture', profilePicture)

  const uploadProfilePicture = async ()=>{
    await axios.patch(`/user/${user._id}/profilePicture/upload`,formData)
    .then(res=>{
      setOpen(false)
      dispatch(fetchCheckUser())
      dispatch(setOpenSuccessSnackbar(true))
      dispatch(setSuccessMessage(res.data))
      
    })
    .catch(err=>{
      setOpen(false)
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))
    })
  }

  
  
  useEffect(() => {
    let mounted = true
    if(!isUserLoggedIn){
      const fecthUser = async ()=>{
        const req = await axios.post(`/user/${id}`)
        if(mounted){
        setUser_(req.data)
        }
      }
      fecthUser()
    }
    return ()=> mounted = false
  }, [isUserLoggedIn,id])

  return (
    <>
    {!user && <Redirect to='/login'/>}
    <>
      <div className='profile'>
       <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.title}} id="form-dialog-title">Upload Foto Profil</DialogTitle>
        <DialogContent classes={{root: classes.content}}>
          <input
            type="file"
            name="profilePicture"
            accept="image/png"
            onChange={handleLogoChange}
          />
        {/* <span className="error-msg" style={{opacity:formErrors ? 1 : 0 }}>{formErrors ? formErrors : 'error'}</span> */}
        </DialogContent>
        <DialogActions classes={{root: classes.action}}>
          <button className='cancel-button' onClick={handleClose}>
            Batal
          </button>
          <button className='create-team-button' onClick={uploadProfilePicture}>Upload
            {/* {isSubmitting ?  
            <Loader
              type="ThreeDots"
              color="black"
              height={20}
              width={30}
            /> : 'Upload'} */}
          </button>
        </DialogActions>
      </Dialog>

        <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={ isUserLoggedIn &&
          <IconButton onClick={handleClickOpen} aria-label="uploadPhoto" size="small">
              <AddAPhotoIcon fontSize="small" style={{color: 'white'}}/>
          </IconButton>
        }
      >
        <Avatar className={classes.root} src={isUserLoggedIn ? user?.profilePicture : user_?.profilePicture} 
        alt={isUserLoggedIn ? user?.username : user_?.username}/>
      </Badge>
        <h3>{isUserLoggedIn ? user?.username : user_?.username}</h3>
      </div> 
      <Switch>
        <Route exact path={path}>
          <ProfileTabs isUser={isUserLoggedIn} user_={user_} tab={1}/>
          <ProfileOverview isUser={isUserLoggedIn} user_={user_}/>
        </Route>
        <Route path={`/profile/${isUserLoggedIn ? user?._id : user_?._id}/overview`}>
          <ProfileTabs isUser={isUserLoggedIn} user_={user_} tab={1}/>
          <ProfileOverview isUser={isUserLoggedIn} user_={user_}/>
        </Route>
        <Route path={`/profile/${isUserLoggedIn ? user?._id : user_?._id}/stats`}>
          <ProfileTabs isUser={isUserLoggedIn} user_={user_} tab={2}/>
          <ProfileStats isUser={isUserLoggedIn} user_={user_}/>
        </Route>
        
        <Route path={`/profile/${isUserLoggedIn ? user?._id : user_?._id}/team`}>
          <ProfileTabs isUser={isUserLoggedIn} user_={user_} tab={3}/>
          <ProfileTeam isUser={isUserLoggedIn} user_={user_}/>
        </Route>
        <Route path={`/profile/${isUserLoggedIn ? user?._id : user_?._id}/friends`}>
          <ProfileTabs isUser={isUserLoggedIn} user_={user_} tab={4}/>
          <ProfileFriends isUser={isUserLoggedIn} user_={user_}/>
        </Route>
        <Route path={`/profile/${isUserLoggedIn ? user?._id : user_?._id}/tournaments`}>
          <ProfileTabs isUser={isUserLoggedIn} user_={user_} tab={5}/>
          <ProfileTournaments isUser={isUserLoggedIn} user_={user_}/>
        </Route>
      </Switch>
    </>
    </>
  )
}

export default Profile
