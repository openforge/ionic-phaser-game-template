/**
 * * FinalBonus is added to the Attribute AFTER everything else has been calculated
 */

import { BaseAttribute } from '../base-attribute.class';

export class FinalBonus extends BaseAttribute {
    constructor(value, multiplier) {
        super(value, multiplier);
    }
}
