import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, NgZone, Optional, SkipSelf } from '@angular/core';
import { SwordTypeEnum } from '@company-name/shared/data-access-model';
import * as Phaser from 'phaser';
import { Subject } from 'rxjs';

import { WorldScene } from './scenes/world.scene';

/**
 * * The PhaserInstance is a singleton that controls the Game Scene, which is the UI portion of the Game Engine
 */

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
})
export class PhaserSingletonService {
    // * We need the Phaser.Game to live inside our own class because extending Phaser.Game would require a super call
    public static activeGame: Phaser.Game;
    private static ngZone: NgZone;
    public static actionsHistory: string[] = []; // * Since phaser is a singleton, let's store the history of actions here for all components.
    public static shopObservable: Subject<SwordTypeEnum> = new Subject<SwordTypeEnum>();

    constructor(private _ngZone: NgZone, @Optional() @SkipSelf() parentModule?: PhaserSingletonService) {
        if (parentModule) {
            console.error('Phaser Singleton is already loaded. Import it in the AppModule only');
        } else {
            PhaserSingletonService.ngZone = this._ngZone;
            PhaserSingletonService.actionsHistory.push('Initializing Phaser...');
        }
    }

    /**
     * * This function is required for singleton instance
     *
     * @returns PhaserSingletonService & List of Providers
     */
    public static forRoot(): ModuleWithProviders<PhaserSingletonService> {
        return {
            ngModule: PhaserSingletonService,
            providers: [],
        };
    }

    /**
     * * When A user Logs out, destroy the active game.
     */
    public static destroyActiveGame(): void {
        //* Param 1: Set to true if you would like the parent canvas element removed from the DOM.
        //* Param 2: Set to false  If you do need to create another game instance on the same page
        if (PhaserSingletonService.activeGame) {
            PhaserSingletonService.activeGame.destroy(true, false);
        }
    }

    /**
     * * Initializes the active Phaser.Game
     * * The Phaser.Game instance owns Scene Manager, Texture Manager, Animations FrameHandler, and Device Class as GLOBALS
     * * The Scene Manager owns the individual Scenes and is accessed by activeGame.scene
     * * Each Scene owns it's own "world", which includes all game objects.
     * ! GameInstance must be the parent class to scenes.
     * ! Should only be called *when* we want it to load in memory.  I.e. during simulation.
     */
    public static async init(): Promise<void> {
        console.warn('phaser-singleton init');
        /**
         * * Phaser by default runs at 60 FPS, and each frame that triggers change detection in Angular which causes
         * * Performance to go out the door.  NgZone's runOutsideAngular will prevent Phaser from automatically hitting change detection
         * * https://angular.io/guide/zone
         */

        PhaserSingletonService.ngZone.runOutsideAngular(() => {
            if (!PhaserSingletonService.activeGame) {
                // To scale game to always fit in parent container
                // https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html
                PhaserSingletonService.activeGame = new Phaser.Game({
                    type: Phaser.AUTO,
                    scale: {
                        mode: Phaser.Scale.RESIZE,
                        width: window.innerWidth,
                        autoCenter: Phaser.Scale.CENTER_BOTH,
                        height: window.innerHeight,
                    },
                    parent: 'forge-main',
                    scene: [WorldScene],
                    plugins: {
                        global: [],
                        scene: [],
                    },
                    fps: {
                        forceSetTimeOut: true,
                    },
                    render: {
                        transparent: false,
                    },
                });
            }
        });
    }

    /**
     * * gets the actionsHistory
     *
     * @returns string[]
     */
    public static getActionsHistory(): string[] {
        return PhaserSingletonService.actionsHistory;
    }
}
