import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import classnames from 'classnames'
import Image from '../Image'
import Container from '../Container'
import Button from '../buttons/Button'
import StartEarning from '../buttons/StartEarning'
import GetMyQuote from '../buttons/GetMyQuote'
import { ButtonVariant, HowItWorksSelect } from '../../types'
import { useAppContext } from '../context/AppContext'
import convertTranslation from '../../helpers/convertTranslation'
import styles from './howItWorks.module.css'

const HowItWorks:React.FC = () => {
  const [select, setSelect] = useState<HowItWorksSelect>(HowItWorksSelect.Customer);
  const { data } = useAppContext();
  const params = useParams();
  const pageTranslations = convertTranslation(data?.pagesBlock).home;
  const stringsTranslations = convertTranslation(data?.strings);
  const url = params.lang ? `-${params.lang}` : '';
  const [searchParams] = useSearchParams();
  const [campaign, setCampaign] = useState<string | null>(null);
  useEffect(() => {
    const campaign = searchParams.get('ref');
    setCampaign(campaign);
  }, [searchParams]);

  const onSelectHandler = (val: HowItWorksSelect) => {
    setSelect(val);
  }
  
  return (
    <div className={classnames('container', styles.container)} id="howItWorks">
      <h2 className={classnames('h1', styles.howItWorksTitle)}>{pageTranslations.how_it_works_title}</h2>
      <div className={styles.selectWrapper}>
        <Button
          mobileSmall
          text={stringsTranslations.customer}
          variant={select === HowItWorksSelect.Customer ? ButtonVariant.Dark : ButtonVariant.Light}
          onClickHandler={() => onSelectHandler(HowItWorksSelect.Customer)}
        />
        <Button
          mobileSmall
          text={stringsTranslations.cleaner}
          variant={select === HowItWorksSelect.Cleaner ? ButtonVariant.Dark : ButtonVariant.Light}
          onClickHandler={() => onSelectHandler(HowItWorksSelect.Cleaner)}
        />
        <Button
          mobileSmall
          text={
            <div className={styles.comingSoonBtn}>
              {stringsTranslations.business}
              <div className={classnames('textS-500', styles.comingSoonHint)}>{stringsTranslations.soon}</div>
            </div>
          }
          variant={ButtonVariant.Disabled}
        />
      </div>
      {select === HowItWorksSelect.Cleaner ? (
        <Container background noSideSpaces>
          <>
            <div className={styles.imageWrapper}>
              <Image
                src={`/how-it-works-cleaner${url}.png`}
                alt="Content Logo"
                width={320}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.listWrapper}>
                <div className={classnames('uppercase-500', styles.listNumber)}>1</div>
                <div>
                  <div className={classnames(styles.listTitle, 'textL-500')}>{pageTranslations.how_it_works_cleaner_1_title}</div>
                  <div className={classnames(styles.listText, 'textM-400')}>{pageTranslations.how_it_works_cleaner_1_text}</div>
                </div>
              </div>
              <div className={styles.listWrapper}>
                <div className={classnames('uppercase-500', styles.listNumber)}>2</div>
                <div>
                  <div className={classnames(styles.listTitle, 'textL-500')}>{pageTranslations.how_it_works_cleaner_2_title}</div>
                  <div className={classnames(styles.listText, 'textM-400')}>{pageTranslations.how_it_works_cleaner_2_text}</div>
                </div>
              </div>
              <div className={styles.listWrapper}>
                <div className={classnames('uppercase-500', styles.listNumber)}>3</div>
                <div>
                  <div className={classnames(styles.listTitle, 'textL-500')}>{pageTranslations.how_it_works_cleaner_3_title}</div>
                  <div className={classnames(styles.listText, 'textM-400')}>{pageTranslations.how_it_works_cleaner_3_text}</div>
                </div>
              </div>
              <div className={classnames(styles.listWrapper, styles.listWrapperLast)}>
                <div className={classnames('uppercase-500', styles.listNumber)}>4</div>
                <div>
                <div className={classnames(styles.listTitle, 'textL-500')}>{pageTranslations.how_it_works_cleaner_4_title}</div>
                <div className={classnames(styles.listText, 'textM-400')}>{pageTranslations.how_it_works_cleaner_4_text}</div>
                </div>
              </div>
              <div className={styles.ctaWrapper}>
                <StartEarning />
                {/* <Button
                  text={stringsTranslations.learn_more}
                  variant={ButtonVariant.Light}
                  onClickHandler={() => {}}
                  fullWidthMobile
                /> */}
              </div>
            </div>
          </>
        </Container>
      ) : (
        <Container background noSideSpaces>
          <>
            <div className={styles.imageWrapper}>
              <Image
                src={`/how-it-works-customer${url}.png`}
                alt="Content Logo"
                width={320}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.listWrapper}>
                <div className={classnames('uppercase-500', styles.listNumber)}>1</div>
                <div>
                  <div className={classnames(styles.listTitle, 'textL-500')}>{pageTranslations.how_it_works_customer_1_title}</div>
                  <div className={classnames(styles.listText, 'textM-400')}>{pageTranslations.how_it_works_customer_1_text}</div>
                </div>
              </div>
              <div className={styles.listWrapper}>
                <div className={classnames('uppercase-500', styles.listNumber)}>2</div>
                <div>
                  <div className={classnames(styles.listTitle, 'textL-500')}>{pageTranslations.how_it_works_customer_2_title}</div>
                  <div className={classnames(styles.listText, 'textM-400')}>{pageTranslations.how_it_works_customer_2_text}</div>
                </div>
              </div>
              <div className={styles.listWrapper}>
                <div className={classnames('uppercase-500', styles.listNumber)}>3</div>
                <div>
                  <div className={classnames(styles.listTitle, 'textL-500')}>{pageTranslations.how_it_works_customer_3_title}</div>
                  <div className={classnames(styles.listText, 'textM-400')}>{pageTranslations.how_it_works_customer_3_text}</div>
                </div>
              </div>
              <div className={classnames(styles.listWrapper, styles.listWrapperLast)}>
                <div className={classnames('uppercase-500', styles.listNumber)}>4</div>
                <div>
                <div className={classnames(styles.listTitle, 'textL-500')}>{pageTranslations.how_it_works_customer_4_title}</div>
                <div className={classnames(styles.listText, 'textM-400')}>{pageTranslations.how_it_works_customer_4_text}</div>
                </div>
              </div>
              <div className={styles.ctaWrapper}>
                {Boolean(campaign) ? (
                  <Button text={pageTranslations.get_instant_quote} onClickHandler={() => {
                    const calculatorElement = document.getElementById('calculator');
                    if (calculatorElement) {
                      calculatorElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} fullWidthMobile />
                ) : (
                  <GetMyQuote />
                )}
              </div>
            </div>
          </>
        </Container>
      )}
    </div>
  );
}

export default HowItWorks;
