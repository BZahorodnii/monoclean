import React from 'react'
import Modal from 'react-modal'
import Image from '../../Image'
import { useAppContext } from '../../context/AppContext'
import styles from '../dialogs.module.css'
import convertTranslation from '../../../helpers/convertTranslation'
import classnames from 'classnames'

interface WhatIncludedProps {
  isOpen: boolean;
  closeModal: () => void;
}

const WhatIncluded: React.FC<WhatIncludedProps> = ({ isOpen, closeModal }) => {
  const { data: appData } = useAppContext();
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.home;

  const data = {
    title: pageTranslations?.faq_title_2,
    content: null,
    list: [
      pageTranslations?.faq_content_2_li_1,
      pageTranslations?.faq_content_2_li_2,
      pageTranslations?.faq_content_2_li_3,
      pageTranslations?.faq_content_2_li_4,
      pageTranslations?.faq_content_2_li_5,
      pageTranslations?.faq_content_2_li_6,
      pageTranslations?.faq_content_2_li_7,
      pageTranslations?.faq_content_2_li_8,
      pageTranslations?.faq_content_2_li_9,
    ],
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        bodyOpenClassName="hidden"
      >
        <button type="button" className={styles.closeIcon} onClick={closeModal}>
          <Image
            src="/icons/close.svg"
            alt="Close Icon"
            width={24}
            height={24}
          />
        </button>
        <div>
          <div className={classnames(styles.title, 'h2')}>{data.title}</div>
          <div className={styles.whatIncludedList}>
            {data.list.map((li, index) => (
              <div key={`faq-${index}`} className={styles.whatIncludedListItem}>
                <div className={styles.whatIncludedListItemNumber}>{index + 1}</div>
                <div className={styles.whatIncludedListItemContent}>{li}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default WhatIncluded;
