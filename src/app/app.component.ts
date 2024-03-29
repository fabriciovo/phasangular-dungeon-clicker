import { AfterViewInit, Component, ViewChild, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhaserGame } from '../game/phaser-game.component';
import { MainMenu } from '../game/scenes/MainMenu';
import { CommonModule } from '@angular/common';
import { EventBus } from '../game/EventBus';
import Player from '../game/Player';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, PhaserGame, ReactiveFormsModule],
    templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit
{

    public PlayerData = signal<Player>(new Player("Name", 0, [], []));
    
    private _openItemsPanel: boolean = false;
    private _openMenuPanel: boolean = false;


@ViewChild(PhaserGame) phaserRef!: PhaserGame;

ngAfterViewInit()
{
    EventBus.on('current-scene-ready', (scene: Phaser.Scene) =>
    {
        console.log(this.phaserRef.scene)

    });

}

ngOnInit(){
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

}
