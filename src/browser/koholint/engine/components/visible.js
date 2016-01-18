import PIXI from 'pixi.js';

import {BaseSystem} from 'koholint/engine/components';


export default class VisibleSystem extends BaseSystem {
    slug = 'visible';
    requires = ['transform']
    dependsOn = ['transform', 'physical'];

    constructor(width, height, options={}) {
        super();

        this.scale = options.scale || 3;

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(width, height);
        this.renderer.backgroundColor = 0xff0000;

        document.querySelector('#app').appendChild(this.renderer.view);
    }

    component(texture) {
        let sprite = new PIXI.Sprite(texture);
        sprite.scale.x = this.scale;
        sprite.scale.y = this.scale;

        return {
            sprite: sprite
        };
    }

    onAdded(entity, visible) {
        this.stage.addChild(visible.sprite);
    }

    onRemoved(entity, visible) {
        this.stage.removeChild(visible.sprite);
    }

    updateEntity(entity, visible) {
        let {transform} = entity.components;
        visible.sprite.x = transform.x;
        visible.sprite.y = transform.y;
        visible.sprite.rotation = transform.rotation;
    }

    draw() {
        this.renderer.render(this.stage);
    }
}
