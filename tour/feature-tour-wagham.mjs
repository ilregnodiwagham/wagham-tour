export class FeatureTour extends Tour {

    exit() {
      super.exit();
      game.settings.set("dnd5e", "lastTourVersion", this.version);
    }
  
    get version() {
      return this.config.version;
    }
  }
  