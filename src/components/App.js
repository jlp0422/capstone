import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './index/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact render={() => <hr />} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;