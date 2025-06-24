import React from 'react'
import Image from '../../components/Image'
import classnames from 'classnames'
import LinkButton from '../../components/buttons/LinkButton'
import { useAppContext } from '../../components/context/AppContext'
import convertTranslation from '../../helpers/convertTranslation'
import getMetaStrings from '../../helpers/getMetaStrings'
import { Helmet } from 'react-helmet'
import styles from './notFound.module.css'
 
const NotFound: React.FC = () => {
  const { data: appData } = useAppContext();
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.not_found;
  const metaTranslations = getMetaStrings(appData?.nav)?.not_found;

  if (!pageTranslations) return null;
  
  return (
    <>
      <Helmet>
        <title>{metaTranslations.title}</title>
        <meta name="description" content={metaTranslations.description} />
      </Helmet>
      <div className={classnames('container', styles.notFoundWrapper)}>
        <div className={styles.notFoundImage}>
          <Image
            src="/404.png"
            alt={`404 logo`}
            width={760}
          />
        </div>
        <h1 className={classnames('h1', styles.notFoundTitle)}>{pageTranslations?.title}</h1>
        <div className={classnames('textL-500', styles.notFoundText)}>{pageTranslations?.text}</div>
        <div>
          <LinkButton text={pageTranslations?.cta} link="/" fullWidthMobile />
        </div>
      </div>
    </>
  )
}

export default NotFound;
