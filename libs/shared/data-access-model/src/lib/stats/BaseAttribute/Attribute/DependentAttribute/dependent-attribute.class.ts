import { Attribute } from '../attribute.class';
/**
 * * DependentAttribute's are stats that depend on others.  In an RPG game for instance, your "Attack Speed" is based
 * * on not only the weapon you use, but also your dexterity as well.
 */
export class DependentAttribute extends Attribute {
    protected _otherAttributes: Attribute[] = []; // * List of other (unknown) attributes.  Calculated from classes that extend DependentAttribute
    constructor(startingValue: number) {
        super(startingValue);
    }

    /**
     * * Adds the attribute to the _otherAttributes array
     *
     * @param attr Attribute
     */
    public addAttribute(attr: Attribute) {
        this._otherAttributes.push(attr);
    }

    /**
     * * Removes the attribute from the _otherAttributes array
     *
     * @param attr Attribute
     */
    public removeAttribute(attr: Attribute) {
        this._otherAttributes.forEach((item, index) => {
            if (item === attr) this._otherAttributes.splice(index, 1);
        });
    }

    /**
     * TODO - Do we need to provide calculateValue() here?  It's already inherited from attribute.class.ts
     *
     * @returns finalValue
     */
    // protected override calculateValue(): number {
    //     this._finalValue = this.baseValue;
    //     this.applyRawBonuses();
    //     this.applyFinalBonuses();
    //     return this._finalValue;
    // }
}
