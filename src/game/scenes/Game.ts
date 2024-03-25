import { Scene, Events, Cameras, GameObjects  } from 'phaser';
import Monster from '../gameObjects/Monster';
import { EventBus } from '../EventBus';
import Player from '../Player';

export class Game extends Scene
{
    private _camera: Cameras.Scene2D.Camera;
    private _background: GameObjects.Image;
    private _player: Player = new Player("", 0, [], []);

    constructor ()
    {
        super('Game');
    }

    initEvents() {
    
    }

    create ()
    {
        this._camera = this.cameras.main;
        //this._camera.setBackgroundColor(0x00ff00);

        this._background = this.add.image(0, 0, 'dungeon');
        this._background.setOrigin(0,0)
        this._background.setScale(3.78)

        EventBus.emit('current-scene-ready', this);
        EventBus.on("createNewMonster", this.createNewMonster, this)

        this.createNewMonster();

    }

    createNewMonster() {
        const monster = new Monster(this, 512, 384, 'slime');
        this.add.existing(monster);
    }
}
