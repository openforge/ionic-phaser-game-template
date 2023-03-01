/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unsafe-argument */
/**
 * * RawBonus is added to the raw value of the Stat
 */

import { BaseStat } from '../stat.base.class';

export class RawBonus extends BaseStat {
    constructor(value, multiplier) {
        super(value, multiplier);
    }
}
