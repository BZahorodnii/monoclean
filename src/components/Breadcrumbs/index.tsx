import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import convertTranslation from '../../helpers/convertTranslation'
import styles from './breadcrumbs.module.css'

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const papams = useParams();
  const { data } = useAppContext();
  const maxIndex = papams?.lang ? 4 : 3;
  const pathArray = location.pathname.split('/').filter((item, i) => i !== maxIndex && item.length);
  const navTranslations = convertTranslation(data?.nav);
  const stringsTranslations = convertTranslation(data?.strings);
  if (pathArray[0] === 'fr') {
    pathArray.shift();
  }
  const textMapping: Record<string, string> = {
    'about-us': 'about_us',
    blog: 'blog',
  };
  const url = papams.lang ? `/${papams.lang}` : '';
  
  if (!pathArray.length || !Object.keys(textMapping).includes(pathArray[0])) {
    return null;
  }


  if (pathArray.length === 2 && pathArray[0] === 'blog' && data?.blogSlug) {
    textMapping[pathArray[1]] = data?.blogSlug;
  }

  if (!data?.nav) return null;

  return (
    <div className={classnames('container', 'textS-500', styles.breadcrumbs)}>
      <Link to={`${url}/`}>{stringsTranslations?.homepage}</Link>
      &nbsp;
      &gt;
      &nbsp;
      {pathArray.map((item: string, i) => (
          <div key={`breadcrumbs-${i}`}>
            <Link
              to={i === 1 ? location.pathname : `${url}/${item}`}
              className={styles.link}>{navTranslations[textMapping[item as string]] || textMapping[item]}
            </Link>
            {Object.keys(textMapping)[i + 2] && (
              <span>
                &nbsp;
                &gt;
                &nbsp;
              </span>
            )}
          </div>
      ))}
    </div>
  )
}

export default Breadcrumbs;
