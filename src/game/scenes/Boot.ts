import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.setPath('assets')
        this.load.image('background', 'bg.png');

        this.load.image('tile', 'tilemap_full.png'); 
        this.load.tilemapTiledJSON('map', 'map.json');

        //Items
        this.load.spritesheet('offhand_luckynecklace', 'items/offhand_luckynecklace.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('offhand_magicorb', 'items/offhand_magicorb.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('offhand_quiver', 'items/offhand_quiver.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('offhand_shield', 'items/offhand_shield.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_axe1', 'items/weapon_axe1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_axe2', 'items/weapon_axe2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_bow1', 'items/weapon_bow1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_bow2', 'items/weapon_bow2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_crossbow1', 'items/weapon_crossbow1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_crossbow2', 'items/weapon_crossbow2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_magicstaff1', 'items/weapon_magicstaff1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_magicstaff2', 'items/weapon_magicstaff2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_magicwand1', 'items/weapon_magicwand1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_magicwand2', 'items/weapon_magicwand2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_morningstar1', 'items/weapon_morningstar1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_morningstar2', 'items/weapon_morningstar2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_spear1', 'items/weapon_spear1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_spear2', 'items/weapon_spear2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_sword1', 'items/weapon_sword1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('weapon_sword2', 'items/weapon_sword2.png', { frameWidth: 16, frameHeight: 16 });

        //Interactables
        this.load.spritesheet('chest', 'interactables/chest.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('coin', 'interactables/coin.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('key', 'interactables/key.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('vase', 'interactables/vase.png', { frameWidth: 16, frameHeight: 16 });

        //Monsters
        this.load.spritesheet('slime', 'characters/slime.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('bat', 'characters/bat.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('beholder', 'characters/beholder.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('lich', 'characters/lich.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('skeleton', 'characters/skeleton.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('mimic', 'characters/mimic.png', { frameWidth: 16, frameHeight: 16 });


        //Heroes
        this.load.spritesheet('archer', 'characters/archer.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('knight', 'characters/knight.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('wizard', 'characters/wizard.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('warrior', 'characters/warrior.png', { frameWidth: 16, frameHeight: 16 });

        //Effects
        this.load.spritesheet('smoke', 'effects/smoke.png', { frameWidth: 32, frameHeight: 32 });

    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
