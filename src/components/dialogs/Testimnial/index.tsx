import React from 'react'
import Modal from 'react-modal'
import Image from '../../Image'
import styles from '../dialogs.module.css'

interface Testimonial {
  id: number;
  name: string;
  text: string;
  stars: number;
  city: string;
}

interface WhatIncludedProps {
  id: number;
  isOpen: boolean;
  closeModal: () => void;
}

const Testimnial: React.FC<WhatIncludedProps> = ({ id, isOpen, closeModal }) => {

  const testimonials: Record<number, Testimonial> = {
    1: {
      id: 1,
      name: 'Lei',
      text: 'I had the pleasure of having Lydia clean my home today, and she did an exceptional job She was incredibly thorough and handled every detail with such care and precision. My baseboards have literally never been whiter As a busy mom, Im so grateful to MonoClean for sending someone who truly goes above and beyond. Lydia is an A-1 cleaner, and I highly recommend her and Mono Clean to anyone looking for quality service',
      stars: 5,
      city: "Oshawa",
    },
    2: {
      id: 2,
      name: 'Daria',
      text: 'Very nice, punctual and detail oriented. She cleaned everything thoroughly.',
      stars: 5,
      city: "Little Italy",
    },
    3: {
      id: 3,
      name: 'Ella',
      text: 'I\'m really happy with the cleaning - everything looks great! The cleaner was friendly and professional, and the place feels fresh and spotless.',
      stars: 5,
      city: "Liberty Village",
    },
    4: {
      id: 4,
      name: 'Anne',
      text: 'Amazing job! She arrived right on time and didn’t rush through anything. You can tell she really cares - every corner was cleaned with attention to detail. I’m impressed with how thorough she was.',
      stars: 5,
      city: "Moss Park",
    }
  };

  if (!testimonials[id]) {
    return null;
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        bodyOpenClassName="hidden"
      >
        <button type="button" className={styles.closeIcon} onClick={closeModal}>
          <Image
            src="/icons/close.svg"
            alt="Close Icon"
            width={24}
            height={24}
          />
        </button>
        <div>
          <div className={styles.testimonialItem}>
            <div className={styles.testimonialItemInner}>
              <Image
                src="/landings/icons/quote.svg"
                alt="Quote Icon"
                width={16}
                height={11}
              />
              <div className={styles.testimonialName}>{testimonials[id].name} <span className={styles.testimonialCity}>• {testimonials[id].city}</span></div>
              <div className={styles.testimonialText}>
                {testimonials[id].text}
              </div>
              <div className={styles.testimonialStars}>
                {Array.from({ length: testimonials[id].stars }).map((_, i) => (
                  <Image
                    key={`star-${i}`}
                    src="/icons/star-review.svg"
                    alt="Star"
                    width={32}
                    height={32}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Testimnial;
