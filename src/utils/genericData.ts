import { IItem } from "@interfaces";

export const START_ITEMS_DATA: IItem[] = [{
    id: "sword", name: "Sword", clickDamage: 1, price: 20, level: 1, priceMult: 0.2, upgrade: {
        id: "sword",
        mult: 0.32,
        price: 1,
        level: 1,
    }
}]

export const START_HEROES_DATA: any[] = [{ id: "hero1", name: "Joh", dps: 1, price: 20, level: 1 }]