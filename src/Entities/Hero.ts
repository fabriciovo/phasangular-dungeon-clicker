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
    private _maxHp: number;

    constructor(id: string, name: string, price: number, dps: number, level: number, upgrade: IUpgrade, priceMult: number, hp: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._dps = dps;
        this._level = level;
        this._upgrade = upgrade;
        this._priceMult = priceMult;
        this._hp = hp;
        this._maxHp = hp; 
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get dps(): number {
        return this._dps;
    }

    set dps(value: number) {
        this._dps = value;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get upgrade(): IUpgrade {
        return this._upgrade;
    }

    set upgrade(value: IUpgrade) {
        this._upgrade = value;
    }

    get priceMult(): number {
        return this._priceMult;
    }

    set priceMult(value: number) {
        this._priceMult = value;
    }

    get hp(): number {
        return this._hp;
    }

    set hp(value: number) {
        this._hp = value;
    }

    get maxHp(): number {
        return this._maxHp;
    }

    set maxHp(value: number) {
        this._maxHp = value;
    }
}
