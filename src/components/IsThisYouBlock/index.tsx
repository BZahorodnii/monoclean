import React from 'react'
import Image from '../Image'
import Container from '../Container'
import Content from '../Content'
import styles from './isThisYouBlock.module.css'
import classnames from 'classnames'
import Button from '../buttons/Button'
import { useAppContext } from '../context/AppContext'
import convertTranslation from '../../helpers/convertTranslation'


interface IsThisYouBlockProps {
  title: string;
  content: Array<string>;
  hint: React.ReactNode;
  image: string;
}

const IsThisYouBlock: React.FC<IsThisYouBlockProps> = ({ title, content, hint, image }) => {
  const { data: appData } = useAppContext();
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.landings_general;

  return (
    <Container background className={styles.container}>
      <>
        <div className={classnames(styles.imageWrapper, styles.rightAligned, styles.imageWrapperSpace)}>
          <Image
            src={image}
            alt="Is This You Logo"
            width={529}
          />
        </div>
        <Content
          spaces
          isSubheader
          isMainBlock
          titleExtraSpace
          // hint={stringsTranslations.for_customer}
          title={title}
          // text={'Stop Worrying About Mess. Start Enjoying Your Life.'}
        >
            <div className={styles.list}>
              {content.map((item, index) => (
                <div key={index} className={classnames(`textL-400`, styles.listItem)}>
                  <span className={styles.number}>{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
            <div className={`textL-400 ${styles.hint}`}>
              {hint}
            </div>
            <Button
              text={pageTranslations?.instant_quote}
              onClick={() => {
                document.getElementById('calculator')?.scrollIntoView({ 
                  behavior: 'smooth'
                });
              }}
            />
        </Content>
      </>
    </Container>
  )
}

export default IsThisYouBlock;
