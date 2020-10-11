import React, { useContext } from "react";
import PrizeDetail from "./PrizeDetail";
import "./Prize.css";
import { StateContext } from "../StateProvider";

function Prize() {
  const value = useContext(StateContext);
  const { firstWinner, secondWinner, thirdWinner } = useContext(StateContext);

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
              ? firstWinner.logo
              : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=255&g=215&b=0"
          }
          prize={`Rp. ${new Intl.NumberFormat().format(
            value.data_.tournamentFirstPrize
          )}`}
        />
        <PrizeDetail
          position="2nd"
          id={secondWinner._id}
          winnerTeam={secondWinner ? secondWinner.teamName : ""}
          image={
            secondWinner
              ? secondWinner.logo
              : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=192&g=192&b=192"
          }
          prize={`Rp. ${new Intl.NumberFormat().format(
            value.data_.tournamentSecondPrize
          )}`}
        />
        <PrizeDetail
          position="3rd"
          id={thirdWinner._id}
          winnerTeam={thirdWinner ? thirdWinner.teamName : ""}
          image={
            thirdWinner
              ? thirdWinner.logo
              : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-trophy-13.png&r=203&g=126&b=50"
          }
          prize={`Rp. ${new Intl.NumberFormat().format(
            value.data_.tournamentThirdPrize
          )}`}
        />
      </div>
    </div>
  );
}

export default Prize;
