const url = 'https://api.openweathermap.org/data/2.5/';
const units = 'metric';
const lang = 'tr';
// Create a config js then add gitignore
const key = config.api_key;

const setQuery = (e) => {
    if(e.keyCode == '13')
    {
        getResult(searchBar.value);
    }
}

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=${units}&lang=${lang}`;
    fetch(query)
    .then(response => {
        if (!response.ok) {
            throw new Error('Şehir Bulunamadı');
        } else {
            return response.json();
        }
      })
    .then(displayResult)      
    .catch(e => {
        alert(e.message);
    });      
}

const displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector('.desc');
    desc.innerText = `${result.weather[0].description}`;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;   
}

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress',setQuery);