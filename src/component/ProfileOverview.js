import React, { useState } from 'react'
import './ProfileOverview.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckUser, selectUser } from '../redux/reducers/userSlice';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link } from 'react-router-dom';
import axios from '../axios'
import { setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice';

function ProfileOverview({isUser, user_}) {
  const user = useSelector(selectUser)
  const data = isUser ? user : user_
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [openAddGameAccountDialog, setOpenAddGameAccountDialog] = useState(false);
  const [nickInGame, setNickInGame] = useState('')
  const [idInGame, setIdInGame] = useState('')
  const [gameSelected, setGameSelected] = useState(null)
  
  const useStyles = makeStyles(() => ({
  paper:{
      backgroundColor: '#2d303e',
      width: '600px',
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

  const classes = useStyles()

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddGameAccountDialog(false)
  };

  const selectGame = ()=>{
    setOpenAddGameAccountDialog(true)
    setOpen(false)
  }

  const addGameAccount = async ()=>{
    await axios.post(`/user/${user._id}/game/${gameSelected}/add`,{
      nickInGamePUBGMobile: nickInGame,
      idInGamePUBGMobile: idInGame,
    })
    .then(res=>{
    dispatch(setOpenSuccessSnackbar(true))
    dispatch(setSuccessMessage(res.data))
    setOpen(false)
    dispatch(fetchCheckUser())
  })
  .catch(err=>{
    dispatch(setOpenErrorSnackbar(true))
    dispatch(setErrorMessage(err.response.data))
  })
    setNickInGame('')
    setIdInGame('')
    setOpenAddGameAccountDialog(false)
  }

    document.title = `${user?.username} - Overview`

    const sm = data?.socialMedia.facebook || data?.socialMedia.instagram || data?.socialMedia.twitter || data?.socialMedia.youtube

  return (
    <div className='container'>
      <div className="specialFont-wraper">
          <h4 className="specialFont">Overview</h4>
      </div>
      <div className='profile-overview'>
        <div className='profile-overview-wraper'>
          <h3>Tentang</h3>
          <div className='profile-overview-bio'>
            <h4>Bio</h4>
            {data?.bio ? <p>{data?.bio}</p> : <p>Belum ada informasi yang ditambahkan</p>}
            {isUser && <Link to='/profile/setting' className='profile-overview-button'>Update Profil</Link>}
          </div>
          <div className='profile-overview-game-account'>
            <h3>Akun Game</h3>
            {data?.pubgMobileStats ?
              <div className='profile-overview-diaolog-game-choose profile-overview-diaolog-game-choose-no-hover' value='pubgMobile'>
                <img src={require(`../img/pubg_game_app_logo.png`)} alt=''/>
              </div>
              : <p>Belum ada akun yang dikaitkan</p>}
            {isUser && <Link to='#'onClick={handleClickOpen} className='profile-overview-button'>Tambahkan akun game</Link>}
          </div>
          <div className='profile-overview-social-account'>
            <h3>Media Sosial</h3>
            <div className='profile-overview-social-account-icons'>
              {sm !== '' ? '' : 
              <p>Belum ada akun yang dikaitkan</p>
              }
              {data?.socialMedia?.facebook && 
              <a href={`${data?.socialMedia?.facebook}`}>
                <FacebookIcon/>
              </a>}
              {data?.socialMedia?.instagram && 
              <a href={`${data?.socialMedia?.instagram}`}>
                <InstagramIcon/>
              </a>}
              {data?.socialMedia?.twitter &&
              <a href={`${data?.socialMedia?.twitter}`}>
                <TwitterIcon/>
              </a> 
              }
              {data?.socialMedia?.youtube && 
              <a href={`${data?.socialMedia?.youtube}`}>
                <YouTubeIcon/>
              </a>
              }
              {isUser && <Link to='/profile/setting#social-media' className='profile-overview-button'>Tambahkan akun sosial</Link>}
            </div>
          </div>
        </div>
      </div>

      <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.title}} id="form-dialog-title">Pilih Game</DialogTitle>
        <DialogContent classes={{root: classes.content}}>
          <div className='profile-overview-diaolog-game-wraper'>
            <div className='profile-overview-diaolog-game-choose' value='pubgMobile' onClick={(e)=>{
              selectGame()
              setGameSelected('pubgMobile')
              }}>
              <img src={require(`../img/pubg_game_app_logo.png`)} alt=''/>
            </div>
            <div className='profile-overview-diaolog-game-choose' value='freeFire' onClick={(e)=>{
              selectGame()
              setGameSelected(e.target.value)
              }}>
              <img src={require(`../img/free-fire-game-logo.jpg`)} alt=''/>
            </div>
          </div>
        </DialogContent>
        <DialogActions classes={{root: classes.action}}>
          <button className='cancel-button' onClick={handleClose}>
            Batal
          </button>
        </DialogActions>
      </Dialog>

      <Dialog classes={{paper: classes.paper}} open={openAddGameAccountDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.title}} id="form-dialog-title">Tambahkan akun</DialogTitle>
        <DialogContent classes={{root: classes.content}}>
          <div className='profile-overview-inputContainer'>
            <label>{`Nama In Game ${gameSelected}`}</label>
            <input type='text' 
              placeholder='Masukan nama in-game anda'
              className={'create-team-input'}
              autoFocus
              value={nickInGame}
              onChange={(e)=>setNickInGame(e.target.value)}
            />
          </div>
          <div className='profile-overview-inputContainer'>
            <label>{`ID In Game ${gameSelected}`}</label>
            <input type='text' 
              placeholder='Masukan ID game anda'
              className={'create-team-input'}
              value={idInGame}
              onChange={(e)=>setIdInGame(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions classes={{root: classes.action}}>
          <button className='cancel-button' onClick={handleClose}>
            Batal
          </button>
          <button className='create-team-button' onClick={addGameAccount}>
            Tambahkan Akun
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProfileOverview
