import React from 'react';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import { withRR4, Nav, NavText } from 'react-sidenav';
import Categories from './Categories';
import Category from './Category';
import Teams from './Teams';
import Home from './Home';

const SideNav = withRR4();

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: 220 }}>
          <SideNav
            default="Home"
            highlightBgColor="blue"
            highlightColor="white"
          >
            <Nav id="Home">
              <NavText> Home </NavText>
            </Nav>
            <Nav id="Categories">
              <NavText> Categories </NavText>
            </Nav>
            <Nav id="Teams">
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
                  {' '}
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
