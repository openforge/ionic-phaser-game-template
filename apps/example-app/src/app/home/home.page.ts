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
     * The initialisation is delayed by 500ms to give the HomePage the chance to render
     * the <div class="phaser" id="forge-main">
     *
     * If we don't delay it, the canvas size in preload() and create() will be 0.
     * With the delay the canvas size will be set correctly.
     */
    async ngOnInit() {
        setTimeout(this.init, 500);
    }

    async init() {
        await PhaserSingletonService.init();
    }
}
