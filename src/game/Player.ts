import Monster from "@gameObjects/Monster";
import { IItem } from "../interfaces";
import { EventBus } from "./EventBus";

const ITEMS_DATA = [{
    id: "sword", name: "Sword", clickDamage: 1, price: 20, level: 1, priceMult: 0.2, upgrade: {
        mult: 0.32,
        price: 1,
        level: 1,
    }
}]

export default class Player
{
    private _name: string;
    private _gold: number;
    private _items: IItem[];
    private _heroes: any[];
    private _dps: number = 2.4;
    private _clickDamage: number = 1;

    constructor(name: string, gold: number, items?: IItem[], heroes?: any[])
    {
        this._name = name;
        this._gold = 20000;
        this._clickDamage = 1;
        this._items = items || ITEMS_DATA;
        this._heroes = [{ id: "hero1", name: "Joh", dps: 1, price: 20, level: 1 }];


        this.initEvents();
    }

    private initEvents(): void
    {
        EventBus.on("clickDamage", this.clickDamage, this);
        EventBus.on("buyItem", this.buyItem, this);
        EventBus.on("buyHero", this.buyHero, this);
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


    private clickDamage(_monster: Monster): void
    {
        _monster.damage(this._clickDamage);
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
}
