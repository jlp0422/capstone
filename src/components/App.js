import React from 'react';
import Login from './index/Login';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import SideNav from './SideNav';
import Categories from './Categories';

const App = () => {
  return (
    <Router>
      <div>
        <SideNav />
        <Switch>
          <Route path="/" exact render={() => <hr />} />
          <Route path='/login' component={Login} />
          <Route path="/categories" exact render={() => <Categories />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
