import React from "react";
import "./Rules.css";
function Rules() {
  return (
    <div className="container">
      <div className="specialFont-wraper">
        <h4 className="specialFont">Peraturan</h4>
      </div>
      <div className="rules">
        <p>
          Berikut merupakan peraturan game yang digunakan dalam PUBG Mobile
          Terminator Weekly Challenge dengan sistem turnamen online. Dengan
          diinformasikannya peraturan ini maka seluruh peserta yang terlibat
          dalam turnamen ini wajib untuk mematuhi dan menjalankan segala
          peraturan yang ada.
        </p>
        <ol>
          <li className="rules-li">Peraturan Peserta</li>
          <ul>
            <li className="rules-ul-li">Ketentuan Peserta</li>
            <ul>
              <li className="rules-ul-ul-li">
                Peserta wajib memiliki akun atau id PUBG Mobile sendiri.
              </li>
              <li className="rules-ul-ul-li">
                ID-Nickname yang terdaftar tidak dapat diwakilkan oleh peserta
                lain.
              </li>
              <li className="rules-ul-ul-li">
                Masing-masing peserta hanya dapat terdaftar dalam satu tim dan
                tidak dapat bermain dalam 2 tim yang berbeda
              </li>
              <li className="rules-ul-ul-li">
                Peserta yang dapat bermain pada hari H hanyalah peserta yang
                telah terdaftar dalam registrasi tim
              </li>
            </ul>
            <li className="rules-ul-li">Peraturan Umum</li>
            <ul>
              <li className="rules-ul-ul-li">
                Media komunikasi yang digunakan yakni Whatsapp.
              </li>
              <li className="rules-ul-ul-li">
                Perhitungan poin diatur melalui Scoring Sheet yang digunakan
                oleh panitia.
              </li>
              <li className="rules-ul-ul-li">
                Seluruh informasi yang diberikan oleh panitia merupakan tanggung
                jawab masing-masing perwakilan tim.
              </li>
              <li className="rules-ul-ul-li">
                Seluruh tim wajib bermain dengan lengkap (minimal 3 anggota),
                jika tidak maka akan dianggap gagal atau WO
              </li>
              <li className="rules-ul-ul-li">
                Semua peserta wajib menjunjung nilai Sportif dan Fairplay.
              </li>
            </ul>
          </ul>
          <li className="rules-li">Sistem Turnamen</li>
          <ul>
            <li className="rules-ul-li">
              Sistem yang digunakan yakni sistem online
            </li>
            <li className="rules-ul-li">
              Turnamen PUBG Mobile menggunakan sistem scoring sheet dengan
              dihitung total poin.
            </li>
          </ul>
          <li className="rules-li">Pengaturan Match</li>
          <ul>
            <li className="rules-ul-li">
              Custom lobby atau room akan dibuat oleh panitia penyelenggara
            </li>
            <li className="rules-ul-li">
              Peserta akan bermain 3 ronde pada babak grup dan 6 ronde pada
              grandfinal
            </li>
            <li className="rules-ul-li">
              Map yang digunakan : Erangel dan Miramar
            </li>
            <li className="rules-ul-li">
              Mode yang digunakan : Third Person Perspective (TPP)
            </li>
            <li className="rules-ul-li">
              Pemenang match ditentukan dari total poin tertinggi. Total poin
              terdiri dari Place Point dan Kill Point
            </li>
            <li className="rules-ul-li">
              Perhitungan poin merujuk pada peraturan internasional PUBG Mobile,
              berikut merupakan distribusi poin :
            </li>
          </ul>

          <table>
            <thead>
              <tr>
                <th colSpan="2">PERHITUNGAN POIN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Placement</td>
                <td>Point</td>
              </tr>
              <tr>
                <td>Kill Point</td>
                <td>1 per kill</td>
              </tr>
              <tr>
                <td>#1</td>
                <td>15</td>
              </tr>
              <tr>
                <td>#2</td>
                <td>12</td>
              </tr>
              <tr>
                <td>#3</td>
                <td>10</td>
              </tr>
              <tr>
                <td>#4</td>
                <td>8</td>
              </tr>
              <tr>
                <td>#5</td>
                <td>6</td>
              </tr>
              <tr>
                <td>#6</td>
                <td>4</td>
              </tr>
              <tr>
                <td>#7</td>
                <td>2</td>
              </tr>
              <tr>
                <td>#8-12</td>
                <td>1</td>
              </tr>
              <tr>
                <td>#13-16</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>

          <li className="rules-li">Peraturan Turnamen</li>
          <ul>
            <li className="rules-ul-li">Peraturan Teknis</li>
            <ul>
              <li className="rules-ul-ul-li">
                Seluruh peserta yang melakukan tindakan ilegal (bug, cheat,
                hack, dll) dengan didukung bukti kuat maka akan
                didiskualifikasi.
              </li>
              <li className="rules-ul-ul-li">
                Teaming atau kerjasama antar squad sangat dilarang, apabila ada
                squad yang kedapatan melakukan teaming, maka kedua tim tersebut
                akan didiskualifikasi.
              </li>
              <li className="rules-ul-ul-li">
                Apabila pihak yang merasakan dicurangi tidak dapat memberikan
                bukti kuat maka pemenang match tidak dapat diubah.
              </li>
              <li className="rules-ul-ul-li">
                Seluruh peserta yang menyebarluaskan link Whatsapp tanpa
                instruksi panitia maka akan didiskualifikasi pada turnamen
                tersebut.
              </li>
              <li className="rules-ul-ul-li">
                Panitia tidak bertanggung jawab atas seluruh gangguan koneksi
                internet, crash device, device error, dan sebagainya, yang
                dialami oleh peserta.
              </li>
            </ul>
            <li className="rules-ul-li">Peraturan Saat Pertandingan</li>
            <ul>
              <li className="rules-ul-ul-li">
                Seluruh peserta wajib standby online dalam game 20 menit sebelum
                waktu match pertama dimulai.
              </li>
              <li className="rules-ul-ul-li">
                Segala bentuk kelalaian yang disebabkan oleh peserta adalah
                diluar tanggung jawab panitia.
              </li>
            </ul>
            <li className="rules-ul-li">Peraturan Tied Point</li>
            <ul>
              <p>
                Apabila terjadi jumlah poin yang sama pada keseluruhan match,
                metode keputusan yaitu :
              </p>
              <ul>
                <li className="rules-ul-ul-li">
                  Tim dengan total kill terbanyak
                </li>
                <li className="rules-ul-ul-li">
                  Tim dengan total poin tertinggi pada ronde final
                </li>
                <li className="rules-ul-ul-li">
                  Tim dengan total rank tertinggi pada ronde final
                </li>
              </ul>
            </ul>
            <li className="rules-ul-li">Peraturan Rematch</li>
            <ul>
              <li className="rules-ul-ul-li">
                Rematch hanya akan dilakukan apabila seluruh peserta mengalami
                gangguan koneksi sehingga pertandingan tidak dapat dilanjutkan;
                atau
              </li>
              <li className="rules-ul-ul-li">
                Rematch akan dilakukan apabila terjadi Force Majeure
              </li>
            </ul>
          </ul>
          <li className="rules-li">Prosedur Pertandingan</li>
          <ul>
            <li className="rules-ul-li">Sebelum Match</li>
            <ul>
              <li className="rules-ul-ul-li">
                Custom Lobby akan dibuat oleh panitia
              </li>
              <li className="rules-ul-ul-li">
                Peserta wajib standby di lobby 20 menit sebelum mulai
              </li>
            </ul>
            <li className="rules-ul-li">Saat Match</li>
            <ul>
              <li className="rules-ul-ul-li">
                Apabila masih terdapat peserta yang melakukan condition checking
                saat lobby akan dimulai maka panitia akan tetap memulai match
              </li>
              <li className="rules-ul-ul-li">
                Jika terdapat peserta yang disconnect karena kesalahan pribadi
                maka peserta tersebut dizinkan untuk reconnect namun match tetap
                berjalan.
              </li>
            </ul>
          </ul>
          <li className="rules-li">Penalti dan Walk Out</li>
          <ul>
            <li className="rules-ul-li">
              Peserta yang tidak dapat dihubungi melalui Whatsapp hingga H-2
              maka akan digantikan dengan tim lainnya.
            </li>
            <li className="rules-ul-li">
              Peserta yang tidak hadir saat match hingga batas waktu tertentu
              maka akan dinyatakan WO
            </li>
            <li className="rules-ul-li">
              Peserta yang melanggar poin-poin peraturan di atas akan
              diskualifikasi.
            </li>
          </ul>
          <li className="rules-li">Hak Penyelenggara</li>
          <ul>
            <li className="rules-ul-li">
              Panitia berhak mengganti dan mengubah peraturan yang ada dengan
              dasar yang kuat untuk kelancaran turnamen.
            </li>
            <li className="rules-ul-li">
              Panita berhak memberikan instruksi kepada para peserta dengan
              dasar untuk kelancaran turnamen
            </li>
            <li className="rules-ul-li">
              Seluruh keputusan panitia merupakan hal yang mutlak dan tidak
              dapat diganggu gugat
            </li>
            <li className="rules-ul-li">
              Seluruh peserta wajib mematuhi peraturan yang ada demi kelancaran
              turnamen.
            </li>
          </ul>
        </ol>
      </div>
    </div>
  );
}

export default Rules;
