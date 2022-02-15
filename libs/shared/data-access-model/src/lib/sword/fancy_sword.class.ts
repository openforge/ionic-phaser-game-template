/* eslint-disable no-magic-numbers */
import { SwordTypeEnum } from '../enums/sword.enum';
import { Sword } from './sword.class';

export class FancySword extends Phaser.GameObjects.Image implements Sword {
    public static fancySwordImageAsset = 'assets/fancy_sword.png'; // * The asset for the sword, relative to URL
    public static fancySwordKey = 'fancy-sword'; // * Key for the fancy sword, used by phaser if it's an animation

    constructor(phaserScene: Phaser.Scene) {
        super(phaserScene, 0.8, 1, FancySword.fancySwordKey);
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
            await new Promise(resolve => setTimeout(resolve, 10000));
            phaserScene.add.existing(tmpObject);
            tmpObject.setScale(3);
            tmpObject.setVisible(true);
            console.log('fancy_sword.class', 'Finished building!...');
            return tmpObject;
        } catch (e) {
            console.error('fancy_sword.class', 'Error creating sword');
        }
    }
}
