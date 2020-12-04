import React, {useState } from 'react'
import {selectUser} from '../redux/reducers/userSlice'
import { useSelector } from 'react-redux'
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

const useStyles = makeStyles(() => ({
  root: {
    width: '80px',
    height: '80px'
  },
  paper:{
      backgroundColor: '#2d303e',
      width: '600px'
    },
    title:{
      color: 'white'
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

  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null)

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
      console.log(res.data);
      setOpen(false)
    })
    .catch(err=>{
      console.log(err);
      setOpen(false)
    })
  }


  

  return (
    <>
    {user ?
    <>
      <div className='profile'>
       <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.title}} id="form-dialog-title">Buat Tim Baru</DialogTitle>
        <DialogContent classes={{root: classes.content}}>
          <input
            placeholder='Masukan nama tim'
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
        badgeContent={
          <IconButton onClick={handleClickOpen} aria-label="uploadPhoto" size="small">
              <AddAPhotoIcon fontSize="small" style={{color: 'white'}}/>
          </IconButton>
        }
      >
        <Avatar className={classes.root} src={user.profilePicture} alt={user.username}/>
      </Badge>
        <h3>{user.username}</h3>
      </div> 
      <Switch>
        <Route exact path={path}>
          <ProfileTabs tab={1}/>
          <ProfileOverview/>
        </Route>
        <Route path='/profile/overview'>
          <ProfileTabs tab={1}/>
          <ProfileOverview/>
        </Route>
        <Route path='/profile/stats'>
          <ProfileTabs tab={2}/>
          <ProfileStats/>
        </Route>
        
        <Route path='/profile/team'>
          <ProfileTabs tab={3}/>
          <ProfileTeam/>
        </Route>
        <Route path='/profile/friends'>
          <ProfileTabs tab={4}/>
          <ProfileFriends/>
        </Route>
        <Route path='/profile/tournaments'>
          <ProfileTabs tab={5}/>
          <ProfileTournaments/>
        </Route>
      </Switch>
    </>  
    : <Redirect to='/login'/>}
    </>
  )
}

export default Profile
