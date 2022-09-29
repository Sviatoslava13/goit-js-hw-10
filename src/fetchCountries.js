
export function fetchCountries(name) {
     const information ='?fields=name,capital,population,flags,languages';
 
     return fetch(`https://restcountries.com/v3.1/name/${name}${information}`).then(
    (response) => {
         if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return response.json();
    }
    );
  
}
