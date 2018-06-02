import React, { Component } from 'react';
import Login from './Login';
import { NavLink, Route, HashRouter as Router, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Categories from './Categories';
import CurrentGame from './CurrentGame';
import PastGames from './PastGames';
import Category from './Category';
import Teams from './Teams';
import Home from './Home';
import Sidebar from './Sidebar';
import Banner from './Banner';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      bar: {},
      login: false
    }
  }

  componentDidMount() {
    const user = localStorage.getItem('token')
    if (user) {
      const token = jwt.verify(user, 'untappedpotential')
      axios.post(`/v1/bars/${token.id}`, token)
      .then(res => res.data)
      .then(bar => this.setState({ bar, login: true }))
    }
  }

  render(){
    const { bar, login } = this.state;
    return (
      <Router>
        <div className='main'>
          <Banner login={login} />
          <Sidebar login={login}/>
          <div className='container-fluid'>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/categories" exact component={Categories}/>
            <Route path="/categories/:id" component={Category}/>
            <Route path="/teams" component={Teams}/>
            <Route path="/games/active" exact component={CurrentGame}/>
            <Route path="/games/past" exact component={PastGames}/>
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
};

export default App;
