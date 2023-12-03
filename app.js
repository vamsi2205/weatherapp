function getWeather() {
    const cityInput = document.getElementById("cityInput").value;
    const weatherInfo = document.getElementById("weatherInfo");

    const apiKey = 'ecba2ba9db943a568a9046cc4c99c3a4';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            const temperature = data.main.temp;
            const temperatureCelsius = temperature - 273.15;
            const temperatureFahrenheit = (temperature * 9/5) - 459.67;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;

            weatherInfo.innerHTML = `
                <h2>${cityName} Weather:</h2>
                <p><strong>Temperature:</strong> ${temperatureCelsius.toFixed(2)} &#8451; (${temperatureFahrenheit.toFixed(2)} &#8457;)</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            weatherInfo.innerHTML = 'Error fetching current weather data. Please try again.';
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecastList = data.list;

            const forecastInfo = document.createElement('div');
            forecastInfo.innerHTML = '<h2>5-Day Forecast:</h2>';

            for (let i = 0; i < forecastList.length; i += 8) {
                const forecastDate = new Date(forecastList[i].dt * 1000);
                const forecastTemperature = forecastList[i].main.temp;
                const forecastTemperatureCelsius = forecastTemperature - 273.15;
                const forecastTemperatureFahrenheit = (forecastTemperature * 9/5) - 459.67;
                const forecastDescription = forecastList[i].weather[0].description;

                const forecastItem = document.createElement('div');
                forecastItem.innerHTML = `
                    <p><strong>Date:</strong> ${forecastDate.toDateString()}</p>
                    <p><strong>Temperature:</strong> ${forecastTemperatureCelsius.toFixed(2)} &#8451; (${forecastTemperatureFahrenheit.toFixed(2)} &#8457;)</p>
                    <p><strong>Description:</strong> ${forecastDescription}</p>
                `;
                forecastInfo.appendChild(forecastItem);
            }

            weatherInfo.appendChild(forecastInfo);
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
            weatherInfo.innerHTML = 'Error fetching 5-day forecast data. Please try again.';
        });
}

function getCurrentLocation() {
    const weatherInfo = document.getElementById("weatherInfo");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiKey = 'ecba2ba9db943a568a9046cc4c99c3a4';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const cityName = data.name;
                    const temperature = data.main.temp;
                    const temperatureCelsius = temperature - 273.15;
                    const temperatureFahrenheit = (temperature * 9/5) - 459.67;
                    const windSpeed = data.wind.speed;
                    const humidity = data.main.humidity;

                    weatherInfo.innerHTML = `
                        <h2>${cityName} Weather:</h2>
                        <p><strong>Temperature:</strong> ${temperatureCelsius.toFixed(2)} &#8451; (${temperatureFahrenheit.toFixed(2)} &#8457;)</p>
                        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                        <p><strong>Humidity:</strong> ${humidity}%</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherInfo.innerHTML = 'Error fetching weather data. Please try again.';
                });
        

            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => {
                    const forecastList = data.list;

                    const forecastInfo = document.createElement('div');
                    forecastInfo.innerHTML = '<h2>5-Day Forecast:</h2>';

                    for (let i = 0; i < forecastList.length; i += 8) {
                        const forecastDate = new Date(forecastList[i].dt * 1000);
                        const forecastTemperature = forecastList[i].main.temp;
                        const forecastTemperatureCelsius = forecastTemperature - 273.15;
                        const forecastTemperatureFahrenheit = (forecastTemperature * 9/5) - 459.67;
                        const forecastDescription = forecastList[i].weather[0].description;

                        const forecastItem = document.createElement('div');
                        forecastItem.innerHTML = `
                            <p><strong>Date:</strong> ${forecastDate.toDateString()}</p>
                            <p><strong>Temperature:</strong> ${forecastTemperatureCelsius.toFixed(2)} &#8451; (${forecastTemperatureFahrenheit.toFixed(2)} &#8457;)</p>
                            <p><strong>Description:</strong> ${forecastDescription}</p>
                        `;
                        forecastInfo.appendChild(forecastItem);
                    }

                    weatherInfo.appendChild(forecastInfo);
                })
                .catch(error => {
                    console.error('Error fetching 5-day forecast data:', error);
                    weatherInfo.innerHTML = 'Error fetching 5-day forecast data. Please try again.';
                });

        }, error => {
            console.error('Error getting current location:', error);
            weatherInfo.innerHTML = 'Error getting current location. Please try again or enter a city manually.';
        });

    } else {
        weatherInfo.innerHTML = 'Geolocation is not supported by your browser.';
    }
}
