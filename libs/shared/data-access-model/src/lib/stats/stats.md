# Stats

Notes:

-   A Stat is a concept that _only_ exists in the instantiated world
-   JEDI REVIEW: "otherwise a Stat is merely a numberic value (baseValue) that is saved to the Database"
-   A Stat & their dependendencies such as any bonuses or other stats are established when the World is built
    -   For example: The current city modifies the salary `citySalaryModifier` so must establish this relationship when the world is being created
-   Each Stat's saved value(baseValue) belongs to the `stats` object of the Primordial object it belongs to
    -   For example: Each Employee has a `stats` field which contains `salary`
-   Since the entire object gets serialized on save, this assured that permanent bonuses are saved in that object, but stats that are used together are never modified by each other (and therefore never saved)
-   A Stat should not modify another Stat,
    -   For example: Say there is an achievement permanently gives a certain Stat a bonus. We create a relationship between them AchievementBonus in the world building logic and add it to that Stat. That bonus object only exists during the game runtime and is not saved. However, this object would know whether or not to apply that bonus b/c it would have a reference to that specific achievement and it has logic to apply a bonus if that achievement has been achieved
-   An object should be able to receive a raw bonus from any event, such as RandomEvent

## BaseStat

## Stat

Stat represents a stat of an object in the instantiated game world.

```ts
export class Stat extends BaseStat {
    private _rawBonuses = new Set<RawBonus>();
    private _finalBonuses = new Set<FinalBonus>();
    protected _finalValue: number;

    constructor(value: number) {
        super(value);
    }

    public addRawBonus(_bonus: RawBonus) {
        this._rawBonuses.add(_bonus);
    }

    public addFinalBonus(_bonus: FinalBonus) {
        this._finalBonuses.add(_bonus);
    }

    public removeRawBonus(_bonus: RawBonus) {
        this._rawBonuses.delete(_bonus);
    }

    public removeFinalBonus(_bonus: FinalBonus) {
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
```

## POC for Employee stats

We want to maintain relationships of classes when one depends on another. For instance, the Level stat depends on the the xp stat. The Level class referes to xp so that we can update the Level value accordingly as xp changes.

```ts
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
```

Because level is a common dependency in the game, we will create the LevelDependentStat class which keeps a reference to the level stat.

```ts
/**
 * LevelDependentStat's are stats that depend on the level
 */
export class LevelDependentStat extends Stat {
    protected _level: Level;

    public setLevel(level: Level) {
        this._level = level;
    }
}
```

Keeping this reference to the Level class allows classes that depending on level in sync to level changes. For example, the Salary stat changes based on Level. We can modify the finalValue for Salary depending on the level.

```ts
export class Salary extends LevelDependentStat {
    private static SALARY_BOOST_PER_LEVEL = 0.06;

    public calculateValue(): number {
        const levelModifier = 1 + this._level.finalValue * Salary.SALARY_BOOST_PER_LEVEL;
        this._finalValue = this.baseValue * levelModifier;
        this.applyRawBonuses();
        this.applyFinalBonuses();
        return this._finalValue;
    }
}
```

Here, the EmployeeStats class sets up the relationships.

```ts
export class EmployeeStats {
    private _salary: Salary;
    private _level: Level;
    private _xp: Stat;

    public EmployeeStats(_data) {
        this._xp = new Stat(_data._xp);
        this._level = new Level(_data._level);
        this._level.setXp(this._xp);
        this._salary = new Salary(_data._salary);
        this._salary.setLevel(this._level);
    }

    get xp(): Stat {
        return this._xp;
    }
    get level(): Level {
        return this._level;
    }
    get salary(): Salary {
        return this._salary;
    }
}
```

Additionally, when objects are being created we can add any other modifiers like below. This logic should be in a higher level class that is creating the objects so that the relationships can be made.

```ts
// Somewhere in one of the WorldFactory that is building the world, we apply the relationships of stats to other stats or bonuses
const employStats = new EmployeeStats(_data.employee.data);
const citySalaryModifier = new RawBonus(0, _data.city.citySalaryModifier);
employStats.salary.addRawBonus(citySalaryModifier);
```
