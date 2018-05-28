import React from 'react';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import SideNav from './SideNav';

const App = () => {
  return (
    <Router>
      <div>
        <SideNav />
        <Switch>
          <Route path="/" render={() => <hr />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
