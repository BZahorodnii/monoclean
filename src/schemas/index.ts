import * as Yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const subscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email('errors_valid_email')
    .matches(emailRegex, 'errors_email')
    .required('required'),
});

export const joinWaitlistSchema = Yup.object().shape({
  email: Yup.string()
    .email('errors_valid_email')
    .matches(emailRegex, 'errors_email')
    .required('required'),
  area_of_service: Yup.string()
  .optional(),
  full_name: Yup.string()
    .required('required')
});

export const becomeACleanerSchema = Yup.object().shape({
  email: Yup.string()
    .email('errors_valid_email')
    .matches(emailRegex, 'errors_email')
    .required('required'),
  full_name: Yup.string()
    .required('required'),
  phone_number: Yup.string()
    .matches(/^\+?\d[\d\s()-]*$/, 'errors_phone')
    .required('required'),
  area_of_service: Yup.string()
    .optional(),
  experience_level: Yup.string()
    .required('required'),
});

export const partnerWithUsSchema = Yup.object().shape({
  email: Yup.string()
    .email('errors_valid_email')
    .matches(emailRegex, 'errors_email')
    .required('required'),
  company_name: Yup.string()
    .optional(),
  full_name: Yup.string()
    .required('required'),
  message: Yup.string()
    .required('required'),
});

export const contactUsSchema = Yup.object().shape({
  email: Yup.string()
    .email('errors_valid_email')
    .matches(emailRegex, 'errors_email')
    .required('required'),
  full_name: Yup.string()
    .required('required'),
  message: Yup.string()
    .required('required'),
});

export const priceCalculatorSchema = Yup.object().shape({
  numberOfBedrooms: Yup.number()
    .required('required'),
  numberOfBathrooms: Yup.number()
    .required('required'),
  numberOfKitchens: Yup.number()
    .required('required'),
  dens: Yup.number()
    .optional(),
  square: Yup.number()
    .min(100, 'errors_min_square')
    .required('required'),
  floors: Yup.number()
    .optional(),
  isHaveYard: Yup.number()
    .optional(),
}); 
