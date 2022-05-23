import { LevelDependentStat } from '@company-name/shared/data-access-model';

export class Salary extends LevelDependentStat {
    // eslint-disable-next-line no-magic-numbers
    private static SALARY_BOOST_PER_LEVEL = 0.06; // TODO - Document why static or change to this.__

    /**
     * * Calculates salary with the BOOST_PER_LEVEL and all modifiers
     *
     * @returns salary Number
     */
    public calculateValue(): number {
        const levelModifier = 1 + this._level.finalValue * Salary.SALARY_BOOST_PER_LEVEL;
        this._finalValue = this.baseValue * levelModifier;
        this.applyRawBonuses();
        this.applyFinalBonuses();
        return this._finalValue;
    }
}
