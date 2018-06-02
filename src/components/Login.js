import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      signup: false,
      id: '',
      name: '',
      password: ''
    }
    this.submit = this.submit.bind(this);
  }

  submit(ev){
    const { id, name, password, signup } = this.state;
    const hashPassword = bcrypt.hashSync(password, 6)
    ev.preventDefault();
    if ( signup ) {
      axios.post('/auth/register', { id, name, password: hashPassword })
      .then(res => res.data)
      .then(user => this.props.login(user))
      .then(() => this.props.history.push('/'))
    }
    else {
      axios.post('/auth/login', { id, password })
      .then(res => res.data)
      .then(user => this.props.login(user))
      .then(() => this.props.history.push('/'))
    }
  }

  validatePassword(password) {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

    return (
      this.setState({ passwordStrength:
        strongRegex.test(password) ?
        'Strong'
        : mediumRegex.test(password) ?
        'Medium'
        : 'Weak'
      })
    );
  }

  render(){
    const { signup } = this.state;
    return (
      <div className='login'>
        <div className='login-header'> { signup ? 'Create an Account' : 'Please Log in' } </div>
        <form onSubmit={this.submit}>
          { signup ?
            <input
              onChange={(ev) => this.setState({ name: ev.target.value })}
              placeholder="Your Bar's Name"
              className='form-control login-input' />
            : null
          }
          <br />
          <input
            type='number'
            max="9999"
            min="1000"
            onChange={(ev) => this.setState({ id: ev.target.value })}
            placeholder='Bar ID'
            className='form-control login-input' />
          <br />
          <input
            type='password'
            onChange={(ev) => this.setState({ password: ev.target.value })}
            placeholder='Password'
            className='form-control login-input' />
          <br />
          <button className='btn btn-dark'> { signup ? 'Sign up' : 'Log in' }</button>
        </form>
        <hr className='login-hr'/>
        <div className='sign-up'>
          {
            signup ?
            <div className='sign-up-text'> Already have an account? </div>
            :
            <div className='sign-up-text'> Don't have an account? </div>
          }
          <button className='btn btn-dark'
            onClick={()=> this.setState({ signup: !signup })}>
            { signup ? 'Click here to Log in' : 'Create one!'} 
          </button>
        </div>
      </div>
    )
  }
}
