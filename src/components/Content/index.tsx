import React from 'react';
import classnames from 'classnames';
import styles from './content.module.css';

interface ContentI {
  children?: React.ReactNode;
  hint?: string;
  title?: string;
  text?: string;
  buttonText?: string;
  spaces?: boolean;
  isMainBlock?: boolean;
  isSubheader?: boolean;
  titleExtraSpace?: boolean;
};

const Content:React.FC<ContentI> = ({
  children,
  hint,
  title,
  text,
  spaces,
  isMainBlock = false,
  isSubheader = false,
  titleExtraSpace = false,
}) => {
  return (
    <div>
      <div className={classnames(spaces && styles.spaces)}>
        {Boolean(hint) && (
          <div className={classnames(styles.hint, 'uppercase-500')}>
            {hint}
          </div>
        )}
        {Boolean(title) && (
          isMainBlock ? (
            <h1 className={classnames(isSubheader ? 'h2' : 'h1', styles.title, titleExtraSpace && styles.titleExtraSpace)}>{title}</h1>
          ) : (
            <h2 className={classnames(isSubheader ? 'h2' : 'h1', styles.title, titleExtraSpace && styles.titleExtraSpace)}>{title}</h2>
          )
        )}
        {Boolean(text) && (
          <div className={classnames(isSubheader ? 'textM-400' : 'textL-400', styles.text)}>{text}</div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Content;
