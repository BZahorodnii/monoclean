import React from 'react';
import styles from './introducingMonoclean.module.css'
import classnames from 'classnames';
import Image from '../Image'

interface Item {
  title: string;
  description: string;
  image: string;
}

interface IntroducingMonocleanProps {
  title: string;
  subtitle?: string;
  hint?: string;
  items: Array<Item>;
}

const IntroducingMonoclean: React.FC<IntroducingMonocleanProps> = ({ title, subtitle, hint, items }) => {
  return (
    <div className={styles.container}>
      <h2 className={`h2 ${styles.listTitle}`}>
        {title}
      </h2>
      {subtitle && (
        <div className={classnames(styles.contentSubtitle, 'textL-400')}>
          {subtitle}
        </div>
      )}
      {hint && (
        <div className={classnames(`h3`, styles.listHint)}>
          {hint}
        </div>
      )}
      <div className={styles.items}>
        {items.map((item, index) => (
          <div className={styles.item} key={`item-${index}`}>
            <div className={styles.itemImage}>
              <Image
                src={item.image}
                alt="Icon"
                width={64}
              />
            </div>
            <h3 className={classnames(`h3`, styles.itemTitle)}>
              {item.title}
            </h3>
            <div className={classnames(`textL-400`, styles.itemDescription)}>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroducingMonoclean;