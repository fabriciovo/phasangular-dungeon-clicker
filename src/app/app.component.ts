import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Game } from '@scenes/Game';
import Player from '@game/Player';
import { PhaserGame } from '@game/phaser-game.component';
import { EventBus } from '@game/EventBus';
import { ItemsComponent } from '@components/items/items.component';
import { HeroesComponent } from '@components/heroes/heroes.component';
import { UpgradesComponent } from '@components/upgrades/upgrades.component';
import LocalService from 'src/utils/localService';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, PhaserGame, ReactiveFormsModule, ItemsComponent, HeroesComponent, UpgradesComponent],
    templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit
{

    public PlayerData: Player = new Player("Name", 0, [], []);

    public openMenuPanel: boolean = true;
    public openItemsPanel: boolean = false;
    public openHeroesPanel: boolean = false;
    public openUpgradePanel: boolean = false;

    private _localService: LocalService = new LocalService();

    @ViewChild(PhaserGame) phaserRef!: PhaserGame;

    ngAfterViewInit()
    {
        EventBus.on('current-scene-ready', (scene: Phaser.Scene) =>
        {
            if (scene.scene.key === "Game")
            {
                const scene = this.phaserRef.scene as Game;
                scene._player = this.PlayerData;
                this._localService.saveData("playerData", JSON.stringify(this.PlayerData));
            }
        });
    }

    ngOnInit()
    {
        // fetch('/player').then(res => res.json())
        // .then(data =>data)
    }

    public Back(): void
    {
        this.openMenuPanel = true;
        this.openItemsPanel = false;
        this.openHeroesPanel = false;
        this.openUpgradePanel = false;
    }

    public OpenItemsPanel(): void
    {
        this.openItemsPanel = true;
        this.openMenuPanel = false;
        this.openHeroesPanel = false;
        this.openUpgradePanel = false;

    }
    public OpenHeroesPanel(): void
    {
        this.openHeroesPanel = true;
        this.openItemsPanel = false;
        this.openMenuPanel = false;
        this.openUpgradePanel = false;

    }
    public OpenUpgradesPanel(): void
    {
        this.openUpgradePanel = true;
        this.openHeroesPanel = false;
        this.openItemsPanel = false;
        this.openMenuPanel = false;
    }
}
