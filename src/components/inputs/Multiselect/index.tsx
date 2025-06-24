import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { DistrictI } from '../../../types/areas'
import ListCheckIcon from '../../icons/ListCheckIcon'
import Image from '../../Image'
import styles from '../inputs.module.css'
import { useAppContext } from '../../context/AppContext'
import convertTranslation from '../../../helpers/convertTranslation'

interface MultiselectI {
  errors: Array<string>;
  clearAreasError: () => void;
  placeholder: string;
  filteredList: Array<DistrictI>;
  selectedItems: Array<string>;
  value: string;
  setSelectedItems: (areas: Array<string>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Multiselect: React.FC<MultiselectI> = ({
    errors,
    placeholder,
    filteredList,
    selectedItems,
    setSelectedItems,
    value,
    clearAreasError,
    onChange,
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

  const filterItems = (value: string) => {
    clearAreasError();

    return selectedItems.filter(item => item !== value);
  }
  
  return (
    <div className={styles.inputWrapper}>
      <div ref={wrapperRef} className={classnames(styles.input, styles.multiselect, isFocused && styles.focused, errors.length && styles.multiselectError)}>
        {selectedItems.map((item, i) => {
          return (
            <div key={`tag-${i}`} className={styles.tag}>
              {item}
              <button
                type="button"
                className={styles.close}
                onClick={() => {
                  setSelectedItems(filterItems(item));
                }}
              >
                <Image
                  src="/icons/close.svg"
                  alt="Close Icon"
                  width={14}
                  height={14}
                />
              </button>
            </div>
          )
        })}
        <label className={classnames(styles.multiselectLabel)}>
          <div className={classnames('textM-500', styles.hint, (selectedItems.length || value) && styles.hintActive, isFocused && styles.hintFocused)}>{placeholder}</div>
          <input
            ref={inputRef}
            type="text"
            name="area_of_service"
            // placeholder={placeholder}
            onChange={onChange}
            className={classnames('textM-500', styles.field)}
            onFocus={() => {
              setIsFocused(true);
            }}
          />
        </label>
        {Boolean(filteredList.length) && (
          <div className={classnames(styles.listWrapper, isFocused && styles.listWrapperActive)}>
            {filteredList?.map(item => {
              const itemName = item.translation.name;
              const isItemSelected = selectedItems.includes(item.translation.name);

              return (
                <button
                  type="button"
                  key={`area-${item.id}`}
                  className={classnames('textS-500', styles.listItem, isItemSelected && styles.listItemActive)}
                  onClick={() => {
                    if (isItemSelected) {
                      setSelectedItems(filterItems(itemName));
                    } else {
                      setSelectedItems([...selectedItems, item.translation.name]); 
                    }
                  }}
                >
                  <span>
                    {itemName}
                  </span>
                  <span className={styles.checkIcon}>
                    <ListCheckIcon />
                  </span>
                </button>
              )
            })}
            <button type="button" className={styles.doneIcon} onClick={() => setIsFocused(false)}>
              <Image
                src="/icons/check.svg"
                alt="Done Icon"
                width={30}
                height={30}
              />
            </button>
          </div>
        )}
      </div>
      {Boolean(errors.length) ? (
        <div className={classnames('textS-500', styles.errorMessage)}>{convertTranslation(data?.strings)[errors[0]]}</div>
      ) : null}
    </div>
    
  )
}

export default Multiselect;
