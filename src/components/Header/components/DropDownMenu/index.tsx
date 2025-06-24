import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DropDownIcon from '../../../icons/DropDownIcon'
import classnames from 'classnames'
import styles from '../../header.module.css'

interface DropDownMenuItemI {
  to: string;
  text: string;
}

interface DropDownMenuI {
  components: DropDownMenuItemI[];
  title: string;
}

const DropDownMenu: React.FC<DropDownMenuI> = ({ components, title }) => {
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (active) {
      setActive(false);
    }
  }, [location]);

  const onClick = () => {
    setActive(false);
  }

  return (
    <div className={classnames(styles.dropdown, active && styles.active)}>
      <div
        className={classnames(styles.link, styles.dropdownLink)}
        onClick={() => {
          setActive(!active)
        }}
      >
        <div>{title}</div>
        <span className={styles.dropdownIcon}>
          <DropDownIcon />
        </span>
      </div>
      <div className={styles.dropdownMenu}>
        <div className={styles.dropdownMenuIn}>
          {components.map((component, i) => (
            <Link
              key={`${component.to}-${i}`}
              className={classnames('textS-600', styles.submenuLink)}
              to={component.to}
              onClick={onClick}
            >
              {component.text}
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default DropDownMenu;
