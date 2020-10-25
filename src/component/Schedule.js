import React from "react";
import "./Schedule.css";
function Schedule() {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Round 1</td>
              <td>3</td>
              <td>Miramar, Erangel, Vikendi</td>
            </tr>
            <tr>
              <td>Round 1</td>
              <td>3</td>
              <td>Miramar, Erangel, Vikendi</td>
            </tr>
            <tr>
              <td>Grandfinal</td>
              <td>6</td>
              <td>Miramar, Erangel, Vikendi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;
