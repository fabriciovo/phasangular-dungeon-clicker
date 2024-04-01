import { IItem } from "../interfaces";
import { EventBus } from "./EventBus";
import Monster from "./gameObjects/Monster";


export default class Player
{
    private _name: string;
    private _gold: number;
    private _items: IItem[];
    private _heroes: any[];
    private _dps: number = 5;
    private _clickDamage: number = 1;

    constructor(name: string, gold: number, items: any[], heroes: any[])
    {
        this._name = name;
        this._gold = gold;
        this._dps = 5;
        this._clickDamage = 1;
        this._items = [{ id: "item1", name: "Angular For Beginners", dps: 5, price: 20, level: 1 }];
        this._heroes = heroes;
        EventBus.on("clickDamage", this.clickDamage, this);
        EventBus.on("reward", this.SetGold, this);
        EventBus.on("buyItem", this.buyItem, this);
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

    public GetItems(): any
    {
        return this._items;
    }

    private clickDamage(_monster: Monster)
    {
        _monster.damage(this._clickDamage);
    }

    private buyItem(_item: IItem): void
    {
        this._items.find(_item.id);
    }
}
