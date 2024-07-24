import { IHero, IUpgrade } from '@interfaces';
import { GameObjects, Scene, Tilemaps } from 'phaser';
import Hero from 'src/Entities/Hero';

export default class HeroGameObject extends Phaser.GameObjects.Sprite  {
    private _texture: string | Phaser.Textures.Texture;
    private _map: Tilemaps.Tilemap;
    private _target: { x: number; y: number } = { x: 0, y: 0 };
    private _heroStats: Hero;
    constructor(
        scene: Scene,
        x: number,
        y: number,
        texture: string,
        map: Tilemaps.Tilemap,
        heroStats: Hero
    ) {
        super(scene, x, y, texture);
        this._texture = texture;
        this._map = map;
        this._heroStats = heroStats;


        this.initAnimations();
        this.setOrigin(0, 0);

        this.scene.time.addEvent({
            delay: 1000,
            callback: this.moveRandomly,
            callbackScope: this,
            loop: true,
        });
    }


    initAnimations(): void {
        this.anims.create({
            key: `${this._texture}_idle`,
            frames: this.anims.generateFrameNumbers(this._texture as string, {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 6,
            repeat: -1,
        });
        this.play(`${this._texture}_idle`);
    }

    moveRandomly() {
        var dx = this._target.x - this.x - 16;
        var dy = this._target.y - this.y - 16;

        if (dx === 0 && dy === 0) {
            return;
        }

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                this.x += 16;
            } else {
                this.x -= 16;
            }
        } else {
            if (dy > 0) {
                this.y += 16;
            } else {
                this.y -= 16;
            }
        }
    }
    public SetTarget(x: number, y: number) {
        this._target.x = x;
        this._target.y = y;
    }
    public get HeroStats(): Hero {
        return this._heroStats;
    }

    public set HeroStats(value: Hero) {
        this._heroStats = value;
    }

    
}
