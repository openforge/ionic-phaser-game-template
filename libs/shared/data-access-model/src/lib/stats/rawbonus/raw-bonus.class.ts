/**
 * * RawBonus is added to the raw value of the Stat
 */

import { BaseStat } from '../base.stat.class';

export class RawBonus extends BaseStat {
    constructor(value, multiplier) {
        super(value, multiplier);
    }
}
