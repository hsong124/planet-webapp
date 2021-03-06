import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import countriesData from '../../../../../utils/countryCurrency/countriesData.json';
import {
  getCountryDataBy,
  sortCountriesByTranslation,
} from '../../../../../utils/countryCurrency/countryUtils';
import { ThemeContext } from '../../../../../theme/themeContext';
import GreenRadio from '../../../../common/InputTypes/GreenRadio';
import i18next from '../../../../../../i18n';
let styles = require('./../../styles/SelectCurrencyModal.module.scss');

const { useTranslation } = i18next;
export default function TransitionsModal(props: any) {
  const {
    openModal,
    handleModalClose,
    setCurrency,
    setCountry,
    currency,
    country,
  } = props;

  const { t } = useTranslation(['donate', 'common', 'country']);

  //   const [selectedModalCurrency, setSelectedModalCurrency] = useState(currency)
  const [selectedModalValue, setSelectedModalValue] = useState(
    `${country},${currency}`
  );

  const { theme } = React.useContext(ThemeContext);

  // changes the currency in when a currency is selected
  const handleCurrencyChange = (event: any) => {
    setSelectedModalValue(event.target.value);
  };

  const [importantList, setImportantList] = React.useState<Array<Object>>([]);

  React.useEffect(() => {
    // sets two default country as important country which is US(United States)
    // and DE (Germany)
    let impCountryList = [
      getCountryDataBy('countryCode', 'US'),
      getCountryDataBy('countryCode', 'DE'),
    ];

    // if the selected country is other than US and DE then add that country to important country list
    if (country != 'US' && country != 'DE') {
      impCountryList.push(getCountryDataBy('countryCode', country));
    }

    // adds the important country list to state
    setImportantList(impCountryList);
    setSelectedModalValue(`${country},${currency}`);
  }, [currency]);

  // changes the language and currency code in footer state and local storage
  // when user clicks on OK
  function handleOKClick() {
    const selectedInfo = selectedModalValue.split(',');
    setCurrency(selectedInfo[1]);
    setCountry(selectedInfo[0]);
    handleModalClose();
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modalContainer + ' ' + theme}
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={styles.modal}>
            <div className={styles.radioButtonsContainer}>
              <p className={styles.sectionHead}>{t('donate:selectCurrency')}</p>
              {/* maps the radio button for currency */}
              <MapCurrency
                sortedCountriesData={importantList}
                // this is selectedValue, country wala object
                value={selectedModalValue}
                handleChange={handleCurrencyChange}
              />
              <hr style={{ margin: '0px 20px' }} />
              <MapCurrency
                // this is selectedValue, country wala object
                value={selectedModalValue}
                handleChange={handleCurrencyChange}
              />
            </div>

            {/* modal buttons */}
            <div className={styles.buttonContainer}>
              <div className={styles.button} onClick={handleModalClose}>
                <div></div>
                <p>{t('common:cancel')}</p>
              </div>
              <div className={styles.button} onClick={handleOKClick}>
                <div></div>
                <p>{t('common:ok')}</p>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const FormControlNew = withStyles({
  root: {
    width: '100%',
  },
})(FormControl);

// Maps the radio buttons for currency
function MapCurrency(props: any) {
  const { t, i18n } = useTranslation(['country']);
  
  const { value, handleChange } = props;
  const sortedCountriesData = sortCountriesByTranslation(t, i18n.language);
  return (
    <FormControlNew component="fieldset">
      <RadioGroup
        aria-label="language"
        name="language"
        value={value}
        onChange={handleChange}
        className={styles.currencyGrid}
      >
        {sortedCountriesData.map((country: any, index: number) => (
          <FormControlLabel
            key={country.countryCode + '-' + index}
            value={`${country.countryCode},${country.currencyCode}`} // need both info
            control={<GreenRadio />}
            label={t('country:' + country.countryCode.toLowerCase()) + ' · ' + country.countryCode}
          />
        ))}
      </RadioGroup>
    </FormControlNew>
  );
}
