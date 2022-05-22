import { SwordTypeEnum } from './sword.enum';

/**
 * * Sword class is primordial, which means multiple types extend this.
 */
export class Sword {
    public swordType: SwordTypeEnum; // * The type of sword, passed in via constructor

    constructor() {}
}
