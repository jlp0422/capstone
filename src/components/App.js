import React from 'react';
import Login from './Login';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import Categories from './Categories';
import CurrentGame from './CurrentGame';
import PastGames from './PastGames';
import Category from './Category';
import Teams from './Teams';
import Home from './Home';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <Router>
      <div className='main-grid'>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/categories" exact component={Categories}/>
          <Route path="/categories/:id" component={Category}/>
          <Route path="/teams" component={Teams}/>
          <Route path="/games/active" exact component={CurrentGame}/>
          <Route path="/games/past" exact component={PastGames}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
