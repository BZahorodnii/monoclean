import React from 'react';
import Container from '../Container';
import styles from './serviceZones.module.css';
import Image from '../../components/Image'
import classnames from 'classnames';

interface ServiceZonesProps {
  customTitleStyle?: boolean;
}

const ServiceZones: React.FC<ServiceZonesProps> = ({ customTitleStyle }) => {
  return (
    <Container className={styles.container}>
      <>
        <div>
          <div className={classnames(styles.title, customTitleStyle && styles.customTitleStyle)}>
            Toronto & GTA House Cleaning Zone
          </div>
          <div className={styles.subtitle}>
            Monoclean serves homes inside the outlined area - Toronto, Vaughan, Richmond Hill, and Markham - offering flat-rate, no-surprise cleans. Live outside the border? Join our wait-list for expansion updates.
          </div>
          <div>
            <Image
              src="/landings/map.png"
              alt="Toronto Map"
              width={1200}
            />
          </div>
        </div>
      </>
    </Container>
  );
};

export default ServiceZones;
