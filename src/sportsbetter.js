import React, { useState } from 'react';
import './index.css'; 
import { NFL_TEAMS } from './NFLTeams';

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function RandomNFLTeams() {
  const [awayTeamIndex, setAwayTeamIndex] = useState(randomIndex(NFL_TEAMS));
  const [homeTeamIndex, setHomeTeamIndex] = useState(randomIndex(NFL_TEAMS));
  const [winner, setWinner] = useState(null);
  const [spread, setSpread] = useState(0);
  const [showWinner, setShowWinner] = useState(false);
  const [bank, setBank] = useState(500);


  let favoredDifference;

  function generateTeams() {
    let newAwayTeamIndex = randomIndex(NFL_TEAMS);
    let newHomeTeamIndex = randomIndex(NFL_TEAMS);
    setWinner(null);
    setShowWinner(false);
    while (newAwayTeamIndex === newHomeTeamIndex) {
        newHomeTeamIndex = randomIndex(NFL_TEAMS);
    }
    setAwayTeamIndex(newAwayTeamIndex);
    setHomeTeamIndex(newHomeTeamIndex);
  }


  const awayTeam = NFL_TEAMS[awayTeamIndex];
  const homeTeam = NFL_TEAMS[homeTeamIndex];
  const favoredTeam = determineFavoredTeam(homeTeam, awayTeam);

  function determineFavoredTeam(homeTeam, awayTeam) {
    return homeTeam.rank < awayTeam.rank || homeTeam.rank - awayTeam.rank <= 4 ? homeTeam : awayTeam;
  }

  favoredDifference = homeTeam.rank - awayTeam.rank - 4;
  let homeGameLine, awayGameLine;
if (favoredDifference === 0) {
  homeGameLine = -110;
  awayGameLine = -105;
} else if (favoredDifference >= 29) {
  homeGameLine = -560;
  awayGameLine = 600;
} else if (favoredDifference <= -35) {
  homeGameLine = 600;
  awayGameLine = -560;
} else {
  homeGameLine = favoredDifference * 20;
  awayGameLine = -(favoredDifference * 20) - 20;
}

homeGameLine = homeGameLine > 0 ? `+${homeGameLine}` : homeGameLine;
awayGameLine = awayGameLine > 0 ? `+${awayGameLine}` : awayGameLine;

homeGameLine = Math.abs(homeGameLine) <= 99 ? "+110" : homeGameLine;
awayGameLine = Math.abs(awayGameLine) <= 99 ? "+110" : awayGameLine;

homeGameLine = homeGameLine >= 0 && homeGameLine <= 99 ? "+110" : homeGameLine;
homeGameLine = homeGameLine >= -99 && homeGameLine <= -1 ? "-105" : homeGameLine;

awayGameLine = awayGameLine >= 0 && awayGameLine <= 99 ? "+110" : awayGameLine;
awayGameLine = awayGameLine >= -99 && awayGameLine <= -1 ? "-105" : awayGameLine;


function generateWinner() {
    let winner;
    if (favoredDifference === 0) {
      winner = Math.random() < 0.5 ? homeTeam : awayTeam;
    } else if (favoredDifference > 0) {
      winner = Math.random() > (1 / (favoredDifference + 1)) ? awayTeam : homeTeam;
    } else {
      const probability = 1 / (Math.abs(favoredDifference) + 1);
      winner = Math.random() < probability ? awayTeam : homeTeam;
    }
    setWinner(winner.name);
    setShowWinner(true);
  }


  let awayTeamLogo = require(`./images/${awayTeam.name.toLowerCase().replace(/\s/g,'')}.png`);
  let homeTeamLogo = require(`./images/${homeTeam.name.toLowerCase().replace(/\s/g,'')}.png`);


  return (
    <div className="container">
        <h1 className="title">SPORTS BETTER</h1>
        <button className="generate-team-button" onClick={generateTeams} >GENERATE RANDOM TEAMS</button>
        <div className={`card ${awayTeam.name.toLowerCase().replace(/\s/g,'')}`}>
            <img  className="team-logo" src={awayTeamLogo} alt={awayTeam.name}/>
            <p className="team-name-container">{awayTeam.name}</p>
            <p className="game-line">{awayGameLine}</p>
        </div>
        <p className="vs">VS</p>
        <div className='bank-container'>
            <h1 className='bank'>BANK :</h1> 
            <h1 className='bank' style={{color: "green"}}>${bank}</h1> 
        </div>
        <div className={`card ${homeTeam.name.toLowerCase().replace(/\s/g, '')}`}>
            <img  className="team-logo" src={homeTeamLogo} alt={homeTeam.name} />
            <p className="team-name-container">{homeTeam.name}</p>
            <p className="game-line">{homeGameLine}</p>
        </div>
        <button className="generate-winner-button" onClick={generateWinner} >GENERATE WINNER</button>
      {showWinner && (
        <div>
          <p className="winner">Winner: {winner}</p>
        </div>
      )}
    </div>
);

}

export default RandomNFLTeams;
