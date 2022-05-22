import { Stat } from '../stat.class';
import { Level } from './level.class';

/**
 * * LevelDependentStat's are stats that depend on the level
 */
export class LevelDependentStat extends Stat {
    protected _level: Level;

    public setLevel(level: Level) {
        this._level = level;
    }
}
