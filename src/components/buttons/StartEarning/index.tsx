import React from 'react'
import { useAppContext } from '../../context/AppContext'
import Button from '../Button'
import convertTranslation from '../../../helpers/convertTranslation'

const StartEarning: React.FC = () => {
  const { data: appData, setData } = useAppContext();

  const openModal = () => {
    setData({ ...appData, dialogOpen: 'downloadAppCleaners' });
  }

  return (
    <Button text={convertTranslation(appData?.strings).start_earning} onClickHandler={openModal} fullWidthMobile />
  )
}

export default StartEarning;
