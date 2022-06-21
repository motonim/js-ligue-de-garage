/**
 * Gestion de l'ajout dynamique d'un joueur.
 * Instanciation des comportements d'un nouveau joueur.
 */

import Player from "./Player.js";


export default class Team {
    constructor(el){
        this._el = el;
        this._elForm = this._el.querySelector('form');
        this._elInputNumero = this._elForm['numero-joueur'];
        this._elInputPrenom = this._elForm['prenom-joueur'];
        this._elInputNom = this._elForm['nom-joueur'];
        this._elBtn = this._elForm.querySelector('button');

        this._elPlayersParent = this._el.querySelector('[data-js-players]');

        this.init();
    }

    init() {
        this._elBtn.addEventListener('click', function(e) {
            e.preventDefault();

            let player = {
                numero: this._elInputNumero.value,
                prenom: this._elInputPrenom.value,
                nom: this._elInputNom.value
            }
            

            if (player.numero != '' && 
                player.prenom != '' && 
                player.nom != '') {
                    this.injectPlayer(player);
            }
        }.bind(this));
    }

    injectPlayer(player) {
        // e.preventDefault();

        let playerDom = `
                <div class="player">
                    <h4>${player.numero} : ${player.prenom} ${player.nom}</h4>
                    <p>
                        <small>Buts : </small>
                        <span data-js-goal>0</span> 
                        <button data-js-player-cta="add goal">Ajouter</button> 
                        <button data-js-player-cta="reset goal">Réinitialiser</button>
                    </p>
                    <p>
                        <small>Passes : </small>
                        <span data-js-assist>0</span> 
                        <button data-js-player-cta="add assist">Ajouter</button> 
                        <button data-js-player-cta="reset assist">Réinitialiser</button>
                    </p>
                    <button data-js-player-cta="injured">Blesser</button>
                    <button data-js-player-cta="delete">Supprimer</button>
                </div>
        `;
        this._elPlayersParent.insertAdjacentHTML('beforeend', playerDom);

        new Player(this._elPlayersParent.lastElementChild);
        
        //but : goal
    }

}