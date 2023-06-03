const apiUrl = 'https://icanhazdadjoke.com/';

async function fetchJoke() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('No s\'ha pogut obtenir l\'acudit');
    }

    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btnEmpezar = document.getElementById('btnEmpezar');
  btnEmpezar.addEventListener('click', async () => {
    const joke = await fetchJoke();
    console.log(joke);
  });
});
