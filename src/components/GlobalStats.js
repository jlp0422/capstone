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
      game: false,
      geo: !this.game && !this.games
    };
    this.gamesState = this.gamesState.bind(this);
    this.gameState = this.gameState.bind(this);
    //this.geoToggle = this.geoToggle.bind(this);
  }
  gameState() {
    this.setState({ game: !this.state.game, games: false });
  }
  gamesState() {
    this.setState({ games: !this.state.games, game: false });
  }
  // geoToggle() {
  //   this.setState({ games: false, game: false, geo: !this.state.geo });
  // }
  render() {
    const { games, game, geo } = this.state;
    const { gamesState, gameState, geoToggle } = this;
    return (
      <div>
        <button onClick={() => gameState()}>Last game stats on/off</button>
        <button onClick={() => gamesState()}>all games stats on/off</button>

        {game && <QuestionsChart />}
        {game && <GameScoreChart />}
        {games && <AllQuestionsChart />}
        {games && <CompareGamesChart />}
        {geo && <GeoChart />}
      </div>
    );
  }
}
