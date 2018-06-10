import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import socket from '../../socket-client';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      signup: false,
      id: '',
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      password: '',
      email: '',
      passwordStrength: 'Weak',
      passwordMatch: false
    }
    this.submit = this.submit.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  submit(ev){
    const { id, name, password, signup, email, street, city, state, zip } = this.state;
    const hashPassword = bcrypt.hashSync(password, 6)
    ev.preventDefault();
    if ( signup ) {
      const randomNum = Math.floor(Math.random() * 10000)
      const newId = randomNum > 1000 ? String(randomNum) : `0${randomNum}`
      socket.emit('bar login', newId)
      axios.post('/auth/register', {
        name,
        id: newId,
        password: hashPassword,
        email,
        address: { street, city, state, zip }
      })
      .then(res => res.data)
      .then(user => this.props.login(user))
      .then(() => this.props.history.push('/'))
    }
    else {
      socket.emit('bar login', id)
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

  passwordMatch(confirmPassword){
    if (this.state.password === confirmPassword) {
      this.setState({ passwordMatch: true })
    }
  }

  render(){
    const { signup, passwordStrength, passwordMatch } = this.state;
    return (
      <div className='login'>
        <div className='login-header'> { signup ? 'Create an Account' : 'Please Log in' } </div>
        <form onSubmit={this.submit}>
          { signup ?
            <div>
              <input
                onChange={(ev) => this.setState({ name: ev.target.value })}
                placeholder="Your Bar's Name"
                className='form-control login-input mb-3' />
              <input
                onChange={(ev) => this.setState({ street: ev.target.value })}
                placeholder='Street Address'
                className='form-control login-input mb-3' />
              <div className='form-row login-input mb-3'>
                <div className='col-7 login-col-l'>
                  <input
                    onChange={(ev) => this.setState({ city: ev.target.value })}
                    placeholder='City'
                    className='form-control' />
                </div>
                <div className='col'>
                  <input
                    onChange={(ev) => this.setState({ state: ev.target.value })}
                    placeholder='State'
                    className='form-control' />
                </div>
                <div className='col login-col-r'>
                  <input
                    onChange={(ev) => this.setState({ zip: ev.target.value })}
                    placeholder='Zip'
                    className='form-control' />
                </div>
              </div>
              <input
                onChange={(ev) => this.setState({ email: ev.target.value })}
                placeholder='Your Email'
                className='form-control login-input mb-3' />
              <input
                type='password'
                onChange={(ev) => {
                  this.validatePassword(ev.target.value)
                  this.setState({ password: ev.target.value })
                }}
                placeholder='Password'
                className='form-control login-input mb-3' />
              <input
                type='password'
                onChange={(ev) => this.passwordMatch(ev.target.value) }
                placeholder='Confirm Password'
                className='form-control login-input mb-3' />
              <span> {passwordStrength} </span>
              <span> {passwordMatch ? 'match' : 'nope'} </span>
            </div>
            :
            <div>
              <input
                onChange={(ev) => this.setState({ id: ev.target.value })}
                placeholder='Bar ID'
                className='form-control login-input mb-3' />
              <input
                type='password'
                onChange={(ev) => this.setState({ password: ev.target.value })}
                placeholder='Password'
                className='form-control login-input mb-3' />
            </div>
          }
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
