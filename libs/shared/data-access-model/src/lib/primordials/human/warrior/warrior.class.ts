/* eslint-disable no-magic-numbers */
import { PhaserSingletonService } from '@company-name/example-app/phaser/singleton';
import { CheapSword, FancySword, SwordTypeEnum } from '@company-name/shared/data-access-model';
import * as Phaser from 'phaser';

import { Human } from '../human.primordial.class';

export class Ninja extends Phaser.GameObjects.Sprite implements Human {
    public static hammeringKey = 'ninja_hammer';
    public static idleKey = 'ninja_idle';
    public static spriteSheet = 'assets/ninja_sprites.png';
    public static atlast = 'assets/ninja_sprites_atlas.json';
    public static animation = 'assets/ninja_sprites_anim.json';

    constructor(phaserScene: Phaser.Scene) {
        // * Set the ninja's position relative to Phaser's Origin
        super(phaserScene, 0.6, 1, Ninja.hammeringKey);
        this.scene.add.existing(this);
        this.setVisible(true);
        this.play(Ninja.idleKey);

        // When business plan is finished, Hire the Founder and delete the preview
        PhaserSingletonService.shopObservable.subscribe(_objectToBuild => {
            console.log('Ninja received order for:', _objectToBuild);
            PhaserSingletonService.actionsHistory.push('Ninja received order for:', _objectToBuild);
            void this.buildSword(_objectToBuild);
        });
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param phaserScene
     * @returns Promise<Ninja>
     */
    public static async build(phaserScene: Phaser.Scene): Promise<Ninja> {
        console.log('Data access model', 'ninja.class', 'constructor()');
        const tempObject = new Ninja(phaserScene);
        try {
            return tempObject;
        } catch (e) {
            console.error('Error creating ninja');
        }
    }

    /**
     * * Sets the ninja's animation to Idle
     */
    public setIdle() {
        console.log('Ninja going to idle!');
        this.play(Ninja.idleKey);
    }

    /**
     * * Sets the ninja's animation to Hammering
     */
    public async buildSword(_type: SwordTypeEnum) {
        console.log('ninja.class.ts', 'buildSword()', _type);

        // * Start the animation
        PhaserSingletonService.actionsHistory.push('Ninja received order for a ' + _type + ' sword');
        this.play(Ninja.hammeringKey);
        PhaserSingletonService.actionsHistory.push('Ninja started working on the ' + _type + ' sword');

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
        this.play(Ninja.idleKey);
    }
}
