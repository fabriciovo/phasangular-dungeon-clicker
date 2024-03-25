import { EventBus } from "./EventBus";


export default class Player {
    private _name: string;
    private _gold: number;
    private _items: any[];
    private _heroes: any[];
    private _dps: number = 0;
    private _clickDamage: number = 1;

    constructor(name: string, gold: number, items: any[], heroes: any[]) {
        this._name = name;
        this._gold = gold;
        this._dps = 0;
        this._clickDamage = 1;
        this._items = items;
        this._heroes = heroes;
        EventBus.on("attack", (damage: number) => { return damage }, this);
        EventBus.on("reward", (gold: number) => { this.SetGold(gold) }, this);
    }


    public GetGold(): number {
        return this._gold;
    }


    public SetGold(_v: number): void{
        this._gold += _v;
        console.log(this._gold);
    }

    public GetDps(): number {
        return this._dps;
    }

    public SetDps(_v: number): void{
        this._dps = _v;
    }


    public GetClickDamage(): number {
        return this._clickDamage;
    }

    public SetClickDamage(_v: number): void{
        this._clickDamage = _v;
    }

    public Reward(_reward:any[]):void {

    }
}
