import React, { useState } from 'react'
import classnames from 'classnames'
import styles from '../inputs.module.css'
import convertTranslation from '../../../helpers/convertTranslation';
import { useAppContext } from '../../context/AppContext';

interface TextAreaI {
  error: string | null;
  value: string;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea:React.FC<TextAreaI> = ({ error, value, onChange, name, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { data } = useAppContext();
  
  return (
    <div className={styles.inputWrapper}>
      <label className={classnames(styles.inputLabel, error && styles.inputError)}>
        <div className={classnames('textM-500', styles.hint, value && styles.hintActive, isFocused && styles.hintFocused)}>{placeholder}</div>
        <textarea
          name={name}
          // placeholder={placeholder}
          onChange={onChange}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={4}
          className={classnames(styles.input, styles.textarea, 'textM-500')}
        />
        {error ? (
          <div className={classnames('textS-500', styles.errorMessage)}>{convertTranslation(data?.strings)[error]}</div>
        ) : null}
      </label>
    </div>
  )
}

export default TextArea;
