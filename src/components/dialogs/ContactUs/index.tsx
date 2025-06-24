import React, { useEffect } from 'react'
import classnames from 'classnames'
import Image from '../../Image'
import { useAppContext } from '../../context/AppContext'
import { useFormik } from 'formik'
import useSendForm from '../../../hooks/useSendForm'
import { ButtonVariant } from '../../../types'
import { contactUsSchema } from '../../../schemas'
import Modal from 'react-modal'
import Button from '../../buttons/Button'
import TextInput from '../../inputs/TextInput'
import TextArea from '../../inputs/TextArea'
import DoneScreen from '../components/DoneScreen'
import styles from '../dialogs.module.css'
import convertTranslation from '../../../helpers/convertTranslation'

const ContactUs: React.FC = () => {
  const { data: appData, setData } = useAppContext();
  const { data: sendFormData, fetch: sendForm, loading: sendFormLoading, errors, setErrors  } = useSendForm();

  useEffect(() => {
    if (!appData?.dialogOpen) {
      formik.resetForm();
      formik.setErrors({});
      setErrors([]);
    }
  }, [appData?.dialogOpen]);

  const formik = useFormik({
    initialValues: {
      email: '',
      full_name: '',
      message: ''
    },
    validationSchema: contactUsSchema,
    onSubmit: values => {
      const { email, full_name, message } = values;

      const formData = {
        full_name,
        email,
        message,
      }
      sendForm('contactUs', formData);
    },
    validateOnBlur: false,
    validateOnChange: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    formik.handleChange(event);
    setErrors([]);

    if ((name as keyof typeof formik.values) in formik.errors) {
      formik.setFieldError(name as keyof typeof formik.values, '');
    }
  };

  const closeModal = () => {
    setData({ ...appData, dialogOpen: false })
  }

  return (
    <div>
      <Modal
        isOpen={appData?.dialogOpen === 'contactUs'}
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
            <h2 className={classnames('h2', styles.title)}>{convertTranslation(appData?.strings)?.contact_us}</h2>
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
                <TextArea
                  value={formik.values.message}
                  onChange={handleChange}
                  error={formik.errors.message || null}
                  name="message"
                  placeholder={convertTranslation(appData?.strings)?.message}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  disabled={sendFormLoading}
                  type="submit"
                  text={convertTranslation(appData?.strings)?.contact_us}
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

export default ContactUs;
