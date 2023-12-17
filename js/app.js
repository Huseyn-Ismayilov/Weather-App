
const button = document.querySelector('.get_button')
const city = document.querySelector('#cityInput')
const dateContiner = document.querySelector(".date_continer")
const weatherContainer = document.querySelector(".weather_container")
const todayInfo = document.querySelector(".today_info")
const infoSide = document.querySelector(".info_side")
const weekList = document.querySelector(".week_list")


// Sehife acilanda functionun default deger ile islemesi ucun
window.addEventListener('load', () => {
    getWeather()
});

button.addEventListener("click", getWeather)

async function getWeather() {

    const cityName = city.value || 'Baku';
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3d82fd6a15mshaf975b91a9e9caap16af6djsn72bdec9b9194',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options)
        const data = await response.json()

        // Left side date container 
        dateContiner.innerHTML = `
            <h2 class="current_day"></h2>
            <span class="date">${data.forecast.forecastday[0].date}</span>
            <div class="location">
                <img src="./images/location-icon.svg" alt="">
                ${data.location.name}, ${data.location.country} 
            </div>
        `
        // Left side weather container
        weatherContainer.innerHTML = `
            <div class="icon">
                <img src="${data.current.condition.icon}" width="90" alt="">
            </div>
            <h1 class="temp">${parseInt(data.current.temp_f)} °C</h1>
            <h3 class="desc">${data.current.condition.text}</h3>
        `
        // today info
        todayInfo.innerHTML = `
            <div>
                <span class="title"></span>
                <span></span>
            </div>
        `
        todayInfo
        console.log(data);
    } catch (error) {
        console.error(error);
        alert("Axtardığınız məlumat tapila bilinmədi")
    }
}

