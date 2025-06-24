import React from 'react';
import Image from '../Image'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import styles from './buttonsGroup.module.css'

interface ButtonsGroupI {
  isCleaner?: boolean;
  bigSize?: boolean;
}

declare const fbq: (event: string, action: string, params?: Record<string, any>) => void;

const ButtonsGroup: React.FC<ButtonsGroupI> = ({ isCleaner = false, bigSize = false }) => {
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.buttonWrapper}>
      <Link
        rel="nofollow"
        target="_blank"
        to={isCleaner ? 'https://apps.apple.com/ca/app/monoclean-pro-cleaning-jobs/id6744279943' : 'https://apps.apple.com/ca/app/monoclean-house-cleaning/id6744273592'}
        className={styles.button}
        onClick={() => {
          if (!isCleaner) {
            fbq('track', searchParams.get('promo')?.toLowerCase() === 'toronto40streak' ? 'Lead 40streak' : 'Lead', {
              content_name: 'App Download Click',
              content_category: 'Mobile App',
              platform: 'App Store',
            });
          }
        }}
      >
        <div className={styles.buttonImage}>
          <Image
            src="/apple-store-btn.svg"
            alt="Apple Store button"
            width={bigSize ? 160 : 120}
          />
        </div>
      </Link>
      <Link
        rel="nofollow"
        target="_blank"
        to={isCleaner ? 'https://play.google.com/store/apps/details?id=com.monocleanpro.app' : 'https://play.google.com/store/apps/details?id=com.monoclean.app'}
        className={styles.button}
        onClick={() => {
          if (!isCleaner) {
            fbq('track', searchParams.get('promo')?.toLowerCase() === 'toronto40streak' ? 'Lead 40streak' : 'Lead', {
              content_name: 'App Download Click',
              content_category: 'Mobile App',
              platform: 'Google Play',
            });
          }
        }}
      >
        <div className={styles.buttonImage}>
          <Image
            src="/google-play-btn.svg"
            alt="Google Play button"
            width={bigSize ? 160 : 120}
          />
        </div>
      </Link>
    </div>
  )
};

export default ButtonsGroup;
