const apiKey = '98b37979365a0884bbd96c5fdc84f0ee';
const weatherForm = document.querySelector(".weatherForm");
const card = document.querySelector(".displayCard");
const userInput = document.querySelector("#userInput");


weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = userInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Couldn't fetch weather data")
    }
    
    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);

    const {name: city, main: {temp, temp_min, temp_max, humidity}, weather: [{description, id}], sys: {country}, wind: {speed}} = data;

    card.textContent = "";
    card.style.display = "flex";

    const tempDisplay = document.createElement("p");
    const minMax = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const descDisplay = document.createElement("p");
    const cityDisplay = document.createElement("p");
    const details = document.createElement("div");
    const humidityDetails = document.createElement("div");
    const humidityEmoji = document.createElement("p");
    const humidityValue = document.createElement("p");
    const humidityTitle = document.createElement("p");
    const windDetails = document.createElement("div");
    const windEmoji = document.createElement("p");
    const windValue = document.createElement("p");
    const windTitle = document.createElement("p");
    

    tempDisplay.textContent = `${Math.round(temp)}°C`;
    tempDisplay.classList.add("temperature");

    minMax.textContent = `${Math.floor(temp_min)}°C / ${Math.ceil(temp_max)}°C`;
    minMax.classList.add("minMax");

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");

    descDisplay.textContent = description;
    descDisplay.classList.add("description");

    cityDisplay.textContent = `📍 ${city}, ${country}`;
    cityDisplay.classList.add("city");

    details.classList.add("details");

    humidityDetails.classList.add("humidityDetails");

    humidityEmoji.textContent = '💧';
    humidityEmoji.classList.add("humidityEmoji");

    humidityValue.textContent = `${humidity}%`;
    humidityValue.classList.add("humidityPercent");

    humidityTitle.textContent = 'Humidity';
    humidityTitle.classList.add("humidityTitle");

    windDetails.classList.add("windDetails");

    windEmoji.textContent = '💨';
    windEmoji.classList.add("windEmoji");

    windValue.textContent = `${speed} KM/h`;
    windValue.classList.add("windSpeed");

    windTitle.textContent = 'Wind speed';
    windTitle.classList.add("windSpeedTitle");


    card.appendChild(tempDisplay);
    card.appendChild(minMax);
    card.appendChild(weatherEmoji);
    card.appendChild(descDisplay);
    card.appendChild(cityDisplay);
    card.appendChild(details);
    details.appendChild(humidityDetails);
    humidityDetails.appendChild(humidityEmoji);
    humidityDetails.appendChild(humidityValue);
    humidityDetails.appendChild(humidityTitle);
    details.appendChild(windDetails);
    windDetails.appendChild(windEmoji);
    windDetails.appendChild(windValue);
    windDetails.appendChild(windTitle);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return '⛈';
        case (weatherId >= 300 && weatherId < 400):
            return '🌦';
        case (weatherId >= 500 && weatherId < 600):
            return '🌧';
        case (weatherId >= 600 && weatherId < 700):
            return '🌨';
        case (weatherId == 701):
            return '💦';
        case (weatherId == 721):
            return '🌫';
        case (weatherId == 771):
            return '❄';
        case (weatherId == 781):
            return '🌪';
        case (weatherId == 800):
            return '☀';
        case (weatherId > 800):
            return '☁';
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}
