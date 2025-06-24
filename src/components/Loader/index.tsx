import React from 'react'
import Image from '../Image'
import styles from './loader.module.css'

interface LoaderI {
  size: number;
}

const Loader: React.FC<LoaderI> = ({ size }) => {
  return (
    // <span className={styles.loader}>
      <Image
      className={styles.loader}
        src="/icons/loader.svg"
        alt="Loader"
        width={size}
        height={size}
      />
    // </span>
  )
}

export default Loader;
