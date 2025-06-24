import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import styles from './priceCalculator.module.css';
import TextInput from '../inputs/TextInput';
import convertTranslation from '../../helpers/convertTranslation';
import Select from '../inputs/Select';
import useGetPrice from '../../hooks/useGetPrice';
import ButtonsGroup from '../ButtonsGroup';
import Checkbox from '../inputs/Checkbox';
import NumberBlock from '../inputs/NumberBlock';
import Image from '../Image'
import useValidateCoupon from '../../hooks/useValidateCoupon';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import debounce from 'lodash.debounce';
import FortyOffer from '../FortyOffer';

interface PriceCalculatorCampaignProps {
  shortMarginBottom?: boolean;
}

const PriceCalculatorCampaign: React.FC<PriceCalculatorCampaignProps> = ({ shortMarginBottom = false }) => {
  const [searchParams] = useSearchParams();
  const { fetch, data } = useGetPrice();
  const [squareError, setSquareError] = useState(false);
  const { data: appData } = useAppContext();
  const { fetch: validateCoupon, data: validateCouponData } = useValidateCoupon();
  const [isHaveYard, setIsHaveYard] = useState(false);
  const [numberOfBedrooms, setNumberOfBedrooms] = useState(1);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState(1);
  const [numberOfKitchens, setNumberOfKitchens] = useState(1);
  const [dens, setDens] = useState(0);
  const [square, setSquare] = useState(800);
  const [floors, setFloors] = useState(1);
  const [changeCounter, setChangeCounter] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCodeValue, setPromoCodeValue] = useState<string | null>(null);
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.home;

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

  const debouncedFetch = useMemo(
    () => debounce((values: any) => {
      fetch({
        ...values,
        isHaveYard: isHaveYard ? 1 : 0,
        propertyType: selectedItem.name,
        unit: 'imperial',
      }, changeCounter > 1);
    }, 500),
    [fetch, isHaveYard, selectedItem, changeCounter]
  );

  useEffect(() => {
    if (square <= 100) {
      setSquareError(true);
    } else {
      setSquareError(false);
    }
    if (square > 100) {
      setChangeCounter(changeCounter + 1);
      debouncedFetch({
        square,
        numberOfBedrooms,
        numberOfBathrooms,
        numberOfKitchens,
        dens,
        floors,
        isHaveYard: isHaveYard ? 1 : 0,
        propertyType: selectedItem.name,
        unit: 'imperial',
        promoCode: promoCodeValue || '',
      }); 
    }
  }, [square, numberOfBedrooms, numberOfBathrooms, numberOfKitchens, dens, floors, isHaveYard, selectedItem, promoCodeValue]);

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
        <div className={classnames('h1', styles.title)}>
          {pageTranslations.campaign_price_title}
        </div>
        <div className={classnames('h2', styles.title)}>
          {pageTranslations.campaign_price_title2}
        </div>
        <div className={classnames(styles.subtitle, styles.subtitleCampaign)}>{pageTranslations.campaign_price_subtitle}</div>
        <div className={styles.banner}>
          {Boolean(validateCouponData?.discountValue) && promoCodeValue?.toLowerCase() !== 'toronto40streak' && (
            <div className={styles.bannerIn}>
              <div className={styles.bannerLeftBlock}>
                <div className={styles.bannerLeftBlock}>
                  {`${validateCouponData?.discountValue}% ${pageTranslations.campaign_promo_off}`}
                </div>
              </div>
              <div className={styles.bannerRightBlock}>
                <div className={styles.bannerRightBlockText}>
                  {pageTranslations.campaign_ends_sunday}
                </div>
                <div className={styles.bannerRightBlockText}>
                  {pageTranslations.campaign_time}
                </div>
              </div>
            </div>
          )}
          <div className={classnames(styles.bannerRating, (!Boolean(validateCouponData?.discountValue) || searchParams.get('promo')?.toLowerCase() === 'toronto40streak') && styles.bannerRatingCentered)}>
            <div className={styles.bannerRatingStars}>
              <Image
                src="/icons/star.svg"
                alt={`Star Icon`}
                width={24}
                height={24}
              />
              <Image
                src="/icons/star.svg"
                alt={`Star Icon`}
                width={24}
                height={24}
              />
              <Image
                src="/icons/star.svg"
                alt={`Star Icon`}
                width={24}
                height={24}
              />
              <Image
                src="/icons/star.svg"
                alt={`Star Icon`}
                width={24}
                height={24}
              />
              <Image
                src="/icons/star.svg"
                alt={`Star Icon`}
                width={24}
                height={24}
              />
            </div>
            <div className={classnames(styles.bannerRatingText, Boolean(validateCouponData?.discountValue) &&styles.bannerRatingTextCampaign)}>
              {pageTranslations.campaign_rating_text}
            </div>
          </div>
        </div>
        <div className={styles.wrapperIn}>
          <div className={styles.container}>
            <div className={styles.formContainer}>
              <div className={classnames(styles.form, styles.formCampaign)}>
                <div className={classnames(styles.formTitle, styles.formTitleCampaign)}>
                  <span>{pageTranslations.campaign_book_today}</span>
                </div>
                <form noValidate>
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
                        value={square.toString()}
                        onChange={(e) => {
                          setSquare(Number(e.target.value));
                        }}
                        error={squareError ? 'errors_min_square' : null}
                        type="number"
                        name="square"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.square_feet}
                      />
                    </div>
                  </div>
                  <div className={styles.formContainerFlex}>
                    <div className={styles.inputWrapper}>
                      <NumberBlock
                        value={numberOfBedrooms.toString()}
                        onChange={(e) => {
                          setNumberOfBedrooms(Number(e.target.value));
                        }}
                        error={null}
                        name="numberOfBedrooms"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.bedrooms}
                        minValue={0}
                      />
                    </div>
                    <div className={styles.inputWrapper}>
                      <NumberBlock
                        value={numberOfBathrooms.toString()}
                        onChange={(e) => {
                          setNumberOfBathrooms(Number(e.target.value));
                        }}
                        error={null}
                        name="numberOfBathrooms"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.bathrooms}
                        minValue={1}
                      />
                    </div>
                  </div>
                  <div className={styles.formContainerFlex}>
                    <div className={styles.inputWrapper}>
                      <NumberBlock
                        value={numberOfKitchens.toString()}
                        onChange={(e) => {
                          setNumberOfKitchens(Number(e.target.value));
                        }}
                        error={null}
                        name="numberOfKitchens"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.kitchens}
                        minValue={1}
                      />
                    </div>
                    <div className={styles.inputWrapper}>
                      <NumberBlock
                        value={dens.toString()}
                        onChange={(e) => {
                          setDens(Number(e.target.value));
                        }}
                        error={null}
                        name="dens"
                        placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.dens}
                        minValue={0}
                      />
                    </div>
                  </div>
                  <div className={classnames(styles.inputWrapper, styles.lastInputWrapper)}>
                    <NumberBlock
                      value={floors.toString()}
                      onChange={(e) => {
                        setFloors(Number(e.target.value));
                      }}
                      error={null}
                      name="floors"
                      placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.floors}
                      minValue={1}
                    />
                  </div>
                  <div className={classnames(styles.inputWrapper, styles.checkboxWrapper, styles.checkboxWrapperCampaign)}>
                    <Checkbox
                      text={convertTranslation(appData?.pagesBlock)?.price_block?.backyard}
                      errors={[]}
                      checked={isHaveYard}
                      onChange={() => setIsHaveYard(!isHaveYard)}
                    />
                  </div>
                </form>
                {changeCounter < 2 && (
                  <div className={styles.campaignEditAnytime}>
                    {pageTranslations.campaign_edit_anytime}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.priceContainer}>
              <div className={styles.priceContainerIn}>
                <div className={classnames(styles.priceTitle, styles.priceTitleCampaign)}>{convertTranslation(appData?.pagesBlock)?.price_block?.your_quote}</div>
                {Boolean(validateCouponData?.discountValue) && (
                  <div className={classnames(styles.priceRow, styles.priceRowCampaign)}>
                    <div className={styles.priceRowIn}>
                      <div className={classnames(styles.priceText)}>{convertTranslation(appData?.pagesBlock)?.price_block?.original}</div>
                      <div className={classnames(styles.priceValue)}>
                        ${data?.original_price ? data?.original_price.toFixed(2) : 0}
                      </div>
                    </div>
                  </div>
                )}
                <div className={classnames(styles.priceRow, styles.priceRowCampaign)}>
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
                <div className={classnames(styles.priceRow, styles.priceRowCampaign)}>
                  <div className={styles.priceRowIn}>
                    <div className={classnames(styles.priceText)}>
                      {convertTranslation(appData?.pagesBlock)?.price_block?.today_only}
                    </div>
                    <div className={classnames(styles.priceValue, styles.discountPriceValue)}>
                      ${discountPrice ? discountPrice.toFixed(2) : 0}
                    </div>
                  </div>
                </div>
                <div className={classnames(styles.downloadContainer, styles.downloadContainerCampaign, changeCounter < 2 && styles.downloadContainerCampaignSpace)}>
                  <div className={classnames(styles.downloadTitle, 'h3', styles.downloadTitleCampaign)}>
                    {convertTranslation(appData?.pagesBlock)?.price_block?.download_the_app_and_book_now}
                  </div>
                  <ButtonsGroup />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.campaignHint}>
          {pageTranslations.campaign_transparent_pricing}
          &nbsp;•&nbsp;
          {pageTranslations.campaign_60_sec_booking}
          &nbsp;•&nbsp;
          {pageTranslations.campaign_no_hidden_fees} 
        </div>
        <div className={classnames(styles.campaignHint2, shortMarginBottom && styles.campaignHint2Short)}>
          {pageTranslations.campaign_insured_local_cleaners} 
        </div>
      </div>
    </>
  );
};

export default PriceCalculatorCampaign;
