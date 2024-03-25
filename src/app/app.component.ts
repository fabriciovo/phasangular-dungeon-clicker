import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhaserGame } from '../game/phaser-game.component';
import { MainMenu } from '../game/scenes/MainMenu';
import { CommonModule } from '@angular/common';
import { EventBus } from '../game/EventBus';
import Player from '../game/Player';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, PhaserGame],
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit
{

    public PlayerData: Player = new Player("Name", 0, [], []);
    private _openItemsPanel: boolean = false;
    private _openMenuPanel: boolean = false;


    @ViewChild(PhaserGame) phaserRef!: PhaserGame;

    ngAfterViewInit()
    {
        EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
            console.log(this.phaserRef.scene)

        });
        
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

}
