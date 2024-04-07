import { Component, Input } from '@angular/core';
import { EventBus } from '../../../game/EventBus';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  @Input() heroes: any[] = [];

  public BuyItem(hero: any): void
  {
    EventBus.emit("buyHero", hero)
  }
}
