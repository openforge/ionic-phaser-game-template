/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FinalBonus } from './finalbonus/final-bonus.class';
import { RawBonus } from './rawbonus/raw-bonus.class';
import { BaseStat } from './stat.base.class';

/**
 * * Represents a generic Stat which is equivalent to a "Group" in the Composition Pattern.
 * * Can contain any bonus and has a method for calculating the final value of the stat.
 * * Since it is a subclass of BaseStat, _baseValue is it's starting value
 */
export class Stat extends BaseStat {
    private _rawBonuses = new Set<RawBonus>();
    private _finalBonuses = new Set<FinalBonus>();
    protected _finalValue: number;

    constructor(value: number) {
        super(value);
    }

    protected addRawBonus(_bonus: RawBonus) {
        this._rawBonuses.add(_bonus);
    }

    protected addFinalBonus(_bonus: FinalBonus) {
        this._finalBonuses.add(_bonus);
    }

    protected removeRawBonus(_bonus: RawBonus) {
        this._rawBonuses.delete(_bonus);
    }

    protected removeFinalBonus(_bonus: FinalBonus) {
        this._finalBonuses.delete(_bonus);
    }

    /**
     * * Calculates the final value after RawBonuses and FinalBonuses have been made
     *
     * @returns finalValue
     */
    protected calculateValue(): number {
        this._finalValue = this.baseValue; // * Resets each time this is called
        this.applyRawBonuses();
        this.applyFinalBonuses();
        return this._finalValue;
    }

    /**
     * * A raw bonus is added directly to the stat.
     * * An example would be subtracting costs from your revenue
     */
    protected applyRawBonuses() {
        let rawBonusValue = 0;
        let rawBonusMultiplier = 0;
        for (const _tmp of this._rawBonuses) {
            rawBonusValue += _tmp.baseValue;
            rawBonusMultiplier *= _tmp.baseMultiplier;
        }
        this._finalValue += rawBonusValue;
        this._finalValue *= rawBonusMultiplier;
    }

    /**
     * * Final bonuses are meant to be added AFTER all raw bonuses are added.
     * * As an example, the government only tax your profits (i.e., multiplied after the cost has been deducted)
     */
    protected applyFinalBonuses() {
        let finalBonusValue = 0;
        let finalBonusMultiplier = 0;
        for (const _tmp of this._rawBonuses) {
            finalBonusValue += _tmp.baseValue;
            finalBonusMultiplier *= _tmp.baseMultiplier;
        }

        this._finalValue += finalBonusValue;
        this._finalValue *= 1 + finalBonusMultiplier;
    }

    /**
     * * Returns the calculated Final Value
     */
    public get finalValue() {
        return this.calculateValue();
    }
}
