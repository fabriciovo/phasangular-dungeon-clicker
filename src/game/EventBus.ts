import Phaser from 'phaser';
export const EventBus = new Phaser.Events.EventEmitter();
EventBus.on("attackMonster", (damage:string) => { })
