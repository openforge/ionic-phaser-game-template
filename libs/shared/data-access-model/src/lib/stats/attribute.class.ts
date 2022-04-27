/**
 * * Attribute class is equivalent to a "Group" in the Composition Pattern.
 * * It can hold any raw or final bonuses and has a method for calculating the final value of the attribute.
 * * Since it is a subclass of baseAttribute, _baseValue is it's starting value
 */

import { BaseAttribute } from './base-attribute.class';
import { FinalBonus } from './final-bonus.class';
import { RawBonus } from './raw-bonus.class';

export class Attribute extends BaseAttribute {
    private _rawBonuses: RawBonus[] = [];
    private _finalBonuses: FinalBonus[] = [];
    private _finalValue: number;

    constructor(value: number) {
        super(value);

        this._finalValue = this.baseValue; // baseValue is derived from BaseAttribute
    }

    public addRawBonus(_bonus: RawBonus) {
        this._rawBonuses.push(_bonus);
    }

    public addFinalBonus(_bonus: FinalBonus) {
        this._finalBonuses.push(_bonus);
    }

    public removeRawBonus(_bonus: RawBonus) {
        // * Recommended as better approach for ES6 https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
        this._rawBonuses.forEach((item, index) => {
            if (item === _bonus) this._rawBonuses.splice(index, 1);
        });
    }

    public removeFinalBonus(_bonus: FinalBonus) {
        // * Recommended as better approach for ES6 https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
        this._finalBonuses.forEach((item, index) => {
            if (item === _bonus) this._finalBonuses.splice(index, 1);
        });
    }

    /**
     * * Calcualtes the final value
     *
     * @returns finalValue
     */
    private calculateValue(): number {
        this._finalValue = this.baseValue; // * Resets each time this is called

        // * The following code adds the RAWBONUS values
        let rawBonusValue = 0;
        let rawBonusMultiplier = 0;
        for (const _tmp of this._rawBonuses) {
            rawBonusValue += _tmp.baseValue;
            rawBonusMultiplier += _tmp.baseMultiplier;
        }
        this._finalValue += rawBonusValue;
        this._finalValue *= rawBonusMultiplier;

        // * Next, we add the FinalBonus Values
        let finalBonusValue = 0;
        let finalBonusMultiplier = 0;
        for (const _tmp of this._rawBonuses) {
            finalBonusValue += _tmp.baseValue;
            finalBonusMultiplier += _tmp.baseMultiplier;
        }

        this._finalValue += finalBonusValue;
        this._finalValue *= 1 + finalBonusMultiplier;

        return this._finalValue;
    }

    /**
     * * Returns the calculated Final Value
     */
    public get finalValue() {
        return this.calculateValue();
    }
}
