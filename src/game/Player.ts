import { IItem } from "../interfaces";
import { EventBus } from "./EventBus";
import Monster from "./gameObjects/Monster";


export default class Player
{
    private _name: string;
    private _gold: number;
    private _items: IItem[];
    private _heroes: any[];
    private _dps: number = 2.4;
    private _clickDamage: number = 1;

    constructor(name: string, gold: number, items: any[], heroes: any[])
    {
        this._name = name;
        this._gold = gold;
        this._clickDamage = 1;
        this._items = [{ id: "item1", name: "Angular For Beginners", clickDamage: 1, price: 20, level: 1 }];
        this._heroes = heroes;
        EventBus.on("clickDamage", this.clickDamage, this);
        EventBus.on("buyItem", this.buyItem, this);
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

    private clickDamage(_monster: Monster)
    {
        _monster.damage(this._clickDamage);
    }

    private buyItem(_item: IItem): void
    {
        if(this._gold < _item.price) {
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
}
