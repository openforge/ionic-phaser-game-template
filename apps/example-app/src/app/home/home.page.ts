import { Component, OnInit } from '@angular/core';
// TODO - Resolve import/no-resolved for singleton instance
// eslint-disable-next-line import/no-unresolved
import { PhaserSingletonService } from 'libs/example-app/phaser/singleton/src/lib/phaser-singleton.module';

@Component({
    selector: 'openforge-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePageComponent implements OnInit {
    /**
     * * On Init, initilize the Phaser Singleton instance
     */
    async ngOnInit() {
        await PhaserSingletonService.init();
    }
}
