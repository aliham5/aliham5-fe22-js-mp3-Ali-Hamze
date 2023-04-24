
const btn = document.querySelector('#button-enter');
btn.addEventListener('click', searchlang);
function searchlang(event) {
    event.preventDefault();
    const input = document.querySelector('#language-input');
    const language = input.value;
    input.value = '';
    fetchlang(language);
}


function fetchlang(lingual) {
    const url = `https://restcountries.com/v3.1/lang/${lingual}`
    fetch(url)
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(displayInfo)
        .catch(handleError);
}
function handleError() {
    const errorP = document.querySelector('#error-message');
    errorP.innerText = 'boiii what are you typing, type a real language dumbass... ';
}


function displayInfo(countrydata) {
    console.log(countrydata);
    document.querySelector('#container').innerHTML = '';
    countrydata.sort((objA, objB) => objB.population - objA.population); 
    for (let i = 0; i < countrydata.length; i++) {

        
        const countryName = document.createElement('h1');
        document.querySelector('#container').appendChild(countryName);
        countryName.src = countrydata[i].name.common;
        countryName.innerText = "Name: " + (countrydata[i].name.common);

        const countryCapital = document.createElement('h2');
        document.querySelector('#container').appendChild(countryCapital);
        countryCapital.src = countrydata[i].capital;
        countryCapital.innerText = "Capital: " + (countrydata[i].capital);

        const countrySubRegion = document.createElement('p');
        document.querySelector('#container').appendChild(countrySubRegion);
        countrySubRegion.src = countrydata[i].subregion;
        countrySubRegion.innerText = "Sub-region: " + (countrydata[i].subregion);


        const countryPopulation = document.createElement('h3');
        document.querySelector('#container').appendChild(countryPopulation);
        countryPopulation.src = countrydata[i].population;
        countryPopulation.innerText = "Population: " + (countrydata[i].population);
        

        const countryFlag = document.createElement('img');
        document.querySelector('#container').appendChild(countryFlag);
        countryFlag.src = countrydata[i].flags.png;

      
        if(i === 0){
            countryPopulation.style.color = '#000000';
        }
        else {};
    }


    document.querySelector('#error-message').innerHTML = '';

}

