const WAGHAM_TOUR_NAMESPACE = 'wagham-tour'

const STEP_TYPE = {
    Show: 0,
    Click: 1,
    OpenSheet: 2,
    OnMouseUp: 3
}

const STEP_ACTION_ORDER = {
    Pre: -1,
    Post: 1
}


const getWelcomeTourConfig = (actorId) => { return {
    id: "wagham-character-creation-tour",
    title: "Benvenuto a Wagham!",
    description: "Panoramica sulla creazione personaggio a Wagham",
    steps: [
        {
            selector: "",
            type: STEP_TYPE.Show,
            actionOrder: STEP_ACTION_ORDER.Pre,
            waitForElement: null,
            content: "Benvenuto a Wagham Gildano! Ora sei pronto per iniziare la tua nuova avventura! Ma prima dovrai creare la scheda del tuo personaggio! vediamo come si fa..."
        },
        {
            selector: "a[data-tab='actors']",
            type: STEP_TYPE.Click,
            actionOrder: STEP_ACTION_ORDER.Pre,
            waitForElement: "a[data-tab='actors']",
            content: "Cliccando questo simpatico teschietto andiamo ad accedere alle nostre schede create e salvate."
        },
        {
            selector: '[data-document-id="'+actorId+'"]',
            type: STEP_TYPE.OpenSheet,
            actorId: actorId,
            waitForElement: '[data-document-id="'+actorId+'"]',
            actionOrder: STEP_ACTION_ORDER.Post,
            content: "Andiamo a cliccare sulla nostra scheda a noi assegnata, e andiamo a completarla con le seguenti informazioni:"
        },
        {
            selector: 'h1.charname',
            type: STEP_TYPE.Show,
            actionOrder: STEP_ACTION_ORDER.Pre,
            content: "In questa parte andiamo a mettere il nome del nostro pg"
        },
        {
            selector: '.ability-scores',
            type: STEP_TYPE.Show,
            actionOrder: STEP_ACTION_ORDER.Pre,
            content: "Qui andremo ad inserire i punti caratteristica, senza tener conto di modificatori di razza o di talenti"
        },
        {
            selector: ".tit-menu__btn-open--sheet",
            type: STEP_TYPE.OnMouseUp,
            actionOrder: STEP_ACTION_ORDER.Post,
            content: "Ora andiamo a settare la razza e la classe del nostro personaggio attraverso Plutonium"
        },
        {
            selector: '.veapp-ctx-menu__item',
            type: STEP_TYPE.OnMouseUp,
            forceCenter: true,
            waitForElement: ".w-100.ve-flex-v-center",
            actionOrder: STEP_ACTION_ORDER.Pre,
            content: "Da qui possiamo aprire Plutonium Import ed importare cio' che ci serve, sia in fase di creazione che a livelli piu' alti."
        },
        {
            selector: ".w-100.ve-flex-v-center:nth-child(4)",
            type: STEP_TYPE.Show,
            content: "Cliccando qui abbiamo a disposizione un fottio di risorse da cui attingere per la nostra classe, ma a noi interessa solo '5etools' e 'Wagham Compendium'"
        },
        {
            selector: '.btn.btn-5et.w-100.mr-2',
            type: STEP_TYPE.Click,
            actionOrder: STEP_ACTION_ORDER.Post,
            content: "Ora possiamo aprire l'importer cliccando qui."
        },
        {
            selector: "",
            type: STEP_TYPE.Show,
            content: "Addesso possiamo selezionare la nostra razza, ricercandola attraverso la barra di ricerca e assicurandoci che sia la versione giusta"
        },       
        {
            selector: "",
            type: STEP_TYPE.Show,
            content: "Bravo coglione ora hai importato una sola cosa di settordici ed io ho buttato tutta una cazzo di giornata dietro a sta merda mortacci tua, se sento anche solo una domanda su come si fa ti cerco e ti picchio deficiente."
        }
    ]
}}

// Many thanks to: https://github.com/pwatson100/symbaroum/tree/RT-V10/tours
class WaghamTour extends Tour {

    _currentSelector = '';

    constructor(config) {
        super({
            namespace: WAGHAM_TOUR_NAMESPACE,
            canBeResumed: true,
            display: true,
            ...config,
        })
    }

    /**
	 * Wait for the given timeout.
	 * @param {number} timeout The time to wait in milliseconds
	 * @returns {Promise<void>} A promise that resolves after the given timeout
	 */
	wait(timeout) {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	}

	/**
	 * Wait for a specific element to appear in the DOM.
	 * @param {string} selector The selector for the element to wait for
	 * @param {number} timeout The maximum time to wait
	 * @returns {Promise<Element>} A promise that resolves to the element, if it is found
	 */
	waitForElement(selector, timeout) {
		return new Promise((resolve, reject) => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver(() => {
				if (document.querySelector(selector)) {
					resolve(document.querySelector(selector));
					observer.disconnect();
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});

			this.wait(timeout).then(reject);
		});
	}

    async _executeAction() {
        if (this.currentStep.type === STEP_TYPE.Click) {
            document.querySelector(this._currentSelector).click();
            await this.waitForElement(this._currentSelector, 5000);
        } else if (this.currentStep.type === STEP_TYPE.OpenSheet) {
            await game.actors.get(this.currentStep.actorId).sheet._render(true)
            if (!!this.currentStep.waitForElement) {
                await this.waitForElement(this.currentStep.waitForElement, 5000);
            }
        } else if (this.currentStep.type === STEP_TYPE.OnMouseUp) {
            const element = document.querySelector(this._currentSelector)
            const offset = $(element).offset()
            console.log(element)
            console.log(offset)
            if (!!element && !!offset) {
                $(element).trigger(
                    jQuery.Event("mouseup", {
                        clientX: offset.left,
                        clientY: offset.top
                      })
                )
                if (!!this.currentStep.waitForElement) {
                    await this.waitForElement(this.currentStep.waitForElement, 5000);
                }
            }
        }
    }

    async _preStep() {
        await super._preStep();
        this._currentSelector = this.currentStep.selector
        if (!!this.currentStep.forceCenter) { 
            this.currentStep.selector = ""
        }
        if (this.currentStep.actionOrder === STEP_ACTION_ORDER.Pre) {
            await this._executeAction();
        }
    }

    async _postStep() {
        await super._postStep();
        if (!!this.currentStep && this.currentStep.actionOrder === STEP_ACTION_ORDER.Post) {
            await this._executeAction();
        }
    }

}

Hooks.once('ready', async function () {
    console.log('Wagham tour | init tours')
    const actor = game.actors.filter( (it) => it.ownership[game.userId] === 3 )[0]
    if(!!actor) {
        const tour = new WaghamTour(getWelcomeTourConfig(actor.id))
        game.tours.register(WAGHAM_TOUR_NAMESPACE, tour.id, tour)
    }
});