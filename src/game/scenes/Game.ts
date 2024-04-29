import { Scene, Events, Cameras, GameObjects, Time, Tilemaps } from 'phaser';
import Monster from '../gameObjects/Monster';
import { EventBus } from '../EventBus';
import Player from '../Player';
import Hero from '../gameObjects/Hero';

export class Game extends Scene
{
    private _background: GameObjects.Image;
    private _dpsTimer: Time.TimerEvent;
    public _player: Player;
    private map: Tilemaps.Tilemap;
    private monster: Monster;
    private heroes: Hero[] = [];

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

        // this._background = this.add.image(0, 0, 'dungeon');
        // this._background.setOrigin(0, 0);
        // this._background.setScale(3.78);

        this.map = this.make.tilemap({ key: 'map', tileHeight: 16, tileWidth: 16 }); // Create tilemap
        const tileset = this.map.addTilesetImage('tilemap_full', 'tile');

        const groundLayer = this.map.createLayer('floor', tileset!);
        const obstaclesLayer = this.map.createLayer('wall', tileset!);

        obstaclesLayer!.setCollisionByProperty([-1]);

        this.createNewMonster();

        this._dpsTimer = this.time.delayedCall(1000, this.emitPlayerAttack, [], this);


    }

    override update(time: number, delta: number): void
    {
        super.update(time, delta);
        this.heroes?.forEach(hero =>
        {
            hero.SetTarget(this.monster.x, this.monster.y);
        })
    }
    emitPlayerAttack(): void
    {
        this.time.addEvent(this._dpsTimer);
        if (!this._player) return;
        EventBus.emit("attack", this._player.GetDps());
    }

    createNewMonster()
    {
        this.monster = new Monster(this, 80, 64, 'slime', this.map);
        this.add.existing(this.monster);
    }
    createHero(_heroName: string)
    {
        const x = Phaser.Math.Between(48, 480);
        const y = Phaser.Math.Between(120, 468);
        const hero = new Hero(this, 64, 64, 'slime', this.map);
        this.heroes.push(hero);
        this.add.existing(hero);
    }
}
