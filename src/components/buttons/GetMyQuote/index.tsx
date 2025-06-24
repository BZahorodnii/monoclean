import React from 'react'
import { useAppContext } from '../../context/AppContext'
import Button from '../Button'
import convertTranslation from '../../../helpers/convertTranslation'

const GetMyQuote: React.FC = () => {
  const { data: appData, setData } = useAppContext();

  const openModal = () => {
    setData({ ...appData, dialogOpen: 'downloadAppCustomers' });
  }

  return (
    <Button text={convertTranslation(appData?.strings).get_my_quote} onClickHandler={openModal} fullWidthMobile />
  )
}

export default GetMyQuote;
