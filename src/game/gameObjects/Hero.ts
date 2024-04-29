import { GameObjects, Scene, Tilemaps } from 'phaser';
import Monster from './Monster';
export default class Hero extends GameObjects.Sprite
{
    private _texture: string | Phaser.Textures.Texture;
    private _map: Tilemaps.Tilemap;
    private _target: { x: number, y: number } = { x: 0, y: 0 };
    constructor(scene: Scene, x: number, y: number, texture: string, map: Tilemaps.Tilemap, frame?: string | number)
    {
        super(scene, x, y, texture, frame);
        this._texture = texture;
        this._map = map;

        this.initAnimations();
        this.setOrigin(0, 0)

        this.scene.time.addEvent({
            delay: 1000,
            callback: this.moveRandomly,
            callbackScope: this,
            loop: true
        });


    }

    initAnimations(): void
    {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this._texture as string, { frames: [0, 1, 2, 3] }),
            frameRate: 6,
            repeat: -1
        });
        this.play('idle');
    }

    moveRandomly()
    {
        var dx = this._target.x - this.x - 16;
        var dy = this._target.y - this.y - 16;
        console.log(dx)
        console.log(dy)

        if (dx === 0 && dy === 0)
        {
            return;
        }

        if (Math.abs(dx) > Math.abs(dy))
        {
            if (dx > 0)
            {
                this.x += 16;
            } else
            {
                this.x -= 16;
            }
        } else
        {
            if (dy > 0)
            {
                this.y += 16;
            } else
            {
                this.y -= 16;
            }
        }
    }
    public SetTarget(x: number, y: number)
    {
        this._target.x = x;
        this._target.y = y;
    }
}

