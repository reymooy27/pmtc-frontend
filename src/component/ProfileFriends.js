import React, { useState, useEffect } from 'react'
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

function ProfileFriends({isUser, user_}) {
  const user = useSelector(selectUser)
  const data = isUser ? user : user_

  document.title = `${user.username} - Teman`

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const [filteredUser, setFilteredUser] = useState([])

  const useStyles = makeStyles(() => ({
  paper:{
      backgroundColor: '#2d303e',
      width: '600px',
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

  const classes = useStyles()

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  useEffect(() => {
    let mounted = true

    const fetchALlUser = async()=>{
    await axios.post('/user/all')
    .then(res=> {
      if(mounted){
        setUsers(res.data)
        setFilteredUser(res.data)
      }
    })
    .catch(err=> console.log(err))
  }
    fetchALlUser()
    return ()=> mounted = false
  }, [])
  
  const updateInput = async (input) => {
    const filtered = users.filter(p => {
      return p.username.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setFilteredUser(filtered);
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
