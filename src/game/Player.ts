import Monster from '@gameObjects/Monster';
import { EventBus } from './EventBus';
import { IItem, IUpgrade, IPlayerData } from '@interfaces';
import Hero from '@gameObjects/Hero';

export default class Player {
    private _name: string;
    private _gold: number;
    private _items: IItem[];
    private _heroes: Hero[];
    private _dps: number = 0;
    private _clickDamage: number = 1;
    private _lastLogin: Date;
    private _baseClickDamage: number = 1;
    constructor(
        name: string,
        gold: number,
        items: IItem[],
        heroes: any[],
        dps: number,
        clickDamage: number
    ) {
        this._name = name;
        this._gold = gold;
        this._clickDamage = clickDamage;
        this._dps = dps;
        this._items = items;
        this._heroes = heroes;

        this.initEvents();
    }

    private initEvents(): void {
        EventBus.on('clickDamage', this.clickDamageEvent, this);
        EventBus.on('buyItem', this.buyItem, this);
        EventBus.on('buyHero', this.buyHero, this);
        EventBus.on('buyUpgrade', this.buyUpgrade, this);
        EventBus.on('reward', this.setGold, this);
    }

    public get Gold() {
        return this._gold;
    }

    public set Gold(_v: number) {
        this._gold += _v;
    }

    public get Dps() {
        return this._dps;
    }

    public set Dps(_v: number) {
        this._dps = _v;
    }

    public get ClickDamage() {
        let totalClickDamage = 0;
        for (let _i = 0; _i < this._items.length; _i++) {
            const _item = this._items[_i];
            if (_item.level === 1) continue;
            totalClickDamage += _item.clickDamage * _item.upgrade.mod;
        }
        this._clickDamage = totalClickDamage + this._baseClickDamage;
        return this._clickDamage;
    }

    public Reward(_reward: any[]): void {}

    public get Items(): IItem[] {
        return this._items;
    }

    public get Heroes(): any[] {
        return this._heroes;
    }

    public get Name(): string {
        return this._name;
    }

    public PlayerLoadData(playerData: string): void {
        const _playerData = JSON.parse(playerData);
        this._name = _playerData._name;
        this._gold = _playerData._gold;
        this._clickDamage = _playerData._clickDamage;
        this._items = _playerData._items;
        this._heroes = _playerData._heroes;
    }

    private buyItem(_item: IItem, _count: number): void {
        if (this._gold < _item.price) {
            //EventBus.emit("cantBuy")
            return;
        }
        const itemIndex: number = this._items.findIndex(
            (item) => item.id === _item.id
        );
        const item = this._items[itemIndex];

        if (_count >= 1) {
            for (let i = 0; i < _count; i++) {
                if (this._gold < _item.price) break;

                this._gold -= item.price;
                this._clickDamage += item.clickDamage;

                item.level++;
                item.clickDamage += item.level * 1.2;
                item.price += item.level * 0.2;
            }
        }
        if (_count === -1) {
            while (this._gold >= _item.price) {
                this._gold -= item.price;
                this._clickDamage += item.clickDamage;

                item.level++;
                item.clickDamage += item.level * 1.2;
                item.price += item.level * 0.2;
            }
        }
    }

    private buyHero(_hero: Hero): void {
        if (this._gold < _hero.Price) {
            //EventBus.emit("cantBuy")
            return;
        }
        const heroIndex: number = this._heroes.findIndex(
            (hero) => hero.Id === _hero.Id
        );
        const hero = this._heroes[heroIndex];

        this._gold -= hero.Price;
        this._dps += hero.Dps;

        hero.Level++;
        hero.Dps *= hero.Level;
        hero.Price *= hero.Level;

        if (hero.Level === 2) {
            EventBus.emit('createHero', hero.name);
        }
    }

    private buyUpgrade(_upgrade: IUpgrade): void {
        if (this._gold < _upgrade.price) {
            //EventBus.emit("cantBuy")
            return;
        }
        const upgradeIndex: number = this._items.findIndex(
            (item) => item.upgrade.id === _upgrade.id
        );
        const item = this._items[upgradeIndex];

        this._gold -= item.upgrade.price;

        item.upgrade.level++;

        item.upgrade.price *= item.upgrade.level;

        item.clickDamage += item.clickDamage * item.upgrade.mod;
    }

    private clickDamageEvent(_monster: Monster): void {
        _monster.damage(this.ClickDamage);
    }

    private setGold(value: number): void {
        this._gold = value;
    }
}
