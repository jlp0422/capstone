import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

const Checkout = ({ history, bar }) => {
  // console.log('test');
  return (
    <StripeProvider apiKey='pk_test_vbn22qchI8SX3q2ls7TOdJ75'>
      <Elements>
        <InjectedCheckoutForm history={ history } bar={ bar } />
      </Elements>
    </StripeProvider>
  );
};

export default Checkout;
