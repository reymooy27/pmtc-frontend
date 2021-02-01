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
  Link,
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import socket from '../socket.io';

function Profile() {

  const matches = useMediaQuery('(min-width:600px)');
  const margin = matches ? '32px' : '0px'
  const height = matches ? 'none' : '100%'
  const maxHeight = matches ? 'calc(100% - 64px)' : 'none'
  const fontsize = matches ? '1.5em' : '2em'
      
const useStyles = makeStyles(() => ({
  root: {
    width: '130px',
    height: '130px'
  },
  paper:{
      backgroundColor: '#2d303e',
      width: '600px',
      height: height,
      margin: margin,
      maxHeight: maxHeight
    },
    title:{
      color: 'white',
      '& h2':{
        fontFamily: 'Open Sans',
        fontWeight: 600,
        fontSize: fontsize
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

  const user = useSelector(selectUser)
  const classes = useStyles()
  let { path } = useRouteMatch();
  const dispatch = useDispatch()
  const {id} = useParams()
  const isUserLoggedIn = id === user?._id ? true : false

  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null)
  const [user_, setUser_] = useState(null)
  const [requestSent, setRequestSent] = useState(false)
  const [isFriend, setIsFriend] = useState(false)
  const [friendRequest, setFriendRequest] = useState(null)
  const [newRequest, setNewRequest] = useState(null)
  const [unFriend, setUnFriend] = useState(null)

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
        const req = await axios.get(`/user/${id}`)
        if(mounted){
        setUser_(req.data)
        }
      }
      fecthUser()
    }
    return ()=> mounted = false
  }, [isUserLoggedIn,id, newRequest, unFriend])

  let x = user?.friends
  useEffect(() => {
    if(x?.length > 0){
      const a = x.filter(f=>(
        f._id === id
      ))
      console.log(a)
      if(a.length > 0){
        setIsFriend(true)
      }else{
        setIsFriend(false)
      }
    }
  }, [id,x, newRequest, unFriend])

  useEffect(() => {
    let mounted = true
    if(!isUserLoggedIn){
    const getFriendRequest = async ()=>{
      await axios.get(`/friendRequest/${id}`)
      .then(res=>{
        if(mounted){
          setFriendRequest(res.data)
        }
      })
      .catch(err=> console.log(err))
    }
    getFriendRequest()
  }
    return ()=> mounted = false
  }, [isUserLoggedIn, id, newRequest, unFriend])

  useEffect(() => {
    if(!isUserLoggedIn){
      if(friendRequest?.accepted === false && friendRequest?.pending === true){
        setRequestSent(true)
      }else{
        setRequestSent(false)
      }
    }
  }, [isUserLoggedIn, friendRequest, newRequest, unFriend])

  useEffect(() => {
    dispatch(fetchCheckUser())
  }, [dispatch,newRequest, unFriend])

  useEffect(() => {
    socket.on("friendRequest", (data) => setNewRequest(data === newRequest ? data+'1' : data));

    return ()=> socket.removeAllListeners("friendRequest");
  }, [newRequest])

  useEffect(() => {
    socket.on("unFriend", (data) => setUnFriend(data === unFriend ? data+'1' : data));

    return ()=> socket.removeAllListeners("unFriend");
  }, [unFriend])

  const sendFriendRequest = async ()=>{
    await axios.post(`/friendRequest/send/${id}`)
    .then(res=> {
      dispatch(setOpenSuccessSnackbar(true))
      dispatch(setSuccessMessage(res.data))
      setRequestSent(true)
    })
    .catch(err=> {
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))
    })
  }

  const cancelFriendRequest = async ()=>{
    await axios.get(`/friendRequest/cancel/${id}`)
    .then(res=> {
      dispatch(setOpenSuccessSnackbar(true))
      dispatch(setSuccessMessage(res.data))
      setRequestSent(false)
      setIsFriend(false)
    })
    .catch(err=> {
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))
    })
  }

  const cancelFriendship = async ()=>{
    await axios.get(`/user/unfriend/${id}`)
    .then(res=>{
      dispatch(setOpenSuccessSnackbar(true))
      dispatch(setSuccessMessage(res.data))
      setRequestSent(false)
      setIsFriend(false)
    })
    .catch(err=> {
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))
    })
  }


  return (
    <>
    {!user && <Redirect to='/'/>}
    <>
      <div className='profile'>
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
        {!isUserLoggedIn && <div className='profile-button-wraper'>
          <Link to={`/chat/${id}`} className='profile-button-chat'>Chat</Link>
          {isFriend ? <button className='requestSent profile-button-add-friends' onClick={cancelFriendship}>Unfriend</button> : requestSent 
          ? 
          <button className='requestSent profile-button-add-friends' onClick={cancelFriendRequest}>Batalkan</button> 
          :  
          <button disabled={requestSent} 
                  onClick={sendFriendRequest} 
                  className='profile-button-add-friends'
          >Tambahkan Teman
          </button>}
        </div>}
        <div className='profile-overview-stats'>
          <div>
            <h5>Match</h5>
            <span>0</span>
          </div>
          <div>
            <h5>Winrate</h5>
            <span>0%</span>
          </div>
          <div>
            <h5>Followers</h5>
            <span>0</span>
          </div>
        </div>
      </div>

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
