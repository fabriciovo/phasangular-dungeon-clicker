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

  public BuyItem(item: IItem): void
  {
    EventBus.emit("buyItem", item)
  }
}
