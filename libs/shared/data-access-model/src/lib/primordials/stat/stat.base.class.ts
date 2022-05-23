/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * * BaseStat class value is one that comes directly from the serialized data without any kind of modifications
 * * The BaseStats class is used as part of the Composite OOP. This allows us to easily handle many types of stats and groupings
 * * Inspiration taken from https://gamedevelopment.tutsplus.com/tutorials/using-the-composite-design-pattern-for-an-rpg-attributes-system--gamedev-243
 */
export class BaseStat {
    private _baseValue: number; // * base value of the Stat
    private _baseMultiplier: number; // * Base multiplier of the Stat

    /**
     * * BaseStat is the origin of all stats
     *
     * @param _value value to be constructed with
     * @param _multiplier Optional multiplier - not every child will inherit this
     */
    constructor(_value: number, _multiplier?) {
        console.log('BaseStat', 'value =', _value, 'multiplier = ', _multiplier);
        this._baseValue = _value;
        this._baseMultiplier = _multiplier || 0;
    }

    public get baseValue() {
        return this._baseValue;
    }

    public set baseValue(_baseValue) {
        this._baseValue = _baseValue;
    }

    public get baseMultiplier() {
        return this._baseMultiplier;
    }

    public set baseMultiplier(_baseMultiplier) {
        this._baseMultiplier = _baseMultiplier;
    }
}
