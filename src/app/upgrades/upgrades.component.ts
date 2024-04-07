import { Component, Input } from '@angular/core';
import { EventBus } from '../../game/EventBus';
import { IUpgrade } from 'src/interfaces';

@Component({
  selector: 'app-upgrades',
  standalone: true,
  imports: [],
  templateUrl: './upgrades.component.html',
  styleUrl: './upgrades.component.css'
})
export class UpgradesComponent
{
  @Input() upgrades: IUpgrade[] = [];

  public BuyUpgrage(upgrage: IUpgrade): void
  {
    EventBus.emit("buyUpgrage", upgrage)
  }
}
