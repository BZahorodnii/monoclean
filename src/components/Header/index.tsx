import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import Image from '../Image'
import { useAppContext } from '../context/AppContext'
import classnames from 'classnames'
import convertTranslation from '../../helpers/convertTranslation'
import DropDownMenu from './components/DropDownMenu'
import Cookies from 'js-cookie'
import styles from './header.module.css'

const Header: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { data: appData, setData } = useAppContext();
  const navTranslations = convertTranslation(appData?.nav);
  const url = params.lang || '';

  useEffect(() => {
    if (mobileNavOpen) {
      setMobileNavOpen(false);
    }
  }, [location]);
  
  const mobileNavToggle = () => {
    setMobileNavOpen(!mobileNavOpen);
  }

  const selectLang = (lang: string) => {
    if (lang === 'en') {
      const path = location.pathname === '/fr' ? '/' : location.pathname.replace('/fr', '');
      navigate(path, { replace: true });
      Cookies.remove('lang');
    } else {
      Cookies.set('lang', lang);

      if (location.pathname.includes(`/${lang}`)) {
        return;
      }

      const path = location.pathname === '/' ? '' : location.pathname.replace(`/${lang}`, '');
      navigate(`/${lang}${path}`, { replace: true });
    }
  }

  if (!Boolean(appData?.nav)) return null;

  return (
    <div className={classnames(styles.header, location.pathname !== '/' && location.pathname !== '/fr' && styles.headerBreadcrumbs)}>
      <Link to={`/${url}`}>
        <Image
          src="/logo.svg"
          alt="MonoClean Logo"
          width={169}
        />
      </Link>
      <button className={classnames(styles.mobileNavBtn, mobileNavOpen && styles.active)} onClick={mobileNavToggle}>
        <div className={styles.mobileNavLines}>
          <div className={styles.mobileNavLine} />
          <div className={styles.mobileNavLine} />
          <div className={styles.mobileNavLine} />
        </div>
      </button>
      <nav className={classnames(styles.navWrapper, mobileNavOpen && styles.active)}>
        <ul className={classnames(styles.nav, 'textM-600')}>
          <li>
            <DropDownMenu title={navTranslations.who_we_serve} components={[
              {to: 'service/airbnb', text: navTranslations.airbnb_managers},
              {to: 'service/busy-professionals', text: navTranslations.busy_professionals},
              {to: 'service/families', text: navTranslations.families},
              {to: 'service/seniors', text: navTranslations.seniors},
            ]} />
          </li>
          <li>
            <DropDownMenu title={navTranslations.about_us} components={[
              {to: 'about-us#mission', text: navTranslations.our_mission},
              {to: 'about-us#story', text: navTranslations.founder_story},
              {to: 'about-us#team', text: navTranslations.team},
              {to: 'about-us#roadmap', text: navTranslations.road_map},
            ]} />
          </li>
          <li>
            {location.pathname === `/${url}` ? (
              <ScrollLink
                to="howItWorks"
                spy={true}
                smooth={true}
                offset={-32}
                duration={500}
                className={styles.link}
              >
                {convertTranslation(appData?.nav).how_it_works}
              </ScrollLink>
            ) : (
              <Link
                className={styles.link}
                to={params.lang ? `/${params.lang}#howItWorks` : '/#howItWorks'}
              >
                {convertTranslation(appData?.nav).how_it_works}
              </Link>
            )}
          </li>
          <li>
            <Link
              className={styles.link}
              to="blog"
            >
              {convertTranslation(appData?.nav).blog}
            </Link>
          </li>
          <li>
            <button type="button" onClick={() => setData({ ...appData, dialogOpen: 'contactUs' })} className={classnames('textM-600', styles.link)}>
              {convertTranslation(appData?.nav).contact_us}
            </button>
          </li>
          <li className={styles.langWrapper}>
            <button
              type="button"
              onClick={() => selectLang('en')}
              className={classnames('textM-600', styles.link, !location.pathname.includes(`/fr`) && styles.langActive)}
            >
              En
            </button>
            <div className={styles.langLine} />
            <button
              type="button"
              onClick={() => selectLang('fr')}
              className={classnames('textM-600', styles.link, location.pathname.includes(`/fr`) && styles.langActive)}>
              Fr
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;
