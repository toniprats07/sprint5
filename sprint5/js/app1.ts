/// <reference lib="dom" />

const apiUrl: string = 'https://icanhazdadjoke.com/';

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
  const btnEmpezar: HTMLElement | null = document.getElementById('btnEmpezar');
  const chistesContainer: HTMLElement | null = document.getElementById('chistes');
  if (btnEmpezar && chistesContainer) {
    btnEmpezar.addEventListener('click', async () => {
      try {
        const joke: string = await fetchJoke();
        chistesContainer.textContent = joke
      } catch (error) {
        console.log(error);
      }
    });
  }
});