import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'openforge-design-studio',
    templateUrl: './design-studio.component.html',
    styleUrls: ['./design-studio.component.scss'],
})
export class DesignStudioComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        console.log('design-studio page');
    }
}
