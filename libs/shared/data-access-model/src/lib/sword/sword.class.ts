import { SwordTypeEnum } from '../enums/sword.enum';

export class Sword {
    public static swordImageAsset = 'assets/sword.png'; // * The asset for the sword, relative to URL
    public type: SwordTypeEnum; // * The type of sword, passed in via constructor

    constructor(_type: SwordTypeEnum, data?: Sword) {
        console.log('Data Access Model', 'sword.class', 'constructor()', data);
        Object.assign(this, data);
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param serializedData data for a single object
     * @returns Promise<Human>
     */
    public static async build(_type: SwordTypeEnum, serializedData?: Sword): Promise<Sword> {
        const tempObject = new Sword(_type, serializedData);
        try {
            console.log('sword.class', 'Starting creation process...');
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            if (_type === SwordTypeEnum.CHEAP) {
                // setTimeout(10000);
            } else if (_type === SwordTypeEnum.STURDY) {
                // setTimeout(20000);
            }

            console.log('sword.class', 'Finished creating Sword!...');
            return tempObject;
        } catch (e) {
            console.error('sword.class', 'Error creating sword');
        }
    }
}
