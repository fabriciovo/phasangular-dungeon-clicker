import { Scene } from "phaser";

export default class HealthBar {
    private _scene: Scene;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _maxValue: number;
    private _currentValue: number;
    private _backgroundBar: Phaser.GameObjects.Graphics;
    private _foregroundBar: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, maxValue: number) {
        this._scene = scene;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._maxValue = maxValue;
        this._currentValue = maxValue;

        this._backgroundBar = this._scene.add.graphics();
        this.drawBackgroundBar();

        this._foregroundBar = this._scene.add.graphics();
        this.updateBar(this._maxValue);
    }

    private drawBackgroundBar(): void {
        this._backgroundBar.fillStyle(0x000000, 0.2);
        this._backgroundBar.fillRect(this._x, this._y, this._width, this._height);
    }

    private updateBar(value: number): void {
        this._foregroundBar.clear();

        const barWidth = (value / this._maxValue) * this._width;

        this._foregroundBar.fillStyle(0x00ff00);
        this._foregroundBar.fillRect(this._x, this._y, barWidth, this._height);
    }

    public decrease(value: number): void {
        this._currentValue = Math.max(0, this._currentValue - value);
        this.updateBar(this._currentValue);
    }

    public increase(value: number): void {
        this._currentValue = Math.min(this._maxValue, this._currentValue + value);
        this.updateBar(this._currentValue);
    }
}
