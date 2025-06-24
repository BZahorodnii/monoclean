import React, { useState } from 'react'
import classnames from 'classnames'
import styles from '../inputs.module.css'
import { useAppContext } from '../../context/AppContext';
import convertTranslation from '../../../helpers/convertTranslation';

interface TextInputI {
  error: string | null;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  placeholder: string;
  animatedLabel?: boolean;
  inputPlaceholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const TextInput:React.FC<TextInputI> = ({ error, value, onChange, type, name, placeholder, animatedLabel = true, inputPlaceholder, inputRef }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { data } = useAppContext();

  return (
    <div className={styles.inputWrapper}>
      <label className={classnames(styles.inputLabel, error && styles.inputError)}>
        {animatedLabel ? (
          <div className={classnames('textM-500', styles.hint, value && styles.hintActive, isFocused && styles.hintFocused)}>{placeholder}</div>
        ) : (
          <div className={classnames('textM-500', styles.topHint)}>{placeholder}</div>
        )}
        <input
          ref={inputRef}
          type={type}
          name={name}
          placeholder={inputPlaceholder ? inputPlaceholder : ''}
          onChange={onChange}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={classnames(styles.input, 'textM-500', !animatedLabel && styles.borderRadiusSmall)}
        />
        {error ? (
          <div className={classnames('textS-500', styles.errorMessage)}>{convertTranslation(data?.strings)[error]}</div>
        ) : null}
      </label>
    </div>
  )
}

export default TextInput;
