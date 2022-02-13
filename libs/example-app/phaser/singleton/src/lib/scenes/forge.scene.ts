/* eslint-disable no-magic-numbers */
// eslint-disable-next-line import/no-unresolved
import { Blacksmith } from '@company-name/shared/data-access-model';
import * as Phaser from 'phaser';

export class ForgeScene extends Phaser.Scene {
    private backgroundKey = 'background-image'; // * Store the background image name
    private blacksmithKey = 'blacksmith_hammer';
    private blacksmithSpriteSheet = 'assets/blacksmith_sprites.png';
    private blacksmithAtlas = 'assets/blacksmith_sprites_atlas.json';

    constructor() {
        super({ key: 'preloader' });
    }

    async preload() {
        try {
            console.log('forge.scene.ts', 'Preloading Assets...');
            // * First, set the base URL since we're just loading from the main application's asset folder
            this.load.setBaseURL('http://localhost:4200/');

            // * Now load the background image
            this.load.image(this.backgroundKey, 'assets/blacksmith_bg.png');
            // * Load the blacksmith sprites
            await this.preloadBlacksmithCharacter();
        } catch (e) {
            console.error('preloader.scene.ts', 'error preloading', e);
        }
    }

    /**
     * * Load the blacksmith sprites
     */
    preloadBlacksmithCharacter() {
        this.load.atlas(this.blacksmithKey, this.blacksmithSpriteSheet, this.blacksmithAtlas);
        this.load.animation(this.backgroundKey + '_animation', 'assets/blacksmith_sprites_anim.json');
    }

    /**
     * * Phaser will only call create after all assets in Preload have been loaded
     */
    async create() {
        console.log('forge.scene.ts', 'Creating Assets...');
        this.add.text(20, 20, 'Playing game!');

        // * Setup the Background Image
        const backgroundImage = this.add.image((this.game.config.width as number) / 3, (this.game.config.height as number) / 2, this.backgroundKey);
        const scaleX = (this.game.config.width as number) / backgroundImage.width;
        const scaleY = (this.game.config.height as number) / backgroundImage.height;
        const scale = Math.max(scaleX, scaleY);
        backgroundImage.setScale(scale).setScrollFactor(0);

        // * Setup the Character Sprite
        await Blacksmith.build(this, this.blacksmithKey);
    }
}
