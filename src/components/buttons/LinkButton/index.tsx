import React from 'react'
import classnames from 'classnames'
import Image from '../../Image'
import { Link } from 'react-router-dom'
import { ButtonVariant } from '../../../types'
import styles from '../button.module.css'

interface LinkButtonI extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string | React.ReactNode;
  logo?: string;
  fullWidthMobile?: boolean;
  link: string;
  variant?: ButtonVariant;
};

const LinkButton:React.FC<LinkButtonI> = ({
  text,
  logo,
  fullWidthMobile = false,
  link,
  variant = ButtonVariant.Default,
  ...props
}) => {
  const classNames = classnames(
    'textM-500',
    styles.button,
    styles.linkButton,
    logo && styles.logoBtn,
    fullWidthMobile && styles.fullWidthMobile,
    variant === ButtonVariant.Default && styles.default,
    variant === ButtonVariant.Dark && styles.dark,
    variant === ButtonVariant.Disabled && styles.disabled,
    variant === ButtonVariant.Light && styles.light,
  )
  return (
    <Link to={link} className={classNames} {...props}>
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
      <span className={styles.textBtn}>{text}</span>
    </Link>
  )
}

export default LinkButton;
