/// <reference lib="dom" />

const apiUrl = 'https://icanhazdadjoke.com/';

const reportJokes: { joke: string; score: number; date: string }[] = [];

async function fetchJoke(): Promise<string> {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
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

document.addEventListener('DOMContentLoaded', () => {
  const btnEmpezar = document.getElementById('btnEmpezar') as HTMLButtonElement;
  const chistesContainer = document.getElementById('chistes') as HTMLParagraphElement;
  const btnpuntos = document.querySelectorAll('.btn-score');

  let currentJoke = '';

  btnpuntos.forEach((btn) => {
    (btn as HTMLElement).style.display = 'none'; // Ocultar botones de votación inicialmente

    btn.addEventListener('click', () => {
      const score = parseInt(btn.textContent!);
      const currentDate = new Date().toISOString();

      reportJokes.push({ joke: currentJoke, score, date: currentDate });

      console.log(reportJokes);
    });
  });

  btnEmpezar.addEventListener('click', async () => {
    const joke = await fetchJoke();
    chistesContainer.textContent = joke;
    currentJoke = joke;

    btnpuntos.forEach((btn) => {
      (btn as HTMLElement).style.display = 'inline-block'; // Mostrar botones de votación al cargar los chistes
    });
  });
});

