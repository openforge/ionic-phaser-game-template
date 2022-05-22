import { Component, OnDestroy } from '@angular/core';
import { Event, Warrior } from '@company-name/shared/data-access-model';
import { PhaserSingletonService } from '@company-name/shared-phaser-singleton';
import { ModalController } from '@ionic/angular';

import { ShopPageComponent } from './shop/shop.component';

@Component({
    selector: 'openforge-app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
    public actionsHistoryRef: string[]; // * Store all actions on home screen for printing
    public warriors: Warrior[] = []; // * Array of Warriors since they don't currently have a graphic associated

    // * for our app template to use the actions History)
    constructor(public phaserInstance: PhaserSingletonService, public modalController: ModalController) {
        this.actionsHistoryRef = PhaserSingletonService.actionsHistory;
    }

    public async openShop() {
        const modal = await this.modalController.create({
            component: ShopPageComponent,
            cssClass: 'fullscreen',
        });
        return await modal.present();
    }

    /**
     * * Creates a warrior to be placed on scene
     */
    public async createWarrior() {
        console.log('createWarrior()');
        const tmpWarrior = await Warrior.build(new Warrior());
        this.warriors.push(tmpWarrior);
    }

    /**
     * * Creates a Event and applies it to the Warrior
     *
     * @param _warrior Warrior
     */
    public async doPushUps(_warrior: Warrior) {
        await _warrior.doPushUps();
    }

    /**
     * TODO - Create an Event that modifies XP, and apply it to a random Warrior
     */
    public async createExpEvent() {
        // * This function creates an event that modifies the Warrior's XP.
        const xpEvent = new Event();
        console.log('createEvent()', 'value = ', xpEvent.value);
    }

    /**
     * TODO - Create an Event that modifies SALARY, and apply it to a random Warrior
     */
    public async createSalaryEvent() {
        // * This function creates an event that modifies the Warrior's SALARY.
        const salaryEvent = new Event();
        console.log('createEvent()', 'value = ', salaryEvent.value);
    }

    /**
     * * Need to handle the destroy method so we dont lock up our computer!
     */
    ngOnDestroy(): void {
        PhaserSingletonService.destroyActiveGame();
    }
}
