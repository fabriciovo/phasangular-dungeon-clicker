import { Component, Input } from '@angular/core';
import { IItem } from '../../../interfaces';
import { EventBus } from '../../../game/EventBus';


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
  public Count: number = 1;
  public BuyItem(item: IItem, count: number): void
  {
    EventBus.emit("buyItem", item, count);
  }

  public SetCount(_v: number): void
  {
    this.Count = _v;
  }
}
