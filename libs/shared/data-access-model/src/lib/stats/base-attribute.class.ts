/**
 * * The base attribute class is used as part of the Composite Object Oriented Pattern
 * * This allows us to easily handle many types of stats and groupings
 * * Inspiration taken from
 * * https://gamedevelopment.tutsplus.com/tutorials/using-the-composite-design-pattern-for-an-rpg-attributes-system--gamedev-243
 */

export class BaseAttribute {
    private _baseValue: number;
    private _baseMultiplier: number;

    constructor(_value, _multiplier) {
        this._baseValue = _value;
        this._baseMultiplier = _multiplier;
    }

    public get baseValue() {
        return this._baseValue;
    }

    public get baseMultiplier() {
        return this._baseMultiplier;
    }
}
