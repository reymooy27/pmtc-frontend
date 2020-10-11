import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../StateProvider";

function Registration() {
  const value = useContext(StateContext);
  const [teamName, setTeamName] = useState("");
  const [teamAbbr, setTeamAbbr] = useState("");
  const [logoTeam, setLogoTeam] = useState(null);
  const [idPlayer1, setIdPlayer1] = useState("");
  const [idPlayer2, setIdPlayer2] = useState("");
  const [idPlayer3, setIdPlayer3] = useState("");
  const [idPlayer4, setIdPlayer4] = useState("");
  const [idPlayer5, setIdPlayer5] = useState("");
  const [playerName1, setPlayerName1] = useState("");
  const [playerName2, setPlayerName2] = useState("");
  const [playerName3, setPlayerName3] = useState("");
  const [playerName4, setPlayerName4] = useState("");
  const [playerName5, setPlayerName5] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

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
          setLogoTeam(reader.result);
          setLogoValid(true);
        }
      } else {
        setLogoTeam(null);

        setLogoValid(true);
      }
    });
    reader.readAsDataURL(file);
  };

  const onBlur = (e) => {
    if (e.target.value.length < 1) {
      e.target.nextElementSibling.style.opacity = 1;
      e.target.nextElementSibling.innerHTML = "Tidak boleh kosong";
      e.target.classList.add("err");
    } else {
      e.target.nextElementSibling.style.opacity = 0;
      e.target.classList.remove("err");
    }
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      if (validImageRes(e)) {
        previewImage(e);
      } else {
        console.log("salah");
      }
    }
  };

  const handleIdInput = (e, setter) => {
    if (isNaN(e.target.value)) {
      e.preventDefault();
      e.target.focus();
      e.target.classList.add("err");
      e.target.nextElementSibling.style.opacity = 1;
      e.target.nextElementSibling.innerHTML = "Id harus angka";
    } else if (e.target.value.length < 8) {
      e.target.focus();
      e.target.classList.add("err");
      e.target.nextElementSibling.style.opacity = 1;
      e.target.nextElementSibling.innerHTML = "Id tidak boleh kurang dari 8";
    } else {
      e.target.classList.remove("err");
      e.target.nextElementSibling.style.opacity = 0;
    }
    setter(e.target.value);
  };

  const idInputBlur = (e) => {
    if (e.target.value.length < 1) {
      e.preventDefault();
      e.target.nextElementSibling.style.opacity = 1;
      e.target.nextElementSibling.innerHTML = "Tidak boleh kosong";
      e.target.classList.add("err");
    } else if (isNaN(e.target.value)) {
      e.preventDefault();
      e.target.classList.add("err");
      e.target.nextElementSibling.style.opacity = 1;
      e.target.nextElementSibling.innerHTML = "Id harus angka";
    } else if (e.target.value.length < 8) {
      e.preventDefault();
      e.target.classList.add("err");
      e.target.nextElementSibling.style.opacity = 1;
      e.target.nextElementSibling.innerHTML = "Id tidak boleh kurang dari 8";
    } else {
      e.target.classList.remove("err");
      e.target.nextElementSibling.style.opacity = 0;
    }
  };

  const submit = (e) => {
    value.data.map((data) => {
      if (teamName.toLowerCase() === data.teamName.toLowerCase()) {
        e.preventDefault();
        const input = document.querySelector(".namaTeam");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Tim sudah terdaftar";
      } else if (teamAbbr.toLowerCase() === data.singkatanTeam.toLowerCase()) {
        e.preventDefault();
        const input = document.querySelector(".singkatanTeam");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Sudah terpakai";
      } else if (
        Number(idPlayer1) === Number(data.idPlayer) ||
        Number(idPlayer1) === Number(data.idPlayer2) ||
        Number(idPlayer1) === Number(data.idPlayer3) ||
        Number(idPlayer1) === Number(data.idPlayer4) ||
        Number(idPlayer1) === Number(data.idPlayer5)
      ) {
        e.preventDefault();
        const input = document.querySelector(".idPemain");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "ID sudah terdaftar";
      } else if (
        Number(idPlayer2) === Number(data.idPlayer) ||
        Number(idPlayer2) === Number(data.idPlayer2) ||
        Number(idPlayer2) === Number(data.idPlayer3) ||
        Number(idPlayer2) === Number(data.idPlayer4) ||
        Number(idPlayer2) === Number(data.idPlayer5)
      ) {
        e.preventDefault();
        const input = document.querySelector(".idPemain2");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "ID sudah terdaftar";
      } else if (
        Number(idPlayer3) === Number(data.idPlayer) ||
        Number(idPlayer3) === Number(data.idPlayer2) ||
        Number(idPlayer3) === Number(data.idPlayer3) ||
        Number(idPlayer3) === Number(data.idPlayer4) ||
        Number(idPlayer3) === Number(data.idPlayer5)
      ) {
        e.preventDefault();
        const input = document.querySelector(".idPemain3");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "ID sudah terdaftar";
      } else if (
        Number(idPlayer4) === Number(data.idPlayer) ||
        Number(idPlayer4) === Number(data.idPlayer2) ||
        Number(idPlayer4) === Number(data.idPlayer3) ||
        Number(idPlayer4) === Number(data.idPlayer4) ||
        Number(idPlayer4) === Number(data.idPlayer5)
      ) {
        e.preventDefault();
        const input = document.querySelector(".idPemain4");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "ID sudah terdaftar";
      } else if (
        Number(idPlayer5) === Number(data.idPlayer) ||
        Number(idPlayer5) === Number(data.idPlayer2) ||
        Number(idPlayer5) === Number(data.idPlayer3) ||
        Number(idPlayer5) === Number(data.idPlayer4) ||
        Number(idPlayer5) === (Number(data.idPlayer5) !== null)
      ) {
        e.preventDefault();
        const input = document.querySelector(".idPemain5");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "ID sudah terdaftar";
      } else if (idPlayer5 === '' && playerName5 !== '') {
        e.preventDefault();
        const input = document.querySelector(".idPemain5");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Tidak boleh kososng";
      } else if (
        playerName1 === data.playerName ||
        playerName1 === data.playerName2 ||
        playerName1 === data.playerName3 ||
        playerName1 === data.playerName4 ||
        playerName1 === data.playerName5
      ) {
        e.preventDefault();
        const input = document.querySelector(".namaPemain");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Nama sudah terdaftar";
      } else if (
        playerName2 === data.playerName ||
        playerName2 === data.playerName2 ||
        playerName2 === data.playerName3 ||
        playerName2 === data.playerName4 ||
        playerName2 === data.playerName5
      ) {
        e.preventDefault();
        const input = document.querySelector(".namaPemain2");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Nama sudah terdaftar";
      } else if (
        playerName3 === data.playerName ||
        playerName3 === data.playerName2 ||
        playerName3 === data.playerName3 ||
        playerName3 === data.playerName4 ||
        playerName3 === data.playerName5
      ) {
        e.preventDefault();
        const input = document.querySelector(".namaPemain3");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Nama sudah terdaftar";
      } else if (
        playerName4 === data.playerName ||
        playerName4 === data.playerName2 ||
        playerName4 === data.playerName3 ||
        playerName4 === data.playerName4 ||
        playerName4 === data.playerName5
      ) {
        e.preventDefault();
        const input = document.querySelector(".namaPemain4");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Nama sudah terdaftar";
      } else if (
        playerName5 === data.playerName ||
        playerName5 === data.playerName2 ||
        playerName5 === data.playerName3 ||
        playerName5 === data.playerName4 ||
        playerName5 === (data.playerName5 !== '')
      ) {
        e.preventDefault();
        const input = document.querySelector(".namaPemain5");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Nama sudah terdaftar";
      } else if (idPlayer5 !== '' && playerName5 === '') {
        e.preventDefault();
        const input = document.querySelector(".namaPemain5");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Tidak boleh kososng";
      } else if (Number(phoneNumber) === Number(data.handphoneNumber)) {
        e.preventDefault();
        const input = document.querySelector(".noHP_");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Nomor sudah terdaftar";
      } else if (email === data.email) {
        e.preventDefault();
        const input = document.querySelector(".email_");
        input.focus();
        input.classList.add("err");
        input.nextElementSibling.style.opacity = 1;
        input.nextElementSibling.innerHTML = "Email sudah terdaftar";
      }
      return 0;
    });
  };

  return (
    <div>
      <div
        className="navbar-responsive"
        style={{
          background: "#16191e70",
          boxShadow: "none",
          marginLeft: 0,
        }}
      >
        <div className="tombolkembali">
          <Link to="/">
            <img
              src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2018/png/iconmonstr-arrow-left-thin.png&r=255&g=255&b=255"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="form">
        <form
          className="kiri"
          encType="multipart/form-data"
          action="https://pmtc-tourney.herokuapp.com/registration"
          method="POST"
        >
          <h2 className="pendaftaran-title">Pendaftaran</h2>
          <div className="team-data">
            <h4>Data Tim</h4>
            <div className="teamname">
              <label htmlFor="namaTeam">Nama Tim </label>
              <br />
              <input
                title="Masukan Nama Tim Anda"
                type="text"
                name="teamName"
                className="namaTeam"
                placeholder="Nama Tim"
                required
                autoFocus
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                onBlur={onBlur}
              />
              <span className="error-msg">error</span>
            </div>
            <div className="abbrteam">
              <label htmlFor="singkatanTeam">Abbr </label>
              <br />
              <input
                title="Masukan Singkatan Tim Anda"
                type="text"
                required
                name="singkatanTeam"
                className="singkatanTeam"
                maxLength="5"
                placeholder="ABBR"
                value={teamAbbr}
                onChange={(e) => {
                  localStorage.setItem("teamName", e.target.value);
                  setTeamAbbr(e.target.value);
                }}
                onBlur={onBlur}
              />
              <span className="error-msg">error</span>
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
                <span className="error-msg">error</span>
                <div className="image-preview" id="imagePreview">
                  <img
                    style={{ display: logoValid ? "block" : "none" }}
                    src={logoTeam}
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
                <div className="id1">
                  <label htmlFor="idPemain">ID In Game #1</label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    required
                    name="idPlayer"
                    className="idPemain"
                    minLength="8"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={idPlayer1}
                    placeholder="1234567890"
                    onChange={(e) => handleIdInput(e, setIdPlayer1)}
                    onBlur={idInputBlur}
                  />
                  <span className="error-msg">error</span>
                </div>
                <div className="player1">
                  <label htmlFor="namaPemain">Nama Pemain #1</label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    required
                    name="playerName"
                    maxLength="14"
                    className="namaPemain"
                    placeholder="Nick In Game"
                    value={playerName1}
                    onChange={(e) => setPlayerName1(e.target.value)}
                    onBlur={onBlur}
                  />
                  <span className="error-msg">error</span>
                </div>
              </li>
              <li>
                <div className="id2">
                  <label htmlFor="idPemain">ID In Game #2 </label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    required
                    name="idPlayer2"
                    className="idPemain2"
                    placeholder="1234567890"
                    minLength="8"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={idPlayer2}
                    onChange={(e) => handleIdInput(e, setIdPlayer2)}
                    onBlur={idInputBlur}
                  />
                  <span className="error-msg">error</span>
                </div>
                <div className="player2">
                  <label htmlFor="namaPemain">Nama Pemain #2 </label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    required
                    name="playerName2"
                    maxLength="14"
                    className="namaPemain2"
                    placeholder="Nick In Game"
                    value={playerName2}
                    onChange={(e) => setPlayerName2(e.target.value)}
                    onBlur={onBlur}
                  />
                  <span className="error-msg">error</span>
                </div>
              </li>
              <li>
                <div className="id3">
                  <label htmlFor="idPemain">ID In Game #3 </label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    required
                    name="idPlayer3"
                    className="idPemain3"
                    placeholder="1234567890"
                    minLength="8"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={idPlayer3}
                    onChange={(e) => handleIdInput(e, setIdPlayer3)}
                    onBlur={idInputBlur}
                  />
                  <span className="error-msg">error</span>
                </div>
                <div className="player3">
                  <label htmlFor="namaPemain">Nama Pemain #3 </label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    required
                    name="playerName3"
                    maxLength="14"
                    className="namaPemain3"
                    placeholder="Nick In Game"
                    value={playerName3}
                    onChange={(e) => setPlayerName3(e.target.value)}
                    onBlur={onBlur}
                  />
                  <span className="error-msg">error</span>
                </div>
              </li>
              <li>
                <div className="id4">
                  <label htmlFor="idPemain">ID In Game #4 </label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    required
                    name="idPlayer4"
                    className="idPemain4"
                    placeholder="1234567890"
                    minLength="8"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={idPlayer4}
                    onChange={(e) => handleIdInput(e, setIdPlayer4)}
                    onBlur={idInputBlur}
                  />
                  <span className="error-msg">error</span>
                </div>
                <div className="player4">
                  <label htmlFor="namaPemain">Nama Pemain #4 </label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    required
                    name="playerName4"
                    maxLength="14"
                    className="namaPemain4"
                    placeholder="Nick In Game"
                    value={playerName4}
                    onChange={(e) => setPlayerName4(e.target.value)}
                    onBlur={onBlur}
                  />
                  <span className="error-msg">error</span>
                </div>
              </li>
              <h4>Pemain Cadangan (Optional)</h4>
              <li>
                <div className="id5">
                  <label htmlFor="idPemain">ID In Game Cadangan </label>
                  <br />
                  <input
                    title="Masukan ID In Game Anda"
                    type="text"
                    name="idPlayer5"
                    className="idPemain5"
                    placeholder="1234567890"
                    minLength="8"
                    maxLength="10"
                    pattern="[0-9]+"
                    value={idPlayer5}
                    onChange={(e) => handleIdInput(e, setIdPlayer5)}
                  />
                  <span className="error-msg">error</span>
                </div>
                <div className="player5">
                  <label htmlFor="namaPemain">Nama Pemain Cadangan </label>
                  <br />
                  <input
                    title="Masukan Nama In Game Anda"
                    type="text"
                    name="playerName5"
                    maxLength="14"
                    className="namaPemain5"
                    placeholder="Nick In Game"
                    value={playerName5}
                    onChange={(e) => setPlayerName5(e.target.value)}
                  />
                  <span className="error-msg">error</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact">
            <div className="noHP">
              <label htmlFor="noHP">Nomor HP (Aktif WA) </label>
              <br />
              <input
                title="Masukan Nomor Handphone Yang Terhubung Dengan WA"
                type="tel"
                className="noHP_"
                name="handphoneNumber"
                placeholder="+62"
                required
                minLength="11"
                maxLength="12"
                pattern="[0-9]+"
                value={phoneNumber}
                onChange={(e) => {
                  if (isNaN(e.target.value)) {
                    e.preventDefault();
                    e.target.classList.add("setError");
                    e.target.nextElementSibling.style.opacity = 1;
                    e.target.nextElementSibling.innerHTML = "No HP harus angka";
                  } else {
                    e.target.classList.remove("setError");
                    e.target.nextElementSibling.style.opacity = 0;
                  }
                  setPhoneNumber(e.target.value);
                }}
                onBlur={onBlur}
              />
              <span className="error-msg">error</span>
            </div>
            <div className="email">
              <label htmlFor="email">Email </label>
              <br />
              <input
                title="Masukan Email Anda"
                type="email"
                required
                className="email_"
                name="email"
                placeholder="@gmail.com"
                value={email}
                onChange={(e) => {
                  localStorage.setItem("email", e.target.value);
                  setEmail(e.target.value);
                }}
                onBlur={onBlur}
              />
              <span className="error-msg">error</span>
            </div>
          </div>
          <div className="submit">
            <input
              data-toggle="tooltip"
              dtoplacement="right"
              title="Pastikan Data Yang Anda Isi Adalah Benar"
              type="submit"
              value="DAFTAR"
              id="submit"
              onClick={submit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
