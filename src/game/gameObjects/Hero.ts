import { IHero, IUpgrade } from '@interfaces';
import { GameObjects, Scene, Tilemaps } from 'phaser';

export default class Hero extends Phaser.GameObjects.Sprite implements IHero  {
    private _texture: string | Phaser.Textures.Texture;
    private _map: Tilemaps.Tilemap;
    private _target: { x: number; y: number } = { x: 0, y: 0 };
    private _id: string;
    private _name: string;
    private _price: number;
    private _level: number;
    private _hp: number;
    private _maxHp: number;
    private _dps: number;
    private _upgrade: IUpgrade;
    constructor(
        scene: Scene,
        x: number,
        y: number,
        texture: string,
        map: Tilemaps.Tilemap,
        id: string,
        name: string,
        price: number,
        level: number,
        hp: number,
        maxHp: number,
        dps: number,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
        this._texture = texture;
        this._map = map;

        this._id = id;
        this._name = name;
        this._price = price;
        this._level = level;
        this._hp = hp;
        this._maxHp = maxHp;
        this._dps = dps;

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
    public get Id(): string {
        return this._id;
    }

    public set Id(value: string) {
        this._id = value;
    }

    public get Name(): string {
        return this._name;
    }

    public set Name(value: string) {
        this._name = value;
    }

    public get Price(): number {
        return this._price;
    }

    public set Price(value: number) {
        this._price = value;
    }

    public get Level(): number {
        return this._level;
    }

    public set Level(value: number) {
        this._level = value;
    }

    public get Hp(): number {
        return this._hp;
    }

    public set Hp(value: number) {
        this._hp = value;
    }

    public get MaxHp(): number {
        return this._maxHp;
    }

    public set MaxHp(value: number) {
        this._maxHp = value;
    }

    public get Dps(): number {
        return this._dps;
    }

    public set Dps(value: number) {
        this._dps = value;
    }
}
