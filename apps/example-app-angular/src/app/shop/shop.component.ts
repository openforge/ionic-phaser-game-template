/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwordTypeEnum } from '@company-name/shared/data-access-model';
import { PhaserSingletonService } from '@company-name/shared-phaser-singleton';
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
     * * Purchase Sword
     */
    public async purchaseSword(type: string): Promise<void> {
        const swordType = type === 'fancy' ? SwordTypeEnum.FANCY : SwordTypeEnum.CHEAP;
        console.log('shop.component.ts', `Purchasing ${swordType} Sword...`);
        await this.router.navigate(['/home']); // * Travel home first so that Phaser exists
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        PhaserSingletonService.shopObservable.next(swordType);
        if (this.isModal) {
            this.closeModal();
        }
    }

    /**
     * * Check if component was opened on a modal
     */
    public checkIfModal(): void {
        void this.modalController.getTop().then(res => {
            if (res) {
                this.isModal = true;
            }
        });
    }

    /**
     * * Function to close modal
     */
    public closeModal(): void {
        void this.modalController.dismiss();
    }
}
