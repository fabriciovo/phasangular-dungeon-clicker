import { Component, Input } from '@angular/core';
import { EventBus } from '../../../game/EventBus';
import { IItem, IUpgrade } from 'src/interfaces';

@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [],
  templateUrl: './upgrades.component.html',
  styleUrl: './upgrades.component.css'
})
export class UpgradesComponent
{
  @Input() itemList: IItem[] = [];

  public BuyUpgrage(upgrage: IUpgrade): void
  {
    EventBus.emit("buyUpgrade", upgrage)
  }
}
