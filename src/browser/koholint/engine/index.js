import PIXI from 'pixi.js';
import tsort from 'tsort';

import {Entity, SystemManager} from 'koholint/engine/components';
import PhysicalSystem from 'koholint/engine/components/physical';
import TransformSystem from 'koholint/engine/components/transform';
import VisibleSystem from 'koholint/engine/components/visible';
import {Tileset} from 'koholint/engine/graphics';


export default class GameEngine {
    constructor() {
        this.running = false;
        this.systemManager = new SystemManager();

        this.systemManager.register(new TransformSystem());
        this.systemManager.register(new PhysicalSystem());
        this.systemManager.register(new VisibleSystem(400, 300));
    }

    start() {
        PIXI.loader.add('characters', 'img/characters.png').load((loader, resources) => {
            let tileset = new Tileset(resources.characters.texture, 16, 16);

            let person = new Entity();
            this.systemManager.systems['transform'].addToEntity(person, {x: 50, y: 50});
            this.systemManager.systems['physical'].addToEntity(person, {rotationalVelocity: 0.01});
            this.systemManager.systems['visible'].addToEntity(person, tileset.tile(1));
            this.systemManager.addEntity(person);

            this.running = true;
            requestAnimationFrame(::this.tick);
        });
    }

    stop() {
        this.running = false;
    }

    tick() {
        if (this.running) {
            requestAnimationFrame(::this.tick);
        }

        this.systemManager.update();
        this.systemManager.draw();
    }
}
