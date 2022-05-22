/* eslint-disable no-magic-numbers */
import { Sword, SwordTypeEnum } from '@company-name/shared/data-access-model';

export class CheapSword extends Phaser.GameObjects.Image implements Sword {
    public static imageAsset = 'assets/swords/cheap_sword.png'; // * The asset for the sword, relative to URL
    public static key = 'cheap-sword'; // * Key for the cheap sword, used by phaser if it's an animation
    public swordType: SwordTypeEnum; // * Interface from parent Sword

    constructor(phaserScene: Phaser.Scene) {
        super(phaserScene, -550, -450, CheapSword.key);
        console.log('cheap_sword.class', 'constructor()');
        this.swordType = SwordTypeEnum.CHEAP; // * inherited from Sword
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param serializedData data for a single object
     * @returns Promise<CheapSword>
     */
    public static async build(phaserScene: Phaser.Scene): Promise<CheapSword> {
        const tmpObject = new CheapSword(phaserScene);
        try {
            console.log('cheap_sword.class', 'Starting to build...');
            // eslint-disable-next-line no-magic-numbers
            await new Promise(resolve => setTimeout(resolve, 3000));
            phaserScene.add.existing(tmpObject);
            tmpObject.setScale(1);
            tmpObject.setVisible(true);
            tmpObject.rotation += Math.random() * (0.7 - 0.2 + 0.3);
            console.log('cheap_sword.class', 'Finished building!...');
            return tmpObject;
        } catch (e) {
            console.error('cheap_sword.class', 'Error creating sword');
        }
    }
}
