"use strict";
/// <reference lib="dom" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrl = 'https://icanhazdadjoke.com/';
const reportJokes = [];
function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(apiUrl, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('No se ha podido obtener el chiste');
            }
            const data = yield response.json();
            return data.joke;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const btnEmpezar = document.getElementById('btnEmpezar');
    const chistesContainer = document.getElementById('chistes');
    const btnpuntos = document.querySelectorAll('.btn-score');
    let currentJoke = '';
    btnpuntos.forEach((btn) => {
        btn.style.display = 'none'; // Ocultar botones de votación inicialmente
        btn.addEventListener('click', () => {
            const score = parseInt(btn.textContent);
            const currentDate = new Date().toISOString();
            reportJokes.push({ joke: currentJoke, score, date: currentDate });
            console.log(reportJokes);
        });
    });
    btnEmpezar.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const joke = yield fetchJoke();
        chistesContainer.textContent = joke;
        currentJoke = joke;
        btnpuntos.forEach((btn) => {
            btn.style.display = 'inline-block'; // Mostrar botones de votación al cargar los chistes
        });
    }));
});
