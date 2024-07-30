document.addEventListener("DOMContentLoaded", function() {
    const countriesContainer = document.getElementById("countries");

    // Fetch countries data
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const countryCard = document.createElement("div");
                countryCard.className = "col-md-4 mb-4";
                countryCard.innerHTML = `
                    <div class="card">
                        <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common} flag">
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text">
                                <strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}<br>
                                <strong>Region:</strong> ${country.region}<br>
                                <strong>Country Code:</strong> ${country.cca3}<br>
                                <strong>Lat/Lng:</strong> ${country.latlng.join(', ')}
                            </p>
                            <button class="btn btn-primary" onclick="getWeather('${country.latlng[0]}', '${country.latlng[1]}')">Click for Weather</button>
                        </div>
                    </div>
                `;
                countriesContainer.appendChild(countryCard);
            });
        })
        .catch(error => console.error('Error fetching countries data:', error));
});

// Fetch weather data
function getWeather(lat, lng) {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(weather => {
            alert(`Current weather in ${weather.name}:\nTemperature: ${weather.main.temp}°C\nWeather: ${weather.weather[0].description}`);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
