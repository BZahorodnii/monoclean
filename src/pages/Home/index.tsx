import React, { useState, useEffect } from 'react';
import Image from '../../components/Image'
import classnames from 'classnames'
import Container from '../../components/Container'
import Content from '../../components/Content'
import HowItWorks from '../../components/HowItWorks'
import convertTranslation from '../../helpers/convertTranslation'
import getMetaStrings from '../../helpers/getMetaStrings'
import { useAppContext } from '../../components/context/AppContext'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import MakeMyHomeShine from '../../components/buttons/MakeMyHomeShine'
import { Helmet } from 'react-helmet'
import styles from './home.module.css'
import ButtonsGroup from '../../components/ButtonsGroup';
import PriceCalculator from '../../components/PriceCalculator';
import PriceCalculatorCampaign from '../../components/PriceCalculator/campaign';
import { isMobile } from 'react-device-detect';
import FaqBlock from '../../components/FaqBlock';
import Button from '../../components/buttons/Button';

declare const fbq: (event: string, action: string, params?: Record<string, any>) => void;

const Home: React.FC = () => {
  const { data: appData, setData } = useAppContext();
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.home;
  const stringsTranslations = convertTranslation(appData?.strings);
  const metaTranslations = getMetaStrings(appData?.nav)?.home;
  const params = useParams();
  const url = params.lang ? `-${params.lang}` : '';
  const [campaign, setCampaign] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const campaign = searchParams.get('ref');
    setCampaign(campaign);
  }, [searchParams]);

  if (!pageTranslations || !stringsTranslations) return null;

  const faqs = [
    {
      title: pageTranslations?.faq_title_1,
      content: pageTranslations?.faq_content_1,
      list: null,
    },
    {
      title: pageTranslations?.faq_title_2,
      content: null,
      list: [
        pageTranslations?.faq_content_2_li_1,
        pageTranslations?.faq_content_2_li_2,
        pageTranslations?.faq_content_2_li_3,
        pageTranslations?.faq_content_2_li_4,
        pageTranslations?.faq_content_2_li_5,
        pageTranslations?.faq_content_2_li_6,
        pageTranslations?.faq_content_2_li_7,
        pageTranslations?.faq_content_2_li_8,
        pageTranslations?.faq_content_2_li_9,
      ],
    },
    {
      title: pageTranslations?.faq_title_3,
      content: pageTranslations?.faq_content_3,
      list: null,
    },
    {
      title: pageTranslations?.faq_title_4,
      content: pageTranslations?.faq_content_4,
      list: null,
    },
    {
      title: pageTranslations?.faq_title_5,
      content: pageTranslations?.faq_content_5,
      list: null,
    },
    {
      title: pageTranslations?.faq_title_6,
      content: pageTranslations?.faq_content_6,
      list: null,
    },
    {
      title: pageTranslations?.faq_title_7,
      content: pageTranslations?.faq_content_7,
      list: null,
    },
    {
      title: pageTranslations?.faq_title_8,
      content: pageTranslations?.faq_content_8,
      list: null,
    },
    {
      title: pageTranslations?.faq_title_9,
      content: pageTranslations?.faq_content_9,
      list: null,
    },
    {
      title: pageTranslations?.faq_title_10,
      content: pageTranslations?.faq_content_10,
      list: null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{metaTranslations?.title}</title>
        <meta name="description" content={metaTranslations?.description} />
        <meta name="og:title" content={metaTranslations?.title} />
        <meta name="og:description" content={metaTranslations?.description} />
      </Helmet>
      <div className={styles.wrapper}>
        {!Boolean(campaign) && (
          <Container extraMargin>
            <div className={classnames(styles.homeImageWrapper, styles.imageWrapperHeader)}>
              <span className={styles.mainImage}>
                <Image
                  src={`/app-home${url}.png`}
                  alt="MonoClean Logo"
                  width={424}
                />
              </span>
            </div>
            <Content
              title={pageTranslations.header_title}
              text={pageTranslations.header_text}
              isMainBlock
            >
              <ButtonsGroup bigSize />
            </Content>
          </Container>
        )}
          {Boolean(campaign) || searchParams.get('promo')?.toLowerCase() === 'toronto40streak' ? (
            <PriceCalculatorCampaign />
          ) : (
            <PriceCalculator />
          )}
          <Container background mobileReverse extraMargin>
          <>
            <Content
              spaces
              isSubheader
              hint={stringsTranslations.for_customer}
              title={pageTranslations.for_customer_title}
              text={pageTranslations.for_customer_text}
            >
              {Boolean(campaign) ? (
                <Button text={pageTranslations.get_instant_quote} onClickHandler={() => {
                  const calculatorElement = document.getElementById('calculator');
                  if (calculatorElement) {
                    calculatorElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }} fullWidthMobile />
              ) : (
                <MakeMyHomeShine />
              )}
            </Content>
            <div className={styles.imageWrapper}>
              <Image
                src="/image-1.jpg"
                alt="Content Logo"
                width={568}
              />
            </div>
          </>
        </Container>
        {/* <Container background extraMargin>
          <>
            <div className={styles.imageWrapper}>
              <Image
                src="/image-2.jpg"
                alt="Content Logo"
                width={568}
              />
            </div>
            <Content
              spaces
              isSubheader
              hint={stringsTranslations.for_cleaner}
              title={pageTranslations.for_cleaner_title}
              text={pageTranslations.for_cleaner_text}
            >
              <StartEarning />
            </Content>
          </>
        </Container> */}
        <HowItWorks />
        <div className={classnames('container', styles.downloadContainer)}>
          <h2 className={classnames('h1', styles.downloadTitle)}>
            {pageTranslations.download_title}
          </h2>
          <div className={styles.downloadRow}>
            {isMobile ? (
              <>
                <Link
                  rel="nofollow"
                  target="_blank"
                  to="https://app.monoclean.ca/api/deep-link/app-customer"
                  className={styles.downloadItem}
                >
                  <Image
                    src="/qr-customer.png"
                    alt={`Download App Logo`}
                    width={120}
                    height={120}
                  />
                  <div className={styles.downloadItemContent}>
                    <div className={classnames(styles.downloadItemTitle, 'textL-500')}>
                      {pageTranslations.download_monoclean_title}
                    </div>
                    <div className={classnames(styles.downloadItemSubtitle, 'textM-400')}>
                      {pageTranslations.download_monoclean_subtitle}
                    </div>
                    <div className={classnames(styles.downloadItemHint, 'textM-400')}>
                      {pageTranslations.scan_to_download}
                    </div>
                  </div>
                  <Image
                    src="/icons/link-arrow.svg"
                    alt={`Download App Logo`}
                    width={24}
                    height={24}
                    className={styles.downloadItemArrow}
                  />
                </Link>
                <Link
                  rel="nofollow"
                  target="_blank"
                  to="https://app.monoclean.ca/api/deep-link/app-cleaner"
                  className={styles.downloadItem}
                >
                  <Image
                    src="/qr-cleaner.png"
                    alt={`Download App Logo`}
                    width={120}
                    height={120}
                  />
                  <div className={styles.downloadItemContent}>
                    <div className={classnames(styles.downloadItemTitle, 'textL-500')}>
                      {pageTranslations.download_monoclean_pro_title}
                    </div>
                    <div className={classnames(styles.downloadItemSubtitle, 'textM-400')}>
                      {pageTranslations.download_monoclean_pro_subtitle}
                    </div>
                    <div className={classnames(styles.downloadItemHint, 'textM-400')}>
                      {pageTranslations.scan_to_download_pro}
                    </div>
                  </div>
                  <Image
                    src="/icons/link-arrow.svg"
                    alt={`Download App Logo`}
                    width={24}
                    height={24}
                    className={styles.downloadItemArrow}
                  />
                </Link>
              </>
            ) : (
              <>
                <div className={styles.downloadItem} onClick={() => {
                  setData({ ...appData, dialogOpen: 'downloadAppCustomers' });
                  fbq('track', searchParams.get('promo')?.toLowerCase() === 'toronto40streak' ? 'Lead 40streak' : 'Lead', {
                    content_name: 'App Download Click',
                    content_category: 'Mobile App',
                    platform: 'Store',
                  });
                }}>
                  <Image
                    src="/qr-customer.png"
                    alt={`Download App Logo`}
                    width={120}
                    height={120}
                  />
                  <div className={styles.downloadItemContent}>
                    <div className={classnames(styles.downloadItemTitle, 'textL-500')}>
                      {pageTranslations.download_monoclean_title}
                    </div>
                    <div className={classnames(styles.downloadItemSubtitle, 'textM-400')}>
                      {pageTranslations.download_monoclean_subtitle}
                    </div>
                    <div className={classnames(styles.downloadItemHint, 'textS-400')}>
                      {pageTranslations.scan_to_download}
                    </div>
                  </div>
                  <Image
                    src="/icons/link-arrow.svg"
                    alt={`Download App Logo`}
                    width={24}
                    height={24}
                    className={styles.downloadItemArrow}
                  />
                </div>
                <div className={styles.downloadItem} onClick={() => {
                  setData({ ...appData, dialogOpen: 'downloadAppCleaners' });
                  fbq('track', searchParams.get('promo')?.toLowerCase() === 'toronto40streak' ? 'Lead 40streak' : 'Lead', {
                    content_name: 'App Download Click',
                    content_category: 'Mobile App',
                    platform: 'Store',
                  });
                }}>
                  <Image
                    src="/qr-cleaner.png"
                    alt={`Download App Logo`}
                    width={120}
                    height={120}
                  />
                  <div className={styles.downloadItemContent}>
                    <div className={classnames(styles.downloadItemTitle, 'textL-500')}>
                      {pageTranslations.download_monoclean_pro_title}
                    </div>
                    <div className={classnames(styles.downloadItemSubtitle, 'textS-500')}>
                      {pageTranslations.download_monoclean_pro_subtitle}
                    </div>
                    <div className={classnames(styles.downloadItemHint, 'textS-400')}>
                      {pageTranslations.scan_to_download_pro}
                    </div>
                  </div>
                  <Image
                    src="/icons/link-arrow.svg"
                    alt={`Download App Logo`}
                    width={24}
                    height={24}
                    className={styles.downloadItemArrow}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.generalWrapper}>
          <FaqBlock items={faqs} />
        </div>
      </div>
    </>
  );
}

export default Home;

