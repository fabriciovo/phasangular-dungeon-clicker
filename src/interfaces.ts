
export interface IUpgrade {
  mult: number;
  price: number;
  level: number;
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

