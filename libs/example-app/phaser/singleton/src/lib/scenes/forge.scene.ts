/* eslint-disable no-magic-numbers */
// eslint-disable-next-line import/no-unresolved
import { Blacksmith } from '@company-name/shared/data-access-model';
import * as Phaser from 'phaser';

import { ScrollManager } from '../utilities/scroll-manager';

export class ForgeScene extends Phaser.Scene {
    private backgroundKey = 'background-image'; // * Store the background image name
    private blacksmithKey = 'blacksmith_hammer';
    private blacksmithSpriteSheet = 'assets/blacksmith_sprites.png';
    private blacksmithAtlas = 'assets/blacksmith_sprites_atlas.json';
    private blackSmith: Blacksmith;
    private scrollManager: ScrollManager;

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

        // * Setup the Background Image
        const backgroundImage = this.add.image((this.game.config.width as number) / 3, (this.game.config.height as number) / 2, this.backgroundKey);
        const scaleX = (this.game.config.width as number) / backgroundImage.width;
        const scaleY = (this.game.config.height as number) / backgroundImage.height;
        const scale = Math.max(scaleX, scaleY);

        // * Setup the Character Sprite
        this.blackSmith = await Blacksmith.build(this, this.blacksmithKey);

        // * Set all objects to the same scale for resizing
        this.blackSmith.setScale(scale * 3);
        backgroundImage.setScale(scale);

        // * Now handle scrolling
        this.cameras.main.setBackgroundColor('0xEBF0F3');

        this.scrollManager = new ScrollManager(this, false);
        this.scrollManager.registerScrollingBackground(backgroundImage);
        // * Set cameras to the correct position
        this.cameras.main.setZoom(1);
        this.scrollManager.scrollToCenter();
    }
}
