import * as Phaser from 'phaser';

export class ForgeScene extends Phaser.Scene {

    constructor() {
        super({key: 'preloader'});
    }

    preload() {
        try {
            // this.load.image('background-image', 'https://cdn1.epicgames.com/ue/product/Screenshot/04-1920x1080-d82f40524f9296f71a156b5e37241e11.jpg?resize=1&w=1920');
        } catch (e) {
            console.error('preloader.scene.ts', 'error preloading', e);
        }
    }

    /**
     * * Phaser will only call create after all assets in Preload have been loaded
     */
    create() {

        this.add.text(20, 20, 'Playing game!')
        // const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background-image');
        // const scaleX = this.cameras.main.width / image.width;
        // const scaleY = this.cameras.main.height / image.height;
        // const scale = Math.max(scaleX, scaleY);
        // image.setScale(scale).setScrollFactor(0);
    }
}
