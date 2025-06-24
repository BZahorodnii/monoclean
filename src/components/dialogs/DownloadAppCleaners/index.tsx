import React from 'react'
import classnames from 'classnames'
import Image from '../../Image'
import { useAppContext } from '../../context/AppContext'
import Modal from 'react-modal'
import styles from '../dialogs.module.css'
import convertTranslation from '../../../helpers/convertTranslation'
import ButtonsGroup from '../../ButtonsGroup'

const DownloadAppCleaners: React.FC = () => {
  const { data: appData, setData } = useAppContext();

  const closeModal = () => {
    setData({ ...appData, dialogOpen: false })
  }

  return (
    <div>
      <Modal
        isOpen={appData?.dialogOpen === 'downloadAppCleaners'}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        bodyOpenClassName="hidden"
      >
        <button type="button" className={styles.closeIcon} onClick={closeModal}>
          <Image
            src="/icons/close.svg"
            alt={`Close Icon`}
            width={24}
            height={24}
          />
        </button>
        {/* <h2 className={classnames('h2', styles.title)}>{convertTranslation(appData?.strings)?.contact_us}</h2> */}
        <div className={classnames('h2', styles.title)}>{convertTranslation(appData?.strings)?.download_app_cleaners_title}</div>
        <div className={classnames('textL-500', styles.subtitle)}>
          {convertTranslation(appData?.strings)?.download_app_cleaners_subtitle}
        </div>
        <div className={styles.centerWrapper}>
          <ul className={styles.list}>
            <li>
              <Image
                src="/icons/check-black.svg"
                alt="Check Icon"
                width={18}
                height={18}
              />
              {convertTranslation(appData?.strings)?.download_app_cleaners_li_1}
            </li>
            <li>
              <Image
                src="/icons/check-black.svg"
                alt="Check Icon"
                width={18}
                height={18}
              />
              {convertTranslation(appData?.strings)?.download_app_cleaners_li_2}
            </li>
            <li>
              <Image
                src="/icons/check-black.svg"
                alt="Check Icon"
                width={18}
                height={18}
              />
              {convertTranslation(appData?.strings)?.download_app_cleaners_li_3}
            </li>
          </ul>
          <div className={classnames('textS-400')}>{convertTranslation(appData?.strings)?.download_app_cleaners_bottom_text_1}</div>
          <div className={classnames('textL-500', styles.bottomText)}>{convertTranslation(appData?.strings)?.download_app_cleaners_bottom_text_2}</div>
          <ButtonsGroup isCleaner />
        </div>
      </Modal>
    </div>
  )
}

export default DownloadAppCleaners;

