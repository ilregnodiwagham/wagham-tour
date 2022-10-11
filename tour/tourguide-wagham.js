import { OneDotOneTour } from './1_1_tour.js';


export class TourGuide {

    async registerTours() {
        game.tours.register("dnd5e", "1.1.0", new OneDotOneTour());
    }

    startNewFeatureTours() {
        let lastTourVersion = game.settings.get("dnd5e", "lastTourVersion");

        if (foundry.utils.isNewerVersion("1.1.0", lastTourVersion)) {
            game.tours.get("dnd5e.1.1.0").start();
            }
    }
}
