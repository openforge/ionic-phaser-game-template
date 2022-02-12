/* eslint-disable no-magic-numbers */
/* eslint no-console: ["error", { allow: ["trace"] }] */
/* eslint no-restricted-syntax: ["error", "BinaryExpression[operator='in']"] */
import * as Phaser from 'phaser';

import { Human } from '../human/human.class';

export class Blacksmith extends Phaser.GameObjects.Sprite implements Human {
    constructor(phaserScene: Phaser.Scene, textureKey: string) {
        super(phaserScene, 400, 484, textureKey);
        console.trace('Data access model', 'blacksmith.class', 'constructor()', textureKey);
        this.scene.add.existing(this);
        this.setVisible(true);
        this.play(textureKey);
    }
}
