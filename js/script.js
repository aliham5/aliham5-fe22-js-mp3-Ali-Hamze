function fetchLanguage(all) {
    const url = `https://restcountries.com/v3.1/lang/${all}`

    console.log(url);

    fetch(url)
        .then(
            function (response) {
                console.log(response.status);
                return response.json();
            }
        )
        .then(Info)
        .catch(pError);
}

const btn = document.querySelector('#button');
btn.addEventListener('click', searchLanguage);

function searchLanguage(event) {
    event.preventDefault();

    const inputLanguage = document.querySelector('#language-input');

    const language = inputLanguage.value;
    inputLanguage.value = '';
    console.log(language);

    fetchLanguage(language);
}
function pError() {
    const errorP = document.querySelector('#error-message');
    errorP.innerText = 'inget hittad, sök igen!';
}


function Info(countrydata) {
    console.log(countrydata);
    document.querySelector('#content-container').innerHTML = '';

    countrydata.sort((objA, objB) => objB.population - objA.population); 

   

  
    for (let i = 0; i < countrydata.length; i++) {

        

        const countryName = document.createElement('h1');
        document.querySelector('#content-container').appendChild(countryName);
        countryName.src = countrydata[i].name.common;
        countryName.innerText = "Name: " + (countrydata[i].name.common);

        const countryCapital = document.createElement('h2');
        document.querySelector('#content-container').appendChild(countryCapital);
        countryCapital.src = countrydata[i].capital;
        countryCapital.innerText = "Capital: " + (countrydata[i].capital);

        const countrySubRegion = document.createElement('p');
        document.querySelector('#content-container').appendChild(countrySubRegion);
        countrySubRegion.src = countrydata[i].subregion;
        countrySubRegion.innerText = "Sub region: " + (countrydata[i].subregion);


        const countryPopulation = document.createElement('h3');
        document.querySelector('#content-container').appendChild(countryPopulation);
        countryPopulation.src = countrydata[i].population;
        countryPopulation.innerText = "Population: " + (countrydata[i].population);
        

        const countryFlag = document.createElement('img');
        document.querySelector('#content-container').appendChild(countryFlag);
        countryFlag.src = countrydata[i].flags.png;

      
        if(i === 0){     
        }
        else {};
    }


    document.querySelector('#error-message').innerHTML = '';

}
