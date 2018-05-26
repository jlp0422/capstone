import React from 'react';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import SideNav from './SideNav';
import Categories from './Categories';
import Category from './Category';

const App = () => {
  return (
    <Router>
      <div>
        <SideNav />
        <Switch>
          <Route path="/" exact render={() => <hr />} />
          <Route path="/categories" exact render={() => <Categories />} />
          <Route
            path="/categories/:id"
            exact
            render={({ history }) => <Category history={history} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
