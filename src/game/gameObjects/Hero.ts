import { GameObjects, Scene } from 'phaser';
export default class Hero extends GameObjects.Sprite
{
    private _texture: string | Phaser.Textures.Texture;
    constructor(scene: Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene, x, y, texture, frame);
        this._texture = texture;

        this.initAnimations();
        this.setScale(2.78);
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
}
