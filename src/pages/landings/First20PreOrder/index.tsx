import React, { useRef, useEffect  } from 'react';
import Image from '../../../components/Image'
import Container from '../../../components/Container'
import convertTranslation from '../../../helpers/convertTranslation'
import { useAppContext } from '../../../components/context/AppContext'
import { Helmet } from 'react-helmet'
import ButtonsGroup from '../../../components/ButtonsGroup';
import classnames from 'classnames';
import Button from '../../../components/buttons/Button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Testimonials from '../../../components/Testimonials';
import styles from './first20PreOrder.module.css';
import PricePreOrder from '../../../components/PricePreOrder';
import CountdownTimer from '../../../components/CountdownTimer';
import ServiceZones from '../../../components/ServiceZones';
import FaqBlock from '../../../components/FaqBlock';

const First20PreOrder: React.FC = () => {
  const { data: appData } = useAppContext();
  const videoEl = useRef<HTMLVideoElement>(null);
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.first40;
  const prodPublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(prodPublishableKey);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  // if (!pageTranslations) return null;

  const advantages = [
    {
      title: 'No hidden fees',
      description: 'What you see is what you pay.',
      image: '/landings/icons/adv1.png',
    },
    {
      title: 'Fully insured',
      description: '$1+ M liability cover',
      image: '/landings/icons/adv2.png',
    },
    {
      title: 'Money-back guarantee',
      description: 'If we miss the mark, we’ll make it right.',
      image: '/landings/icons/adv3.png',
    },
    {
      title: 'As easy as an Uber',
      description: 'Tap, track, done.',
      image: '/landings/icons/adv4.png',
    },
  ];

  const faqs = [
    {
      title: 'Sick of cleaners cancelling last minute?',
      content: 'Our on-time pros let you track their arrival in real time.',
    },
    {
      title: 'Tired of “extra fees” that show up after the job?',
      content: 'Your price is locked before you book—no surprises, ever.',
    },
    {
      title: 'Weekend lost to scrubbing the stove?',
      content: 'Book in 60 seconds and reclaim your downtime.',
    },
    {
      title: 'Worried about strangers in your home?',
      content: 'Every Monocleaner is vetted, background-checked, and fully insured.',
    },
    {
      title: 'Frustrated with rushed, streaky cleans?',
      content: 'Expect consistent 5-star quality—guaranteed.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTranslations?.metaTitle}</title>
        <meta name="description" content={pageTranslations?.metaDescription} />
        <meta name="keywords" content="Airbnb cleaning, vacation rental cleaning Toronto, turnover service, short-term rental cleaners" />
        <link rel="canonical" href="https://monoclean.ca/service/airbnb" />
        <meta property="og:image"       content="/image-1.png" />
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="Monoclean" />
        <meta property="og:url"         content="https://monoclean.ca/service/airbnb" />
        <meta property="og:title"       content={pageTranslations?.metaOgTitle} />
        <meta property="og:description" content={pageTranslations?.metaOgDescription} />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={pageTranslations?.metaOgTitle} />
        <meta name="twitter:description" content={pageTranslations?.metaTwitterDescription} />
      </Helmet>
      <div className={styles.wrapper}>
        <Container className={classnames(styles.campaignContainer, styles.headerContainer)}>
          <div className={styles.headerWrapper}>
            <div className={styles.headerWrapperInner}>
              <div>
                {/* Toronto & GTA: First-time clean from just $61 <span>(20% OFF)</span>! */}
                Special First-Time Offer for new customers!
              </div>
              <div className={styles.countdownTimer}>
                <CountdownTimer />
              </div>
            </div>
          </div>
        </Container>
        <Container className={classnames(styles.campaignContainer, styles.heroContainer)}>
          <>
            <div>
              <h1 className={styles.title}>
                20% OFF
                <br />
                {/* Toronto's Most Affordable Clean */}
                Toronto’s Best-Value Clean
              </h1>
              <div className={styles.heroListWrapper}>
                <div className={styles.heroListItem}>
                  <Image
                    src="/landings/icons/coupon-percents.svg"
                    alt="Icon"
                    width={24}
                    height={24}
                  />
                  <div>
                    First clean as low as $97 after discount!
                  </div>
                </div>
                <div className={styles.heroListItem}>
                  <Image
                    src="/landings/icons/badge-dollar.svg"
                    alt="Icon"
                    width={24}
                    height={24}
                  />
                  <div>
                    Final price shown upfront - no extra fees
                  </div>
                </div>
                <div className={styles.heroListItem}>
                  <Image
                    src="/landings/icons/user-check-bottom.svg"
                    alt="Icon"
                    width={24}
                    height={24}
                  />
                  <div>
                    5-star, checked cleaners on your schedule
                  </div>
                </div>
              </div>
              <div className={styles.heroButtonWrapper}>
                <Button
                  text="Book & Save 20%"
                  fullWidthMobile
                  onClick={() => {
                    document.getElementById('calculator')?.scrollIntoView({ 
                      behavior: 'smooth'
                    });
                  }}
                />
              </div>
              <Image
                src="/landings/reviews-people.png"
                alt="Reviews Icons"
                width={88}
              />
              <div className={styles.reviewsHeroText}>
                Trusted by 100+ homes across the GTA
              </div>
            </div>
            <div className={classnames(styles.imageWrapper, styles.heroImage)}>
              {/* <Image
                src="/landings/hero-cleaning.png"
                alt="Hero Logo"
                width={648}
              /> */}
              <video
                className={styles.heroVideo}
                playsInline
                loop
                muted
                controls={false}
                src="/landings/hero-video.mp4"
                ref={videoEl}
              />
            </div>
          </>
        </Container>
        <Elements stripe={stripePromise}>
          <PricePreOrder />
        </Elements>
        <div className={styles.generalWrapper}>
          <FaqBlock items={faqs} header="Everyday cleaning headaches - and how Monoclean fixes them" />
        </div>
        <ServiceZones customTitleStyle />
        <Container className={styles.campaignSecondaryContainer}>
          <div className={styles.campaignSecondaryContainerInner}>
            <div className={styles.subtitle}>
              Our <span>advantages</span>
            </div>
            <div className={styles.advantagesWrapper}>
              {advantages.map((item, i) => {
                return (
                  <div key={`advantage-${i}`} className={styles.advantageItem}>
                    <Image src={item.image} alt="Advantage Icon" width={68} height={64} />
                    <div className={styles.advantageItemTitle}>
                      {item.title}
                    </div>
                    <div className={styles.advantageItemDescription}>
                      {item.description}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={styles.advantagesContacts}>
              <span>Call us:</span> +1 647-697-8198
            </div>
            <div className={styles.advantagesContacts}>
              <span>Address:</span> 122 Grn Gdns Blvd, North York, ON M6A 0E5
            </div>
            <div className={styles.advantagesContacts}>
              <span>Ontario Corporation #:</span> 762830222 (Registered 2024)
            </div>
          </div>
        </Container>
        <Testimonials />
        <Container className={classnames(styles.campaignSecondaryContainer, styles.bookWrapper)}>
          <div className={styles.campaignSecondaryContainerInner}>
            <div className={styles.bookWrapperInner}>
              <div className={styles.bookWrapperInnerContent}>
                <div className={styles.bookWrapperInnerTitle}>
                  Download & book <span>in 60 seconds</span>
                </div>
                <div className={styles.bookWrapperInnerDescription}>
                  Golden Mop Pass still active—don't miss 20 % savings.
                </div>
                <ButtonsGroup />
              </div>
              <div className={styles.bookWrapperInnerImage}>
                <Image src="/landings/hero-monoclean.png" alt="Book App" width={432} height={599} />
              </div>
            </div>
          </div>
        </Container>
        <Container className={styles.footerContainer}>
          <div className={styles.footerWrapper}>
            <div className={styles.footerWrapperInner}>
              © Monoclean 2025
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default First20PreOrder;

