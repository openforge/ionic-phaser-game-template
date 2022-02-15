import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhaserSingletonService } from '@company-name/example-app/phaser/singleton';
import { SwordTypeEnum } from '@company-name/shared/data-access-model';

@Component({
    selector: 'openforge-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        console.log('ShopPageComponent ngOnInit');
    }

    /**
     * * Purchase FANCY Sword
     */
    public async purchaseFANCYSword() {
        console.log('shop.component.ts', 'Purchasing FANCY Sword...');
        await this.router.navigate(['/home']); // * Travel home first so that Phaser exists
        PhaserSingletonService.shopObservable.next(SwordTypeEnum.FANCY);
    }

    /**
     * * Purchase Cheap Sword
     */
    public purchaseCheapSword() {
        console.log('shop.component.ts', 'Purchasing Cheap Sword...');
        PhaserSingletonService.shopObservable.next(SwordTypeEnum.CHEAP);
    }
}
