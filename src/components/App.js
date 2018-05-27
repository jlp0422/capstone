import React from 'react';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import SideNav from './SideNav';
import Categories from './Categories';
import Category from './Category';
import Teams from './Teams';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact render={() => <hr />} />
          <Route path="/categories" exact render={() => <Categories />} />
          <Route
            path="/categories/:id"
            exact
            render={({ history }) => <Category history={history} />}
          />
          <Route path="/teams" exact render={() => <Teams />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
