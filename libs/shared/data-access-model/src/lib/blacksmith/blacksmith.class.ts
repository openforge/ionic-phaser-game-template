/* eslint-disable no-magic-numbers */
import * as Phaser from 'phaser';

import { Human } from '../human/human.class';

export class Blacksmith extends Phaser.GameObjects.Sprite implements Human {
    public static blacksmithHammeringKey = 'blacksmith_hammer';
    public static blacksmithIdleKey = 'blacksmith_idle';
    public static blacksmithSpriteSheet = 'assets/blacksmith_sprites.png';
    public static blacksmithAtlas = 'assets/blacksmith_sprites_atlas.json';
    public static blacksmithAnimation = 'assets/blacksmith_sprites_anim.json';

    constructor(phaserScene: Phaser.Scene) {
        // * Set the blacksmith's position relative to Phaser's Origin
        super(phaserScene, 0.6, 1, Blacksmith.blacksmithHammeringKey);
        this.scene.add.existing(this);
        this.setVisible(true);
        this.play(Blacksmith.blacksmithIdleKey);
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param phaserScene
     * @param textureKey
     * @returns Promise<Blacksmith>
     */
    public static async build(phaserScene: Phaser.Scene): Promise<Blacksmith> {
        console.log('Data access model', 'blacksmith.class', 'constructor()');
        const tempObject = new Blacksmith(phaserScene);
        try {
            return tempObject;
        } catch (e) {
            console.error('Error creating blacksmith');
        }
    }

    public setIdle() {
        console.log('Blacksmith going to idle!');
        this.play(Blacksmith.blacksmithIdleKey);
    }

    public setHammering() {
        console.log('Blacksmith going to work!');
        this.play(Blacksmith.blacksmithHammeringKey);
    }
}
