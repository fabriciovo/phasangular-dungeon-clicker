import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import ShakePositionPlugin from "phaser3-rex-plugins/plugins/shakeposition-plugin.js"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    parent: 'game-container',
    pixelArt: true,
    backgroundColor: '#028af8',
    plugins: {
        global: [{
            key: 'rexShakePosition',
            plugin: ShakePositionPlugin,
            start: true
        }],
    },
    zoom: 3,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ],
};




const StartGame = (parent: string) =>
{

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
