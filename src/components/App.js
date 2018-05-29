import React from 'react';
import Login from './Login';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import Categories from './Categories';
import PastGames from './PastGames';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact render={() => <hr />} />
          <Route path="/login" component={ Login } />
          <Route path="/categories" exact render={() => <Categories />} />
          <Route path="/pastgames" exact render={() => <PastGames />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
