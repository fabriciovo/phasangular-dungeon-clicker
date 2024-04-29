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

        this.load.image('tile', 'tilemap_full.png'); 
        this.load.tilemapTiledJSON('map', 'map.json');

        this.load.spritesheet('slime', 'characters/slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('smoke', 'effects/smoke.png', { frameWidth: 32, frameHeight: 32 });

    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
