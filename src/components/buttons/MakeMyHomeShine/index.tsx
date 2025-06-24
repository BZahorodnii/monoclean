import React from 'react'
import { useAppContext } from '../../context/AppContext'
import Button from '../Button'
import convertTranslation from '../../../helpers/convertTranslation'

const MakeMyHomeShine: React.FC = () => {
  const { data: appData, setData } = useAppContext();

  const openModal = () => {
    setData({ ...appData, dialogOpen: 'downloadAppCustomers' });
  }

  return (
    <Button text={convertTranslation(appData?.strings).make_my_home_shine} onClickHandler={openModal} fullWidthMobile />
  )
}

export default MakeMyHomeShine;
