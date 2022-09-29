import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputText = document.querySelector('#search-box');
const countryListElement = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputText.addEventListener('input', debounce(inputContent, DEBOUNCE_DELAY));
function inputContent() {
  const textCountryInput = inputText.value.trim();
  if (textCountryInput === '') {
    countryListElement.textContent = '';
    countryInfo.textContent = '';
  }

  fetchCountries(textCountryInput)
    .then(auditCountry)
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function auditCountry(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (countries.length >= 2 && countries.length <= 10) {
    countryList(countries);
    countryInfo.textContent = '';
    return;
  } else if (countries.length === 0) {
    Notify.failure('Oops, there is no country with that name')
  } else {
  countryInfoElement(countries);
  countryListElement.textContent = '';
  }

}

function countryList(country) {
  const markup = country.map(
    ({ flags, name }) =>
      ` <li><img src = "${flags.svg}" alt = "${name.official}" width="50"/>
   <h2>${name.official}</h2> </li>`
  );

  countryListElement.insertAdjacentHTML('afterbegin', markup.join(''));
}
function countryInfoElement(country) {
  const markup = country.map(
    ({
      name,
      capital,
      population,
      flags,
      languages,
    }) => `<img src = "${flags.svg}" alt = "${name.official}" width="80"/>
   <h2>${name.official}</h2> 
   <p>Capital: <span>${capital}</span></p>
      <p>Population: <span>${population} </span></p>
         <p>Languages: <span>${Object.values(languages)}</span></p>
   `
  );
  countryInfo.insertAdjacentHTML('afterbegin', markup.join(''));
}
