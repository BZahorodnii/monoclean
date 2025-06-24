import React from 'react'
import { useAppContext } from '../../context/AppContext'
import Button from '../Button'
import convertTranslation from '../../../helpers/convertTranslation'

const JoinWaitlist: React.FC = () => {
  const { data: appData, setData } = useAppContext();

  const openModal = () => {
    setData({ ...appData, dialogOpen: 'joinWaitlist' });
  }

  return (
    <Button text={convertTranslation(appData?.nav).join_waitlist} onClickHandler={openModal} fullWidthMobile />
  )
}

export default JoinWaitlist;
