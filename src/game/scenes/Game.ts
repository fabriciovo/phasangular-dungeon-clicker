import { Scene, Events, Cameras, GameObjects, Time } from 'phaser';
import Monster from '../gameObjects/Monster';
import { EventBus } from '../EventBus';
import Player from '../Player';

export class Game extends Scene
{
    private _camera: Cameras.Scene2D.Camera;
    private _background: GameObjects.Image;
    private _player: Player = new Player("", 0, [], []);
    private _dpsTimer: Time.TimerEvent;

    constructor()
    {
        super('Game');
    }



    initEvents()
    {

    }

    create()
    {
        EventBus.emit('current-scene-ready', this);
        EventBus.on("createNewMonster", this.createNewMonster, this)

        this._camera = this.cameras.main;

        this._background = this.add.image(0, 0, 'dungeon');
        this._background.setOrigin(0, 0)
        this._background.setScale(3.78)



        this.createNewMonster();

        this._dpsTimer = this.time.delayedCall(1000, this.emitPlayerAttack, [], this);
    }

    emitPlayerAttack(): void
    {
        EventBus.emit("attack", this._player.GetDps());
        this.time.addEvent(this._dpsTimer);
    }

    createNewMonster()
    {
        const monster = new Monster(this, 512, 384, 'slime');
        this.add.existing(monster);
    }
}
