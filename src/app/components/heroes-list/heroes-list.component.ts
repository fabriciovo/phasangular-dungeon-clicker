import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-heroes-list',
    standalone: true,
    imports: [],
    templateUrl: './heroes-list.component.html',
    styleUrl: './heroes-list.component.css',
})
export class HeroesListComponent {
    @ViewChild('dialog') dialog: ElementRef;
    public SelectedHero: any;

    @Input() heroList: any[] = [];

    openInventory(hero: any) {
        this.dialog.nativeElement.showModal();
    }

    closeInventory() {
        this.dialog.nativeElement.close();
    }
}
