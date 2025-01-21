document.getElementById("toggleDarkMode").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

const citiesInBangladesh = [
  "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Comilla", "Narayanganj", "Gazipur"
];

document.getElementById("cityInput").addEventListener("input", function () {
  const input = this.value.trim().toLowerCase();
  const suggestions = citiesInBangladesh.filter(city => city.toLowerCase().startsWith(input));
  displaySuggestions(suggestions);
});

document.getElementById("searchButton").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeather(city);
});

function displaySuggestions(suggestions) {
  const suggestionBox = document.getElementById("suggestionBox");
  suggestionBox.innerHTML = suggestions.map(city => `<div class="suggestion">${city}</div>`).join('');
  suggestionBox.style.display = suggestions.length ? 'block' : 'none';

  document.querySelectorAll(".suggestion").forEach(item => {
    item.addEventListener("click", function () {
      document.getElementById("cityInput").value = this.textContent;
      suggestionBox.style.display = 'none';
    });
  });
}

async function fetchWeather(city) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Assuming the API key is injected
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const weatherHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Weather: ${weather[0].description}</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
  `;
  document.getElementById("weatherDisplay").innerHTML = weatherHTML;
}