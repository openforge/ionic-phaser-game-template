/* eslint-disable no-magic-numbers */
import { PhaserSingletonService } from '@company-name/example-app/phaser/singleton';
import { CheapSword, FancySword, SwordTypeEnum } from '@company-name/shared/data-access-model';
import * as Phaser from 'phaser';

import { Human } from '../human.primordial.class';

export class Blacksmith extends Phaser.GameObjects.Sprite implements Human {
    public static hammeringKey = 'blacksmith_hammer';
    public static idleKey = 'blacksmith_idle';
    public static spriteSheet = 'assets/blacksmith/blacksmith_sprites.png';
    public static atlast = 'assets/blacksmith/blacksmith_sprites_atlas.json';
    public static animation = 'assets/blacksmith/blacksmith_sprites_anim.json';

    constructor(phaserScene: Phaser.Scene) {
        // * Set the blacksmith's position relative to Phaser's Origin
        super(phaserScene, 0.6, 1, Blacksmith.hammeringKey);
        this.scene.add.existing(this);
        this.setVisible(true);
        this.play(Blacksmith.idleKey);

        // When business plan is finished, Hire the Founder and delete the preview
        PhaserSingletonService.shopObservable.subscribe(_objectToBuild => {
            console.log('Blacksmith received order for:', _objectToBuild);
            PhaserSingletonService.actionsHistory.push('Blacksmith received order for:', _objectToBuild);
            void this.buildSword(_objectToBuild);
        });
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param phaserScene
     * @returns Promise<Blacksmith>
     */
    public static async build(phaserScene: Phaser.Scene): Promise<Blacksmith> {
        console.log('blacksmith.class', 'constructor()');
        const tempObject = new Blacksmith(phaserScene);
        try {
            return tempObject;
        } catch (e) {
            console.error('Error creating blacksmith');
        }
    }

    /**
     * * Sets the blacksmith's animation to Idle
     */
    public setIdle() {
        console.log('Blacksmith going to idle!');
        this.play(Blacksmith.idleKey);
    }

    /**
     * * Sets the blacksmith's animation to Hammering
     */
    public async buildSword(_type: SwordTypeEnum) {
        console.log('blacksmith.class.ts', 'buildSword()', _type);

        // * Start the animation
        PhaserSingletonService.actionsHistory.push('Blacksmith received order for a ' + _type + ' sword');
        this.play(Blacksmith.hammeringKey);
        PhaserSingletonService.actionsHistory.push('Blacksmith started working on the ' + _type + ' sword');

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
        this.play(Blacksmith.idleKey);
    }
}
