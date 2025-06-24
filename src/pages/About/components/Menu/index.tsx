'use client'

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-scroll';
import { useAppContext } from '../../../../components/context/AppContext';
import styles from './menu.module.css';
import convertTranslation from '../../../../helpers/convertTranslation';

const Menu: React.FC = () => {
  const { data: appData } = useAppContext();
  const stringsTranslations = convertTranslation(appData?.strings);
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.about;
  
  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuLinkWrapper}>
        <Link
          to="mission"
          spy={true}
          smooth={true}
          offset={-32}
          duration={500}
          className={classnames(styles.menuLink, 'textM-500')}
        >{pageTranslations?.mission_title}</Link>
      </div>
      <div className={styles.menuLinkWrapper}>
        <Link
          to="story"
          spy={true}
          smooth={true}
          offset={-32}
          duration={500}
          className={classnames(styles.menuLink, 'textM-500')}
        >{pageTranslations?.founder_story_title}</Link>
      </div>
      <div className={styles.menuLinkWrapper}>
        <Link
          to="team"
          spy={true}
          smooth={true}
          offset={-32}
          duration={500}
          className={classnames(styles.menuLink, 'textM-500')}
        >{pageTranslations?.team_title}</Link>
      </div>
      <div className={styles.menuLinkWrapper}>
        <Link
          to="roadmap"
          spy={true}
          smooth={true}
          offset={-32}
          duration={500}
          className={classnames(styles.menuLink, 'textM-500')}
        >{stringsTranslations?.roadmap}</Link>
      </div>
    </div>
  )
}

export default Menu;
