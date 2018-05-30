import React from 'react';
import Login from './Login';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import Categories from './Categories';
import PastGames from './PastGames';
import Category from './Category';
import Teams from './Teams';
import Home from './Home';
import { withRR4, Nav, NavText } from 'react-sidenav';

const SideNav = withRR4();

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: 220 }}>
          <SideNav default="/" highlightBgColor="blue" highlightColor="white">
            <Nav id="">
              <NavText> Home </NavText>
            </Nav>
            <Nav id="">
              <NavText> Login </NavText>
            </Nav>
            <Nav id="categories">
              <NavText> Categories </NavText>
            </Nav>
            <Nav id="teams">
              <NavText> Teams </NavText>
            </Nav>
          </SideNav>
        </div>
        <div style={{ padding: 20 }}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <div className="Home">
                  <Home />
                </div>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <div className="">
                  <Login />
                </div>
              )}
            />
            <Route
              path="/categories"
              exact
              render={() => (
                <div className="Categories">
                  <Categories />
                </div>
              )}
            />
            <Route
              path="/categories/:id"
              exact
              render={({ history }) => <Category history={history} />}
            />
            <Route
              path="/teams"
              exact
              render={() => (
                <div className="Teams">
                  <Teams />
                </div>
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
