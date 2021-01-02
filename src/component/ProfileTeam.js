import React, { useState } from 'react'
import {fetchCheckUser, selectUser} from '../redux/reducers/userSlice'
import {useDispatch, useSelector } from 'react-redux'
import './ProfileTeam.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import axios from '../axios'
import Loader from 'react-loader-spinner'
import { Avatar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice';


function ProfileTeam({isUser,user_}) {
  const user = useSelector(selectUser)
  const data = isUser ? user : user_
  const dispatch = useDispatch()
  const [teamName, setTeamName] = useState('')
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState('');

    document.title = `${user.username} - Tim`

const createTeam = async (e)=>{
  e.preventDefault()
  if(teamName === ''){
    setFormErrors('Tidak boleh kosong')
  }else{
    setFormErrors(null)
  }
  await axios.post(`/user/${user._id}/team/create`,{teamName})
  .then(res=>{
    dispatch(setOpenSuccessSnackbar(true))
    dispatch(setSuccessMessage(res.data))
    setIsSubmitting(true)
    setOpen(false)
    dispatch(fetchCheckUser())
  })
  .catch(err=>{
    dispatch(setOpenErrorSnackbar(true))
    dispatch(setErrorMessage(err.response.data))
  })
    setTeamName('')
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormErrors(null)
  };

  const useStyles = makeStyles({
    root: {
    width: '80px',
    height: '80px'
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
  });

const classes = useStyles();



  return (
      <>
    <div className='container'>
      <div className="specialFont-wraper">
          <h4 className="specialFont">Tim</h4>
      </div>
      <div className='profile_team'>
        <div className='profile-team-teams'>
          {data?.myTeam.length < 1 && 
            <div className='profile-no-team'>
              <h3>Belum punya tim</h3>
            </div>}
          {data?.myTeam.map(t=> (
            <div key={t._id} className='profile-team-wraper'>
              <div className='profile-team-avatar'>
                <Link to={'/profile/team/' + t._id} >
                  <Avatar className={classes.root} src={t.teamLogo} alt={t.teamName}/>
                  <h5>{t.teamName}</h5>
                </Link>
                <span>{t.roster.length} member</span>
              </div>
            </div>
          ))}
        </div>
        
        {isUser && <div className='profile-team-create-team'>
          <button className='create-button' type='submit' onClick={handleClickOpen}>
            <AddIcon />
          </button>
          <span>Buat tim baru</span>
        </div>}
      </div>
    </div>

      <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.title}} id="form-dialog-title">Buat Tim Baru</DialogTitle>
        <DialogContent classes={{root: classes.content}}>
          <input
            className={formErrors ? 'create-team-error create-team-input' :'create-team-input'}
            placeholder='Masukan nama tim'
            autoFocus
            type="text"
            value={teamName}
            onChange={(e)=>setTeamName(e.target.value)}
          />
        <span className="error-msg" style={{opacity:formErrors ? 1 : 0 }}>{formErrors ? formErrors : 'error'}</span>
        </DialogContent>
        <DialogActions classes={{root: classes.action}}>
          <button className='cancel-button' onClick={handleClose}>
            Batal
          </button>
          <button className='create-team-button' onClick={createTeam}>
            {isSubmitting ?  
            <Loader
              type="ThreeDots"
              color="black"
              height={20}
              width={30}
            /> : 'Buat Tim'}
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProfileTeam;