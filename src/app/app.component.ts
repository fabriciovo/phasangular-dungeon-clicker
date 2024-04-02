import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhaserGame } from '../game/phaser-game.component';
import { MainMenu } from '../game/scenes/MainMenu';
import { CommonModule } from '@angular/common';
import { EventBus } from '../game/EventBus';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';

import Player from '../game/Player';
import { HeroesComponent } from './heroes/heroes.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, PhaserGame, ReactiveFormsModule, ItemsComponent, HeroesComponent],
    templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit
{

    public PlayerData: Player = new Player("Name", 0, [], []);

    public openItemsPanel: boolean = false;
    public openHeroesPanel: boolean = false;
    public openMenuPanel: boolean = true;


    @ViewChild(PhaserGame) phaserRef!: PhaserGame;

    ngAfterViewInit()
    {
        EventBus.on('current-scene-ready', (scene: Phaser.Scene) =>
        {
            console.log(this.phaserRef.scene)

        });

    }

    ngOnInit()
    {
        // fetch('/player').then(res => res.json())
        // .then(data =>data)
    }

    public changeScene()
    {

        if (this.phaserRef.scene)
        {

            const scene = this.phaserRef.scene as MainMenu;
            scene.changeScene();
            // if this.phaserRef.scene.scene.key
            console.log(this.phaserRef.scene.scene.key)
        }

    }

    public Back(): void
    {
        this.openMenuPanel = true;
        this.openItemsPanel = false;
        this.openHeroesPanel = false;
    }

    public OpenItemsPanel(): void
    {
        this.openItemsPanel = true;
        this.openMenuPanel = false;
        this.openHeroesPanel = false;
    }
    public OpenHeroesPanel(): void
    {
        this.openHeroesPanel = true;
        this.openItemsPanel = false;
        this.openMenuPanel = false;
    }

}
