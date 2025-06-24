import React from 'react'
import Image from '../../Image'
import Modal from 'react-modal'
import styles from '../dialogs.module.css'
import Lottie from 'react-lottie-player'
import animationData from '../../../../public/animations/animation.json'
import classNames from 'classnames'

interface OrderSuccessProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ dialogOpen, setDialogOpen }) => {
  const closeModal = () => {
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
        <div className={styles.successContainer}>
          <Lottie
            loop={false}
            animationData={animationData}
            play
            style={{ width: 200, height: 200, margin: '0 auto', marginBottom: '36px' }}
          />
          <div className={styles.successContent}>
            <div className={classNames('h2', styles.successTitle)}>Booking Confirmed!</div>
            <div className="textL-500">Your cleaning is booked. Check your email for details and next steps (including spam/promotions).</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default OrderSuccess;
