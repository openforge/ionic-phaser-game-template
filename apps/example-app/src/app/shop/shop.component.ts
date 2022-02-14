import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'openforge-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopPageComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        console.log('ShopPageComponent ngOnInit');
    }

    purchaseSturdySword() {
        console.log('tbd...');
    }
}
