import {FeatureTour} from "./feature-tour-wagham.mjs";

export class OneDotOneTour extends FeatureTour {

    constructor() {
      super({
        title: "Benvenuto a Wagham!",
        description: "Panoramica sulla creazione personaggio a Wagham",
        canBeResumed: true,
        display: true,
        version: "0.1.0",
        steps: [
          {
            id: "benvenuto",
            selector: "",
            content: "Benvenuto a Wagham Gildano! Ora sei pronto per iniziare la tua nuova avventura! Ma prima dovrai creare la scheda del tuo personaggio! vediamo come si fa..."
          },
          {
            selector: '.fa-users',
            content: "Cliccando questo simpatico teschietto andiamo ad accedere alle nostre schede create e salvate."
          },
          {
            selector: '[data-document-id="2Kuah54quQ49FSvT"]',
            content: "Andiamo a cliccare sulla nostra scheda a noi assegnata, e andiamo a completarla con le seguenti informazioni:"
          },
          {
            selector: '.char-name',
            content: "In questa parte andiamo a mettere il nome del nostro pg"
          },
          {
            selector: '.ability-scores',
            content: "Qui andremo ad inserire i punti caratteristica, senza tener conto di modificatori di razza o di talenti"
          },
          {
            selector: '.fa-ellipsis-v',
            content: "Ora andiamo a settare la razza e la classe del nostro personaggio attraverso Plutonium"
          },
          {
            selector: ' .ml-1',
            content: "Da qui possiamo aprire Plutonium Import ed importare cio' che ci serve, sia in fase di creazione che a livelli piu' alti."
          },
          {
            selector: ' .btn btn-sm btn-5et w-100 btn--active',
            content: "Cliccando qui abbiamo a disposizione un fottio di risorse da cui attingere per la nostra classe, ma a noi interessa solo '5etools' e 'Wagham Compendium'"
          },
          {
            selector: ' .btn btn-5et w-100 mr-2',
            content: "Ora possiamo aprire l'importer e selezionare la nostra razza, ricercandola attraverso la barra di ricerca e assicurandoci che sia la versione giusta"
          },
          {
            content: "Bravo coglione ora hai importato una sola cosa di settordici ed io ho buttato tutta una cazzo di giornata dietro a sta merda mortacci tua, se sento anche solo una domanda su come si fa ti cerco e ti picchio deficiente."
          },
        ]
      });
    }
}