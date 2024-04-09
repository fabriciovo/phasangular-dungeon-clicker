
export interface IUpgrade
{
  id: string;
  mult: number;
  price: number;
  level: number;
  mod: number;
}

export interface IItem
{
  id: string;
  name: string;
  price: number;
  clickDamage: number;
  level: number;
  upgrade: IUpgrade;
  priceMult: number;
}

export interface IPlayerData {
  name: string;
  gold: number;
  items: IItem[];
  heroes: any[];
  dps: number;
  clickDamage: number;
}