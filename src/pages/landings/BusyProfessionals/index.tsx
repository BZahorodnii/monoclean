import React from 'react';
import Image from '../../../components/Image'
import Container from '../../../components/Container'
import Content from '../../../components/Content'
import convertTranslation from '../../../helpers/convertTranslation'
import { useAppContext } from '../../../components/context/AppContext'
import { Helmet } from 'react-helmet'
import styles from './busyProfessionals.module.css'
import CitiesCarousel from '../../../components/CitiesCarousel';
import ButtonsGroup from '../../../components/ButtonsGroup';
import classnames from 'classnames';
import OrderSteps from '../../../components/OrderSteps';
import IsThisYouBlock from '../../../components/IsThisYouBlock';
import IntroducingMonoclean from '../../../components/IntroducingMonoclean';
import FaqBlock from '../../../components/FaqBlock';
import PriceCalculatorCampaign from '../../../components/PriceCalculator/campaign';

const BusyProfessionals: React.FC = () => {
  const { data: appData } = useAppContext();
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.busy_professionals;

  if (!pageTranslations) return null;

  const items = [
    {
      title: pageTranslations?.list1Title,
      description: pageTranslations?.list1Description,
      image: '/landings/icons/pricing.svg',
    },
    {
      title: pageTranslations?.list2Title,
      description: pageTranslations?.list2Description,
      image: '/landings/icons/cleaners.svg',
    },
    {
      title: pageTranslations?.list3Title,
      description: pageTranslations?.list3Description,
      image: '/landings/icons/schedule.svg',
    },
    {
      title: pageTranslations?.list4Title,
      description: pageTranslations?.list4Description,
      image: '/landings/icons/phone.svg',
    },
    {
      title: pageTranslations?.list5Title,
      description: pageTranslations?.list5Description,
      image: '/landings/icons/service.svg',
    },
    {
      title: pageTranslations?.list6Title,
      description: pageTranslations?.list6Description,
      image: '/landings/icons/booking.svg',
    },
  ];

  const faqs = [
    {
      title: pageTranslations?.faq_title_1,
      content: pageTranslations?.faq_content_1,
    },
    {
      title: pageTranslations?.faq_title_2,
      content: pageTranslations?.faq_content_2,
    },
    {
      title: pageTranslations?.faq_title_3,
      content: pageTranslations?.faq_content_3,
    },
    {
      title: pageTranslations?.faq_title_4,
      content: pageTranslations?.faq_content_4,
    },
    {
      title: pageTranslations?.faq_title_5,
      content: pageTranslations?.faq_content_5,
    },
    {
      title: pageTranslations?.faq_title_6,
      content: pageTranslations?.faq_content_6,
    },
    {
      title: pageTranslations?.faq_title_7,
      content: pageTranslations?.faq_content_7,
    },
    {
      title: pageTranslations?.faq_title_8,
      content: pageTranslations?.faq_content_8,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTranslations?.metaTitle}</title>
        <meta name="description" content={pageTranslations?.metaDescription} />
        <meta name="keywords" content="cleaning for busy professionals, condo cleaning Toronto, flat-rate cleaning, vetted cleaners" />
        <link rel="canonical" href="https://monoclean.ca/service/busy-professionals" />
        <meta property="og:image"       content="/image-1.png" />
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="Monoclean" />
        <meta property="og:url"         content="https://monoclean.ca/service/busy-professionals" />
        <meta property="og:title"       content={pageTranslations?.metaOgTitle} />
        <meta property="og:description" content={pageTranslations?.metaOgDescription} />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={pageTranslations?.metaOgTitle} />
        <meta name="twitter:description" content={pageTranslations?.metaTwitterDescription} />
      </Helmet>
      <div className={styles.wrapper}>
        <Container>
          <>
            <Content
              isSubheader
              isMainBlock
              // hint={stringsTranslations.for_customer}
              title={pageTranslations?.heroTitle}
              // text={'Stop Worrying About Mess. Start Enjoying Your Life.'}
            >
              <h2 className={classnames(styles.subtitle, 'textL-400')}>{pageTranslations?.heroDescription}</h2>
              <ButtonsGroup bigSize />
            </Content>
            <div className={classnames(styles.imageWrapper, styles.heroImage)}>
              <Image
                src="/landings/hero-monoclean.png"
                alt="Hero Logo"
                width={466}
              />
            </div>
          </>
        </Container>
        <div className={styles.areasCarouselWrapper}>
          <CitiesCarousel />
        </div>
        <IsThisYouBlock
          title={pageTranslations?.isThisYouTitle}
          content={[pageTranslations?.isThisYouList1, pageTranslations?.isThisYouList2, pageTranslations?.isThisYouList3, pageTranslations?.isThisYouList4]}
          hint={
            <>
              {pageTranslations?.isThisYoutext1}{" "}
              <b>{pageTranslations?.isThisYoutext2}</b>.
            </>
          }
          image="/landings/is-this-you.png"
        />
        <IntroducingMonoclean
          title={pageTranslations?.listTitle}
          items={items}
        />
        <OrderSteps />
        <PriceCalculatorCampaign shortMarginBottom />
        <div className={styles.generalWrapper}>
          <FaqBlock items={faqs} />
        </div>
      </div>
    </>
  );
}

export default BusyProfessionals;

