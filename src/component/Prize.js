import React, { useEffect, useState } from "react";
import PrizeDetail from "./PrizeDetail";
import "./Prize.css";
import { useSelector } from "react-redux";
import {selectTournament} from '../redux/reducers/tournamentSlice'

function Prize() {
  
  const tournament = useSelector(selectTournament)

  const [firstWinner, setFirstWinner] = useState(false);
  const [secondWinner, setSecondWinner] = useState(false);
  const [thirdWinner, setThirdWinner] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      tournament.teams.map((a) => {
        if (a.tournamentFirstWinner === true) {
          setFirstWinner(a);
        }
        if (a.tournamentSecondWinner === true) {
          setSecondWinner(a);
        }
        if (a.tournamentThirdWinner === true) {
          setThirdWinner(a);
        }

        return 0;
      });
    }
    return () => (mounted = false);
  }, [tournament.teams]);

  return (
    <div className=" tourneyInfoPrize">
      <div className="specialFont-wraper">
        <h4 className="specialFont">Hadiah</h4>
      </div>
      <p>
        <span>PENTING</span> : Hadiah akhir akan disesuaikan berdasarkan jumlah
        total tim yang mendaftar
      </p>
      <div className="prize">
        <PrizeDetail
          position="1st"
          id={firstWinner._id}
          winnerTeam={firstWinner ? firstWinner.teamName : ""}
          image={
            firstWinner
              ? firstWinner.logo !== null ? firstWinner.logo : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=255&g=215&b=0"
              : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=255&g=215&b=0"
          }
          prize={`Rp. ${new Intl.NumberFormat().format(
            tournament.tournamentFirstPrize
          )}`}
        />
        <PrizeDetail
          position="2nd"
          id={secondWinner._id}
          winnerTeam={secondWinner ? secondWinner.teamName : ""}
          image={
            secondWinner
              ? secondWinner.logo !== null ? secondWinner.logo : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=192&g=192&b=192"
              : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=192&g=192&b=192"
          }
          prize={`Rp. ${new Intl.NumberFormat().format(
            tournament.tournamentSecondPrize
          )}`}
        />
        <PrizeDetail
          position="3rd"
          id={thirdWinner._id}
          winnerTeam={thirdWinner ? thirdWinner.teamName : ""}
          image={
            thirdWinner
              ? thirdWinner.logo !== null ? thirdWinner.logo : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=203&g=126&b=50"
              : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=203&g=126&b=50"
          }
          prize={`Rp. ${new Intl.NumberFormat().format(
            tournament.tournamentThirdPrize
          )}`}
        />
      </div>
    </div>
  );
}

export default Prize;
