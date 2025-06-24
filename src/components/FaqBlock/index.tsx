import React from 'react'
import Container from '../Container'
import styles from './faq.module.css'
import Accordion from '../Accordion'
import classnames from 'classnames'

interface ItemI {
  title: string;
  content: string | null;
  list?: string[] | null;
}

interface FaqBlockProps {
  items: Array<ItemI>;
  header?: string;
}

const FaqBlock: React.FC<FaqBlockProps> = ({ items, header }) => {
  return (
    <Container className={styles.container}>
      <div className={styles.wrapper}>
        <div className={classnames(styles.title, header ? styles.header : 'h2')}>{header || 'FAQ'}</div>
        <div>
        {items?.map((item, index) => (
          <Accordion key={`faq-${index}`} title={item.title} border={index !== items.length - 1}>
            {Boolean(item.content) && item.content}
            {Boolean(item.list) && (
              <div className={styles.list}>
                {item.list?.map((li, index) => (
                  <div key={`faq-${index}`} className={styles.listItem}>
                    <div className={styles.listItemNumber}>{index + 1}</div>
                    <div className={styles.listItemContent}>{li}</div>
                  </div>
                ))}
              </div>
            )}
          </Accordion>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default FaqBlock;
