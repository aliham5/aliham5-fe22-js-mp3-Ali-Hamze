const rootUrl = "https://restcountries.com/v3.1/";
const contentElement = document.getElementById("content");
const searchInputElement = document.getElementById("search-input");
const searchButtonElement = document.getElementById("search-button");
let searchText = "";
const clear = document.getElementById("search-input");


function extractData(item) {
    return {
        name: item.name.common,
        subregion: item.subregion,
        capital: item.capital,
        population: item.population,
        flag: item.flags.png,
    }
}

async function searchByLanguage(text){
    
    const response = await fetch(rootUrl + "lang/" + text + "?fullText=false", {
        method: "GET"
    })

    
    const data = await response.json()

    const mapedData = data.map(extractData)
    return mapedData;
}

searchInputElement.addEventListener('change', event => {
    const value = event.target.value;
    searchText = value
})


function sortItems(itemA, itemB) {
    if (itemA.population < itemB.population) {
        return 1
    }
    else if (itemA.population > itemB.population) {
        return -1
    }
    else {
        return 0
    }
}

function itemToHtmlStr(item) {
    return `
    <div class="item">
        <p class="name">
            <span class = "title">Name</span>: ${item.name}
        </p>
        <p class="subregion">
            <span class = "title">Subregion</span>: ${item.subregion}
        </p>
        <p class="capital">
        <span class = "title">Capital</span>: ${item.capital}
        </p>
        <p class="population">
        <span class = "title">Population</span>: ${item.population}
        </p>
        <p class="flag">
        <span class = "title">Flag:</span><img src="${item.flag}"> 
        </p>
    </div>
    `
}

searchButtonElement.addEventListener("click", async () => {
    try {
        const data = await searchByLanguage(searchText)
        contentElement.innerHTML = 
        data
        .sort(sortItems)
        .map(itemToHtmlStr).join("")
    }
    catch {
        contentElement.innerHTML = `
            <div class="error">
                No languages found
            </div>
        `
    }
})

clear.addEventListener("click", ()=>{
    clear.value = "";
})