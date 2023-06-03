const apiUrl = 'https://icanhazdadjoke.com/';

async function fetchJoke() {
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
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btnEmpezar = document.getElementById('btnEmpezar');
  const chistesContainer = document.getElementById('chistes');
  btnEmpezar.addEventListener('click', async () => {
    const joke = await fetchJoke();
    chistesContainer.textContent = joke;
  });
});
