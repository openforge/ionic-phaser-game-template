/**
 * * DependentAttribute
 */

import { Attribute } from '../attribute.class';

export class DependentAttribute extends Attribute {
    protected _otherAttributes: Attribute[] = []; // * List of other (unknown) attributes.  Calculated from classes that extend DependentAttribute
    constructor(startingValue: number) {
        super(startingValue);
    }

    public addAttribute(attr: Attribute) {
        this._otherAttributes.push(attr);
    }

    public removeAttribute(attr: Attribute) {
        this._otherAttributes.forEach((item, index) => {
            if (item === attr) this._otherAttributes.splice(index, 1);
        });
    }

    protected override calculateValue(): number {
        this._finalValue = this.baseValue;
        this.applyRawBonuses();
        this.applyFinalBonuses();
        return this._finalValue;
    }
}
