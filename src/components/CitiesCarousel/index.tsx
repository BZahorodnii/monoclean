import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from '../Image'
import Container from '../Container';
import styles from './CitiesCarousel.module.css';
import { useMediaQuery } from 'react-responsive';
import classnames from 'classnames';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 12
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 12
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 8
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

const areas = [
  {
    image: '/areas/don_mills.png'
  },
  {
    image: '/areas/annex.png'
  },
  {
    image: '/areas/beaches.png'
  },
  {
    image: '/areas/downtown.png'
  },
  {
    image: '/areas/etobicoke.png'
  },
  {
    image: '/areas/high_park.png'
  },
  {
    image: '/areas/leslieville.png'
  },
  {
    image: '/areas/liberty_village.png'
  },
  {
    image: '/areas/midtown.png'
  },
  {
    image: '/areas/north_york.png'
  },
  {
    image: '/areas/willowdale.png'
  },
  {
    image: '/areas/scarborough.png'
  },
];

const CustomArrowLeft = ({ onClick }: any) => {
  return (
    <div onClick={onClick} className={`${styles.arrow} ${styles.arrowLeft}`}>
      <Image src="/icons/angle-left.svg" alt="Arrow" width={48} height={48} />
    </div>
  );
};

const CustomArrowRight = ({ onClick }: any) => {
  return (
    <div onClick={onClick} className={`${styles.arrow} ${styles.arrowRight}`}>
      <Image src="/icons/angle-right.svg" alt="Arrow" width={48} height={48} />
    </div>
  );
};

const CitiesCarousel: React.FC = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <Container>
      <div className={styles.wrapper}>
        <Carousel
          responsive={responsive}
          infinite={!isDesktop}
          autoPlay={!isDesktop}
          autoPlaySpeed={2000}
          draggable={!isDesktop}
          swipeable={!isDesktop}
          customLeftArrow={<div className={classnames(styles.arrowWrapper, styles.arrowWrapperLeft)}><CustomArrowLeft /></div>}
          customRightArrow={<div className={classnames(styles.arrowWrapper, styles.arrowWrapperRight)}><CustomArrowRight /></div>}
        >
          {areas.map((area, index) => (
            <div key={index} className={styles.carouselItem}>
              <Image src={area.image} alt="Area Logo" width={100} />
            </div>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default CitiesCarousel;
