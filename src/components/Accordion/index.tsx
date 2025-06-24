import React, { useState, useRef, useEffect } from 'react';
import Image from '../Image'
import classnames from 'classnames'
import styles from './accordion.module.css';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  border?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, border = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className={classnames(styles.accordion, border ? styles.border : '')}>
      <button
        className={classnames(styles.accordionHeader, 'h3')}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {title}
        <span className={styles.arrow}>
          {isOpen ? (
            <Image src="/icons/minus.svg" alt="arrow-up" width={22} height={22} />
          ) : (
            <Image src="/icons/plus.svg" alt="arrow-down" width={22} height={22} />
          )}
        </span>
      </button>
      <div
        ref={contentRef}
        className={classnames(styles.accordionContent, isOpen ? styles.open : '')}
        style={{ maxHeight: height }}
      >
        <div className={classnames(styles.accordionBody, 'textM-400')}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;