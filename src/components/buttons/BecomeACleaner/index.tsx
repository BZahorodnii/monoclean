import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from '../Button';
import convertTranslation from '../../../helpers/convertTranslation';

const BecomeACleaner: React.FC = () => {
  const { data: appData, setData } = useAppContext();

  const openModal = () => {
    setData({ ...appData, dialogOpen: 'becomeACleaner' });
  }

  return (
    <Button text={convertTranslation(appData?.nav).become_a_cleaner} onClickHandler={openModal} fullWidthMobile />
  )
}

export default BecomeACleaner;
