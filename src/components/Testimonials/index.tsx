import React, { useRef, useState } from 'react';
import Container from '../../components/Container'
import Image from '../../components/Image'
import classnames from 'classnames';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './testimonials.module.css'
import Testimonial from '../dialogs/Testimnial'

const Testimonials: React.FC = () => {
  const carouselRef = useRef<Carousel>(null);
  const [readMore, setReadMore] = useState<number | null>(null);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 763, min: 0 },
      items: 1
    }
  };

  const testimonials = [
    {
      id: 1,
      name: 'Lei',
      text: 'I had the pleasure of having Lydia clean my home today, and she did an exceptional job She was incredibly thorough and handled every detail with such care and precision. My baseboards have literally never been whiter As a busy mom, Im so grateful to MonoClean for sending someone who truly goes above and beyond. Lydia is an A-1 cleaner, and I highly recommend her and Mono Clean to anyone looking for quality service',
      stars: 5,
      city: "Oshawa",
    }, {
      id: 2,
      name: 'Daria',
      text: 'Very nice, punctual and detail oriented. She cleaned everything thoroughly.',
      stars: 5,
      city: "Little Italy",
    }, {
      id: 3,
      name: 'Ella',
      text: 'I\'m really happy with the cleaning - everything looks great! The cleaner was friendly and professional, and the place feels fresh and spotless.',
      stars: 5,
      city: "Liberty Village",
    }, {
      id: 4,
      name: 'Anne',
      text: 'Amazing job! She arrived right on time and didn’t rush through anything. You can tell she really cares - every corner was cleaned with attention to detail. I’m impressed with how thorough she was.',
      stars: 5,
      city: "Moss Park",
    }
  ];

  const CustomArrowLeft = ({ onClick }: any) => {
    return (
      <div onClick={onClick} className={`${styles.arrow} ${styles.arrowLeft}`}>
        <Image src="/icons/angle-left-small.svg" alt="Arrow" width={48} height={48} />
      </div>
    );
  };
  
  const CustomArrowRight = ({ onClick }: any) => {
    return (
      <div onClick={onClick} className={`${styles.arrow} ${styles.arrowRight}`}>
        <Image src="/icons/angle-right-small.svg" alt="Arrow" width={48} height={48} />
      </div>
    );
  };

  return (
    <>
      <Container className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            Testimonials
          </div>
          <div className={styles.testimonialsWrapper}>
            <div onClick={() => carouselRef.current?.previous(1)}  className={classnames(styles.arrowWrapper, styles.arrowWrapperLeft)}><CustomArrowLeft /></div>
            <div onClick={() => carouselRef.current?.next(1)} className={classnames(styles.arrowWrapper, styles.arrowWrapperRight)}><CustomArrowRight /></div>
            <Carousel
              autoPlay={true}
              autoPlaySpeed={4000}
              ref={carouselRef}
              responsive={responsive}
              infinite={true}
              className={styles.testimonialsCarousel}
              arrows={false}
            >
              {testimonials.map((testimonial, i) => {
                const isTextLong = (text: string) => text.length > 140;
                const textData = testimonial.text.length > 140 ? testimonial.text.slice(0, 140) : testimonial.text;

                return (
                  <div key={`testimonial-${i}`} className={styles.testimonialItem}>
                    <div className={styles.testimonialItemInner}>
                      <Image
                        src="/landings/icons/quote.svg"
                        alt="Quote Icon"
                        width={16}
                        height={11}
                      />
                      <div className={styles.testimonialName}>{testimonial.name} <span className={styles.testimonialCity}>• {testimonial.city}</span></div>
                      <div className={styles.testimonialText}>
                        {textData}
                        {isTextLong(testimonial.text) && (
                          <button type="button" onClick={() => setReadMore(testimonial.id)} className={styles.testimonialButton}>Read More...</button>
                        )}
                      </div>
                      <div className={styles.testimonialStars}>
                        {Array.from({ length: testimonial.stars }).map((_, i) => (
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
                )}
              )}
            </Carousel>
          </div>
        </div>
      </Container>
      <Testimonial id={1} isOpen={Boolean(readMore)} closeModal={() => {
        setReadMore(null);
      }} />
    </>
  );
};

export default Testimonials;
