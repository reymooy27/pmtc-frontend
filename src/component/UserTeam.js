import React, { useEffect, useState } from 'react'
import axios from "../axios";
import Loader from "react-loader-spinner";
import {
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
import './UserTeam.css'
import {fetchCheckUser, selectUser} from '../redux/reducers/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import { Avatar, DialogContent } from '@material-ui/core';
import { setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import socket from '../socket.io'

function UserTeam() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [input, setInput] = useState('')
  const [filteredUser, setFilteredUser] = useState([])
  const [invitatonSent, setInvitatonSent] = useState(false)
  const [sendTeamInvitation, setSendTeamInvitation] = useState('')
  const [removePlayer, setRemovePlayer] = useState('')

  const {id} = useParams();

  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  const isMyTeam = user?.myTeam.filter(p=> p._id === id)

  
  const matches = useMediaQuery('(min-width:600px)');

  document.title = `Tim - ${data.teamName}`

  const useStyles = makeStyles(() => ({
  root: {
    width: '130px',
    height: '130px'
  },
  paper:{
      backgroundColor: '#2d303e',
      width: '600px',
      margin : matches ? '32px' : '0px',
      height : matches ? 'none' : '100%',
      maxHeight : matches ? 'calc(100% - 64px)' : 'none'
    },
    title:{
      color: 'white',
      '& h2':{
        fontFamily: 'Open Sans',
        fontWeight: 600,
        fontSize : matches ? '1.5em' : '2em'
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

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const req = await axios.get('/team2/' + id);
      if (mounted) {
        setData(req.data);
        setLoading(false);
        
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [id,sendTeamInvitation, removePlayer]);
  

  const deleteTeam = async ()=>{
  await axios.delete(`/user/team/${id}/delete`)
  .then(res=>{
    dispatch(setSuccessMessage(res.data))
    dispatch(setOpenSuccessSnackbar(true))
    dispatch(fetchCheckUser())
    setDeleteSuccess(true)
  })
  .catch(err=>{
    dispatch(setErrorMessage(err.response.data))
    dispatch(setOpenErrorSnackbar(true))
  })
}

  const updateInput = async (input) => {
    await axios.get('/user/all')
    .then(res=> {
        const filtered = res.data.filter(p => {
          return p.username.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setFilteredUser(filtered);
    })
    .catch(err=> {
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))
    })
  }

  const inviteToTeam = async (userID)=>{
    await axios.post(`/team/invite/${userID}`, {teamId: id})
    .then(res=>{
      dispatch(setSuccessMessage(res.data))
      dispatch(setOpenSuccessSnackbar(true))
      setInvitatonSent(true)
    })
    .catch(err=> {
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))
    })
  }

  const cancelTeamInvite = async (userID)=>{
    await axios.post(`/team/invite/cancel/${userID}`)
    .then(res=>{
      dispatch(setSuccessMessage(res.data))
      dispatch(setOpenSuccessSnackbar(true))
      setInvitatonSent(false)
    })
    .catch(err=> {
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))
    })
  }

  const removePlayerFromTeam = async (userID)=>{
    await axios.post(`/team/${id}/user/${userID}/remove`)
    .then(res=>{
      dispatch(setSuccessMessage(res.data))
      dispatch(setOpenSuccessSnackbar(true))
      setInvitatonSent(false)
    })
    .catch(err=> {
      dispatch(setOpenErrorSnackbar(true))
      dispatch(setErrorMessage(err.response.data))
    })
  }

   useEffect(() => {
    socket.on("sendTeamInvitation", (data) => setSendTeamInvitation(data === sendTeamInvitation ? data+'1' : data));

    return ()=> socket.removeAllListeners("sendTeamInvitation");
  }, [sendTeamInvitation])

   useEffect(() => {
    socket.on("removePlayer", (data) => setRemovePlayer(data === removePlayer ? data+'1' : data));

    return ()=> socket.removeAllListeners("removePlayer");
  }, [removePlayer])

if(deleteSuccess){
  return <Redirect to={`/profile/${user._id}/team`}/>
}

  return (
    <>
      <div>
        {loading ? (
          <Loader
            className="loader"
            type="ThreeDots"
            color="#00DEAB"
            height={120}
            width={120}
          />
        ) : (
        <>
          <div className="user-team-detail" 
              style={data.logo && {background: `url(${data.logo})`, 
                      backgroundRepeat: 'no-repeat', 
                      backgroundPosition: 'center', 
                      backgroundSize: '500px', 
                      backgroundBlendMode: 'overlay', 
                      backgroundColor: '#151A2C'}}>
            <div className="team-detail-identity">
              <img className="team-detail-logo" src={data.logo} alt="" />
              <p className="team-detail-team-name">{data.teamName}</p>
            </div>
            <div className="team-detail-info">
              <div>
                <span>Match Played</span>
                <span>-</span>
              </div>
              <div>
                <span>Win</span>
                <span>-</span>
              </div>
              <div>
                <span>Reputation</span>
                <span>-</span>
              </div>
            </div>
          </div>
          {isMyTeam?.length > 0 && user._id === data?.createdBy ? <div className='user-team-invite-button-wraper'>
            <button className='user-team-invite-button' onClick={handleClickOpen2}>Invite</button>
          </div> : ''}
          <div className='user-team-bottom'>
            <h3>Roster</h3>
            <div className='user-team-roster-wraper'>
            {data.roster.map(player=>(
                <div className='user-team-roster' key={player._id}>
                  <Link to={`/profile/${player._id}`}>
                    <Avatar src={player.profilePicture} alt={player.username}/>
                    <span>{player.username}</span>
                  </Link>
                  {user?._id === data?.createdBy ? isMyTeam?.length > 0 && player._id !== data?.createdBy && <button onClick={()=> removePlayerFromTeam(player._id)}>Hapus Pemain</button> : ''}
                </div>
              ))}
            </div>
            {isMyTeam?.length > 0 && <button className='user-team-delete-team' onClick={handleClickOpen}>Hapus Tim</button>}
          </div>
        </>
        )}
      </div>

      <Dialog classes={{paper: classes.paper}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.title}} id="form-dialog-title">Yakin ingin menghapus tim ini ?</DialogTitle>
        <DialogActions classes={{root: classes.action}}>
          <button className='cancel-button' onClick={handleClose}>
            Batal
          </button>
          <button className='create-team-button' onClick={deleteTeam}>Hapus
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

      <Dialog classes={{paper: classes.paper}} open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
        <DialogTitle classes={{root: classes.title}} id="form-dialog-title">Undang Teman</DialogTitle>
        <DialogContent classes={{root: classes.content}}>
          <input
            className='create-team-input'
            placeholder='Undang teman'
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
                <Avatar src={p.profilePicture} alt={p.username}/>
                <span>{p.username}</span>
              </Link>
              {invitatonSent ? 
              <button className='requestSent profile-button-add-friends' onClick={()=> cancelTeamInvite(p._id)}>Batalkan</button> : 
              <button className='profile-friends-add-button' onClick={()=> inviteToTeam(p._id)}>Undang</button>}
            </div>
          ))}
        </div>
        </DialogContent>
        <DialogActions classes={{root: classes.action}}>
          <button className='cancel-button' onClick={handleClose2}>
            Batal
          </button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default UserTeam
