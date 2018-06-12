import React, { Component } from 'react';
import QuestionsChart from './charts/QuestionsInAGame';
import AllQuestionsChart from './charts/AllQuestions';
import CompareGamesChart from './charts/CompareGames';
import GameScoreChart from './charts/GameScoreChart';
import GeoChart from './charts/geoChart';

export default class GlobalStats extends Component {
  constructor() {
    super();
    this.state = {
      games: false,
      game: false
    };
    this.gamesState = this.gamesState.bind(this);
    this.gameState = this.gameState.bind(this);
  }
  gameState() {
    const { games, game } = this.state;
    this.setState({ game: !game, games: false });
  }
  gamesState() {
    const { games, game } = this.state;
    this.setState({ games: !games, game: false });
  }

  render() {
    const { games, game, geo } = this.state;
    const { gamesState, gameState } = this;
    console.log(this.state);
    return (
      <div>
        <button onClick={() => gameState()}>Last game stats on/off</button>
        <button onClick={() => gamesState()}>all games stats on/off</button>

        {game && <QuestionsChart />}
        {game && <GameScoreChart />}
        {games && <AllQuestionsChart />}
        {games && <CompareGamesChart />}
        <GeoChart />
      </div>
    );
  }
}
