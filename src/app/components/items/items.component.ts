import { Component, Input } from '@angular/core';
import { IItem } from '../../../interfaces';
import { EventBus } from '../../../game/EventBus';
import Formatter from '@utils/formatter';


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent
{
  @Input() items: IItem[] = [];
  @Input() gold: number = 0;

  public Count: number = 1;

  public BuyItem(item: IItem, count: number): void
  {
    EventBus.emit("buyItem", item, count);
  }

  public SetCount(_v: number): void
  {
    this.Count = _v;
  }

  public FormatNumber(_v: number): string
  {
    return Formatter(_v);
  }

  public GetPrice(item: IItem): string
  {
    let price: number = 0;
    if (this.Count > 0)
    {
      for (let i = 0; i < this.Count; i++)
      {
        price += item.price;
      }
    }
    return Formatter(price);
  }

  public CanBuyIt(item: IItem): boolean
  {
    let price: number = 0;

    for (let i = 0; i < this.Count; i++)
    {
      price += item.price;
    }
    return this.gold >= price;
  }
}
