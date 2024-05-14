import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-heroes-list',
    standalone: true,
    imports: [],
    templateUrl: './heroes-list.component.html',
    styleUrl: './heroes-list.component.css',
})
export class HeroesListComponent {
    public SelectedHero: any;
    @Input() heroList: any[] = [];
}
