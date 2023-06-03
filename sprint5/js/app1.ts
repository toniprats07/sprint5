/// <reference lib="dom" />

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=10f9b5b8eb548e0af3a7418fb76a0d4d&lang=es&units=metric';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    const weatherIconCode = data.weather[0].icon;
    const temperature = data.main.temp;

    const weatherInfo = document.getElementById('weather-info');
    if (weatherInfo instanceof HTMLElement) {
      const icon = document.createElement('img');
      icon.src = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
      icon.alt = 'Weather Icon';
      weatherInfo.appendChild(icon);

      const temperatureElement = document.createElement('span');
      temperatureElement.textContent = `|| ${temperature}°C`;
      weatherInfo.appendChild(temperatureElement);
    }
  } catch (error) {
    console.log(error);
  }
});


const apiUrl = 'https://icanhazdadjoke.com/';
const chuckNorrisJokeApiUrl = 'https://api.chucknorris.io/jokes/random';

interface Joke {
  joke: string;
  score: number;
  date: string;
}

const reportJokes: Joke[] = [];

async function fetchDadJoke(): Promise<string> {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('No se ha podido obtener el chiste');
    }

    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchChuckNorrisJoke(): Promise<string> {
  try {
    const response = await fetch(chuckNorrisJokeApiUrl);
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchRandomJoke(): Promise<string> {
  const randomIndex = Math.floor(Math.random() * 2);
  if (randomIndex === 0) {
    return fetchDadJoke();
  } else {
    return fetchChuckNorrisJoke();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btnEmpezar = document.getElementById('btnEmpezar') as HTMLButtonElement;
  const chistesContainer = document.getElementById('chistes') as HTMLParagraphElement;
  const btnPuntos = document.querySelectorAll('.btn-score');

  let currentJoke = '';

  btnPuntos.forEach((btn) => {
    (btn as HTMLElement).style.display = 'none'; // Ocultar botones de votación inicialmente

    btn.addEventListener('click', () => {
      const score = parseInt(btn.textContent!);
      const currentDate = new Date().toISOString();

      reportJokes.push({joke: currentJoke, score, date: currentDate});

      console.log(reportJokes);
    });
  });

  btnEmpezar.addEventListener('click', async () => {
    const joke = await fetchRandomJoke();
    chistesContainer.textContent = joke;
    currentJoke = joke;

    btnPuntos.forEach((btn) => {
      (btn as HTMLElement).style.display = 'inline-block'; // Mostrar botones de votación al cargar los chistes
    });
  });
});