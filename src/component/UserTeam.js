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
import { Avatar } from '@material-ui/core';
import { setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


function UserTeam() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const {id} = useParams();
  const [open, setOpen] = useState(false)
  const user = useSelector(selectUser)
  const isMyTeam = user?.myTeam.filter(p=> p._id === id)
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
    let mounted = true;
    async function fetchData() {
      const req = await axios.post('/team2/' + id);
      if (mounted) {
        setData(req.data);
        setLoading(false);
        
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);
  
  document.title = `Tim - ${data.teamName}`

  const dispatch = useDispatch()

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
          <div className='user-team-bottom'>
            <h3>Roster</h3>
            <div className='user-team-roster-wraper'>
            {data.roster.map(player=>(
                <div className='user-team-roster' key={player._id}>
                  <Link to={`/profile/${player._id}`}>
                    <Avatar src={player.profilePicture} alt={player.username}/>
                    <span>{player.username}</span>
                  </Link>
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

    </>
  )
}

export default UserTeam
