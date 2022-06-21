/**
 * Injecte dynamiquement les 3 équipes définies de façon statique.
 * Gestion de l'ajout dynamique d'une équipe.
 * Instanciation des comportements d'une nouvelle équipe.
 */
import Team from './Team.js';

export default class League {
    constructor(el, teams) {
        this._el = el;
        this._elFrom = this._el.querySelector('form');
        this._elInputNom = this._elFrom['nom-equipe'];
        this._elInputQuartier = this._elFrom['quartier-equipe'];
        this._elBtn = this._elFrom.querySelector('button');
        this._elTeamsParent = this._el.querySelector('[data-js-teams]');

        this._teams = teams;

        this.init();
    }


    init() {
        for (let i = 0; i<this._teams.length; i++) {
            this.injectTeam(this._teams[i]);
        };

        this._elBtn.addEventListener('click', function(e){
            e.preventDefault();

            if(this._elInputNom.value != '' && this._elInputQuartier.value != '') {
                let team = {
                    nom: this._elInputNom.value,
                    quartier: this._elInputQuartier.value
                };
                this.injectTeam(team);
            }
        }.bind(this));
    }


    injectTeam(team) {
        let teamDom = `
            <div class="team" data-js-team="${team.nom}">
                <h3>${team.nom} de ${team.quartier}</h3>
                <form>
                    <div>
                        <label>Numéro : <input type="text" name="numero-joueur"></label>
                        <label>Prénom : <input type="text" name="prenom-joueur"></label>
                        <label>Nom : <input type="text" name="nom-joueur"></label>
                    </div>
                    <button>Ajouter joueur</button>
                </form>
                <div class="players" data-js-players></div>
            </div>
        `;
        this._elTeamsParent.insertAdjacentHTML('beforeend', teamDom);

        new Team(this._elTeamsParent.lastElementChild);
    }
}
