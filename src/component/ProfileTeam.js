import React, {useState } from 'react'
import {selectUser} from '../redux/reducers/userSlice'
import {useSelector } from 'react-redux'
import './ProfileTeam.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import axios from '../axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Loader from 'react-loader-spinner'
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';


function ProfileTeam() {
  const user = useSelector(selectUser)
  
  const [teamName, setTeamName] = useState('')
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState('');

const createTeam = async (e)=>{
  e.preventDefault()
  if(teamName === ''){
    setFormErrors('Tidak boleh kosong')
  }else{
    setFormErrors(null)
  }
  await axios.post(`/user/${user._id}/team/create`,{teamName})
  .then(res=>{
    setOpenSuccessSnackbar(true)
    setSuccessMsg(res.data)
    setIsSubmitting(true)
    setOpen(false)
  })
  .catch(err=>{
    setOpenErrorSnackbar(true)
    setErrorMsg(err.response.data)
  })
    setTeamName('')
}

 function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormErrors(null)
  };

  const useStyles = makeStyles({
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
  });

const classes = useStyles();

  return (
    <div className='profile_team'>
      <>
      <div className='profile-team-teams'>
        {user.myTeam.map(t=> (
          <Link key={t._id} to={'/profile/team/' + t._id} >
          <div className="profile-team">
            <div className="profile-team-identity">
              <img className="profile-team-logo" src={t.teamLogo} alt="" />
              <p className="profile-team-name">{t.teamName}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
      
      <div className='profile-team-create-team'>
        <button className='create-button' type='submit' onClick={handleClickOpen}>
          <AddIcon />
        </button>
        <span>Buat tim baru</span>
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


      <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="success">
                {successMsg}
              </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="error">
                {errorMsg}
              </Alert>
            </Snackbar>
            </>
    </div>
  )
}

export default ProfileTeam;