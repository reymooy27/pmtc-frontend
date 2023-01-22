import React from 'react'
import './TournamentParticipantDetails.css'

function TournamentParticipantDetails({tournament}) {
  return (
    <>
    <h2>Participant Informatian</h2>
    <div className='tournamentParticipantDetails'>
    <table>
      <thead>
        <tr>
          <td>Nama Tim</td>
          <td colSpan='5'>Roster</td>
          <td>No WA</td>
          <td>Email</td>
        </tr>    
      </thead>
      <tbody>
      {tournament.map(t=>(
        <tr key={t._id}>
          <td>{t.teamName}</td>
          <td>{`${t.playerName} (${t.idPlayer})`}</td>
          <td>{`${t.playerName2} (${t.idPlayer2})`}</td>
          <td>{`${t.playerName3} (${t.idPlayer3})`}</td>
          <td>{`${t.playerName4} (${t.idPlayer4})`}</td>
          <td>{t.idPlayer5 ? `${t.playerName5} (${t.idPlayer5})` : '-'}</td>
          <td>
            <a target="_blank"
                rel="noopener noreferrer"
                href={`http://wa.me/62${t.handphoneNumber}`}>{t.handphoneNumber}</a>
          </td>
          <td><a target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${t.email}`}>{t.email}</a></td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
    </>
  )
}

export default TournamentParticipantDetails
