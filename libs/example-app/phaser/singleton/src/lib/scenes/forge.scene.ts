/* eslint-disable no-magic-numbers */
import { Blacksmith } from '@company-name/shared/data-access-model';
import * as Phaser from 'phaser';

import { ScrollManager } from '../utilities/scroll-manager';

export class ForgeScene extends Phaser.Scene {
    private backgroundKey = 'background-image'; // * Store the background image name
    private backgroundImageAsset = 'assets/blacksmith_bg.png';
    private blackSmith: Blacksmith;
    private scrollManager: ScrollManager;
    private backgroundImage: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'preloader' });
    }

    async preload() {
        try {
            console.log('forge.scene.ts', 'Preloading Assets...');
            // * First, set the base URL since we're just loading from the main application's asset folder
            this.load.setBaseURL('http://localhost:4200/');

            // * Now load the background image
            this.load.image(this.backgroundKey, this.backgroundImageAsset);
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
        this.load.atlas(Blacksmith.blacksmithIdleKey, Blacksmith.blacksmithSpriteSheet, Blacksmith.blacksmithAtlas);
        this.load.animation(this.backgroundKey, Blacksmith.blacksmithAnimation);
    }

    /**
     * * Phaser will only call create after all assets in Preload have been loaded
     */
    async create() {
        console.log('forge.scene.ts', 'Creating Assets...', this.scale.width, this.scale.height);

        // * Setup the Background Image
        this.backgroundImage = this.add.image(0, 0, this.backgroundKey);

        // * Setup the Blacksmith Character Sprite
        this.blackSmith = await Blacksmith.build(this);
        // * Because the blacksmith is a much smaller scale image than the background image, we need to scale it up.
        this.blackSmith.setScale(3);

        // * Now handle scrolling
        this.cameras.main.setBackgroundColor('0xEBF0F3');

        this.scrollManager = new ScrollManager(this);
        this.scrollManager.registerScrollingBackground(this.backgroundImage);
        // * Set cameras to the correct position
        this.cameras.main.setZoom(0.25);
        this.scrollManager.scrollToCenter();

        this.scale.on('resize', this.resize, this);
    }

    /**
     *
     * @param gameSize
     * @param baseSize
     * @param displaySize
     * @param resolution
     */
    resize(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size) {
        console.log('resizing....');
        let tmpWidth = gameSize.width;
        let tmpHeight = gameSize.height;
        if (tmpWidth === 0 || tmpHeight === 0) {
            console.log('First load, so set based on config');
            tmpWidth = this.game.config.width as number;
            tmpHeight = this.game.config.height as number;
        } else {
            console.log('gameSize.width:', gameSize.width, 'gameSize.height', gameSize.height);
            console.log('baseSize.width:', baseSize.width, 'baseSize.height', baseSize.height);
        }

        console.log('this.backgroundImage.width = ', this.backgroundImage.width, this.backgroundImage.height);

        this.cameras.resize(gameSize.width, gameSize.height);
    }
}
