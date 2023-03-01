/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unsafe-argument */
/**
 * * FinalBonus is added to the Stat AFTER everything else has been calculated
 */

import { BaseStat } from '../stat.base.class';

export class FinalBonus extends BaseStat {
    constructor(value, multiplier) {
        super(value, multiplier);
    }
}
