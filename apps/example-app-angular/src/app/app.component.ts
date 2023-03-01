/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

    public async openShop(): Promise<void> {
        const modal = await this.modalController.create({
            component: ShopPageComponent,
            cssClass: 'fullscreen',
        });
        return await modal.present();
    }

    /**
     * * Creates a warrior to be placed on scene
     */
    public async createWarrior(): Promise<void> {
        console.log('createWarrior()');
        const tmpWarrior = await Warrior.build(new Warrior());
        this.warriors.push(tmpWarrior);
    }

    /**
     * * Creates a Event and applies it to the Warrior
     *
     * @param _warrior Warrior
     */
    public async doPushUps(_warrior: Warrior): Promise<void> {
        await _warrior.doPushUps();
    }

    /**
     * * Creates a Event and applies it to a random Warrior
     */
    public async createEvent(): Promise<void> {
        // * This function creates an 'experience' event that modifies the Warrior
        const xpEvent = new Event();
        console.log('createEvent()', 'value = ', xpEvent.value);
    }

    /**
     * * Need to handle the destroy method so we dont lock up our computer!
     */
    ngOnDestroy(): void {
        PhaserSingletonService.destroyActiveGame();
    }
}
