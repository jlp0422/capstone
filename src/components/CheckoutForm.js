import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';
import moment from 'moment';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billingFirstName: '',
      billingLastName: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      bar: this.props.bar ? this.props.bar : '',
      endOfMembershipDate: this.props.bar ? this.props.bar.endOfMembershipDate : 'not a member yet',
      payment: false,
      amount: -1,
      months: -1,
      selectedPlan: '',
      errors: {}
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.oneMonth = this.oneMonth.bind(this);
    this.threeMonths = this.threeMonths.bind(this);
    this.oneYear = this.oneYear.bind(this);

    this.validators = {
      billingFirstName: value => {
        if (!value) return 'First name is required.';
      },
      billingLastName: value => {
        if (!value) return 'Last name is required.';
      },
      firstName: value => {
        if (!value) return 'First name is required.';
      },
      lastName: value => {
        if (!value) return 'Last name is required.';
      },
      email: value => {
        if (!value) return 'Email is required.';
      },
      address: value => {
        if (!value) return 'Address is required.';
      },
      city: value => {
        if (!value) return 'City is required.';
      },
      state: value => {
        if (!value) return 'State is required.';
      },
      zip: value => {
        if (!value) return 'Zip code is required.';
      },
      payment: value => {
        if (!value) return 'Payment information is required.';
      }
    };
  }
  componentWillMount() {
    this.setState({bar: this.props.bar});

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.bar) {
      this.setState({
        bar: nextProps.bar
      });
    }
  }

  oneMonth(ev) {
    ev.preventDefault();
    this.setState({amount: 500, months: 1, selectedPlan: '1 Month of Membership'});
  }

  threeMonths(ev) {
    ev.preventDefault();
    this.setState({amount: 1000, months: 3, selectedPlan: '3 Months of Membership'});
  }

  oneYear(ev) {
    ev.preventDefault();
    this.setState({amount: 3000, months: 12, selectedPlan: '1 Year of Membership'});
  }

  handleSubmit(event) {
    event.preventDefault();
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
    const name = `${this.state.billingFirstName} ${this.state.billingLastName}`;  
    
    const addMonthToNow = moment().add(this.state.months, 'months').format('LL').toString();    
    const addMonthToExpirationDate = moment(this.state.endOfMembershipDate).add(this.state.months, 'months').format('LL').toString();
    const timeAddition = moment().isBefore(this.state.endOfMembershipDate) ? addMonthToExpirationDate : addMonthToNow;

    this.props.stripe.createToken({type: 'card', name })
      .then(token => axios.post('/v1/checkout', { token: token.token.id, amount: this.state.amount}))
      .then(() => {
        axios.put(`/v1/bars/${this.state.bar.id}`, {endOfMembershipDate: timeAddition})
        .then(() => this.setState({ endOfMembershipDate: timeAddition}))
        .then(() => this.props.history.push('/'))
        .catch(err => console.log(err));
      });
    }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePaymentChange(event) {
    this.setState({ payment: event.complete });
  }
  
  render() {
    const { bar, billingFirstName, billingLastName, firstName, lastName, address, city, state, zip, email, endOfMembershipDate, errors } = this.state;
    const { oneMonth, threeMonths, oneYear } = this;

    if (!bar) return null;
 
    return (
      <div>
        {
          endOfMembershipDate !== "Invalid date" && endOfMembershipDate !== null ? (<p>Cheers!  Your membership end date is {endOfMembershipDate}</p>) : (<p>Buy a membership!</p>)
        }
        <form onSubmit={ event => this.handleSubmit(event, bar.id) }>
          <h2 className='header'>Billing Information</h2>
          <div className='form-group'>
            <input name='billingFirstName' value={ billingFirstName } className='element' onChange={ this.handleChange } placeholder='Billing First Name' />
            <p className='error'>{ errors.billingFirstName }</p>
          </div>
          <div className='form-group'>
            <input name='billingLastName' value={ billingLastName } className='element' onChange={ this.handleChange } placeholder='Billing Last Name' />
            <p className='error'>{ errors.billingFirstName }</p>
          </div>
          <div className='form-group'>
            <p>
              <button className='btn btn-primary btn-sm planButton' onClick={ oneMonth }>1 month: $5.00</button>
              <button className='btn btn-primary btn-sm planButton' onClick={ threeMonths }>3 months: $10.00 </button>
              <button className='btn btn-primary btn-sm planButton' onClick={ oneYear }>1 year: $30.00</button>
            </p>
          </div>
          <div className='form-group'>
            <p>
              {this.state.selectedPlan}
            </p>
          </div>
          <div className='form-group'>
            <CardElement className='CardElement element' onChange={ this.handlePaymentChange } />
            <p className='error'>{ errors.payment }</p>
          </div>
          <hr className='style-eight' />
          
          <div className='form-group'>
            <input name='firstName' value={ firstName } className='element' onChange={ this.handleChange } placeholder='First Name' />
            <p className='error'>{ errors.firstName }</p>
          </div>
          <div className='form-group'>
            <input name='lastName' value={ lastName } className='element' onChange={ this.handleChange } placeholder='Last Name' />
            <p className='error'>{ errors.lastName }</p>
          </div>
          <div className='form-group'>
            <input name='email' value={ email } className='element' onChange={ this.handleChange } placeholder='Email' />
            <p className='error'>{ errors.email }</p>
          </div>
          <div className='form-group'>
            <input name='address' value={ address } className='element' onChange={ this.handleChange } placeholder='Address' />
            <p className='error'>{ errors.address }</p>
          </div>
          <div className='form-group'>
            <input name='city' value={ city } className='element' onChange={ this.handleChange } placeholder='City' />
            <p className='error'>{ errors.city }</p>
          </div>
          <div className='form-group'>
            <input name='state' value={ state } className='element' onChange={ this.handleChange } placeholder='State' />
            <p className='error'>{ errors.state }</p>
          </div>
          <div className='form-group'>
            <input name='zip' value={ zip } className='element' onChange={ this.handleChange } placeholder='Zip Code' />
            <p className='error'>{ errors.zip }</p>
          </div>
          <button className='btn btn-primary btn-sm' disabled={this.state.amount === -1}>Submit Order</button>
        </form>
      </div>
    );
  }
}
export default injectStripe(Checkout);
