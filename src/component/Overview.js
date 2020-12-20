import React from "react";
import { useSelector } from "react-redux";
import { selectTournament } from "../redux/reducers/tournamentSlice";
import "./Overview.css";
import moment from 'moment'


function Overview() {

  const tournament = useSelector(selectTournament)

  moment.updateLocale('id', {
    weekdaysShort : ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
});

moment.updateLocale('id', {
    monthsShort : [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ]
});

  return (
    <div className="container">
      <div className="specialFont-wraper">
        <h4 className="specialFont">Tinjauan</h4>
      </div>
      <div className="overview">
        <div className='overview-registration-waitlist'>
          <h4>Registrasi dan Daftar Tunggu</h4>
          <p>Turnamen ini mengaktifkan daftar tunggu. Daftar tunggu memungkinkan jumlah tim yang tidak terbatas untuk mendaftar ke turnamen di mana pendaftar dipisahkan menjadi dua kelompok: daftar standar dan daftar daftar tunggu.
            Jika ukuran peserta maksimum turnamen adalah 16 tim, maka 16 pendaftar pertama akan ditempatkan pada daftar standar. Setiap tim yang mendaftar setelah tim # 16 akan ditempatkan di daftar tunggu.
            Ketika tim dalam daftar standar gagal mengonfirmasi slot di turnamen, mereka akan diganti berdasarkan urutan kedatangan (berdasarkan urutan tanggal dan waktu pendaftaran) oleh tim di daftar tunggu.</p>
        </div>
        <h4>Jadwal</h4>
        <table>
          <thead>
            <tr>
              <td>Round</td>
              <td>Match</td>
              <td>Maps</td>
              <td>Time</td>
            </tr>
          </thead>
          <tbody>
            {tournament.rounds.map((t,i)=>(
              <tr key={i}>
                <td>{t.round}</td>
                <td>{t.match}</td>
                <td>{t.map}</td>
                <td>{moment(t.time).format('ddd, D MMM HH:mm')}</td>
              </tr>
            )) 
            }
          </tbody>
        </table>
        <div className='overview-information'>
          <h4>Informasi</h4>
          <ul>
            <li>Server : Asia</li>
            <li>System Poin : PMGC</li>
            <li>Mobile Only</li>
            <li>Akun min Lv.30</li>
          </ul>
        </div>
        <div className='overview-submit-score'>
          <h4>Kirim Hasil Pertandingan</h4>
          <p>Pemain bertanggung jawab untuk mengirimkan skor pertandingan anda sendiri ke Admin.
            Pemain harus menangkap tangkapan layar dari hasil pertandingan dan mengunggahnya sebagai bukti pertandingan. 
            Bukti tersebut dikirimkan kepada Admin via Whatsapp.
          </p>
        </div>
        <div className='overview-report'>
          <h4>Lapor</h4>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://forms.gle/y7rDmdaQY55YsLLF6"
          >Lapor pemain cheating</a>
          <span>Admin kami akan menginvestigasi secepat yang kami bisa!</span>
        </div>
        <div className='overview-admin'>
          <h4>Admin</h4>
          <span>WA : <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://wa.me/6282237813869"
              >
                082237813869 (Rey)
              </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Overview;
