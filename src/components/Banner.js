import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Banner extends Component {
  constructor(props){
    super(props);
    this.state = this.props;
  }

  render(){
    const { login } = this.state;
    return (
      <div className='main-header'>
        <span className="">UnTapped Trivia</span>
        { login ?
          <NavLink className='header-links'
            onClick={() => {
              this.setState({ login: !login })
              localStorage.removeItem('token')
            }}
            to='/login'> Log Out </NavLink>
        :
          <NavLink className='header-links' to='/login'> Login </NavLink>
        }
      </div>
    )
  }
}

export default Banner;
