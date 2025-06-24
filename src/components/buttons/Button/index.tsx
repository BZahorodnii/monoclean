import React from 'react'
import classnames from 'classnames'
import Image from '../../Image'
import Loader from '../../Loader'
import { ButtonVariant } from '../../../types'
import styles from '../button.module.css'

interface ButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  logo?: string;
  fullWidthMobile?: boolean;
  variant?: ButtonVariant;
  loading?: boolean;
  done?: boolean;
  mobileSmall?: boolean;
  onClickHandler?: () => void;
  rightIcon?: string;
  color?: string;
};

const Button:React.FC<ButtonI> = ({
  text,
  logo,
  fullWidthMobile = false,
  variant = ButtonVariant.Default,
  loading = false,
  done = false,
  mobileSmall = false,
  onClickHandler,
  rightIcon,
  color,
  ...props
}) => {
  const classNames = classnames(
    'textM-500',
    styles.button,
    logo && styles.logoBtn,
    fullWidthMobile && styles.fullWidthMobile,
    loading && styles.loading,
    done && styles.done,
    variant === ButtonVariant.Default && styles.default,
    variant === ButtonVariant.Dark && styles.dark,
    variant === ButtonVariant.Disabled && styles.disabled,
    variant === ButtonVariant.Light && styles.light,
    variant === ButtonVariant.Yellow && styles.yellow,
    mobileSmall && styles.mobileSmall,
  );

  return (
    <button type="button" className={classNames} onClick={onClickHandler} disabled={loading || done} {...props}>
      {logo && (
        <span className={styles.logo}>
          <Image
            src={logo}
            alt={`${text} Logo`}
            width={24}
            height={24}
          />
        </span>
        
      )}
      {loading && (
        <span className={styles.absoluteIcon}>
          <Loader size={24} />
        </span>
      )}
      {done && (
        <span className={styles.absoluteIcon}>
          <Image
            src="/icons/check.svg"
            alt={`Check Logo`}
            width={24}
            height={24}
          />
        </span>
      )}
      <span className={styles.textBtn}>{text}</span>
      {Boolean(rightIcon) && (
        <Image
          src={rightIcon || ''}
          alt={`Right Icon`}
          width={24}
          height={24}
        />
      )}
    </button>
  )
}

export default Button;
