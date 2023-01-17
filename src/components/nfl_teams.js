import React, { useState } from 'react';
import './index.css'; // Import the CSS page

const NFL_TEAMS = [
  {name: 'Arizona Cardinals', division: 'NFC', rank: 29},
  {name: 'Atlanta Falcons', division: 'NFC', rank: 25},
  {name: 'Baltimore Ravens', division: 'AFC', rank: 10},
  {name: 'Buffalo Bills', division: 'AFC', rank: 4},
  {name: 'Carolina Panthers', division: 'NFC', rank: 20},
  {name: 'Chicago Bears', division: 'NFC', rank: 31},
  {name: 'Cincinnati Bengals', division: 'AFC', rank: 5},
  {name: 'Cleveland Browns', division: 'AFC', rank: 23},
  {name: 'Dallas Cowboys', division: 'NFC', rank: 7},
  {name: 'Denver Broncos', division: 'AFC', rank: 27},
  {name: 'Detroit Lions', division: 'NFC', rank: 15},
  {name: 'Green Bay Packers', division: 'NFC', rank: 16},
  {name: 'Houston Texans', division: 'AFC', rank: 32},
  {name: 'Indianapolis Colts', division: 'AFC', rank: 30},
  {name: 'Jacksonville Jaguars', division: 'AFC', rank: 8},
  {name: 'Kansas City Chiefs', division: 'AFC', rank: 1},
  {name: 'Las Vegas Raiders', division: 'AFC', rank: 22},
  {name: 'Los Angeles Chargers', division: 'AFC', rank: 6},
  {name: 'Los Angeles Rams', division: 'NFC ', rank: 28},
  {name: 'Miami Dolphins', division: 'AFC', rank: 14},
  {name: 'Minnesota Vikings', division: 'NFC', rank: 9},
  {name: 'New England Patriots', division: 'AFC', rank: 18},
  {name: 'New Orleans Saints', division: 'NFC', rank: 24},
  {name: 'New York Giants', division: 'NFC', rank: 12},
  {name: 'New York Jets', division: 'AFC', rank: 21},
  {name: 'Philadelphia Eagles', division: 'NFC', rank: 2},
  {name: 'Pittsburgh Steelers', division: 'AFC', rank: 17},
  {name: 'San Francisco 49ers', division: 'NFC', rank : 3},
  {name: 'Seattle Seahawks', division: 'NFC', rank: 11},
  {name: 'Tampa Bay Buccaneers', division: 'NFC', rank: 13},
  {name: 'Tennessee Titans', division: 'AFC', rank: 26},
  {name: 'Washington Commanders', division: 'NFC', rank: 19}
];

function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
  
  
  
  function RandomNFLTeams() {
    const [awayTeamIndex, setAwayTeamIndex] = useState(randomIndex(NFL_TEAMS));
    const [homeTeamIndex, setHomeTeamIndex] = useState(randomIndex(NFL_TEAMS));
  
    function generateTeams() {
      let newAwayTeamIndex = randomIndex(NFL_TEAMS);
      let newHomeTeamIndex = randomIndex(NFL_TEAMS);
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
        if (homeTeam.rank - awayTeam.rank <= 4 && homeTeam.rank < awayTeam.rank) {
          return homeTeam;
        }
        else if (homeTeam.rank < awayTeam.rank) {
          return homeTeam;
        }
        return awayTeam;
      }
      
    
    return ( 
        <div className="container">
        <h1 className="title">SPORTS BETTER</h1>
        <button onClick={generateTeams}>GENERATE RANDOM TEAMS</button>
        <div className={`card ${awayTeam.name.toLowerCase().replace(/\s/g,'')}`}>
            <p>{awayTeam.name}</p>
        </div>
        <p className="vs">------------VS-------------</p> 
        <div className={`card ${homeTeam.name.toLowerCase().replace(/\s/g,'')}`}>
             <p>{homeTeam.name}</p>
        </div>
        <p className="favored-team">Favored Team: {favoredTeam.name}</p>
    </div>
  );
}

export default RandomNFLTeams;

    