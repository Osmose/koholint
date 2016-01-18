import PIXI from 'pixi.js';

import {BaseSystem} from 'koholint/engine/components';


export default class PhysicalSystem extends BaseSystem {
    slug = 'physical';
    requires = ['transform'];
    dependsOn = ['transform'];

    component(options={}) {
        let defaults = {
            xVelocity: 0,
            yVelocity: 0,
            rotationalVelocity: 0,
        };

        return Object.assign(defaults, options);
    }

    updateEntity(entity, physical) {
        let {transform} = entity.components;
        transform.x += physical.xVelocity;
        transform.y += physical.yVelocity;
        transform.rotation = (transform.rotation + physical.rotationalVelocity) % 360;
    }
}
