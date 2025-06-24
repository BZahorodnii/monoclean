import React, {useState} from 'react'
import Image from '../../Image'
import Modal from 'react-modal'
import styles from '../dialogs.module.css'
import CheckoutForm from '../../CheckoutForm'
import Lottie from 'react-lottie-player'
import animationData from '../../../../public/animations/animation.json'
import classNames from 'classnames'

interface CheckoutProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  clientSecret: string | null;
  email: string;
  phone: string;
  price: number;
  tax: number;
}

const Checkout: React.FC<CheckoutProps> = ({ dialogOpen, setDialogOpen, clientSecret, email, phone, price, tax }) => {
  const [success, setSuccess] = useState(false);

  const closeModal = () => {
    setSuccess(false);
    setDialogOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={dialogOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        bodyOpenClassName="hidden"
      >
        <button type="button" className={styles.closeIcon} onClick={closeModal}>
          <Image
            src="/icons/close.svg"
            alt={`Close Icon`}
            width={24}
            height={24}
          />
        </button>
        {success ? (
          <div className={styles.successContainer}>
            <Lottie
              loop={false}
              animationData={animationData}
              play
              style={{ width: 200, height: 200, margin: '0 auto', marginBottom: '36px' }}
            />
            <div className={styles.successContent}>
              <div className={classNames('h2', styles.successTitle)}>Booking Confirmed!</div>
              <div className="textL-500">Payment received - your cleaning is booked. Check your email for details and next steps (including spam/promotions).</div>
            </div>
          </div>
        ) : (
          <CheckoutForm clientSecret={clientSecret} email={email} phone={phone} price={price} tax={tax} setSuccess={setSuccess} />
        )}
      </Modal>
    </div>
  )
}

export default Checkout;
