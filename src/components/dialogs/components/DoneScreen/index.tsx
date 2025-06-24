import React from 'react'
import Image from '../../../Image'
import classnames from 'classnames'
import { useAppContext } from '../../../context/AppContext'
import { ButtonVariant } from '../../../../types'
import Button from '../../../buttons/Button'
import styles from '../../dialogs.module.css'
import convertTranslation from '../../../../helpers/convertTranslation'

const DoneScreen: React.FC = () => {
  const { data: appData, setData } = useAppContext();

  return (
    <div className={styles.doneWrapper}>
      <span className={styles.doneLogo}>
        <Image
          src="/done.png"
          alt="Done logo"
          width={210}
          height={187}
        />
      </span>
      <h2 className={classnames('h2', styles.doneTitle)}>{convertTranslation(appData?.strings)?.forms_success_title}</h2>
      <h2 className={classnames('textM-500', styles.doneText)}>{convertTranslation(appData?.strings)?.forms_success_text}</h2>
      <Button
        text="Got it!"
        fullWidthMobile
        variant={ButtonVariant.Default}
        onClick={() => {
          setData({ ...appData, dialogOpen: false });
        }}
      />
    </div>
  )
}

export default DoneScreen;
