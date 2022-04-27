/**
 * * RawBonus is added to the raw value of the Attribute
 */

import { BaseAttribute } from '../base-attribute.class';

export class RawBonus extends BaseAttribute {
    constructor(value, multiplier) {
        super(value, multiplier);
    }
}
