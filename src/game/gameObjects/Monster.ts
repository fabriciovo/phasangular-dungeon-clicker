import { GameObjects, Scene, Input } from 'phaser';
import HealthBar from '../components/Healthbar';
import { EventBus } from '../EventBus';
export default class Monster extends GameObjects.Sprite {
    private _texture: string | Phaser.Textures.Texture;
    private _healthbar: HealthBar;
    private _hp = 10;
    private _maxHp = 10;
    constructor(scene: Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this._texture = texture;

        this.initAnimations();
        this.mouseClick();
        this._healthbar = new HealthBar(scene, x - 94, y + 48, this._hp, 20, this._maxHp);
        this.setScale(2)
    }

    initEvents() {
       
    }

    initAnimations():void {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this._texture as string, { frames: [0, 1, 2, 3] }),
            frameRate: 6,
            repeat: -1
        });
        this.play('idle');
    }

    mouseClick(): void {
        this.setInteractive({ useHandCursor: true });
        this.on('pointerdown', (pointer: Input.Pointer) => {
            EventBus.emit("attack")
        });

        this.on('pointerout',  (pointer: Input.Pointer) => {
            this.clearTint();

        });

        this.on('pointerup',  (pointer: Input.Pointer) => {
            this.clearTint();

        });
    }
    
}
