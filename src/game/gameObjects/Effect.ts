import { GameObjects, Scene } from 'phaser';
export default class Effect extends GameObjects.Sprite
{
    private _texture: string | Phaser.Textures.Texture;
    constructor(scene: Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene, x, y, texture, frame);
        this._texture = texture;

        this.setScale(0.8,0.8);
        this.setOrigin(0,0);
        this.initAnimations();
    }

    initAnimations(): void
    {
        this.anims.create({
            key: 'effect',
            frames: this.anims.generateFrameNumbers(this._texture as string, { frames: [0, 1, 2, 3, 4] }),
            frameRate: 6,
        });

        this.on('animationcomplete', () =>
        {
            this.destroy(true);
        }, this);
        this.play('effect');
    }

}
