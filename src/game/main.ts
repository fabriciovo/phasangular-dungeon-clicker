import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import ShakePositionPlugin from "phaser3-rex-plugins/plugins/shakeposition-plugin.js"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
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
