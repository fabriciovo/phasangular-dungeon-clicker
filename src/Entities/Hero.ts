import { IHero, IUpgrade } from "@interfaces";


export default class Hero implements IHero {
    private _id: string;
    private _name: string;
    private _price: number;
    private _dps: number;
    private _level: number;
    private _upgrade: IUpgrade;
    private _priceMult: number;
    private _hp: number;
    _maxHp:number;
    constructor(id:string, name:string, price:number, dps:number, level:number, upgrade:IUpgrade, priecMult: number, hp: number){

    }

    public get Id(): string {
        return this._id;
    }

    public set Id(value: string) {
        this._id = value;
    }

    public get Name(): string {
        return this._name;
    }

    public set Name(value: string) {
        this._name = value;
    }

    public get Price(): number {
        return this._price;
    }

    public set Price(value: number) {
        this._price = value;
    }

    public get Level(): number {
        return this._level;
    }

    public set Level(value: number) {
        this._level = value;
    }

    public get Hp(): number {
        return this._hp;
    }

    public set Hp(value: number) {
        this._hp = value;
    }

    public get MaxHp(): number {
        return this._maxHp;
    }

    public set MaxHp(value: number) {
        this._maxHp = value;
    }

    public get Dps(): number {
        return this._dps;
    }

    public set Dps(value: number) {
        this._dps = value;
    }

}