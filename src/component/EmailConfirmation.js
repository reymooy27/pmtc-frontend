import React from "react";
import { Link } from "react-router-dom";
import "./EmailConfirmation.css";
import axios from "../axios";

const sendEmail = async () => {
  await axios
    .post("/redirect", {
      teamName: localStorage.getItem("teamName"),
      email: localStorage.getItem("email"),
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

function EmailConfirmation() {
  return (
    <div className="emailConfirmation">
      <div className="emailConfirmation-confirmation">
        <h1>Email Konfirmasi</h1>
        <h4>
          Kami telah mengirimkan email ke{" "}
          <span id="email">
            {localStorage.getItem("email")
              ? localStorage.getItem("email")
              : "email anda"}
          </span>{" "}
          untuk mengkonfirmasi slot tim anda di Turnamen PUBG Mobile Terminator
          Challenge. Setelah menerima email ikuti instruksi yg diberikan untuk
          menyelesaikan pendaftaran
        </h4>
        <div className="emailConfirmation-not-get-email">
          <h4>
            Jika anda tidak mendapatkan email.
            <span onClick={sendEmail} id="sendEmail">
              Kirim ulang email konfirmasi
            </span>
          </h4>
          <Link to="/team">Kembali ke Home</Link>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;
