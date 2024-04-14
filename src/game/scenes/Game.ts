import { Scene, Events, Cameras, GameObjects, Time } from 'phaser';
import Monster from '../gameObjects/Monster';
import { EventBus } from '../EventBus';
import Player from '../Player';
import Hero from '../gameObjects/Hero';

export class Game extends Scene
{
    private _camera: Cameras.Scene2D.Camera;
    private _background: GameObjects.Image;
    private _dpsTimer: Time.TimerEvent;
    public _player: Player;

    constructor()
    {
        super('Game');
        this.initEvents();
    }

    initEvents()
    {
        EventBus.on("createHero", this.createHero, this)
    }


    create()
    {
        EventBus.emit('current-scene-ready', this);

        this._camera = this.cameras.main;

        this._background = this.add.image(0, 0, 'dungeon');
        this._background.setOrigin(0, 0);
        this._background.setScale(3.78);

        this.createNewMonster();

        this._dpsTimer = this.time.delayedCall(1000, this.emitPlayerAttack, [], this);
    }

    emitPlayerAttack(): void
    {
        this.time.addEvent(this._dpsTimer);
        if (!this._player) return;
        EventBus.emit("attack", this._player.GetDps());
    }

    createNewMonster()
    {
        const monster = new Monster(this, 512, 384, 'slime');
        this.add.existing(monster);
    }
    createHero(_heroName: string)
    {
        const x = Phaser.Math.Between(48, 480);
        const y = Phaser.Math.Between(120, 468);
        const hero = new Hero(this, x, y, 'slime');
        this.add.existing(hero);
    }
}
