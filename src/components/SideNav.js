import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { NavLink } from 'react-router-dom';

export default class CurrentGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  render() {
    const sidebarContent = [
<<<<<<< HEAD
      'currentGame',
      'teams',
      'scores',
      'categories',
      'pastGames'
=======
      'CurrentGame',
      'Teams',
      'Scores',
      'Categories',
      'PastGames'
>>>>>>> b0d5ddd5d4b911b9cc09d2dca349393dbee18ff6
    ];

    return (
      <div>
        <ul>
          <Sidebar
            sidebar={sidebarContent.map(val => (
              <li key={val}>
<<<<<<< HEAD
                <NavLink to={`/${val}`}>{val}</NavLink>
=======
                <NavLink to={`./${val}`}>{val}</NavLink>
>>>>>>> b0d5ddd5d4b911b9cc09d2dca349393dbee18ff6
              </li>
            ))}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
          >
            <button onClick={() => this.onSetSidebarOpen()}>Menu</button>
          </Sidebar>
        </ul>
      </div>
    );
  }
}
