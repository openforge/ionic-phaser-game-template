/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Level, Stat } from '@company-name/shared/data-access-model';

/**
 * * LevelDependentStat's are stats that depend on the level
 */
export class LevelDependentStat extends Stat {
    protected _level: Level;

    public setLevel(level: Level): void {
        this._level = level;
    }
}
