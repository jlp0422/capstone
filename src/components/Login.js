import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      signup: false,
      name: '',
      email: '',
      password: ''
    }
    this.submit = this.submit.bind(this);
  }

  submit(ev){
    const { name, email, password, signup } = this.state;
    const hashPassword = bcrypt.hashSync(password, 6)
    ev.preventDefault();
    if ( signup ) {
      axios.post('/auth/register', { name, email, password: hashPassword })
      .then(res => res.data)
      .then(user => localStorage.setItem('token',  user.token ))
    }
    else {
      axios.post('/auth/login', { email, password })
      .then(res => res.data)
      .then(user => localStorage.setItem( 'token',  user.token ))
    }
  }

  render(){
    const { signup } = this.state;
    return (
      <div>
        <h1> { signup ? 'Create an Account' : 'Please Log in' } </h1>
        <form onSubmit={this.submit}>
          { signup ?
            <input
              onChange={(ev) => this.setState({ name: ev.target.value })}
              placeholder="Your Bar's Name" />
            : null
          }
          <br />
          <input
            type='number'
            max="9999"
            min="1000"
            onChange={(ev) => this.setState({ id: ev.target.value })}
            placeholder='Bar ID' />
          <br />
          <input
            type='password'
            onChange={(ev) => this.setState({ password: ev.target.value })}
            placeholder='Password' />
          <br />
          <button> { signup ? 'Sign up' : 'Log in' }</button>
        </form>
        <Link to='forgot'> Forgot your password? </Link>
        {
          signup ?
          <h3> Already have an account? </h3>
          :
          <h3> Don't have an account? </h3>
        }
        <button onClick={()=> this.setState({ signup: !signup })}> { signup ? 'Click here to Log in' : 'Create an Account'} </button>
      </div>
    )
  }
}
