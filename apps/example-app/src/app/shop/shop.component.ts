import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhaserSingletonService } from '@company-name/example-app/phaser/singleton';
import { SwordTypeEnum } from '@company-name/shared/data-access-model';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'openforge-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopPageComponent implements OnInit {
    public isModal: boolean = false; // * Property to catch if component is on the modal or not
    constructor(private router: Router, private modalController: ModalController) {}

    ngOnInit(): void {
        console.log('ShopPageComponent ngOnInit');
        this.checkIfModal();
    }

    /**
     * * Purchase Sturdy Sword
     */
    public async purchaseSturdySword() {
        console.log('shop.component.ts', 'Purchasing Sturdy Sword...');
        await this.router.navigate(['/home']); // * Travel home first so that Phaser exists
        PhaserSingletonService.shopObservable.next(SwordTypeEnum.STURDY);
    }

    /**
     * * Purchase Cheap Sword
     */
    public purchaseCheapSword() {
        console.log('shop.component.ts', 'Purchasing Cheap Sword...');
        PhaserSingletonService.shopObservable.next(SwordTypeEnum.CHEAP);
    }

    /**
     * * Check if component was opened on a modal
     */
    public checkIfModal() {
        void this.modalController.getTop().then(res => {
            if (res) {
                this.isModal = true;
            }
        });
    }

    /**
     * * Function to close modal
     */
    public closeModal() {
        void this.modalController.dismiss();
    }
}
