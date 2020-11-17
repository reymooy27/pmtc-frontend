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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles(() => ({
  root: {
    width: '80px',
    height: '80px'
  },
}));

function Profile() {
  const user = useSelector(selectUser)
  const classes = useStyles()
  let { path } = useRouteMatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    {user ?
    <>
      <div className='profile'>
       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
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
