/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-magic-numbers */
import { CheapSword, FancySword, Human, SwordTypeEnum } from '@company-name/shared/data-access-model';
import { PhaserSingletonService } from '@company-name/shared-phaser-singleton';
import * as Phaser from 'phaser';

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
    public setIdle(): void {
        console.log('Blacksmith going to idle!');
        this.play(Blacksmith.idleKey);
    }

    /**
     * * Sets the blacksmith's animation to Hammering
     */
    public async buildSword(_type: SwordTypeEnum): Promise<void> {
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            PhaserSingletonService.actionsHistory.push(tmpSword.type, ' sword completed! ');
        }

        // * Now let's play the animation associated with
        this.play(Blacksmith.idleKey);
    }
}
