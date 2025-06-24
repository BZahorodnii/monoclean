import React from 'react';
import classnames from 'classnames';
import styles from "./container.module.css";

interface ContainerI {
  children: React.ReactNode;
  background?: boolean;
  extraMargin?: boolean;
  noSideSpaces?: boolean;
  mobileReverse?: boolean;
  verticalDirection?: boolean;
  className?: string;
}

const Container: React.FC<ContainerI> = ({
  children,
  background = false,
  extraMargin = false,
  noSideSpaces = false,
  mobileReverse = false,
  verticalDirection = false,
  className,
}) => {
  return (
    <div className={classnames('container', noSideSpaces && styles.noSideSpaces, className)}>
      <div 
        className={
          classnames(
            styles.containerIn,
            verticalDirection ? styles.verticalDirection : styles.horizontalDirection,
            mobileReverse && styles.mobileReverse,
            background && styles.background,
            extraMargin && styles.extraMargin,
            className,
          )
        }
      >
        {children}
      </div>
    </div>
  )
}

export default Container;
