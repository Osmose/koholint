import {BaseSystem} from 'koholint/engine/components';


export default class TransformSystem extends BaseSystem {
    slug = 'transform';

    component(options={}) {
        let defaults = {
            x: 0,
            y: 0,
            rotation: 0,
        };

        return Object.assign(defaults, options);
    }
}
