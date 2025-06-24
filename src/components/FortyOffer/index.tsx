import Container from '../Container'
import classnames from 'classnames'
import styles from './offer.module.css'
import { useAppContext } from '../context/AppContext';
import convertTranslation from '../../helpers/convertTranslation';

const FortyOffer = () => {
  const { data: appData } = useAppContext();
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.price_block;

  return (
    <Container>
      <div>
        <div className={classnames('h1', styles.title)}>
          {pageTranslations?.forty_title}
        </div>
        <div className={classnames(styles.subtitle)}>
          {pageTranslations?.forty_subtitle}
        </div>
        <div className={classnames('h3', styles.text)}>
          {pageTranslations?.forty_text}
        </div>
        <div className={styles.bannerWrapper}>
          <div className={styles.banner}>
            <div className={classnames('h2', styles.bannerTitle)}>
              {pageTranslations?.forty_banner_title}
            </div>
            <div className={classnames('textL-500', styles.bannerText)}>
              {pageTranslations?.forty_banner_text1}
            </div>
            <div className={classnames('textL-500', styles.bannerText)}>
              {pageTranslations?.forty_banner_text2}
            </div>
            <div className={classnames('textL-500', styles.bannerText)}>
              {pageTranslations?.forty_banner_text3}
            </div>
            <div className={'textL-500'}>
              {pageTranslations?.forty_banner_text4}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FortyOffer;
