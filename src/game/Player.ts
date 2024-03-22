import { EventBus } from "./EventBus";


export default class Player {
    private _name: string;
    private _gold: number;
    private _items: any[];
    private _heroes: any[];
    private _dps: number = 10;


    constructor(name: string, gold: number, items: any[], heroes: any[]) {
        this._name = name;
        this._gold = gold;
        this._items = items;
        this._heroes = heroes;
        EventBus.on("attack", (damage: number) => { return damage }, this);
        EventBus.on("reward", (gold: number) => { this.SetGold(gold) }, this);
    }


    public GetGold(): number {
        return this._gold;
    }


    public SetGold(_v: number): void{
        this._gold = _v;
        console.log(this._gold);
    }

    public Reward(_reward:any[]):void {

    }
}
