import { Component, Input } from '@angular/core';
import { EventBus } from '../../../game/EventBus';
import Hero from '@gameObjects/Hero';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  @Input() heroes: Hero[] = [];

  public BuyItem(hero: Hero): void
  {
    EventBus.emit("buyHero", hero)
  }
}
