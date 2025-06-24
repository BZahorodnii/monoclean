import React, { useEffect } from 'react'
import Button from '../../../buttons/Button'
import { ButtonVariant } from '../../../../types'
import { useFormik } from 'formik'
import { subscribeSchema } from '../../../../schemas'
import useSubscribe from '../../../../hooks/useSubscribe'
import TextInput from '../../../inputs/TextInput'
import { useLocation } from 'react-router-dom'
import styles from './subscribeForm.module.css'

const SubscribeForm: React.FC = () => {
  const { data, fetch, loading, errors, setErrors } = useSubscribe();
  const location = useLocation();

  useEffect(() => {
    setErrors([]);
    formik.setErrors({});
  }, [location.pathname]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: subscribeSchema,
    onSubmit: values => {
      const { email } = values;
      fetch(email);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    formik.handleChange(event);

    setErrors([]);
    if ((name as keyof typeof formik.values) in formik.errors) {
      formik.setFieldError(name as keyof typeof formik.values, '');
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <TextInput
            value={formik.values.email}
            onChange={handleChange}
            error={formik.errors.email || errors[0]}
            type="email"
            name="email"
            placeholder='Email'
          />
        </div>
        <Button
          type="submit"
          text="Subscribe"
          fullWidthMobile
          loading={loading}
          done={Boolean(data)}
          variant={ButtonVariant.Default}
        />
      </form>
    </div>
  )
}

export default SubscribeForm;
