import React from 'react';
import Container from '../../components/Container'
import Content from '../../components/Content'
import Image from '../../components/Image'
import styles from './orderSteps.module.css'
import classnames from 'classnames';
import { useParallax } from 'react-scroll-parallax';
import { useAppContext } from '../context/AppContext';
import convertTranslation from '../../helpers/convertTranslation';

interface OrderStepsI {
  image1?: string;
  image2?: string;
  image3?: string;
}

const OrderSteps: React.FC<OrderStepsI> = ({ image1, image2, image3 }) => {
  const { data: appData } = useAppContext();

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const { ref: ref1 } = useParallax<HTMLDivElement>({ 
    // speed: isMobile ? 0 : 5, 
    easing: [0, 0.75, 0, 1],
    translateX: isMobile ? [0, 0] : [40, 0]
  }); 
  const { ref: ref2 } = useParallax<HTMLDivElement>({ 
    // speed: isMobile ? 0 : 10, 
    easing: [0, 0.75, 0, 1],
    translateX: isMobile ? [0, 0] : [-40, 0]
  });
  const { ref: ref3 } = useParallax<HTMLDivElement>({ 
    // speed: isMobile ? 0 : 5, 
    easing: [0, 0.75, 0, 1],
    translateX: isMobile ? [0, 0] : [40, 0]
  });

  return (
    <Container className={styles.container}>
      <Content>
        <h3 className={classnames('h2', styles.title)}>{convertTranslation(appData?.pagesBlock)?.landings_general?.order_steps_title}</h3>
        <div>
          <div className={styles.steps}>
            <div className={styles.stepsProgress} />
            <div className={styles.stepRow}>
              <div className={styles.dot} />
              <div className={styles.stepRowIn}>
                <div />
                <div>
                  <div className={classnames(styles.stepCard, styles.stepCardRight)} ref={ref1}>
                    <div className={styles.stapCardImage}>
                      <Image
                        src={image1 || '/landings/order-step-1.png'}
                        alt="Step 1"
                        width={139}
                      />
                    </div>
                    <div className={styles.stepCardContent}>
                      <div className={styles.stepTitleWraper}>
                        <div className={styles.stepCardNumber}>1</div>
                        <div className={classnames(styles.stepCardTitle, 'textL-500')}>{convertTranslation(appData?.pagesBlock)?.landings_general?.order_steps_1_title}</div>
                      </div>
                      <div className={classnames(styles.stepCardText, 'textM-500')}>
                        {convertTranslation(appData?.pagesBlock)?.landings_general?.order_steps_1_text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.stepRow}>
              <div className={styles.dot} />
              <div className={styles.stepRowIn}>
                <div>
                  <div className={classnames(styles.stepCard, styles.stepCardLeft)} ref={ref2}>
                    <div className={styles.stapCardImage}>
                      <Image
                        src={image2 || '/landings/order-step-2.png'}
                        alt="Step 2"
                        width={139}
                      />
                    </div>
                    <div className={styles.stepCardContent}>
                      <div className={styles.stepTitleWraper}>
                        <div className={styles.stepCardNumber}>2</div>
                        <div className={classnames(styles.stepCardTitle, 'textL-500')}>{convertTranslation(appData?.pagesBlock)?.landings_general?.order_steps_2_title}</div>
                      </div>
                      <div className={classnames(styles.stepCardText, 'textM-500')}>
                        {convertTranslation(appData?.pagesBlock)?.landings_general?.order_steps_2_text}
                      </div>
                    </div>
                  </div>
                </div>
                <div />
              </div>
            </div>
            <div className={styles.stepRow}>
              <div className={styles.dot} />
              <div className={styles.stepRowIn}>
                <div />
                <div>
                  <div className={classnames(styles.stepCard, styles.stepCardRight)} ref={ref3}>
                    <div className={styles.stapCardImage}>
                      <Image
                        src={image3 || '/landings/order-step-3.png'}
                        alt="Step 3"
                        width={139}
                      />
                    </div>
                    <div className={styles.stepCardContent}>
                      <div className={styles.stepTitleWraper}>
                        <div className={styles.stepCardNumber}>3</div>
                        <div className={classnames(styles.stepCardTitle, 'textL-500')}>{convertTranslation(appData?.pagesBlock)?.landings_general?.order_steps_3_title}</div>
                      </div>
                      <div className={classnames(styles.stepCardText, 'textM-500')}>
                        {convertTranslation(appData?.pagesBlock)?.landings_general?.order_steps_3_text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default OrderSteps;
