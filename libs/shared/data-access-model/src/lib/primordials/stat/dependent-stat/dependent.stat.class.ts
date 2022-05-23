/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Stat } from '../stat.class';

/**
 * * DependentStat's are stats that depend on others.  In an RPG game for instance, your "Attack Speed" is based
 * * on not only the weapon you use, but also your dexterity as well.
 */
export class DependentStat extends Stat {
    protected _otherStats = new Set<Stat>(); // * List of other (unknown) stats.  Calculated from classes that extend DependentStat

    constructor(startingValue: number) {
        super(startingValue);
    }

    /**
     * * Adds the stat to the _otherStats array
     *
     * @param stat Stat
     */
    public addStat(stat: Stat) {
        this._otherStats.add(stat);
    }

    /**
     * * Removes the stat from the _otherStats array
     *
     * @param stat Stat
     */
    public removeStat(stat: Stat) {
        this._otherStats.delete(stat);
    }

    /**
     * * Calculates the final value after RawBonuses and FinalBonuses have been made
     *
     * @returns finalValue
     */
    protected calculateValue(): number {
        this._finalValue = super.calculateValue();

        return this._finalValue;
    }
}
