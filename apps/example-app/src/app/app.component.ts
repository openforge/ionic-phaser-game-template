import { Component } from '@angular/core';
import { PhaserSingletonService } from '@company-name/example-app/phaser/singleton';
import { ModalController } from '@ionic/angular';

import { ShopPageComponent } from './shop/shop.component';

@Component({
    selector: 'openforge-app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public actionsHistoryRef: string[];
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
}
