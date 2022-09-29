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
  clearCountryRender();
  if (textCountryInput !== '') {
    fetchCountries(textCountryInput).then(auditCountry);
  }
}

function clearCountryRender() {
  countryListElement.textContent = '';
  countryInfo.textContent = '';
}
function auditCountry(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (countries.length >= 2 && countries.length <= 10) {
    countryList(countries);

    return;
  } else if (countries.length === 0) {
    Notify.failure('Oops, there is no country with that name');
  } else {
    countryInfoElement(countries);
  }
}

function countryList(country) {
  const markup = country.map(
    ({ flags, name }) =>
      ` <li class = "country__item" style = "display:flex;"><img class = "country-img" src = "${flags.svg}" alt = "${name.official}" width="50"style = "margin-right: 10px"/>
   <h2 class = "country-title">${name.official}</h2> </li>`
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
    }) => `<img class = "country-img" src = "${flags.svg}" alt = "${
      name.official
    }" width="30"/>
   <h2 class = "country-title" style = "display: inline-grid;">${
     name.official
   }</h2> 
   <p class ="country-text" style ="font-size: 1.5em; font-weight: bold; margin-top: 0;">Capital: <span class ="country-info" style ='font-weight: 200'>${capital}</span></p>
      <p class ="country-text"  style ="font-size: 1.5em; font-weight: bold; margin-top: 0;">Population: <span class ="country-info" style ='font-weight: 200'>${population} </span></p>
         <p class ="country-text"  style ="font-size: 1.5em; font-weight: bold; margin-top: 0;">Languages: <span class ="country-info" style ='font-weight: 200'>${Object.values(
           languages
         )}</span></p>
   `
  );
  countryInfo.insertAdjacentHTML('afterbegin', markup.join(''));
}
