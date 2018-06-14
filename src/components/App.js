import React, { Component } from 'react';
import Login from './Login';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import moment from 'moment';
import socket from '../../socket-client';
import Categories from './Categories';
import CurrentGame from './CurrentGame';
import Category from './Category';
import Teams from './Teams';
import Home from './Home';
import Sidebar from './Sidebar';
import Banner from './Banner';
import Timer from './Timer';
import Checkout from './Checkout';
import Footer from './Footer';
import GlobalStats from './GlobalStats';
import LocalStats from './LocalStats';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: {},
      loggedIn: false
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.whoAmI = this.whoAmI.bind(this);
  }

  componentDidMount() {
    this.whoAmI();
  }

  // componentWillReceiveProps() {
  //   this.whoAmI();
  // }

  whoAmI() {
    const user = localStorage.getItem('token');
    if (user) {
      const token = jwt.verify(user, 'untappedpotential');
      axios
        .post(`/v1/bars/${token.id}`, token)
        .then(res => res.data)
        .then(bar => this.setState({ bar, loggedIn: true }))
        .then(() => socket.emit('bar login', token.id));
      axios
        .get(`/v1/bars/${token.id}`)
        .then(res => res.data)
        .then(bar => {
          if (moment(bar.endOfMembershipDate) > moment()) {
            localStorage.setItem('validMembership', 'true');
          }
        });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('teams');
    this.setState({ loggedIn: false });
  }

  login(user) {
    localStorage.setItem('token', user.token);
    const index = localStorage.getItem('index');
    if (index === '10' || index === '0') localStorage.removeItem('index');
    this.setState({ loggedIn: true });
  }

  render() {
    const { bar, loggedIn } = this.state;
    const { whoAmI, logout } = this;
    if (!bar.name) this.whoAmI();
    return (
      <Router>
      <div>
        <div id="main">
          <Banner loggedIn={loggedIn} logout={logout} bar={bar} />
          {loggedIn && <Sidebar bar={bar} />}
          <div className={`${loggedIn ? 'container app' : 'loggedOut'}`}>
            {loggedIn && <Timer bar={bar} />}
            {loggedIn ? (
              <div>
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={({ history }) => (
                      <Home whoAmI={whoAmI} history={history} bar={bar} />
                    )}
                  />
                  <Route path="/categories" exact component={Categories} />
                  <Route path="/categories/:id" component={Category} />
                  <Route path="/teams" component={Teams} />
                  <Route
                    path="/games/active"
                    exact
                    render={() => <CurrentGame bar={bar} />}
                  />
                  <Route path="/GlobalStats/" exact component={GlobalStats} />
                  <Route
                    path="/LocalStats/"
                    exact
                    render={() => <LocalStats bar={bar} />}
                  />
                  <Route
                    path="/checkout"
                    exact
                    render={({ history }) => (
                      <Checkout bar={bar} history={history} />
                    )}
                  />
                </Switch>
                <Footer />
              </div>
            ) : (
              <Route
                path="/"
                render={({ history }) => (
                  <Login login={this.login} history={history} />
                )}
              />
            )}
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
