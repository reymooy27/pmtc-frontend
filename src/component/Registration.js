import React, { useCallback, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Redirect, useRouteMatch } from "react-router-dom";
import axios from "../axios";
import './Registration.css'
function Registration() {
  let {url} = useRouteMatch();
  
  const initialState = {
  teamName: '',
  singkatanTeam: '',
  logoTeam: null,
  idPlayer: '',
  idPlayer2: '',
  idPlayer3: '',
  idPlayer4: '',
  idPlayer5: '',
  playerName: '',
  playerName2: '',
  playerName3: '',
  playerName4: '',
  playerName5: '',
  handphoneNumber: '',
  email: '',} 

  const [formValues, setFormValues] = useState(initialState)
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState('')
  const [redirectTo, setRedirectTo] = useState(false)

  const [logoTeam, setLogoTeam] = useState(null)
  const [previewLogo, setpreviewLogo] = useState(null)

  const [logoValid, setLogoValid] = useState(false);

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

  const previewImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const size = file.size;
    const type = file.type.indexOf("image");
    const input = e.target;

    reader.addEventListener("load", () => {
      if (reader.readyState === 2) {
        if (size > 100000) {
          input.nextElementSibling.style.opacity = 1;
          input.nextElementSibling.innerHTML = "Ukuran gambar terlalu besar";
        } else if (type === -1) {
          input.nextElementSibling.style.opacity = 1;
          input.nextElementSibling.innerHTML = "Format harus .png";
        } else {
          input.nextElementSibling.style.opacity = 0;
          setpreviewLogo(reader.result);
          setLogoValid(true);
        }
      } else {
        setpreviewLogo(null);

        setLogoValid(true);
      }
    });
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      if (validImageRes(e)) {
        previewImage(e);
        setLogoTeam(e.target.files[0])
      } else {
        console.log("salah");
      }
    }
  };

    const formData = new FormData()
    formData.append("teamName", formValues.teamName)
    formData.append("singkatanTeam", formValues.singkatanTeam)
    formData.append("logo", logoTeam,)
    formData.append("idPlayer", formValues.idPlayer)
    formData.append("idPlayer2", formValues.idPlayer2)
    formData.append("idPlayer3", formValues.idPlayer3)
    formData.append("idPlayer4", formValues.idPlayer4)
    formData.append("idPlayer5", formValues.idPlayer5)
    formData.append("playerName", formValues.playerName)
    formData.append("playerName2", formValues.playerName2)
    formData.append("playerName3", formValues.playerName3)
    formData.append("playerName4", formValues.playerName4)
    formData.append("playerName5", formValues.playerName5)
    formData.append("handphoneNumber", formValues.handphoneNumber)
    formData.append("email", formValues.email)

const submitForm = useCallback(
  () => {
    axios({
  method: 'post',
  url: url,
  data: formData,
  headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        },
  }).then(res=> {
    setLoginSuccess(res.data)
    setRedirectTo(true)
  })
  .catch(err=> {
    setFormErrors({err})
  })
  },
  [url,formData],
)

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.teamName) {
      errors.teamName = "Tidak boleh kososng";
    }

    if (!values.singkatanTeam) {
      errors.singkatanTeam = "Tidak boleh kososng";
    }

    if (!values.playerName) {
      errors.playerName = "Tidak boleh kososng";
    }
    if (!values.playerName2) {
      errors.playerName2 = "Tidak boleh kososng";
    }
    if (!values.playerName3) {
      errors.playerName3 = "Tidak boleh kososng";
    }
    if (!values.playerName4) {
      errors.playerName4 = "Tidak boleh kososng";
    }

    if (!values.idPlayer) {
      errors.idPlayer = "Tidak boleh kososng";
    } else if (values.idPlayer.length < 8) {
      errors.idPlayer = "Tidak boleh kurang dari 8 karakter";
    }

    if (!values.idPlayer2) {
      errors.idPlayer2 = "Tidak boleh kososng";
    } else if (values.idPlayer2.length < 8) {
      errors.idPlayer2 = "Tidak boleh kurang dari 8 karakter";
    }

    if (!values.idPlayer3) {
      errors.idPlayer3 = "Tidak boleh kososng";
    } else if (values.idPlayer3.length < 8) {
      errors.idPlayer3 = "Tidak boleh kurang dari 8 karakter";
    }

    if (!values.idPlayer4) {
      errors.idPlayer4 = "Tidak boleh kososng";
    } else if (values.idPlayer4.length < 8) {
      errors.idPlayer4 = "Tidak boleh kurang dari 8 karakter";
    }

    if (!values.email) {
      errors.email = "Tidak boleh kososng";
    }

    if (!values.handphoneNumber) {
      errors.handphoneNumber = "Tidak boleh kososng";
    } else if (values.handphoneNumber.length < 8) {
      errors.handphoneNumber = "Tidak boleh kurang dari 8 karakter";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
      localStorage.setItem('teamName', formValues.teamName)
      localStorage.setItem('email', formValues.email)
    }
  }, [formErrors, isSubmitting, submitForm,formValues.teamName,formValues.email]);
  
if(redirectTo){
  return(<Redirect to='/email-confirmation'/>)
}


  return (
      <div className="form">
        <form encType="multipart/form-data" className="kiri" onSubmit={handleSubmit}>
          <h2 className="pendaftaran-title">Pendaftaran</h2>
          {loginSuccess ? loginSuccess : ''}
          {formErrors.err ? <span style={{color: 'red', fontWeight: 'bold'}}>{formErrors.err.response.data}</span> : ''}
          <div className="team-data">
            <h4>Data Tim</h4>
            <div className="registration-input-container">
              <label htmlFor="teamName">Nama Tim </label>
              <br />
              <input
                title="Masukan Nama Tim Anda"
                type="text"
                name="teamName"
                className={formErrors.teamName || formErrors.err  ? 'registration-input err' : 'registration-input'}
                placeholder="Nama Tim"
                autoFocus
                value={formValues.teamName}
                onChange={handleChange}
              />
              <span className="error-msg" style={{opacity:formErrors.teamName ? 1 : 0 }}>{formErrors.teamName ? formErrors.teamName : 'error'}</span>
            </div>
            <div className="registration-input-container">
              <label htmlFor="singkatanTeam">Abbr </label>
              <br />
              <input
                style={{textTransform: 'uppercase'}}
                title="Masukan Singkatan Tim Anda"
                type="text"
                name="singkatanTeam"
                className={formErrors.singkatanTeam || formErrors.err  ? 'registration-input err' : 'registration-input'}
                maxLength="5"
                placeholder="ABBR"
                value={formValues.singkatanTeam}
                onChange={handleChange}
              />
              <span className="error-msg" style={{opacity:formErrors.singkatanTeam ? 1 : 0 }}>{formErrors.singkatanTeam ? formErrors.singkatanTeam : 'error'}</span>
            </div>
            <br />
            <div className="logo-input-wraper">
              <div className="logotim">
                <label htmlFor="logo">Logo Tim</label>
                <br />
                <input
                  style={{ display: logoValid ? "none" : "block" }}
                  type="file"
                  id="logo"
                  title="Masukan Logo Anda (500 x 500px)"
                  name="logo"
                  accept="image/png"
                  onChange={handleLogoChange}
                />
                <span className="error-msg"></span>
                <div className="image-preview" id="imagePreview">
                  <img
                    style={{ display: logoValid ? "block" : "none" }}
                    src={previewLogo}
                    alt="Logo Preview"
                    className="image-preview-image"
                    id="imagePreviewImage"
                  />
                </div>
              </div>
              <div className="logo-req">
                <ul>
                  <li>Logo Maks berukuran 500*500px</li>
                  <li>Format logo .jpg/.png</li>
                  <li>Ukuran file tidak boleh lebih dari 100kb</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="roster">
            <h4>Data Pemain</h4>
            <ul>
              <li>
                <div className="registration-input-container">
                  <label htmlFor="idPlayer">ID In Game #1</label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    name="idPlayer"
                    className={formErrors.idPlayer || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    maxLength="10"
                    pattern="[0-9]+"
                    value={formValues.idPlayer}
                    placeholder="1234567890"
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.idPlayer ? 1 : 0 }}>{formErrors.idPlayer ? formErrors.idPlayer : 'error'}</span>
                </div>
                <div className="registration-input-container">
                  <label htmlFor="playerName">Nama Pemain #1</label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    name="playerName"
                    maxLength="14"
                    className={formErrors.playerName || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="Nick In Game"
                    value={formValues.playerName}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.playerName ? 1 : 0 }}>{formErrors.playerName ? formErrors.playerName : 'error'}</span>
                </div>
              </li>
              <li>
                <div className="registration-input-container">
                  <label htmlFor="idPlayer2">ID In Game #2 </label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    name="idPlayer2"
                    className={formErrors.idPlayer2 || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="1234567890"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={formValues.idPlayer2}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.idPlayer2 ? 1 : 0 }}>{formErrors.idPlayer2 ? formErrors.idPlayer2 : 'error'}</span>
                </div>
                <div className="registration-input-container">
                  <label htmlFor="playerName2">Nama Pemain #2 </label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    name="playerName2"
                    maxLength="14"
                    className={formErrors.playerName2 || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="Nick In Game"
                    value={formValues.playerName2}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.playerName2 ? 1 : 0 }}>{formErrors.playerName2 ? formErrors.playerName2 : 'error'}</span>
                </div>
              </li>
              <li>
                <div className="registration-input-container">
                  <label htmlFor="idPlayer3">ID In Game #3 </label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    name="idPlayer3"
                    className={formErrors.idPlayer3 || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="1234567890"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={formValues.idPlayer3}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.idPlayer3 ? 1 : 0 }}>{formErrors.idPlayer3 ? formErrors.idPlayer3 : 'error'}</span>
                </div>
                <div className="registration-input-container">
                  <label htmlFor="playerName3">Nama Pemain #3 </label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    name="playerName3"
                    maxLength="14"
                    className={formErrors.playerName3 || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="Nick In Game"
                    value={formValues.playerName3}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.playerName3 ? 1 : 0 }}>{formErrors.playerName3 ? formErrors.playerName3 : 'error'}</span>
                </div>
              </li>
              <li>
                <div className="registration-input-container">
                  <label htmlFor="idPlayer4">ID In Game #4 </label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    name='idPlayer4'
                    className={formErrors.idPlayer4 || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="1234567890"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={formValues.idPlayer4}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.idPlayer4 ? 1 : 0 }}>{formErrors.idPlayer4 ? formErrors.idPlayer4 : 'error'}</span>
                </div>
                <div className="registration-input-container">
                  <label htmlFor="playerName4">Nama Pemain #4 </label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    name="playerName4"
                    maxLength="14"
                    className={formErrors.playerName4 || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="Nick In Game"
                    value={formValues.playerName4}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.playerName4 ? 1 : 0 }}>{formErrors.playerName4 ? formErrors.playerName4 : 'error'}</span>
                </div>
              </li>
              <h4>Pemain Cadangan (Optional)</h4>
              <li>
                <div className="registration-input-container">
                  <label htmlFor="idPlayer5">ID In Game Cadangan </label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    name="idPlayer5"
                    className={formErrors.idPlayer5 || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="1234567890"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={formValues.idPlayer5}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.idPlayer5 ? 1 : 0 }}>{formErrors.idPlayer5 ? formErrors.idPlayer5 : 'error'}</span>
                </div>
                <div className="registration-input-container">
                  <label htmlFor="playerName5">Nama Pemain Cadangan </label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    name="playerName5"
                    maxLength="14"
                    className={formErrors.playerName5 || formErrors.err  ? 'registration-input err' : 'registration-input'}
                    placeholder="Nick In Game"
                    value={formValues.playerName5}
                    onChange={handleChange}
                  />
                  <span className="error-msg" style={{opacity:formErrors.playerName5 ? 1 : 0 }}>{formErrors.playerName5 ? formErrors.playerName5 : 'error'}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact">
            <div className="registration-input-container">
              <label htmlFor="handphoneNumber">Nomor HP (Aktif WA) </label>
              <br />
              <input
                title="Masukan Nomor Handphone Yang Terhubung Dengan WA"
                type="tel"
                className={formErrors.handphoneNumber || formErrors.err  ? 'registration-input err' : 'registration-input'}
                name="handphoneNumber"
                placeholder="081234567890"
                maxLength="12"
                pattern="[0-9]+"
                value={formValues.handphoneNumber}
                onChange={handleChange}
              />
              <span className="error-msg" style={{opacity:formErrors.handphoneNumber ? 1 : 0 }}>{formErrors.handphoneNumber ? formErrors.handphoneNumber : 'error'}</span>
            </div>
            <div className="registration-input-container">
              <label htmlFor="email">Email </label>
              <br />
              <input
                title="Masukan Email Anda"
                type="email"
                className={formErrors.email || formErrors.err  ? 'registration-input err' : 'registration-input'}
                name="email"
                placeholder="@gmail.com"
                value={formValues.email}
                onChange={handleChange}
              />
              <span className="error-msg" style={{opacity:formErrors.email ? 1 : 0 }}>{formErrors.email ? formErrors.email : 'error'}</span>
            </div>
          </div>
          <div className="submit">
            <button
              className="registration-button" type="submit"
              disabled={Object.keys(formErrors).length === 0 && isSubmitting ? true : false}
            >{Object.keys(formErrors).length === 0 && isSubmitting ? <Loader
          type="ThreeDots"
          color="black"
          height={20}
          width={30}
        /> : 'Daftar'}</button>
          </div>
        </form>
      </div>
  );
}

export default Registration;
