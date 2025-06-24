import React, { useEffect, useState } from 'react';
import { priceCalculatorSchema } from '../../schemas'
import { useFormik } from 'formik';
import classnames from 'classnames';
import styles from './priceCalculator.module.css';
import TextInput from '../inputs/TextInput';
import convertTranslation from '../../helpers/convertTranslation';
import Select from '../inputs/Select';
import Button from '../buttons/Button';
import useGetPrice from '../../hooks/useGetPrice';
import ButtonsGroup from '../ButtonsGroup';
import Checkbox from '../inputs/Checkbox';
import NumberBlock from '../inputs/NumberBlock';
import Image from '../Image'
import useValidateCoupon from '../../hooks/useValidateCoupon';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import FortyOffer from '../FortyOffer';

const PriceCalculator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { fetch, data, loading } = useGetPrice();
  const { data: appData } = useAppContext();
  const { fetch: validateCoupon, data: validateCouponData } = useValidateCoupon();
  const [isHaveYard, setIsHaveYard] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCodeValue, setPromoCodeValue] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState({
    name: 'condo',
    value: convertTranslation(appData?.pagesBlock)?.price_block?.condo,
  });
  const [discountPrice, setDiscountPrice] = useState(0);
  const location = useLocation();
  const { hash } = location;

  useEffect(() => {
    if (hash === '#calculator') {
      setTimeout(() => {
        const element = document.getElementById('calculator');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  
    const handleHashChange = () => {
      const element = document.getElementById('calculator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
  
    window.addEventListener('hashchange', handleHashChange);
  
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [hash]);

  useEffect(() => {
    const promoCode = searchParams.get('promo');
    const promoCodeFromLocalStorage = localStorage.getItem('promo');

    if (promoCode || promoCodeFromLocalStorage) {
      setPromoCodeValue(promoCode || promoCodeFromLocalStorage);
      setShowPromoInput(false);
      const couponCode = promoCode?.toLowerCase() || promoCodeFromLocalStorage?.toLowerCase() || '';
      validateCoupon(couponCode);
    }
  }, [searchParams]);

  const formik = useFormik({
    initialValues: {
      numberOfBedrooms: 1,
      numberOfBathrooms: 1,
      numberOfKitchens: 1,
      dens: 0,
      square: 0,
      floors: 1,
      isHaveYard: isHaveYard ? 1 : 0,
    },
    validationSchema: priceCalculatorSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const { numberOfBedrooms, numberOfBathrooms, numberOfKitchens, dens, square, floors } = values;
      const formData = {
        numberOfBedrooms,
        numberOfBathrooms,
        numberOfKitchens,
        dens,
        square,
        floors,
        isHaveYard: isHaveYard ? 1 : 0,
        propertyType: selectedItem.name,
        unit: 'imperial',
        promoCode: promoCodeValue || '',
      }

      fetch(formData);
    },
  });

  useEffect(() => {
    if (data) {
      if (Boolean(validateCouponData?.discountValue)) {
        setDiscountPrice(Number((data.original_price * (1 - validateCouponData?.discountValue / 100)).toFixed(2)));
      } else {
        setDiscountPrice(Number((data.original_price).toFixed(2)));
      }
    }
  }, [data, validateCouponData]);

  return (
    <>
      {promoCodeValue?.toLowerCase() === 'toronto40streak' && <FortyOffer />}
      <div className={styles.wrapper} id="calculator">
        {Boolean(validateCouponData?.discountValue) ? (
          <>
            <div className={classnames('h1', styles.title)}>
              <span className={styles.titleDiscount}>{`${validateCouponData?.discountValue}% ${convertTranslation(appData?.pagesBlock)?.price_block?.title_1}`}</span>
              &nbsp;
              <span>{convertTranslation(appData?.pagesBlock)?.price_block?.title_2}</span>
            </div>
            <div className={styles.subtitle}>{convertTranslation(appData?.pagesBlock)?.price_block?.subtitle}</div>
          </>
        ) : (
          <>
            <div className={classnames('h1', styles.title)}>
              {convertTranslation(appData?.pagesBlock)?.price_block?.no_promo_title}
            </div>
            <div className={styles.subtitle}>{convertTranslation(appData?.pagesBlock)?.price_block?.no_promo_subtitle}</div>
          </>
        )}
        <div className={styles.wrapperIn}>
          <div className={styles.container}>
            <div className={styles.formContainer}>
              <div className={styles.form}>
                {Boolean(validateCouponData?.discountValue) ? (
                  <div className={styles.formTitle}>
                    <span>{convertTranslation(appData?.pagesBlock)?.price_block?.form_title_1}</span>
                    &nbsp;
                    <span className={styles.formTitleDiscount}>{convertTranslation(appData?.pagesBlock)?.price_block?.form_title_2} {validateCouponData?.discountValue}%</span>
                  </div>
                ) : (
                  <div className={styles.formTitle}>
                    <span>{convertTranslation(appData?.pagesBlock)?.price_block?.no_promo_form_title}</span>
                  </div>
                )}
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className={styles.formContainerFlex}>
                    <div className={styles.inputWrapper}>
                      <Select
                        name="propertyType"
                        list={[{
                          name: 'condo',
                          value: convertTranslation(appData?.pagesBlock)?.price_block?.condo,
                        }, {
                          name: 'house',
                          value: convertTranslation(appData?.pagesBlock)?.price_block?.house,
                        }, {
                          name: 'apartment',
                          value: convertTranslation(appData?.pagesBlock)?.price_block?.apartment,
                        }]}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        errors={[]}
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.property_type}
                        value={selectedItem.value}
                      />
                    </div>
                    <div className={styles.inputWrapper}>
                      <TextInput
                        value={formik.values.square.toString()}
                        onChange={(e) => {
                          formik.setFieldError(e.target.name, '');
                          formik.handleChange(e);
                        }}
                        error={formik.errors.square || null}
                        type="number"
                        name="square"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.square_feet}
                      />
                    </div>
                  </div>
                  <div className={styles.formContainerFlex}>
                    <div className={styles.inputWrapper}>
                      <NumberBlock
                        value={formik.values.numberOfBedrooms.toString()}
                        onChange={formik.handleChange}
                        error={formik.errors.numberOfBedrooms || null}
                        name="numberOfBedrooms"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.bedrooms}
                        minValue={0}
                      />
                    </div>
                    <div className={styles.inputWrapper}>
                      <NumberBlock
                        value={formik.values.numberOfBathrooms.toString()}
                        onChange={formik.handleChange}
                        error={formik.errors.numberOfBathrooms || null}
                        name="numberOfBathrooms"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.bathrooms}
                        minValue={1}
                      />
                    </div>
                  </div>
                  <div className={styles.formContainerFlex}>
                    <div className={styles.inputWrapper}>
                      <NumberBlock
                        value={formik.values.numberOfKitchens.toString()}
                        onChange={formik.handleChange}
                        error={formik.errors.numberOfKitchens || null}
                        name="numberOfKitchens"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.kitchens}
                        minValue={1}
                      />
                    </div>
                    <div className={styles.inputWrapper}>
                      <NumberBlock
                        value={formik.values.dens.toString()}
                        onChange={formik.handleChange}
                        error={formik.errors.dens || null}
                        name="dens"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.dens}
                        minValue={0}
                      />
                    </div>
                  </div>
                  <div className={classnames(styles.inputWrapper, styles.lastInputWrapper)}>
                    <NumberBlock
                      value={formik.values.floors.toString()}
                      onChange={formik.handleChange}
                      error={formik.errors.floors || null}
                      name="floors"
                      placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.floors}
                      minValue={1}
                    />
                  </div>
                  <div className={classnames(styles.inputWrapper, styles.checkboxWrapper)}>
                    <Checkbox
                      text={convertTranslation(appData?.pagesBlock)?.price_block?.backyard}
                      errors={[]}
                      checked={isHaveYard}
                      onChange={() => setIsHaveYard(!isHaveYard)}
                    />
                  </div>
                  <div className={classnames(styles.inputWrapper, styles.buttonWrapper)}>
                    <Button
                      disabled={loading}
                      loading={loading}
                      type="submit"
                      text={convertTranslation(appData?.pagesBlock)?.price_block?.get_my_estimate}
                      fullWidthMobile
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.priceContainerIn}>
                <div className={classnames(styles.priceTitle)}>{convertTranslation(appData?.pagesBlock)?.price_block?.your_quote}</div>
                {Boolean(validateCouponData?.discountValue) && (
                  <div className={styles.priceRow}>
                    <div className={styles.priceRowIn}>
                      <div className={classnames(styles.priceText)}>{convertTranslation(appData?.pagesBlock)?.price_block?.original}</div>
                      <div className={classnames(styles.priceValue)}>
                        ${data?.original_price ? data?.original_price.toFixed(2) : 0}
                      </div>
                    </div>
                  </div>
                )}
                <div className={styles.priceRow}>
                  {Boolean(validateCouponData?.discountValue) ? (
                    <div className={classnames(styles.priceRowIn, styles.promoRow)}>
                      <div className={styles.promoTitle}>
                        <div className={classnames(styles.priceText)}>
                          {convertTranslation(appData?.pagesBlock)?.price_block?.promo_code_applied}
                        </div>
                        <Image
                          src="/icons/check-circle.svg"
                          alt={`Check Icon`}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className={classnames(styles.priceValue, styles.discountPriceValue)}>
                        {validateCouponData?.discountValue}%
                      </div>
                    </div>
                  ) : (
                    <div className={classnames(styles.priceRowIn, styles.promoRow)}>
                      <div className={styles.promoTitle}>
                        <div className={classnames(styles.priceText)}>
                          {convertTranslation(appData?.pagesBlock)?.price_block?.promo_code}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={styles.promoCodeRow}>
                    {/* <div className={styles.promoCodeText}>mono15</div> */}
                    <input
                      type="text"
                      name="promoCode"
                      readOnly={!showPromoInput}
                      placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.enter_promo_code}
                      onChange={(e) => setPromoCodeValue(e.target.value)}
                      value={promoCodeValue || ''}
                      className={classnames(styles.input, !showPromoInput && styles.inputInactive)}
                    />
                    <button type="button" className={styles.promoCodeButton} onClick={() => {
                      if (showPromoInput) {
                        if (promoCodeValue) {
                          validateCoupon(promoCodeValue || '');
                        }
                        setShowPromoInput(false);
                      } else {
                        setShowPromoInput(true);
                      }
                    }}>
                      {showPromoInput ? convertTranslation(appData?.pagesBlock)?.price_block?.apply : convertTranslation(appData?.pagesBlock)?.price_block?.change}
                    </button>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <div className={styles.priceRowIn}>
                    <div className={classnames(styles.priceText)}>
                      {Boolean(validateCouponData?.discountValue) ? (
                        <>
                          {convertTranslation(appData?.pagesBlock)?.price_block?.today_only}
                        </>
                      ) : (
                        <>
                          {convertTranslation(appData?.pagesBlock)?.price_block?.total}
                        </>
                      )}
                    </div>
                    <div className={classnames(styles.priceValue, styles.discountPriceValue)}>
                      ${discountPrice ? discountPrice.toFixed(2) : 0}
                    </div>
                  </div>
                </div>
                <div className={styles.downloadContainer}>
                  <div className={classnames(styles.downloadTitle, 'h3')}>
                    {convertTranslation(appData?.pagesBlock)?.price_block?.download_the_app_and_book_now}
                  </div>
                  <ButtonsGroup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceCalculator;
