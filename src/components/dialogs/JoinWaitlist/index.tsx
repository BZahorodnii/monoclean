import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import classnames from 'classnames'
import Image from '../../Image'
import { useAppContext } from '../../context/AppContext'
import { useFormik } from 'formik'
import useGetDistricts from '../../../hooks/useGetDistricts'
import useSendForm from '../../../hooks/useSendForm'
import { ButtonVariant } from '../../../types'
import { DistrictI } from '../../../types/areas'
import { joinWaitlistSchema } from '../../../schemas'
import Button from '../../buttons/Button'
import TextInput from '../../inputs/TextInput'
import Multiselect from '../../inputs/Multiselect'
import DoneScreen from '../components/DoneScreen'
import styles from '../dialogs.module.css'
import convertTranslation from '../../../helpers/convertTranslation'
import { useParams } from 'react-router-dom'

const JoinWaitlist: React.FC = () => {
  const [areasErrors, setAreasErrors] = useState<Array<string>>([]);
  const [filteredList, setFilteredList] = useState<Array<DistrictI>>([]);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const params = useParams()
  const { fetch, data } = useGetDistricts();
  const { data: appData, setData } = useAppContext();
  const { data: sendFormData, setData: setFormData, fetch: sendForm, loading: sendFormLoading, errors, setErrors } = useSendForm();

  useEffect(() => {
    if (appData?.dialogOpen === 'joinWaitlist') {
      fetch('1', params.lang || 'en');
    } else {
      setSelectedItems([]);
      formik.resetForm();
      formik.setErrors({});
      setErrors([]);
      setAreasErrors([]);
      setFormData(null);
    }
  }, [appData?.dialogOpen]);

  useEffect(() => {
    if (!filteredList.length && data) {
      setFilteredList(data);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      email: '',
      full_name: '',
      area_of_service: '',
    },
    validationSchema: joinWaitlistSchema,
    onSubmit: values => {
      const { email, full_name } = values;

      if (!selectedItems.length) {
        setAreasErrors(['errors_select_area']);
        return;
      }

      const formData = {
        full_name,
        email,
        area_of_service: selectedItems,
      }
      sendForm('waitlist', formData);
    },
    validateOnBlur: false,
    validateOnChange: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.handleChange(event);

    setErrors([]);
    if (name === 'area_of_service') {
      setAreasErrors([]);
      const filteredItems = data?.filter(item => item.translation.name.toLowerCase().includes(value));

      setFilteredList(filteredItems || []);
    }
    if ((name as keyof typeof formik.values) in formik.errors) {
      formik.setFieldError(name as keyof typeof formik.values, '');
    }
  };

  const closeModal = () => {
    setData({ ...appData, dialogOpen: false });
  }

  return (
    <div>
      <Modal
        isOpen={appData?.dialogOpen === 'joinWaitlist'}
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
        {Boolean(sendFormData) ? (
          <DoneScreen />
        ) : (
          <>
            <h2 className={classnames('h2', styles.title)}>{convertTranslation(appData?.strings)?.join_waitlist}</h2>
            <form noValidate onSubmit={formik.handleSubmit}>
              <div className={styles.inputWrapper}>
                <TextInput
                  value={formik.values.full_name}
                  onChange={handleChange}
                  error={formik.errors.full_name || null}
                  type="text"
                  name="full_name"
                  placeholder={convertTranslation(appData?.strings)?.full_name}
                />
              </div>
              <div className={styles.inputWrapper}>
                <TextInput
                  value={formik.values.email}
                  onChange={handleChange}
                  error={formik.errors.email || errors[0]}
                  type="email"
                  name="email"
                  placeholder={convertTranslation(appData?.strings)?.email}
                />
              </div>
              <div className={styles.lastInputWrapper}>
                <Multiselect
                  onChange={handleChange}
                  errors={areasErrors}
                  clearAreasError={() => setAreasErrors([])}
                  filteredList={filteredList}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  value={formik.values.area_of_service}
                  placeholder={convertTranslation(appData?.strings)?.area_of_service}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  disabled={sendFormLoading}
                  type="submit"
                  text={convertTranslation(appData?.strings)?.join_waitlist}
                  fullWidthMobile
                  variant={ButtonVariant.Default}
                />
              </div>
            </form>
          </>
        )}
      </Modal>
    </div>
  )
}

export default JoinWaitlist;
