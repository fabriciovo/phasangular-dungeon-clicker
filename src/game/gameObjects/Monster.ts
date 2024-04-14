import { GameObjects, Scene, Input } from 'phaser';
import HealthBar from '../gameComponents/Healthbar';
import { EventBus } from '../EventBus';
import ShakePosition from 'phaser3-rex-plugins/plugins/behaviors/shake/ShakePosition';
export default class Monster extends GameObjects.Sprite
{
    private _texture: string | Phaser.Textures.Texture;
    private _healthbar: HealthBar;
    private _hp = 20;
    private _maxHp = 20;
    private _xOrigin: number;
    private _yOrigin: number;
    private _scene: Scene;
    private _shakeEffect: ShakePosition;
    private _canTakeDamage: boolean = true;

    constructor(scene: Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene, x, y, texture, frame);
        this._scene = scene;
        this._texture = texture;
        this._xOrigin = x;
        this._yOrigin = y;

        this._shakeEffect = new ShakePosition(this, {
            mode: 1,
            duration: 100,
            magnitude: 10,
            magnitudeMode: 1,
            axis: 0,
        });

        this.initAnimations();
        this.mouseClick();
        this.setScale(2.78);
        EventBus.on("attack", this.damage, this);
        this._healthbar = new HealthBar(scene, x - 94, y + 48, 20, this._maxHp, 100);

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

    public damage(_damage: number): void
    {
        if (!this._canTakeDamage) return;
        this._hp -= _damage;
        if (this._hp <= 0)
        {
            this.updateMonster()
        } else
        {
            this._healthbar.updateBar(this._hp);

        }
    }

    mouseClick(): void
    {
        this.setInteractive({ useHandCursor: true });

        this.on('pointerdown', (pointer: Input.Pointer) =>
        {
            this._shakeEffect.shake();
            EventBus.emit("clickDamage", this);
        });

        this.on('pointerout', (pointer: Input.Pointer) =>
        {
            this.clearTint();
        });

        this.on('pointerup', (pointer: Input.Pointer) =>
        {
            this.clearTint();
        });
    }

    updateMonster(): void
    {
        this._canTakeDamage = false;
        this.scene.add.tween({
            targets: this,
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 0,
            x: {
                getStart: () => this.x,
                getEnd: () => this.x + 21
            },
            y: {
                getStart: () => this.y,
                getEnd: () => this.y - 23
            },
            alpha: {
                getStart: () => 1,
                getEnd: () => 0
            },
            onComplete: () =>
            {
                EventBus.emit("reward", 10);
                this._shakeEffect.stop();
                this._maxHp = this._maxHp * 2;
                this._hp = this._maxHp;
                this.setPosition(this._xOrigin, this._yOrigin);
                this._healthbar.Reset(this._maxHp);
                this.setAlpha(1);
                this._canTakeDamage = true;
            }
        });

    }
}
