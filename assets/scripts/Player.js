/**
 * Gestion des comportements d'un joueur.
 */


export default class Player {
    constructor(el) {
        this._el = el;
        this._elCtas = this._el.querySelectorAll('[data-js-player-cta]');
        this._elGoals = this._el.querySelector('[data-js-goal]');
        this._elAssists = this._el.querySelector('[data-js-assist]');

        this._totalGoals = parseInt(this._elGoals.textContent);
        this._totalAssists = parseInt(this._elAssists.textContent);

        this.init();
    }


    init() {
        for(let i = 0; i<this._elCtas.length; i++) {
            this._elCtas[i].addEventListener('click', function(e) {
                // e.preventDefault 이 필요없다. form 안에 있는 button이 아니기 때문에            
                let cta = e.target.dataset.jsPlayerCta;
                
                this.manageCtas(cta);

                
                
            }.bind(this));
        }
    }


    manageCtas(cta) {
        switch(cta) {
            case 'add goal':
                let nbButs = this.random();  
                this._totalGoals += nbButs;
                this._elGoals.textContent = this._totalGoals;

                if (nbButs == 3) this.hatTrick();

                break;
            case 'add assist':
                let nbAssists = this.random();  
                this._totalAssists += nbAssists;
                this._elAssists.textContent = this._totalAssists;

                if (nbAssists == 3) this.hatTrick();

                break;
            case 'reset goal':
                this._elGoals.textContent = 0;
                break;
            
            case 'reset assist':
                this._elAssists.textContent = 0;
                break;
            case 'injured':

                if(this._el.classList.contains('injured')) {
                    this._el.classList.remove('injured');
                    this.toggleCtas(false, 'Blesser');
                } else {
                    this._el.classList.add('injured');
                    this.toggleCtas(true, 'Rétabli');
                }
                
                break;
            case 'delete':
                this._el.remove();
                // this._el.parentNode.removeChild(this._el);
                break;
        }
    }


    random() {
        return Math.ceil(Math.random() * 3); // 1,2,3

    }

    hatTrick() {
        this._el.classList.add('hat-trick');
        setTimeout(function() {
            this._el.classList.remove('hat-trick');
        }.bind(this), 500);
    }

    toggleCtas(bool, text) {
        for(let i = 0; i<this._elCtas.length; i++) {
            if (this._elCtas[i].dataset.jsPlayerCta != 'injured'){
                this._elCtas[i].disabled = bool;
            } else {
                this._elCtas[i].textContent = text;
            }
        }
    }
}