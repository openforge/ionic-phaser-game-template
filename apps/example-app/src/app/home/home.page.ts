import { Component, OnInit } from '@angular/core';
import { PhaserSingletonService } from 'libs/example-app/phaser/singleton/src/lib/phaser-singleton.module';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

    /**
     * * On Init, initilize the Phaser Singleton instance
     */
    async ngOnInit() {
        await PhaserSingletonService.init();
    }
}
