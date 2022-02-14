/* eslint-disable no-magic-numbers */
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
        console.log('forge.scene.ts', 'Creating Assets...', this.scale.width, this.scale.height);

        // * Setup the Background Image
        this.backgroundImage = this.add.image(0.5, 0.5, this.backgroundKey);

        // * Setup the Character Sprite
        this.blackSmith = await Blacksmith.build(this, this.blacksmithKey);

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

        console.log('this.backgroundImage.width = ', this.backgroundImage.width);
        const scaleX = tmpWidth / this.backgroundImage.width;
        const scaleY = tmpHeight / this.backgroundImage.height;
        console.log('scaleX =', scaleX);
        console.log('scaleY =', scaleY);
        const scale = Math.max(scaleX, scaleY);

        // * Set all objects to the same scale for resizing
        this.blackSmith.setScale(scale * 3);
        // this.backgroundImage.setScale(scale);

        this.cameras.resize(gameSize.width, gameSize.height);
        //  this.backgroundImage.setSize(gameSize.width, gameSize.height);
        this.blackSmith.setPosition(gameSize.width / 2, gameSize.height / 2);
    }
}
