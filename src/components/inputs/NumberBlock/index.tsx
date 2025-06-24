import React, { useState } from 'react'
import classnames from 'classnames'
import styles from '../inputs.module.css'
import { useAppContext } from '../../context/AppContext';
import convertTranslation from '../../../helpers/convertTranslation';
import Image from '../../Image';

interface NumberBlockI {
  error: string | null;
  value: string;
  name: string;
  minValue: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const NumberBlock:React.FC<NumberBlockI> = ({ error, value, onChange, placeholder, name, minValue }) => {
  const [count, setCount] = useState(name === 'numberOfBedrooms' ? 1 : minValue);
  const { data } = useAppContext();

  return (
    <div className={styles.inputWrapper}>
      <div className={classnames(styles.inputNumberLabel, error && styles.inputError)}>
        <div className={classnames('textM-500', styles.hint, value && styles.hintActive)}>{placeholder}</div>
        <button type="button" className={styles.minusButton} onClick={() => {
          if (count > minValue) {
            setCount(count - 1);
            onChange({ 
              target: { name, value: count - 1 } 
            } as unknown as React.ChangeEvent<HTMLInputElement>);
          }
        }}>
          <Image
            src="/icons/minus.svg"
            alt={`Minus Icon`}
            width={24}
            height={24}
          />
        </button>
        {/* <div className={classnames(styles.input, styles.numberBlock)}>
          {value}
        </div> */}
        <input
          type="number"
          name={name}
          readOnly
          // placeholder={placeholder}
          value={count}
          className={classnames(styles.input, 'textM-500', styles.numberBlock)}
        />
        <button type="button" className={styles.plusButton} onClick={() => {
          setCount(count + 1);
          onChange({ 
            target: { name, value: count + 1 } 
          } as unknown as React.ChangeEvent<HTMLInputElement>);
        }}>
          <Image
            src="/icons/plus.svg"
            alt={`Plus Icon`}
            width={24}
            height={24}
          />
        </button>
        {error ? (
          <div className={classnames('textS-500', styles.errorMessage)}>{convertTranslation(data?.strings)[error]}</div>
        ) : null}
      </div>
    </div>
  )
}

export default NumberBlock;
