import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import TextInput from '../inputs/TextInput';
import convertTranslation from '../../helpers/convertTranslation';
import Select from '../inputs/Select';
import Image from '../Image'
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import useGetCheapPriceWithoutSquare from '../../hooks/useGetCheapPriceWithoutSquare';
import debounce from 'lodash.debounce';
import AddressAutocomplete, { AddressAutocompleteValue } from 'mui-address-autocomplete';
import Button from '../buttons/Button';
import DatePicker from 'react-datepicker';
import useCreateCheapPaymentIntent from '../../hooks/useCreateCheapPaymentIntent';
import "react-datepicker/dist/react-datepicker.css";
import WhatIncluded from '../dialogs/WhatIncluded';
import { useMask } from "@react-input/mask";
import styles from './pricePreOrder.module.css';
import { isSameDay, maxSelectableTime, minSelectableTime, startOfToday } from '../../helpers/timeRange';
import OrderSuccess from '../dialogs/OrderSuccess';

declare const fbq: (event: string, action: string, params?: Record<string, any>) => void;

const PricePreOrder: React.FC = () => {
  const { fetch, data } = useGetCheapPriceWithoutSquare();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const { fetch: createPaymentIntent, isOk, setIsOk, loading: paymentIntentLoading } = useCreateCheapPaymentIntent();
  const { data: appData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [numberOfBedrooms, setNumberOfBedrooms] = useState(1);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState(1);
  const [dens, setDens] = useState(0);
  const [changeCounter, setChangeCounter] = useState(0);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.home;
  const priceBlockTranslations = convertTranslation(appData?.pagesBlock)?.price_block;
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('12:00');
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);
    return tomorrow;
  });
  const [accessInstructions, setAccessInstructions] = useState('');
  const [address, setAddress] = useState<AddressAutocompleteValue | null>(null);
  const [selectedItem, setSelectedItem] = useState({
    name: 'condo',
    value: 'Condo',
  });
  const [selectedFrequency, setSelectedFrequency] = useState({
    name: 'one-time',
    value: 'One Time',
    offer: 20,
  });
  const [discountPrice, setDiscountPrice] = useState(0);
  const location = useLocation();
  const { hash } = location;

  function convertMinutesToHours(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

  useEffect(() => {
    if (isOk) {
      setDialogOpen(true);
    }
  }, [isOk]);

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

  const debouncedFetch = useMemo(
    () => debounce((values: any) => {
      fetch({
        ...values,
        propertyType: selectedItem.name,
        unit: 'imperial',
      }, changeCounter > 0);
    }, 500),
    [fetch, changeCounter]
  );

  useEffect(() => {
    setChangeCounter(changeCounter + 1);
    debouncedFetch({
      numberOfBedrooms,
      numberOfBathrooms,
      fullName,
      dens,
      propertyType: selectedItem.name,
      unit: 'imperial',
      promoCode: '',
    });
  }, [numberOfBedrooms, numberOfBathrooms, dens, selectedItem, fullName]);

  useEffect(() => {
    if (data) {
      // if (Boolean(validateCouponData?.discountValue)) {
      //   setDiscountPrice(Number((data.total_price * (1 - validateCouponData?.discountValue / 100)).toFixed(2)));
      // } else {
      // }
      setDiscountPrice(Number((data.original_price * 0.8).toFixed(2)));
    }
  }, [data]);

  const phoneRef = useMask({
    mask: '+1 (___) _______',
    replacement: { _: /\d/ },
    showMask: true,
  });

  const minTimeAllowed = minSelectableTime(startDate);
  const maxTimeAllowed = minTimeAllowed ? maxSelectableTime(startDate) : undefined;

  if (!pageTranslations || !priceBlockTranslations) return null;

  return (
    <>
      <div className={styles.wrapper} id="calculator">
        <div className={styles.wrapperContainer}>
          <div className={styles.checkoutTitle}>
            <Image
              src="/landings/icons/stars.svg"
              alt="Logo"
              width={42}
              height={42}
            />&nbsp;
            Lock in Your&nbsp;
            <span>Exclusive 20% Savings</span>
          </div>
          <div className={styles.wrapperIn}>
            <div className={styles.container}>
              <div className={styles.stepsContainer}>
                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Image
                      className={styles.stepIconImage}
                      src="/landings/icons/checkout-step1.svg"
                      alt="Logo"
                      width={38}
                      height={38}
                    />
                  </div>
                  <div>
                    <div className={styles.stepTitle}>Tell us about your home</div>
                    <div className={styles.stepText}>Condo or house, 1-5 beds.</div>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepIcon}>
                    <Image
                      className={styles.stepIconImage}
                      src="/landings/icons/checkout-step2.svg"
                      alt="Logo"
                      width={38}
                      height={38}
                    />
                  </div>
                  <div>
                    <div className={styles.stepTitle}>Pick a time</div>
                    <div className={styles.stepText}>Same-day or whenever suits you.</div>
                  </div>
                </div>
                <div className={styles.step} id="price-container">
                  <div className={styles.stepIcon}>
                    <Image
                      className={styles.stepIconImage}
                      src="/landings/icons/checkout-step3.svg"
                      alt="Logo"
                      width={38}
                      height={38}
                    />
                  </div>
                  <div>
                    <div className={styles.stepTitle}>Relax</div>
                    <div className={styles.stepText}>Our vetted cleaner uses the products you already trust - come home to sparkle!</div>
                  </div>
                </div>
              </div>
              <div className={styles.priceContainer}>
                <div className={styles.priceContainerIn}>
                  {orderStep === 1 ? (
                    <>
                      <form noValidate>
                        <div className={styles.formContainerFlex}>
                          <div className={styles.inputWrapper}>
                            <Select
                              animatedLabel={false}
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
                            <Select
                              animatedLabel={false}
                              name="dens"
                              list={[
                              {
                                name: '0',
                                value: '0',
                              }, {
                                name: '1',
                                value: '1',
                              }, {
                                name: '2',
                                value: '2',
                              }, {
                                name: '3',
                                value: '3',
                              }, {
                                name: '4',
                                value: '4',
                              }, {
                                name: '5',
                                value: '5',
                              }]}
                              selectedItem={{
                                name: String(dens),
                                value: String(dens),
                              }}
                              setSelectedItem={(value) => {
                                setDens(Number(value.value));
                              }}
                              errors={[]}
                              placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.dens}
                              value={dens.toString()}
                            />
                          </div>
                        </div>
                        <div className={styles.formContainerFlex}>
                          <div className={styles.inputWrapper}>
                            {/* <NumberBlock
                              value={numberOfBedrooms.toString()}
                              onChange={(e) => {
                                setNumberOfBedrooms(Number(e.target.value));
                              }}
                              error={null}
                              name="numberOfBedrooms"
                              placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.bedrooms}
                              minValue={0}
                            /> */}
                            <Select
                              animatedLabel={false}
                              name="numberOfBedrooms"
                              list={[
                              {
                                name: '0',
                                value: '0',
                              }, {
                                name: '1',
                                value: '1',
                              }, {
                                name: '2',
                                value: '2',
                              }, {
                                name: '3',
                                value: '3',
                              }, {
                                name: '4',
                                value: '4',
                              }, {
                                name: '5',
                                value: '5',
                              }]}
                              selectedItem={{
                                name: String(numberOfBedrooms),
                                value: String(numberOfBedrooms),
                              }}
                              setSelectedItem={(value) => {
                                setNumberOfBedrooms(Number(value.value));
                              }}
                              errors={[]}
                              placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.bedrooms}
                              value={numberOfBedrooms.toString()}
                            />
                          </div>
                          <div className={styles.inputWrapper}>
                            <Select
                              animatedLabel={false}
                              name="numberOfBathrooms"
                              list={[
                                {
                                  name: '1',
                                  value: '1',
                                }, {
                                  name: '2',
                                  value: '2',
                                }, {
                                  name: '3',
                                  value: '3',
                                }, {
                                  name: '4',
                                  value: '4',
                                }, {
                                  name: '5',
                                  value: '5',
                                }]}
                              selectedItem={{
                                name: String(numberOfBathrooms),
                                value: String(numberOfBathrooms),
                              }}
                              setSelectedItem={(value) => {
                                setNumberOfBathrooms(Number(value.value));
                              }}
                              errors={[]}
                              placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.bathrooms}
                              value={numberOfBathrooms.toString()}
                            />
                          </div>
                        </div>
                        {/* <div className={classnames(styles.inputWrapper, styles.checkboxWrapper, styles.checkboxWrapperCampaign)}>
                          <Checkbox
                            campaign
                            // text={convertTranslation(appData?.pagesBlock)?.price_block?.backyard}
                            text={<span className={styles.checkboxText}>
                              <b className={styles.checkboxTextBold}>Free</b> inside fridge cleaning
                            </span>}
                            errors={[]}
                            checked={isHaveYard}
                            onChange={() => setIsHaveYard(!isHaveYard)}
                          />
                          <span className={styles.checkboxOffer}>
                            for first cleaning
                          </span>
                        </div> */}
                      </form>
                      <div className={styles.priceSeparator} />
                      <ul className={styles.infoList}>
                        <li>
                          Estimated time: <span>{convertMinutesToHours(data?.estimated_time || 0)}</span>
                        </li>
                        <li>
                          Cleaner will use your household supplies
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className={styles.checkoutHeader}>
                        <button className={styles.checkoutHeaderBackButton} type="button" onClick={() => setOrderStep(1)}>
                          <Image
                            className={styles.checkoutHeaderIcon}
                            src="/landings/icons/arrow-left-circle.svg"
                            alt="Logo"
                            width={24}
                            height={24}
                          />
                        </button>
                        <div className={styles.checkoutHeaderContent}>
                          <div className={styles.checkoutHeaderTitle}>Checkout</div>
                          <div className={styles.checkoutHeaderSubtitle}>
                            {`${selectedItem.value} | ${numberOfBedrooms} bedrooms | ${numberOfBathrooms} bathrooms`}
                            {dens > 0 && ` | ${dens} dens`}
                          </div>
                        </div>
                      </div>
                      <form noValidate>
                        <div className={styles.formContainerFlex}>
                          <div className={classnames(styles.inputWrapper, styles.datePickerWrapper)}>
                            <div className={classnames('textM-500', styles.topHint)}>Preferred Date & Time</div>
                            <DatePicker
                              timeIntervals={30}
                              selected={startDate}
                              onChange={(date) => {
                                if (date) {
                                  const formattedDate = date.toISOString().split('T')[0]; // Gets YYYY-MM-DD
                                  const formattedTime = date.toTimeString().split(' ')[0]; // Gets HH:mm:ss
                                  setDate(formattedDate);
                                  setTime(formattedTime);
                                  setStartDate(date);
                                }
                              }}
                              filterDate={(d) => {
                                /* past days are already blocked by minDate – just check "today" */
                                if (isSameDay(d, new Date())) {
                                  return minSelectableTime(d) !== null;    /* today only if slots left */
                                }
                                return true;                               /* future days always ok */
                              }}
                              minDate={startOfToday()} 
                              minTime={minTimeAllowed ?? undefined}         /* always pass as a pair */
                              maxTime={maxTimeAllowed ?? undefined}

                              filterTime={(t) => {
                                if (!minTimeAllowed || !maxTimeAllowed) return false;
                                return t >= minTimeAllowed && t <= maxTimeAllowed;
                              }}
                              showTimeSelect
                              dateFormat="MMMM d, yyyy h:mm aa"
                              className={classnames('textM-500', styles.input)}
                              wrapperClassName={styles.datePickerWrapper}
                              onSelect={(date) => {
                                if (date) {
                                  setStartDate(date);
                                }
                              }}
                            />
                          </div>
                          {/* <div className={styles.inputWrapper}>
                            <TextInput
                              name="time"
                              placeholder="Enter time"
                              onChange={(e) => {
                                setTime(e.target.value);
                              }}
                              error={null}
                              value={time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                              type="time"
                            />
                          </div> */}
                        </div>
                        <div className={styles.formContainerFlex}>
                          <div className={styles.inputWrapper}>
                            <Select
                              animatedLabel={false}
                              name="frequency"
                              list={[{
                                name: 'one-time',
                                value: 'One Time',
                                offer: 20,
                              }, {
                                name: 'weekly',
                                value: 'Weekly',
                                offer: 35,
                              },
                              {
                                name: 'biweekly',
                                value: 'Biweekly',
                                offer: 30,
                              }, {
                                name: 'monthly',
                                value: 'Monthly',
                                offer: 25,
                              }]}
                              selectedItem={selectedFrequency}
                              setSelectedItem={(value) => {
                                setDiscountPrice(Number((data?.original_price * (1 - value.offer! / 100)).toFixed(2)));
                                setSelectedFrequency({
                                  name: value.name,
                                  value: value.value,
                                  offer: value.offer || 0,
                                });
                              }}
                              errors={[]}
                              placeholder={'Frequency'}
                              // placeholder={convertTranslation(appData?.pagesBlock)?.price_block?.frequency}
                              value={selectedFrequency.value}
                            />
                          </div>
                        </div>
                        <div className={styles.formContainerFlex}>
                          <div className={styles.inputWrapper}>
                            <div className={classnames('textM-500', styles.topHint)}>Address</div>
                            <AddressAutocomplete
                              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                              requestOptions={{
                                location: { lat: () => 43.6532, lng: () => -79.3832 },
                                radius: 50000,
                              }}
                              label="Select address"
                              onChange={(_, value) => {
                                setAddress(value || null);
                                setAddressError(null);
                              }}
                              value={address || null}
                              className={styles.addressAutocomplete}
                            />
                            {addressError ? (
                              <div className={classnames('textS-500', styles.errorMessage)}>{convertTranslation(appData?.strings).required}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className={styles.formContainerFlex}>
                          <div className={styles.inputWrapper}>
                            <TextInput
                              animatedLabel={false}
                              inputPlaceholder="John Doe"
                              name="fullName"
                              placeholder="Full Name"
                              onChange={(e) => {
                                setFullName(e.target.value);
                                setFullNameError(null);
                              }}
                              error={fullNameError}
                              value={fullName || ''}
                              type="text"
                            />
                          </div>
                        </div>
                        <div className={styles.formContainerFlex}>
                          <div className={styles.inputWrapper}>
                            <TextInput
                              animatedLabel={false}
                              name="accessInstructions"
                              placeholder="Access Instructions (optional)"
                              onChange={(e) => setAccessInstructions(e.target.value)}
                              error={null}
                              value={accessInstructions || ''}
                              type="text"
                            />
                          </div>
                        </div>
                        <div className={styles.formContainerFlex}>
                          <div className={styles.inputWrapper}>
                            <TextInput
                              inputPlaceholder="+1 (647) 123-4567"
                              animatedLabel={false}
                              name="phone"
                              placeholder="Phone"
                              onChange={(e) => {
                                setPhone(e.target.value);
                                setPhoneError(null);
                              }}
                              error={phoneError}
                              value={phone || ''}
                              type="tel"
                              inputRef={phoneRef}
                            />
                          </div>
                          <div className={styles.inputWrapper}>
                            <TextInput
                              inputPlaceholder="example@gmail.com"
                              animatedLabel={false}
                              name="email"
                              placeholder="Email"
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(null);
                              }}
                              error={emailError}
                              value={email || ''}
                              type="text"
                            />
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  <div className={styles.priceInfoContainer}>
                    <div className={styles.regularPriceText}>
                      {/* {convertTranslation(appData?.pagesBlock)?.price_block?.regular_price} */}
                      Regular Price:&nbsp;
                      <span className={classnames(styles.regularPriceValue)}>
                        ${data?.original_price ? (data?.original_price * 0.87).toFixed(2) : 0}
                      </span>
                    </div>
                    <div className={styles.discountPriceText}>
                        {/* {convertTranslation(appData?.pagesBlock)?.price_block?.today_only} */}
                      Your Discounted Price:
                      ${discountPrice ? (discountPrice * 0.87).toFixed(2) : 0}
                    </div>
                    <div className={styles.promoHint}>
                      (Includes 20% OFF Golden Mop Pass)
                    </div>
                    <Button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        backgroundColor: '#7C3AED',
                        color: '#fff',
                      }}
                      loading={paymentIntentLoading}
                      rightIcon="/landings/icons/arrow-right-small.svg"
                      text={orderStep === 1 ? 'Unlock 20% OFF' : 'Book Clean'}
                      onClick={() => {
                        if (orderStep === 1) {
                          if (window.innerWidth < 768) {
                            const element = document.getElementById('price-container');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                          setOrderStep(2);
                          fbq('track', 'Cleckout 1 step click preorder', {
                            content_name: 'Cleckout 1 step click preorder',
                            content_category: 'Cleckout 1 step click preorder',
                          });
                        } else {
                          fbq('track', 'Cleckout 2 step click preorder', {
                            content_name: 'Cleckout 2 step click preorder',
                            content_category: 'Cleckout 2 step click preorder',
                          });
                          const formData = {
                            numberOfBedrooms: numberOfBedrooms,
                            numberOfBathrooms: numberOfBathrooms,
                            propertyType: selectedItem.name,
                            dens,
                            date,
                            time,
                            frequency: selectedFrequency.value.toLowerCase(),
                            address: address?.description!,
                            phone,
                            email,
                            instructions: accessInstructions,
                          }

                          if (!phone || phone.length < 15 || !phone.match(/^\+1 \(\d{3}\) \d{7}$/)) {
                            setPhoneError('required');
                          }

                          if (!address?.description) {
                            setAddressError('required');
                          }

                          if (!fullName) {
                            setFullNameError('required');
                          }

                          if (!email || !emailRegex.test(email)) {
                            setEmailError('errors_valid_email');
                            return;
                          }

                          if (!date || !time || !phone || !email || phoneError || emailError || fullNameError || addressError || !fullName) {
                            return;
                          } else {
                            createPaymentIntent({
                              ...formData,
                              date,
                              time,
                              phone,
                              email,
                              fullName,
                            });
                          }
                        }
                      }}
                    />
                  </div>
                  <div>
                    <button type="button" className={styles.button} onClick={() => {
                      setIsOpen(true);
                      fbq('track', 'Whats included click', {
                        content_name: 'Whats included click preorder',
                        content_category: 'Whats included click preorder',
                      });
                    }}>
                      <Image
                        src="/landings/icons/question-circle.svg"
                        alt="Logo"
                        width={20}
                        height={20}
                      />
                      What's included in every clean?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderSuccess
        dialogOpen={dialogOpen}
        setDialogOpen={() => {
          setSelectedItem({
            name: 'condo',
            value: 'Condo',
          });
          setIsOk(false);
          setDialogOpen(false);
          setAddress(null);
          setPhone(null);
          setEmail(null);
          setFullName(null);
          setAccessInstructions('');
          setOrderStep(1);
          setNumberOfBedrooms(1);
          setNumberOfBathrooms(1);
          setDens(0);
          setDiscountPrice(0);
          setSelectedFrequency({
            name: 'one-time',
            value: 'One Time',
            offer: 20,
          });
        }}
      />
      <WhatIncluded
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
};

export default PricePreOrder;
