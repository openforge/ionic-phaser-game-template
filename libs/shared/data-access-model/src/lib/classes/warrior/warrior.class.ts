/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-magic-numbers */
import { PhaserSingletonService } from '@company-name/shared-phaser-singleton';

import { Human } from '../../primordials/human/human.primordial.class';
import { WarriorStats } from './warrior.stats.class';

export class Warrior extends Human {
    public name: string = 'Warrior ' + Math.floor(Math.random() * 1000).toString(); // * If not passed in default to random name
    public stats: WarriorStats; // * The Warrior's Stats

    constructor(data?: Warrior) {
        super(data);
    }

    /**
     * * Builds respective class asynchronously
     *
     * @param serializedData: Warrior
     * @returns Promise<Warrior>
     */
    public static async build(serializedData?: Warrior): Promise<Warrior> {
        console.log('warrior.class', 'constructor()');
        const tempObject = new Warrior(serializedData);
        try {
            return tempObject;
        } catch (e) {
            console.error('Error creating warrior');
        }
    }

    /**
     * * The warrior exercises via pushups, and gains XP
     * Example of a class giving itself a stat bonus
     */
    public async doPushUps() {
        PhaserSingletonService.actionsHistory.push(this.name + ' is doing pushups.  XP Gained');
        // TODO - Warrior increases XP by 1
    }
}
