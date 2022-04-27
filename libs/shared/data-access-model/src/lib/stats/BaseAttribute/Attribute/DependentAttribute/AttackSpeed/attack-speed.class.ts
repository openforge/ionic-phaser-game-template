/**
 * * AttackSpeed is a DependentAttribute
 */

import { DependentAttribute } from '../dependent-attribute.class';

export class AttackSpeed extends DependentAttribute {
    constructor(startingValue) {
        super(startingValue);
    }

    /**
     * * AttackSpeed has an overriden function that includes DEXTERITY in the calculation
     *
     * @returns calculated finalValue
     */
    protected override calculateValue(): number {
        this._finalValue = this.baseValue;

        // * Every 5 points of DEX adds 1 to attack speed
        const dexterity = this._otherAttributes[0].finalValue;
        this._finalValue += dexterity / 5;
        this.applyRawBonuses();
        this.applyFinalBonuses();

        return this._finalValue;
    }
}
