import React, { useEffect } from 'react'
import Image from '../Image'
import { Link, useParams } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import classnames from 'classnames'
import SubscribeForm from './components/SubscribeForm'
import { useAppContext } from '../context/AppContext'
import { ButtonVariant } from '../../types'
import convertTranslation from '../../helpers/convertTranslation'
import { useLocation } from 'react-router-dom'
import styles from './footer.module.css'
import LinkButton from '../buttons/LinkButton'
import useGetPrivacyPolicy from '../../hooks/useGetPrivacyPolicy'

const Footer: React.FC = () => {
  const location = useLocation();
  const { data: appData, setData } = useAppContext();
  const { fetch: privacyPolicyFetch, data: privacyPolicyData } = useGetPrivacyPolicy();
  const params = useParams();
  const dialogOpen = (type: 'joinWaitlist' | 'becomeACleaner' | 'partnerWithUs' | 'contactUs' | 'downloadAppCleaners' | 'downloadAppCustomers') => {
    setData({ ...appData, dialogOpen: type });
  }
  const date = new Date();
  const year = date.getFullYear();
  const url = params.lang || '';

  const onClickHandler = () => {
    window.scrollTo(0,0);
  }

  useEffect(() => {
    privacyPolicyFetch(params.lang || 'en');
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerIn}>
        <div className={styles.footerTop}>
          <div className={styles.footerTopIn}>
            <div className={styles.subscribeWrapper}>
              <div className={styles.logo}>
                <Link to={`/${url}`} onClick={onClickHandler}>
                  <Image
                    src="/logo.svg"
                    alt="MonoClean Logo"
                    width={169}
                    height={35}
                  />
                </Link>
              </div>
              <div className={classnames('textM-500', styles.subscribeTitle)}>
                {convertTranslation(appData?.pagesBlock)?.footer?.title}
              </div>
              <SubscribeForm />
              <div className={classnames('textS-400', styles.subscribePolicy)}>
                {convertTranslation(appData?.pagesBlock)?.footer?.text1}&nbsp;
                <Link to="/" onClick={onClickHandler} className={styles.underline}>{convertTranslation(appData?.pagesBlock)?.footer?.privacy_policy}</Link>&nbsp;
                {convertTranslation(appData?.pagesBlock)?.footer?.text2}
              </div>
            </div>
            <div className={styles.linksWrapper}>
              <div className={styles.links}>
                <div className={classnames('textS-500', styles.link)}>
                  <Link to="about-us" onClick={onClickHandler}>
                    {convertTranslation(appData?.nav)?.about_us}
                  </Link>
                </div>
                <div className={classnames('textS-500', styles.link)}>
                  {location.pathname === '/' ? (
                    <ScrollLink
                      to="howItWorks"
                      spy={true}
                      smooth={true}
                      offset={-32}
                      duration={500}
                    >
                      {convertTranslation(appData?.nav)?.how_it_works}
                    </ScrollLink>
                  ) : (
                    <Link to={`/${url}#howItWorks`} onClick={onClickHandler}>
                      {convertTranslation(appData?.nav)?.how_it_works}
                    </Link>
                  )}
                </div>
                <div className={classnames('textS-500', styles.link)}>
                  <Link to="blog" onClick={onClickHandler}>
                    {convertTranslation(appData?.nav)?.blog}
                  </Link>
                </div>
                <div className={classnames('textS-500', styles.link)}>
                  <button type="button" onClick={() => dialogOpen('contactUs')} className="textS-500">
                    {convertTranslation(appData?.nav)?.contact_us}
                  </button>
                </div>
                {privacyPolicyData?.find((item: any) => item.slug === 'term_of_services') && (
                  <div className={classnames('textS-500', styles.link)}>
                    <Link to="policies/term_of_services" onClick={onClickHandler}>
                      {privacyPolicyData?.find((item: any) => item.slug === 'term_of_services')?.title}
                    </Link>
                  </div>
                )}
              </div>
              <div className={styles.links}>
                <div className={classnames('textS-500', styles.link)}>
                  <button type="button" onClick={() => dialogOpen('downloadAppCleaners')} className="textS-500">
                    {convertTranslation(appData?.strings)?.start_earning}
                  </button>
                </div>
                <div className={classnames('textS-500', styles.link)}>
                  <button type="button" onClick={() => dialogOpen('downloadAppCustomers')} className="textS-500">
                    {convertTranslation(appData?.strings)?.get_my_quote}
                  </button>
                </div>
                <div className={classnames('textS-500', styles.link)}>
                  <button type="button" onClick={() => dialogOpen('partnerWithUs')} className="textS-500">
                    {convertTranslation(appData?.nav)?.partner_with__us}
                  </button>
                </div>
                {privacyPolicyData?.find((item: any) => item.slug === 'request_account_deletion') && (
                  <div className={classnames('textS-500', styles.link)}>
                    <Link to="policies/request_account_deletion" onClick={onClickHandler}>
                      {privacyPolicyData?.find((item: any) => item.slug === 'request_account_deletion')?.title}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr className={styles.separator} />
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>{`Monoclean | ${convertTranslation(appData?.strings)?.copyright} ${year}`}</div>
          <div className={classnames('textS-600', styles.socialWrapper)}>
            <LinkButton
              text="Youtube"
              logo="/icons/youtube.svg"
              rel="nofollow"
              link="https://youtube.com/@monoclean"
              variant={ButtonVariant.Light}
              target="_blank"
            />
            <LinkButton
              text="Instagram"
              logo="/icons/ig.svg"
              rel="nofollow"
              link="https://www.instagram.com/monocleanapp"
              variant={ButtonVariant.Light}
              target="_blank"
            />
            <LinkButton
              text="TikTok"
              logo="/icons/tiktok.svg"
              rel="nofollow"
              link="https://www.tiktok.com/@monoclean"
              variant={ButtonVariant.Light}
              target="_blank"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
