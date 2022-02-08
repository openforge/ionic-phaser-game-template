import * as Phaser from 'phaser';

export class ForgeScene extends Phaser.Scene {
    private backgroundKey = 'background-image'; // * Store the background image name

    constructor() {
        super({ key: 'preloader' });
    }

    preload() {
        try {
            console.warn('Loading image');
            this.load.image(this.backgroundKey, './assets/blank_coworking.png');
            // this.load.svg(this.backgroundKey, this.backgroundKey, { scale: 1 });
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
        const backgroundImage = this.add.image(this.cameras.main.width, this.cameras.main.height, this.backgroundKey);
        const scaleX = this.cameras.main.width / backgroundImage.width;
        const scaleY = this.cameras.main.height / backgroundImage.height;
        const scale = Math.max(scaleX, scaleY);
        backgroundImage.setScale(scale).setScrollFactor(0);
    }
}
