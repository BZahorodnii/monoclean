import React, { useRef } from 'react'
import classnames from 'classnames'
import styles from '../inputs.module.css'
import { useAppContext } from '../../context/AppContext'
import convertTranslation from '../../../helpers/convertTranslation'

interface SelectI {
  errors: Array<string>;
  checked: boolean;
  text: string | React.ReactNode;
  onChange: () => void;
  campaign?: boolean;
};

const Select: React.FC<SelectI> = ({
    errors,
    checked,
    onChange,
    text,
    campaign = false,
  }) => {
  const { data } = useAppContext();
  const inputRef = useRef(null);
  
  
  return (
    <div className={styles.inputWrapper}>
      {/* <div ref={wrapperRef} className={classnames(styles.input, styles.select, isFocused && styles.focused, errors.length && styles.multiselectError)}> */}
        <label className={classnames(styles.checkboxLabel, campaign && styles.checkboxCampaignLabel)}>
          <input
            ref={inputRef}
            type="checkbox"
            checked={checked}
            readOnly
            className={classnames('textM-500', styles.checkbox)}
            onChange={() => {
              onChange();
            }}
          />
          <div className={classnames('textM-500', styles.checkboxText)}>{text}</div>
        </label>
        
      {/* </div> */}
      {Boolean(errors.length) ? (
        <div className={classnames('textS-500', styles.errorMessage)}>{convertTranslation(data?.strings)[errors[0]]}</div>
      ) : null}
    </div>
    
  )
}

export default Select;
