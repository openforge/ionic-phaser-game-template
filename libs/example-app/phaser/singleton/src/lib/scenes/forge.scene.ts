import * as Phaser from 'phaser';

export class ForgeScene extends Phaser.Scene {
    private backgroundKey = 'background-image'; // * Store the background image name

    constructor() {
        super({ key: 'preloader' });
    }

    preload() {
        try {
            console.warn('Loading image');
            this.load.setBaseURL('http://localhost:4200/');
            this.load.image(this.backgroundKey, 'assets/blank_coworking.png');
        } catch (e) {
            console.error('preloader.scene.ts', 'error preloading', e);
        }
    }

    /**
     * * Phaser will only call create after all assets in Preload have been loaded
     */
    create() {
        console.warn('Creating scene image');
        // eslint-disable-next-line no-magic-numbers
        this.add.text(20, 20, 'Playing game!');
        const backgroundImage = this.add.image((this.game.config.width as number) / 3, (this.game.config.height as number) / 2, this.backgroundKey);
        const scaleX = (this.game.config.width as number) / backgroundImage.width;
        const scaleY = (this.game.config.height as number) / backgroundImage.height;
        const scale = Math.max(scaleX, scaleY);
        backgroundImage.setScale(scale).setScrollFactor(0);
    }
}
