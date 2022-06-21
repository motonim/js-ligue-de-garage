/**
 * Lancer les comportements de la gestion de cette ligue de garage.
 * Cette ligue a 3 équipes par défaut.
 */

import League from './League.js';

let teams = [
    { nom: 'Canadiens', quartier: 'Verdun' }, 
    { nom: 'Rangers', quartier: 'Hochelaga'},
    { nom: 'Red Wings', quartier: 'Plateau'}
];

let elLeagues = document.querySelectorAll('[data-js-league]');

for (let i = 0; i < elLeagues.length; i++) {
    new League(elLeagues[i], teams);
}