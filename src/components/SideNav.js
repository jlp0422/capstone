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
      'CurrentGame',
      'Teams',
      'Scores',
      'Categories',
      'PastGames'
    ];

    return (
      <div>
        <ul>
          <Sidebar
            sidebar={sidebarContent.map(val => (
              <li key={val}>
                <NavLink to={`./${val}`}>{val}</NavLink>
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
