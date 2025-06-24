import React from 'react'
import styles from './image.module.css'
import classnames from 'classnames'
interface ImageI {
  alt: string;
  src: string;
  width: number;
  height?: number;
  className?: string;
}

const Image: React.FC<ImageI> = ({
  alt,
  src,
  width,
  height,
  className
}) => {
  return (
    <img className={classnames(styles.image, className ? className : '')} src={src} alt={alt} width={width} height={height} />
  )
}

export default Image;
