import React, { useEffect } from 'react'
import classnames from 'classnames'
import Image from '../../components/Image'
import Menu from './components/Menu'
import convertTranslation from '../../helpers/convertTranslation'
import { useAppContext } from '../../components/context/AppContext'
import styles from './about.module.css'
import { useLocation } from 'react-router-dom'
import getMetaStrings from '../../helpers/getMetaStrings'
import { Helmet } from 'react-helmet'

const About: React.FC = () => {
  const { data: appData } = useAppContext();
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.about;
  const stringsTranslations = convertTranslation(appData?.strings);
  const metaTranslations = getMetaStrings(appData?.nav)?.about_us;
  const location = useLocation();
  const { hash } = location;

  const scrollToAnchor = () => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    scrollToAnchor();
    window.addEventListener('hashchange', scrollToAnchor, false);

    return () => {
      window.removeEventListener('hashchange', scrollToAnchor);
    };
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>{metaTranslations?.title}</title>
        <meta name="description" content={metaTranslations?.description} />
        <meta name="og:title" content={metaTranslations?.title} />
        <meta name="og:description" content={metaTranslations?.description} />
      </Helmet>
      <div className={styles.aboutWrapper}>
        <div className={classnames('container', styles.header)}>
          <h1 className={classnames('h1', styles.title)}>{pageTranslations?.header_title}</h1>
          <div className={classnames('textL-400', styles.text)}>{pageTranslations?.header_text}</div>
        </div>
        <div className={classnames('container', styles.wrapper)}>
          <div className={styles.wrapperMenu}>
            <Menu />
          </div>
          <div className={styles.wrapperContent}>
            <div id="mission">
              <h2 className={classnames('h2', styles.contentTitle)}>{pageTranslations?.mission_title}</h2>
              <div className={classnames('textM-400', styles.contentText)}>
                {pageTranslations?.mission_text}
              </div>
              <div className={styles.separator}>
                <hr />
              </div>
            </div>
            <div id="story">
              <h2 className={classnames('h2', styles.contentTitle)}>{pageTranslations?.founder_story_title}</h2>
              <div className={classnames('textM-400', styles.contentText, styles.extraSpace)}>
                {pageTranslations?.founder_story_text1}
              </div>
              <div className={classnames('textM-400', styles.contentText, styles.extraSpace)}>
                {pageTranslations?.founder_story_text2}
              </div>
              <div className={classnames('textM-400', styles.contentText)}>
                {pageTranslations?.founder_story_text3}
              </div>
              <div className={styles.separator}>
                <hr />
              </div>
            </div>
            <div id="team">
              <h2 className={classnames('h2', styles.contentTitle)}>{pageTranslations?.team_title}</h2>
              <div className={classnames('textM-400', styles.contentText)}>
                {pageTranslations?.team_text}
              </div>
              <div className={styles.separator}>
                <hr />
              </div>
            </div>
            <div id="roadmap">
              <h2 className={classnames('h2', styles.contentTitle)}>{pageTranslations?.roadmap_title}</h2>
              <div className={styles.roadmapTimeline}>
                <div className={styles.roadmapProgress} />
                <div className={styles.roadmapRow}>
                  <div className={styles.dot} />
                  <div className={styles.roadmapRowIn}>
                    <div />
                    <div>
                      <div className={classnames(styles.roadmapCard, styles.roadmapCardRight)}>
                        <div className={classnames('textM-500', styles.roadmapDates)}>
                          {pageTranslations?.roadmap6_date}
                        </div>
                        <div className={classnames('h3', styles.roadmapTitle)}>
                          {pageTranslations?.roadmap6_title}
                        </div>
                        <div className={classnames('textM-500', styles.roadmapText)}>
                          {pageTranslations?.roadmap6_text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.roadmapRow}>
                  <div className={styles.dot} />
                  <div className={styles.roadmapRowIn}>
                    <div>
                      <div className={classnames(styles.roadmapCard, styles.roadmapCardLeft)}>
                        <div className={classnames('textM-500', styles.roadmapDates)}>
                          {pageTranslations?.roadmap5_date}
                        </div>
                        <div className={classnames('h3', styles.roadmapTitle)}>
                          {pageTranslations?.roadmap5_title}
                        </div>
                        <div className={classnames('textM-500', styles.roadmapText)}>
                          {pageTranslations?.roadmap5_text}
                        </div>
                        <div className={classnames('textS-500', styles.roadmapStatus, styles.roadmapStatusWarning)}>
                          <Image
                            src="/icons/warning.svg"
                            alt={`Warning Icon`}
                            width={20}
                            height={20}
                          />
                          {stringsTranslations?.in_progress}
                        </div>
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div className={styles.roadmapRow}>            
                  <div className={styles.dot} />
                  <div className={styles.roadmapRowIn}>
                    <div />
                    <div>
                      <div className={classnames(styles.roadmapCard, styles.roadmapCardRight)}>
                        <div className={classnames('textM-500', styles.roadmapDates)}>
                          {pageTranslations?.roadmap4_date}
                        </div>
                        <div className={classnames('h3', styles.roadmapTitle)}>
                          {pageTranslations?.roadmap4_title}
                        </div>
                        <div className={classnames('textM-500', styles.roadmapText)}>
                          {pageTranslations?.roadmap4_text}
                        </div>
                        <div className={classnames('textS-500', styles.roadmapStatus, styles.roadmapStatusDone)}>
                          <Image
                            src="/icons/done.svg"
                            alt="Done icon"
                            width={20}
                            height={20}
                          />
                          {stringsTranslations?.completed}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.roadmapRow}>
                  <div className={styles.dot} />
                  <div className={styles.roadmapRowIn}>
                    <div>
                      <div className={classnames(styles.roadmapCard, styles.roadmapCardLeft)}>
                        <div className={classnames('textM-500', styles.roadmapDates)}>
                          {pageTranslations?.roadmap3_date}
                        </div>
                        <div className={classnames('h3', styles.roadmapTitle)}>
                          {pageTranslations?.roadmap3_title}
                        </div>
                        <div className={classnames('textM-500', styles.roadmapText)}>
                          {pageTranslations?.roadmap3_text}
                        </div>
                        <div className={classnames('textS-500', styles.roadmapStatus, styles.roadmapStatusDone)}>
                          <Image
                            src="/icons/done.svg"
                            alt="Done icon"
                            width={20}
                            height={20}
                          />
                          {stringsTranslations?.completed}
                        </div>
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div className={styles.roadmapRow}>
                  <div className={styles.dot} />
                  <div className={styles.roadmapRowIn}>
                    <div />
                    <div>
                      <div className={classnames(styles.roadmapCard, styles.roadmapCardRight)}>
                        <div className={classnames('textM-500', styles.roadmapDates)}>
                        {pageTranslations?.roadmap2_date}
                        </div>
                        <div className={classnames('h3', styles.roadmapTitle)}>
                          {pageTranslations?.roadmap2_title}
                        </div>
                        <div className={classnames('textM-500', styles.roadmapText)}>
                          {pageTranslations?.roadmap2_text}
                        </div>
                        <div className={classnames('textS-500', styles.roadmapStatus, styles.roadmapStatusDone)}>
                          <Image
                            src="/icons/done.svg"
                            alt="Done icon"
                            width={20}
                            height={20}
                          />
                          {stringsTranslations?.completed}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.roadmapRow}>
                  <div className={styles.dot} />
                  <div className={styles.roadmapRowIn}>
                    <div>
                      <div className={classnames(styles.roadmapCard, styles.roadmapCardLeft)}>
                        <div className={classnames('textM-500', styles.roadmapDates)}>
                          2022
                        </div>
                        <div className={classnames('h3', styles.roadmapTitle)}>
                          {pageTranslations?.roadmap1_title}
                        </div>
                        <div className={classnames('textM-500', styles.roadmapText)}>
                          {pageTranslations?.roadmap1_text}
                        </div>
                        <div className={classnames('textS-500', styles.roadmapStatus, styles.roadmapStatusDone)}>
                          <Image
                            src="/icons/done.svg"
                            alt="Done icon"
                            width={20}
                            height={20}
                          />
                          {stringsTranslations?.completed}
                        </div>
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
