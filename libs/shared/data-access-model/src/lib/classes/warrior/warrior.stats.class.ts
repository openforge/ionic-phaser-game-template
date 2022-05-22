import { Level, Salary, Stat } from '@company-name/shared/data-access-model';

/**
 * * This class is a list of typed stats that the warrior has
 */
export class WarriorStats {
    public salary: Salary; // * How much the warrior costs
    public level: Level; // * Current level
    public xp: Stat; // TODO - Experience Points - migrate to it's own stat class

    constructor(data: WarriorStats) {
        console.log('WarriorStats', data);
    }
}
