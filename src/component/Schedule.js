import React from "react";
import { useSelector } from "react-redux";
import { selectTournament } from "../redux/reducers/tournamentSlice";
import "./Schedule.css";
import moment from 'moment'


function Schedule() {

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
        <h4 className="specialFont">Jadwal</h4>
      </div>
      <div className="schedule">
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
                <td>{moment(t.time).format('ddd, D MMM LT')}</td>
              </tr>
            )) 
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;
