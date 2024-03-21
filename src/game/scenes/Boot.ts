import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.image('background', 'assets/bg.png');


        this.load.spritesheet('greenSlime', 'assets/green_slime.png', { frameWidth: 48, frameHeight: 48 });

    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
