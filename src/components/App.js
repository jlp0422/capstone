import React from 'react';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import SideNav from './SideNav';
<<<<<<< HEAD
import Categories from './Categories';
=======
>>>>>>> b0d5ddd5d4b911b9cc09d2dca349393dbee18ff6

const App = () => {
  return (
    <Router>
      <div>
        <SideNav />
        <Switch>
<<<<<<< HEAD
          <Route path="/" exact render={() => <hr />} />
          <Route path="/categories" exact render={() => <Categories />} />
=======
          <Route path="/" render={() => <hr />} />
>>>>>>> b0d5ddd5d4b911b9cc09d2dca349393dbee18ff6
        </Switch>
      </div>
    </Router>
  );
};

export default App;
