import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.setPath('assets')
        this.load.image('background', 'bg.png');


        this.load.spritesheet('slime', 'characters/slime.png', { frameWidth: 16, frameHeight: 16 });

    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
