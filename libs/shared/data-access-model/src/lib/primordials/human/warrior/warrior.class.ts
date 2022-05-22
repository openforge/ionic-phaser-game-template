import { Human } from '../human.primordial.class';

export class Warrior extends Human {
    public name: string = 'John Doe'; // * If not passed in, default to John Doe

    constructor(data?: Warrior) {
        super(data);
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param serializedData: Warrior
     * @returns Promise<Warrior>
     */
    public static async build(serializedData?: Warrior): Promise<Warrior> {
        console.log('warrior.class', 'constructor()');
        const tempObject = new Warrior(serializedData);
        try {
            return tempObject;
        } catch (e) {
            console.error('Error creating warrior');
        }
    }
}
