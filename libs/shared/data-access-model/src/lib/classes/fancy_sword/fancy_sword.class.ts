/* eslint-disable no-magic-numbers */
import { Sword, SwordTypeEnum } from '@company-name/shared/data-access-model';

export class FancySword extends Phaser.GameObjects.Image implements Sword {
    public static imageAsset = 'assets/swords/fancy_sword.png'; // * The asset for the sword, relative to URL
    public static key = 'fancy-sword'; // * Key for the fancy sword, used by phaser if it's an animation

    constructor(phaserScene: Phaser.Scene) {
        super(phaserScene, 1300, -150, FancySword.key); // * + X is to the right, - Y is up
        console.log('fancy_sword.class', 'constructor()');
        this.swordType = SwordTypeEnum.FANCY; // * inherited from Sword
    }
    public swordType: SwordTypeEnum;

    /**
     * * Builds respective class asynchronously
     *
     * @param serializedData data for a single object
     * @returns Promise<FancySword>
     */
    public static async build(phaserScene: Phaser.Scene): Promise<FancySword> {
        const tmpObject = new FancySword(phaserScene);
        try {
            console.log('fancy_sword.class', 'Starting to build...');
            // eslint-disable-next-line no-magic-numbers
            await new Promise(resolve => setTimeout(resolve, 8000));
            phaserScene.add.existing(tmpObject);
            tmpObject.setScale(1);
            tmpObject.setVisible(true);
            tmpObject.rotation += Math.random() * (0.7 - 0.2 + 0.3);
            console.log('fancy_sword.class', 'Finished building!...');
            return tmpObject;
        } catch (e) {
            console.error('fancy_sword.class', 'Error creating sword');
        }
    }
}
