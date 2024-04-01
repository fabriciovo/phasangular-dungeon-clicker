import { Scene } from "phaser";

export default class HealthBar {
    private _scene: Scene;
    private _x: number;
    private _y: number;
    private _height: number;
    private _maxValue: number;
    private _scaleFactor: number;
    private _backgroundBar: Phaser.GameObjects.Graphics;
    private _foregroundBar: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, maxValue: number) {
        this._scene = scene;
        this._x = x;
        this._y = y;
        this._height = height;
        this._maxValue = maxValue;
        this._scaleFactor = 10;

        this._backgroundBar = this._scene.add.graphics();
        this.drawBackgroundBar();

        this._foregroundBar = this._scene.add.graphics();
    }

    private drawBackgroundBar(): void {
        this._backgroundBar.fillStyle(0x000000, 0.2);
        this._backgroundBar.fillRect(this._x, this._y, this._maxValue * this._scaleFactor, this._height);
    }

    public updateBar(currentValue: number): void {
        this._foregroundBar.clear();

        const barWidth = (currentValue / this._maxValue) * this._maxValue * this._scaleFactor;

        this._foregroundBar.fillStyle(0x00ff00);
        this._foregroundBar.fillRect(this._x, this._y, barWidth, this._height);
    }
}
