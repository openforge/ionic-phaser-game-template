import { Component } from '@angular/core';
import { PhaserSingletonService } from '@company-name/example-app/phaser/singleton';

@Component({
    selector: 'openforge-app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public actionsHistoryRef: string[];
    // * for our app template to use the actions History)
    constructor(public phaserInstance: PhaserSingletonService) {
        this.actionsHistoryRef = PhaserSingletonService.actionsHistory;
    }
}
