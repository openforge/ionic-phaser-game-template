/* eslint-disable no-magic-numbers */
/* eslint no-console: ["error", { allow: ["trace", "error"] }] */
/* eslint no-restricted-syntax: ["error", "BinaryExpression[operator='in']"] */
import * as Phaser from 'phaser';

import { Human } from '../human/human.class';

export class Blacksmith extends Phaser.GameObjects.Sprite implements Human {
    constructor(phaserScene: Phaser.Scene, textureKey: string) {
        super(phaserScene, 400, 484, textureKey);
        this.scene.add.existing(this);
        this.setVisible(true);
        this.play(textureKey);
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param phaserScene
     * @param textureKey
     * @returns Promise<Blacksmith>
     */
    public static async build(phaserScene: Phaser.Scene, textureKey: string): Promise<Blacksmith> {
        console.trace('Data access model', 'blacksmith.class', 'constructor()');
        const tempObject = new Blacksmith(phaserScene, textureKey);
        try {
            return tempObject;
        } catch (e) {
            console.error('Error creating blacksmith');
        }
    }
}
