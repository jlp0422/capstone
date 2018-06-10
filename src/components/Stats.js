import React, { Component } from 'react';
import QuestionsChart from './charts/QuestionsInAGame';
import AllQuestionsChart from './charts/AllQuestions';
import CompareGamesChart from './charts/CompareGames';
import GameScoreChart from './charts/GameScoreChart';
import GeoChart from './charts/GeoChart';


export default class Stats extends Component {
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

    this.setState({ game: !this.state.game, games: false });
  }
  gamesState() {
    this.setState({ games: !this.state.games, game: false });

  }
  render() {
    const { games, game } = this.state;
    const { gamesState, gameState } = this;
    return (
      <div>
        <button onClick={() => gameState()}>Last game stats on/off</button>
        <button onClick={() => gamesState()}>all games stats on/off</button>
        {game && <QuestionsChart />}
        {game && <GameScoreChart />}
        {games && <AllQuestionsChart />}
        {games && <CompareGamesChart />}
        {<GeoChart />}
      </div>
    );
  }
}
