import { GameObjects, Scene, Input, Tilemaps } from 'phaser';
import HealthBar from '../gameComponents/Healthbar';
import { EventBus } from '../EventBus';
import ShakePosition from 'phaser3-rex-plugins/plugins/behaviors/shake/ShakePosition';
import Effect from './Effect';
export default class Monster extends GameObjects.Sprite {
    private _texture: string | Phaser.Textures.Texture;
    private _healthbar: HealthBar;
    private _hp = 20;
    private _maxHp = 20;
    private _xOrigin: number;
    private _yOrigin: number;
    private _scene: Scene;
    private _shakeEffect: ShakePosition;
    private _canTakeDamage: boolean = true;
    private _isTakingDamage: boolean = false;
    private _map: Tilemaps.Tilemap;
    private _container: Phaser.GameObjects.Container;
    constructor(
        scene: Scene,
        x: number,
        y: number,
        texture: string,
        map: Tilemaps.Tilemap,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);
        this._scene = scene;
        this._texture = texture;
        this._xOrigin = x;
        this._yOrigin = y;

        this._map = map;

        this._shakeEffect = new ShakePosition(this, {
            mode: 1,
            duration: 100,
            magnitude: 3,
            magnitudeMode: 1,
            axis: 0,
        });
        this._shakeEffect.on('complete', () => {
            this._isTakingDamage = false;
        });

        this.initAnimations();
        this.mouseClick();
        this.setOrigin(0, 0);
        EventBus.on('attack', this.damage, this);

        this._container = new Phaser.GameObjects.Container(this._scene);
        this._container.x = x;
        this._container.y = y;

        this._healthbar = new HealthBar(
            this._scene,
            this._container.x,
            this._container.y,
            2,
            this._maxHp,
            16
        );

        this._container.add(this._healthbar);
        this._container.add(this);

        this.scene.time.addEvent({
            delay: 1000,
            callback: this.moveEnemyRandomly,
            callbackScope: this,
            loop: true,
        });
    }

    create() {
        console.log('TESTE');
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

    public damage(_damage: number): void {
        if (!this._canTakeDamage) return;
        const oldHp = this._hp;
        this._hp -= _damage;

        if (this._hp < oldHp) {
            this._isTakingDamage = true;
        }

        if (this._hp <= 0) {
            this.updateMonster();
        } else {
            this._healthbar.updateBar(this._hp);
        }
    }

    mouseClick(): void {
        this.setInteractive({ useHandCursor: true });

        this.on('pointerdown', (pointer: Input.Pointer) => {
            this._shakeEffect.shake();
            EventBus.emit('clickDamage', this);
        });

        this.on('pointerout', (pointer: Input.Pointer) => {
            this.clearTint();
        });

        this.on('pointerup', (pointer: Input.Pointer) => {
            this.clearTint();
        });
    }

    updateMonster(): void {
        this._canTakeDamage = false;
        this.scene.add.tween({
            targets: this,
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 0,
            x: {
                getStart: () => this.x,
                getEnd: () => this.x + 21,
            },
            y: {
                getStart: () => this.y,
                getEnd: () => this.y - 23,
            },
            alpha: {
                getStart: () => 1,
                getEnd: () => 0,
            },
            onStart: () => {},
            onComplete: () => {
                const effect = new Effect(
                    this._scene,
                    this._xOrigin,
                    this._yOrigin,
                    'smoke'
                );
                this._scene.add.existing(effect);
                EventBus.emit('reward', 10);
                this._shakeEffect.stop();
                this._maxHp = this._maxHp * 2;
                this._hp = this._maxHp;
                this.setPosition(this._xOrigin, this._yOrigin);
                this._healthbar.Reset(this._maxHp);
                this.setAlpha(1);
                this._canTakeDamage = true;
            },
        });
    }

    moveEnemyRandomly(): void {
        if (this._isTakingDamage) return;
        const direction = Phaser.Math.RND.between(0, 3);
        switch (direction) {
            case 0:
                this._container.y -= 16;
                break;
            case 1:
                this._container.y += 16;
                break;
            case 2:
                this._container.x -= 16;
                break;
            case 3:
                this._container.x += 16;
                break;
        }
        const tile = this._map.getTileAtWorldXY(
            this._container.x,
            this._container.y,
            false,
            undefined,
            'wall'
        );
        if (!tile) {
            this._container.x = Phaser.Math.Clamp(
                this._container.x,
                0,
                this._map.widthInPixels - 32
            );
            this._container.y = Phaser.Math.Clamp(
                this._container.y,
                0,
                this._map.heightInPixels - 16
            );
        }
    }

    public AddToScene(): void {
        this._scene.add.existing(this._container);
    }
}
