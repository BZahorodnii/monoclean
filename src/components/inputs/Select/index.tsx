import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import styles from '../inputs.module.css'
import { useAppContext } from '../../context/AppContext'
import convertTranslation from '../../../helpers/convertTranslation'
import Image from '../../Image'

interface ListI {
  name: string;
  value: string;
  offer?: number;
}

interface SelectI {
  errors: Array<string>;
  placeholder: string;
  selectedItem: ListI;
  value: string;
  list: Array<ListI>;
  name: string;
  animatedLabel?: boolean;
  setSelectedItem: (item: ListI) => void;
};

const Select: React.FC<SelectI> = ({
    errors,
    placeholder,
    selectedItem,
    setSelectedItem,
    name,
    value,
    list,
    animatedLabel = true,
  }) => {
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data } = useAppContext();
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  
  return (
    <div className={styles.inputWrapper}>
      {/* <div ref={wrapperRef} className={classnames(styles.input, styles.select, isFocused && styles.focused, errors.length && styles.multiselectError)}> */}
        <label>
          {animatedLabel ? (
            <div className={classnames('textM-500', styles.hint, (selectedItem || value) && styles.hintActive, isFocused && styles.hintFocused)}>{placeholder}</div>
          ) : (
            <div className={classnames('textM-500', styles.topHint)}>{placeholder}</div>
          )}
          <div style={{ position: 'relative' }}>
            <input
              ref={inputRef}
              name={name}
              value={selectedItem?.offer ? `${selectedItem?.value} (-${selectedItem?.offer}%)` : selectedItem?.value || ''}
              readOnly
              className={classnames('textM-500', styles.input, styles.select, !animatedLabel && styles.borderRadiusSmall)}
              onClick={() => {
                setIsFocused(!isFocused);
              }}
            />
            <div className={styles.selectIcon} onClick={(e) => {
              e.preventDefault();
              // e.stopPropagation();
              setIsFocused(!isFocused);
            }}>
              <Image
                src="/icons/select.svg"
                alt={`Select Icon`}
                width={24}
                height={24}
              />
            </div>
          </div>
        </label>
        {Boolean(list.length) && (
          <div className={classnames(styles.listWrapper, isFocused && styles.listWrapperActive)}>
            {list?.map(item => {
              const itemName = item.name;
              const itemValue = item.value;

              return (
                <button
                  type="button"
                  key={`${item.name}`}
                  className={classnames('textS-500', styles.listItem)}
                  onClick={() => {
                    setIsFocused(false);
                    setSelectedItem({
                      name: itemName,
                      value: itemValue,
                      offer: item.offer || undefined,
                    });
                  }}
                >
                  <span>
                    {itemValue}
                    {item.offer && (
                      <> (-{item.offer}%)</>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      {/* </div> */}
      {Boolean(errors.length) ? (
        <div className={classnames('textS-500', styles.errorMessage)}>{convertTranslation(data?.strings)[errors[0]]}</div>
      ) : null}
    </div>
    
  )
}

export default Select;
