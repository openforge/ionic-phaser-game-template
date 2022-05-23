/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Stat } from '@company-name/shared/data-access-model';

export class Level extends Stat {
    private static XP_PER_LEVEL = 5;
    private _xp: Stat;

    constructor(startingValue) {
        super(startingValue);
    }

    public setXp(xp: Stat) {
        this._xp = xp;
    }

    /**
     * * Calculates the final value after RawBonuses and FinalBonuses have been made
     *
     * @returns finalValue
     */
    public calculateValue(): number {
        this._finalValue = this._xp.finalValue / Level.XP_PER_LEVEL;
        return this._finalValue;
    }
}
