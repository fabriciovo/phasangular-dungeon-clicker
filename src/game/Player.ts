import Monster from "@gameObjects/Monster";
import { EventBus } from "./EventBus";
import { IItem, IUpgrade, IPlayerData } from "@interfaces";



export default class Player
{
    private _name: string;
    private _gold: number;
    private _items: IItem[];
    private _heroes: any[];
    private _dps: number = 2.4;
    private _clickDamage: number = 1;

    constructor(name: string, gold: number, items: IItem[], heroes: any[], dps: number, clickDamage: number)
    {
        this._name = name;
        this._gold = gold;
        this._clickDamage = clickDamage;
        this._dps = dps;
        this._items = items;
        console.log(this._items)
        this._heroes = heroes;

        this.initEvents();
    }


    private initEvents(): void
    {
        EventBus.on("clickDamage", this.clickDamageEvent, this);
        EventBus.on("buyItem", this.buyItem, this);
        EventBus.on("buyHero", this.buyHero, this);
        EventBus.on("buyUpgrade", this.buyUpgrade, this);
        EventBus.on("reward", this.SetGold, this);
    }

    public GetGold(): number
    {
        return this._gold;
    }

    public SetGold(_v: number): void
    {
        this._gold += _v;
    }

    public GetDps(): number
    {
        return this._dps;
    }

    public SetDps(_v: number): void
    {
        this._dps = _v;
    }


    public GetClickDamage(): number
    {
        return this._clickDamage;
    }

    public SetClickDamage(_v: number): void
    {
        this._clickDamage = _v;
    }

    public Reward(_reward: any[]): void
    {

    }

    public GetItems(): IItem[]
    {
        return this._items;
    }

    public GetHeroes(): any[]
    {
        return this._heroes;
    }

    public GetName(): string
    {
        return this._name;
    }

    public PlayerLoadData(playerData: string): void
    {
        const _playerData = JSON.parse(playerData);
        console.log(_playerData);
        this._name = _playerData._name;
        this._gold = _playerData._gold;
        this._clickDamage = _playerData._clickDamage;
        this._items = _playerData._items;
        this._heroes = _playerData._heroes;

    }

    private buyItem(_item: IItem): void
    {
        if (this._gold < _item.price)
        {
            //EventBus.emit("cantBuy")
            return;
        };
        const itemIndex: number = this._items.findIndex(item => item.id === _item.id);
        const item = this._items[itemIndex];

        this._gold -= item.price;
        this._clickDamage += item.clickDamage;

        item.level++;
        item.clickDamage += item.level * 1.2;
        item.price *= item.level;
    }

    private buyHero(_hero: any): void
    {
        if (this._gold < _hero.price)
        {
            //EventBus.emit("cantBuy")
            return;
        };
        const heroIndex: number = this._heroes.findIndex(hero => hero.id === _hero.id);
        const hero = this._heroes[heroIndex];

        this._gold -= hero.price;
        this._dps += hero.dps;

        hero.level++;
        hero.dps *= hero.level;
        hero.price *= hero.level;

        if (hero.level === 2)
        {
            EventBus.emit("createHero", hero.name);
        }
    }

    private buyUpgrade(_upgrade: IUpgrade): void
    {
        if (this._gold < _upgrade.price)
        {
            //EventBus.emit("cantBuy")
            return;
        };
        const upgradeIndex: number = this._items.findIndex(item => item.upgrade.id === _upgrade.id);
        const item = this._items[upgradeIndex];

        this._gold -= item.upgrade.price;

        item.upgrade.level++;

        item.upgrade.price *= item.upgrade.level;

        item.clickDamage += item.clickDamage * item.upgrade.mod;        
    }

    private clickDamageEvent(_monster: Monster): void
    {
        _monster.damage(this._clickDamage);
    }
}
