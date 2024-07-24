import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Hero from '@gameObjects/HeroGameObject';

@Component({
    selector: 'app-heroes-list',
    standalone: true,
    imports: [],
    templateUrl: './heroes-list.component.html',
    styleUrl: './heroes-list.component.css',
})
export class HeroesListComponent {
    @ViewChild('dialog') dialog: ElementRef;
    public SelectedHero: Hero;

    @Input() heroList: Hero[] = [];

    openInventory(hero: Hero) {
        this.dialog.nativeElement.showModal();
    }

    closeInventory() {
        this.dialog.nativeElement.close();
    }
}
