/* eslint-disable no-magic-numbers */
import * as Phaser from 'phaser';

type BackgroundImage = Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.ComputedSize;
type PanningTarget = Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform;

const PANNING_AXIS_VELOCITY = 12;

export class ScrollManager {
    private startingPositionX = 0;
    private startingPositionY = 800;
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
    private canGoHalfOffscreen: boolean;
    private scene: Phaser.Scene;
    private backgroundImage: Phaser.GameObjects.Components.ComputedSize;
    private panningTarget: PanningTarget;

    constructor(scene: Phaser.Scene, canGoHalfOffscreen: boolean) {
        console.log('scroll-manager.ts', 'Constructor for ScrollManager');
        this.scene = scene;
        this.canGoHalfOffscreen = canGoHalfOffscreen;
        this.scene.events.on(Phaser.Scenes.Events.CREATE, this.create, this);
        this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    public changeStartingPosition(x: number, y: number) {
        this.startingPositionX = x;
        this.startingPositionY = y;
    }
    public scrollToCenter() {
        this.scene.tweens.add({
            targets: this,
            nextScrollX: this.maxScrollX / 2,
            nextScrollY: this.maxScrollY / 2,
            duration: 1000,
        });
    }
    public scrollTo(x: number, y: number) {
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
    public registerScrollingBackground(object: BackgroundImage) {
        console.log('registerScrollingBackground', object);
        this.backgroundImage = object;
        this.applyScrollingHandlers(object);
    }
    /**
     * * Unregisters the scrollingBackgroundImage
     *
     * @param object BackgroundImage
     */
    public unregisterScrollingBackground(object: BackgroundImage) {
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
    public panBackground(duration: number = 1000) {
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
     * Attaches the same background drag listeners to game objects that overlay the background; otherwise,
     *  many objects without appearance will capture events and seem to prevent dragging on certain areas of
     *  the background.
     *
     * @param object the object to attach drag listeners to.
     */
    public registerScrollingElement(object: Phaser.GameObjects.GameObject) {
        this.applyScrollingHandlers(object);
    }

    /**
     *
     * @param object usually a container, an object to move statically with the camera.
     */
    public registerFixedObject(object: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform) {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
            const { nextScrollX, nextScrollY } = this;
            object.setPosition(nextScrollX, nextScrollY);
        });
    }

    /**
     * *
     */
    public cameraScrollLogic() {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, () => {});
    }

    /**
     * * Create call is necessary - here we handle the scroll coordinate logic
     */
    private create() {
        this.scene.input.dragDistanceThreshold = 16;
        const backgroundasImage = this.backgroundImage as Phaser.GameObjects.Image;
        console.log('scroll-manager.ts', 'backgroundasImage = ', backgroundasImage);
        this.minScrollX = 0 - backgroundasImage.displayOriginX;
        this.minScrollY = 0 - backgroundasImage.displayOriginY;
        this.maxScrollX = this.backgroundImage.displayWidth - this.scene.scale.width;
        this.maxScrollY = this.backgroundImage.displayHeight - this.scene.scale.height;

        if (this.canGoHalfOffscreen) {
            const halfScreenWidth = this.scene.scale.width / 2;
            const halfScreenHeight = this.scene.scale.height / 2;
            this.minScrollX -= halfScreenWidth;
            this.minScrollY -= halfScreenHeight;
            this.maxScrollX += halfScreenWidth;
            this.maxScrollY += halfScreenHeight;
        }

        this.nextScrollX = this.startingPositionX;
        this.nextScrollY = this.startingPositionY;
        this.scene.cameras.main.setScroll(this.nextScrollX, this.nextScrollY);
        console.log('scroll-manager.ts', 'create() - Finished');
    }
    private preUpdate() {
        this.nextScrollX = this.nextScrollX + (this.scrollRight ? PANNING_AXIS_VELOCITY : 0) - (this.scrollLeft ? PANNING_AXIS_VELOCITY : 0);
        this.nextScrollY = this.nextScrollY + (this.scrollUp ? PANNING_AXIS_VELOCITY : 0) - (this.scrollDown ? PANNING_AXIS_VELOCITY : 0);
    }

    private update() {
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

    private applyScrollingHandlers(object: Phaser.GameObjects.GameObject) {
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
