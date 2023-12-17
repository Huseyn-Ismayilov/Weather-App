
const button = document.querySelector('.get_button')
const city = document.querySelector('#cityInput')
const dateContiner = document.querySelector(".date_continer")
const weatherContainer = document.querySelector(".weather_container")
const todayInfo = document.querySelector(".today_info")
const infoSide = document.querySelector(".info_side")
const weekList = document.querySelector(".week_list")


// Sehife acilanda functionun default value ile islemesi ucun
window.addEventListener('load', () => {
    getWeather()
});

button.addEventListener("click", getWeather)

async function getWeather() {
    // sehife acilanda city nin value'su bos oldugu ucun default value gelecek 
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
            <h2 class="day_of_week">${dateToDayOfWeek(data.forecast.forecastday[0].date)}</h2>
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
            <h1 class="temp">${parseInt(data.current.temp_c)} °C</h1>
            <h3 class="desc">${data.current.condition.text}</h3>
        `
        console.log(data);
        // today info
        todayInfo.innerHTML = `
            <div>
                <span class="title">PRECIPITATION</span>
                <span>${data.current.precip_in}%</span>
            </div>
            <div>
                <span class="title">HUMIDITY</span>
                <span>${data.current.humidity}%</span>
            </div>
            <div>
                <span class="title">WIND</span>
                <span>${data.current.wind_mph} km/h</span>
            </div>
        `
        // heftenin diger gunleri 
        weekList.innerHTML = ""
        data.forecast.forecastday.forEach(item => {
            const weekItem = document.createElement("li")
            weekItem.classList.add('item')
            weekItem.innerHTML = `
                <img src="${item.day.condition.icon}" alt="">
                <span>${dateToDayOfWeek(item.date).slice(0, 3)}</span>
                <h4>${item.day.avgtemp_c}°C</h4>
            `
            console.log(item);
            weekList.appendChild(weekItem)
        })
        // Tarixi heftenin gunune cevirmek ucun
        // console.log(dateToDayOfWeek('2023-12-18'));

        function dateToDayOfWeek(day) {
            const date = new Date(day);
            const dayNumber = date.getDay();

            let dayOfWeek;

            switch (dayNumber) {
                case 0:
                    dayOfWeek = 'Sunday';
                    break;
                case 1:
                    dayOfWeek = 'Monday';
                    break;
                case 2:
                    dayOfWeek = 'Tuesday';
                    break;
                case 3:
                    dayOfWeek = 'Wednesday';
                    break;
                case 4:
                    dayOfWeek = 'Thursday';
                    break;
                case 5:
                    dayOfWeek = 'Friday';
                    break;
                case 6:
                    dayOfWeek = 'Saturday';
                    break;
                default:
                    dayOfWeek = 'Error';
            }

            return dayOfWeek;
        }

    } catch (error) {
        console.error(error);
        alert("Axtardığınız məlumat tapila bilinmədi")
    }
}

