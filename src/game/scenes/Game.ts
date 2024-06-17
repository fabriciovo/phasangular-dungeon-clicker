import { Scene, Events, Cameras, GameObjects, Time, Tilemaps } from 'phaser';
import Monster from '../gameObjects/Monster';
import { EventBus } from '../EventBus';
import Player from '../Player';
import Hero from '../gameObjects/Hero';

export class Game extends Scene {
    private _background: GameObjects.Image;
    private _dpsTimer: Time.TimerEvent;
    public _player: Player;
    private map: Tilemaps.Tilemap;
    private monsters: Monster[] = [];
    private heroes: Hero[] = [];

    constructor() {
        super('Game');

        this.initEvents();
    }

    initEvents() {
        EventBus.on('createHero', this.createHero, this);
    }

    create() {
        EventBus.emit('current-scene-ready', this);

        // this._background = this.add.image(0, 0, 'dungeon');
        // this._background.setOrigin(0, 0);
        // this._background.setScale(3.78);

        this.map = this.make.tilemap({
            key: 'map',
            tileHeight: 16,
            tileWidth: 16,
        }); // Create tilemap
        const tileset = this.map.addTilesetImage('tilemap_full', 'tile');

        const groundLayer = this.map.createLayer('floor', tileset!);
        const obstaclesLayer = this.map.createLayer('wall', tileset!);

        obstaclesLayer!.setCollisionByProperty([-1]);

        this._dpsTimer = this.time.delayedCall(
            1000,
            this.emitPlayerAttack,
            [],
            this
        );

        //Init Monsters
        this.monsters.push(new Monster(this, 80, 64, 'slime', this.map));
        this.monsters.push(new Monster(this, 80, 64, 'bat', this.map));
        this.monsters.push(new Monster(this, 80, 64, 'beholder', this.map));
        this.monsters.push(new Monster(this, 80, 64, 'lich', this.map));
        this.monsters.push(new Monster(this, 80, 64, 'mimic', this.map));
        this.monsters.push(new Monster(this, 80, 64, 'skeleton', this.map));

        //Init Heroes
        this.heroes.push(
            new Hero(
                this,
                80,
                64,
                'knight',
                this.map,
                'hero1',
                'knight',
                20,
                1,
                100,
                100,
                1
            )
        );
        this.heroes.push(
            new Hero(
                this,
                80,
                64,
                'archer',
                this.map,
                'hero2',
                'archer',
                20,
                1,
                100,
                100,
                1
            )
        );
        this.heroes.push(
            new Hero(
                this,
                80,
                64,
                'warrior',
                this.map,
                'hero3',
                'warrior',
                20,
                1,
                100,
                100,
                1
            )
        );
        this.heroes.push(
            new Hero(
                this,
                80,
                64,
                'wizard',
                this.map,
                'hero4',
                'wizard',
                20,
                1,
                100,
                100,
                1
            )
        );

        this.createNewMonster();
    }

    override update(time: number, delta: number): void {
        super.update(time, delta);
        this.heroes?.forEach((hero) => {
            hero.SetTarget(this.monsters[1].x, this.monsters[1].y);
        });
    }
    emitPlayerAttack(): void {
        this.time.addEvent(this._dpsTimer);
        if (!this._player) return;
        EventBus.emit('attack', this._player.Dps);
    }

    createNewMonster(): void {
        this.monsters[0].AddToScene();
    }

    createHero(_heroName: string): void {
        const x = Phaser.Math.Between(48, 480);
        const y = Phaser.Math.Between(120, 468);
        this.add.existing(this.heroes[0]);
    }

    public get Heroes(){
        return this.heroes;
    }
}
