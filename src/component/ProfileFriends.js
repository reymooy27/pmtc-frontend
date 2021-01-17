import React, { useState } from 'react'
import {selectUser} from '../redux/reducers/userSlice'
import {useSelector } from 'react-redux'
import './ProfileFriends.css'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../axios'
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ProfileFriends({isUser, user_}) {
  const user = useSelector(selectUser)
  const data = isUser ? user : user_

  document.title = `${user.username} - Teman`

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('')
  const [filteredUser, setFilteredUser] = useState([])

  const matches = useMediaQuery('(min-width:600px)');
  const margin = matches ? '32px' : '0px'
  const height = matches ? 'none' : '100%'
  const maxHeight = matches ? 'calc(100% - 64px)' : 'none'
  const fontsize = matches ? '1.5em' : '2em'

  const useStyles = makeStyles(() => ({
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

  const classes = useStyles()

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const updateInput = async (input) => {
    await axios.post('/user/all')
    .then(res=> {
        const filtered = res.data.filter(p => {
          return p.username.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setFilteredUser(filtered);
    })
    .catch(err=> console.log(err))
  }
  return (
    <div className='container'>
      <div className="specialFont-wraper">
          <h4 className="specialFont">Teman</h4>
      </div>
      <div className='profile-friends'>
        {data?.friends.length < 1 && 
        <div className='profile-no-friends'>
          <h3>Belum punya teman</h3>
        </div>}
        {data?.friends.map(t=> (
            <div key={t._id} className='profile-team-wraper'>
              <div className='profile-team-avatar'>
                <Link to={'/user/' + t._id} >
                  <Avatar className={classes.root} src={t.profilePicture} alt={t.username}/>
                  <h5>{t.username}</h5>
                </Link>
                {/* <span>{t.roster.length} member</span> */}
              </div>
            </div>
          ))}
        {isUser && <div className='profile-team-create-team'>
          <button onClick={handleClickOpen} className='create-button' type='submit'>
            <AddIcon />
          </button>
          <span>Tambahkan teman</span>
        </div>}
      </div>

     <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.title}} id="form-dialog-title">Cari Teman</DialogTitle>
        <DialogContent classes={{root: classes.content}}>
          <input
            className='create-team-input'
            placeholder='Cari teman'
            autoFocus
            type="text"
            value={input}
            onChange={e=> updateInput(e.target.value)}
          />
        {/* <span className="error-msg" style={{opacity:formErrors ? 1 : 0 }}>{formErrors ? formErrors : 'error'}</span> */}
        <div className='profile-friends-list' style={input === '' ? {display: 'none'} : {display: 'block'}}>
          {filteredUser.map(p=>(
            <div key={p._id}>
              <Link to={`/profile/${p._id}`}>
                <Avatar className={classes.root} src={p.profilePicture} alt={p.username}/>
                <span>{p.username}</span>
              </Link>
              <button className='profile-friends-add-button'>Tambahkan</button>
            </div>
          ))}
        </div>
        </DialogContent>
        <DialogActions classes={{root: classes.action}}>
          <button className='cancel-button' onClick={handleClose}>
            Batal
          </button>
          <button className='create-team-button'>Tambahkan
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
    </div>
    
  )
}

export default ProfileFriends
