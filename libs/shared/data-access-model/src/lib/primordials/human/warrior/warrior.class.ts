/* eslint-disable no-magic-numbers */
import { PhaserSingletonService } from '@company-name/example-app/phaser/singleton';
import { CheapSword, FancySword, SwordTypeEnum } from '@company-name/shared/data-access-model';
import * as Phaser from 'phaser';

import { Human } from '../human.primordial.class';

export class Warrior extends Phaser.GameObjects.Sprite implements Human {
    public static hammeringKey = 'warrior_hammer';
    public static idleKey = 'warrior_idle';
    public static spriteSheet = 'assets/warrior_sprites.png';
    public static atlast = 'assets/warrior_sprites_atlas.json';
    public static animation = 'assets/warrior_sprites_anim.json';

    constructor(phaserScene: Phaser.Scene) {
        // * Set the warrior's position relative to Phaser's Origin
        super(phaserScene, 0.6, 1, Warrior.hammeringKey);
        this.scene.add.existing(this);
        this.setVisible(true);
        this.play(Warrior.idleKey);

        // When business plan is finished, Hire the Founder and delete the preview
        PhaserSingletonService.shopObservable.subscribe(_objectToBuild => {
            console.log('Warrior received order for:', _objectToBuild);
            PhaserSingletonService.actionsHistory.push('Warrior received order for:', _objectToBuild);
            void this.buildSword(_objectToBuild);
        });
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param phaserScene
     * @returns Promise<Warrior>
     */
    public static async build(phaserScene: Phaser.Scene): Promise<Warrior> {
        console.log('Data access model', 'warrior.class', 'constructor()');
        const tempObject = new Warrior(phaserScene);
        try {
            return tempObject;
        } catch (e) {
            console.error('Error creating warrior');
        }
    }

    /**
     * * Sets the warrior's animation to Idle
     */
    public setIdle() {
        console.log('Warrior going to idle!');
        this.play(Warrior.idleKey);
    }

    /**
     * * Sets the warrior's animation to Hammering
     */
    public async buildSword(_type: SwordTypeEnum) {
        console.log('warrior.class.ts', 'buildSword()', _type);

        // * Start the animation
        PhaserSingletonService.actionsHistory.push('Warrior received order for a ' + _type + ' sword');
        this.play(Warrior.hammeringKey);
        PhaserSingletonService.actionsHistory.push('Warrior started working on the ' + _type + ' sword');

        // * Start building the sword
        let tmpSword;
        if (_type === SwordTypeEnum.FANCY) {
            tmpSword = await FancySword.build(PhaserSingletonService.activeGame.scene.scenes[0]);
        } else if (_type === SwordTypeEnum.CHEAP) {
            tmpSword = await CheapSword.build(PhaserSingletonService.activeGame.scene.scenes[0]);
        }

        if (tmpSword) {
            PhaserSingletonService.actionsHistory.push(tmpSword.type, ' sword completed! ');
        }

        // * Now let's play the animation associated with
        this.play(Warrior.idleKey);
    }
}
