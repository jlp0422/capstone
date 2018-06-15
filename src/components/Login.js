import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import socket from '../../socket-client';

// disabled={passwordMatch === false}

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
      passwordMatch: false,
      errors: {},
      error: ''
    }
    this.submit = this.submit.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validators = {
      name: value => {
        if (!value) return 'Bar Name Is Required';
      },
      street: value => {
        if (!value) return 'Street Address Is Required';
      },
      city: value => {
        if (!value) return 'City Is Required';
      },
      state: value => {
        if (!value) return 'State Is Required';
      },
      zip: value => {
        if (!value) return 'Zip Code Is Required';
      },
      email: value => {
        if (!value) return 'Email Is Required';
      },
      password: value => {
        if (!value) return 'Password Is Required';
      },
    };
  }

  submit(ev){
    const { id, name, password, signup, email, street, city, state, zip } = this.state;
    const hashPassword = bcrypt.hashSync(password, 6);
    ev.preventDefault();

    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if (error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    if ( signup ) {
      const randomNum = Math.floor(Math.random() * 10000)
      const newId = randomNum > 1000 ? String(randomNum) : `0${randomNum}`
      socket.emit('bar login', newId)
      axios.post('/auth/register', {
        name,
        id: newId,
        password: hashPassword,
        email,
        address: { street, city, state, zip },
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
      .catch(error => this.setState({error}))
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
    if (this.state.password !== confirmPassword) {
      this.setState({errors: {noMatch: 'Passwords Must Match'}})
    } 
    if (this.state.password === confirmPassword) {
      this.setState({ passwordMatch: true })
    }
    else {
      this.setState({ passwordMatch: false })
    }
  }
  
  render(){
    console.log(this.state.errors.noMatch)
    const { signup, passwordStrength, passwordMatch, error, errors } = this.state;  //removed errors
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
                <p className='error'>{ errors.name }</p>
              <input
                onChange={(ev) => this.setState({ street: ev.target.value })}
                placeholder='Street Address'
                className='form-control login-input mb-3' />
                <p className='error'>{ errors.street }</p>
              <div className='form-row login-input mb-3'>
                <div className='col-7 login-col-l'>
                  <input
                    onChange={(ev) => this.setState({ city: ev.target.value })}
                    placeholder='City'
                    className='form-control' />
                    <p className='error'>{ errors.city }</p>
                </div>
                <div className='col'>
                  <input
                    onChange={(ev) => this.setState({ state: ev.target.value })}
                    placeholder='State'
                    className='form-control' />
                    <p className='error'>{ errors.state }</p>
                </div>
                <div className='col login-col-r'>
                  <input
                    onChange={(ev) => this.setState({ zip: ev.target.value })}
                    placeholder='Zip'
                    className='form-control' />
                    <p className='error'>{ errors.zip }</p>
                </div>
              </div>
              <input
                onChange={(ev) => this.setState({ email: ev.target.value })}
                placeholder='Your Email'
                className='form-control login-input mb-3' />
                <p className='error'>{ errors.email }</p>
              <input
                type='password'
                onChange={(ev) => {
                  this.validatePassword(ev.target.value)
                  this.setState({ password: ev.target.value })
                }}
                placeholder='Password'
                className='form-control login-input mb-3' />
                <p className='error'>{ errors.password }</p>
              <input
                type='password'
                onChange={(ev) => this.passwordMatch(ev.target.value) }
                placeholder='Confirm Password'
                className='form-control login-input mb-3' />
                <p className='error'>{ errors.noMatch }</p>
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
                {
                  error ? (<p className="error">Valid Id And Password Are Required</p>) : (null)
                }
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
