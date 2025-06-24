// Checkout.tsx
import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { PaymentIntentResult } from '@stripe/stripe-js';
import classNames from 'classnames';

import Button from '../buttons/Button';
import styles from './checkoutForm.module.css';

function Checkout({ clientSecret, email, phone, price, tax, setSuccess }: { clientSecret: string | null; email: string; phone: string; price: number; tax: number; setSuccess: (success: boolean) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements || !clientSecret) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const result: PaymentIntentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: email,
          phone: phone,
        },
      },
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed');
    } else if (result.paymentIntent?.status === 'succeeded') {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={classNames(styles.form)}>
      <div className={styles.quoteTitle}>Your Quote</div>
      <div className={classNames(styles.priceLine, styles.priceSeparator)}>
        <span>Price:</span> <span>${price.toFixed(2)}</span>
      </div>
      <div className={classNames(styles.priceLine, styles.priceSeparator)}>
        <span>Tax:</span> <span>${tax.toFixed(2)}</span>
      </div>
      <div className={styles.priceLine}>
        <span>Total:</span> <span className={styles.green}>${(price + tax).toFixed(2)}</span>
      </div>
      <div className={styles.cardElementWrapper}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4'
                }
              },
              invalid: {
                color: '#9e2146'
              }
            }
          }}
        />
      </div>
      <Button
        loading={loading}
        text="Checkout"
        fullWidthMobile
        onClick={(e) => {
          handleSubmit(e);
        }}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

export default Checkout;
