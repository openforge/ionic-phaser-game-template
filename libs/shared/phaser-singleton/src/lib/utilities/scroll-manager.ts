/* eslint-disable no-magic-numbers */
import * as Phaser from 'phaser';

type BackgroundImage = Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.ComputedSize;
type PanningTarget = Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform;

export class ScrollManager {
    private startingPositionX = 0;
    private startingPositionY = 0;
    private startScrollX = 0;
    private startScrollY = 0;
    private nextScrollX = 0;
    private nextScrollY = 0;
    private maxScrollX = 0;
    private maxScrollY = 0;
    private minScrollX = 0;
    private minScrollY = 0;
    private scrollLeft = false;
    private scrollRight = false;
    private scrollUp = false;
    private scrollDown = false;
    private scene: Phaser.Scene;
    private backgroundImage: Phaser.GameObjects.Components.ComputedSize;
    private panningTarget: PanningTarget;

    constructor(scene: Phaser.Scene) {
        console.log('scroll-manager.ts', 'Constructor for ScrollManager');
        this.scene = scene;
        this.scene.events.on(Phaser.Scenes.Events.CREATE, this.create, this);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    /**
     * * Scrolls the scene to the center over a duration.  Higher the duration, the slower the scroll.
     */
    public scrollToCenter(): void {
        this.scene.tweens.add({
            targets: this,
            nextScrollX: this.maxScrollX / 2,
            nextScrollY: this.maxScrollY / 2,
            duration: 1000,
        });
    }

    /**
     * * Scrolls to the specified coordinates
     *
     * @param x Origin number
     * @param y Origin
     */
    public scrollTo(x: number, y: number): void {
        this.scene.tweens.add({
            targets: this,
            nextScrollX: x,
            nextScrollY: y,
            duration: 1000,
        });
    }
    /**
     * Sizes the camera boundaries to the image's scaled dimensions. Also attaches drag listeners to the
     *  game object, allowing for click and drag on the background.
     *
     * @param object the image background to size the scrolling to and attach drag listeners to.
     */
    public registerScrollingBackground(object: BackgroundImage): void {
        console.log('registerScrollingBackground', object);
        this.backgroundImage = object;
        this.applyScrollingHandlers(object);
    }
    /**
     * * Unregisters the scrollingBackgroundImage
     *
     * @param object BackgroundImage
     */
    public unregisterScrollingBackground(object: BackgroundImage): void {
        console.log('unregisterScrollingBackground()');
        if (!(object.input && object.input.enabled)) {
            object.disableInteractive();
        }
        this.scene.input.setDraggable(object, false);
        object.removeAllListeners();
    }
    /**
     * Pans the background in the x direction for a specified duration
     *
     * @param duration the duration of the pan in milliseconds
     */
    public panBackground(duration: number = 1000): void {
        this.scene.add.tween({
            targets: this,
            nextScrollX: {
                from: 0,
                to: this.backgroundImage.displayWidth - this.scene.scale.width * 2.25,
            },
            duration,
            ease: Phaser.Math.Easing.Cubic.Out,
        });
    }

    /**
     * * Create call is necessary - here we handle the scroll coordinate logic
     */
    private create() {
        console.log('create()');
        // * Set drag distance to a reasonable amount to avoid accidental drag
        this.scene.input.dragDistanceThreshold = 16;

        const backgroundasImage = this.backgroundImage as Phaser.GameObjects.Image;
        this.minScrollX = 0 - backgroundasImage.displayOriginX;
        this.minScrollY = 0 - backgroundasImage.displayOriginY;
        this.maxScrollX = this.backgroundImage.displayWidth - this.scene.scale.width;
        this.maxScrollY = this.backgroundImage.displayHeight - this.scene.scale.height;

        this.nextScrollX = this.startingPositionX;
        this.nextScrollY = this.startingPositionY;
        this.scene.cameras.main.setScroll(this.nextScrollX, this.nextScrollY);
        console.log('scroll-manager.ts', 'create() - Finished');
    }

    /**
     * * Required phaser lifecycle event, happens every tick.
     */
    private update() {
        // ---> Noisy log console.log('scroll-manager.ts', 'update');
        this.scene.cameras.main.setScroll(this.nextScrollX, this.nextScrollY);
        if (this.panningTarget) {
            const { x: pointerX, y: pointerY } = this.scene.input.activePointer;
            const { scrollX, scrollY } = this.scene.cameras.main;
            this.panningTarget.setPosition(pointerX + scrollX, pointerY + scrollY);
        } else {
            this.scrollLeft = false;
            this.scrollRight = false;
            this.scrollUp = false;
            this.scrollDown = false;
        }
    }

    /**
     * * Handles the actual scroll by listening for dragstart and drag
     * * Note:
     *
     * @param object any Phaser.GameObjects.GameObject
     */
    private applyScrollingHandlers(object: Phaser.GameObjects.GameObject) {
        console.log('applyScrollingHandlers()');
        if (!(object.input && object.input.enabled)) {
            object.setInteractive();
        }
        this.scene.input.setDraggable(object);
        object
            .on('dragstart', () => {
                const { scrollX: startScrollX, scrollY: startScrollY } = this.scene.cameras.main;
                this.startScrollX = startScrollX;
                this.startScrollY = startScrollY;
            })
            .on('drag', (pointer: Phaser.Input.Pointer) => {
                const { startScrollX, startScrollY } = this;
                this.nextScrollX = startScrollX - (pointer.x - pointer.downX);
                this.nextScrollY = startScrollY - (pointer.y - pointer.downY);
            });
    }
}
