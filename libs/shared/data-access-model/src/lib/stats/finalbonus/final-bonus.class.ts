/**
 * * FinalBonus is added to the Stat AFTER everything else has been calculated
 */

import { BaseStat } from '../base.stat.class';

export class FinalBonus extends BaseStat {
    constructor(value, multiplier) {
        super(value, multiplier);
    }
}
