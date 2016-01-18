import tsort from 'tsort';


let id_counter = 0;


export class Entity {
    constructor() {
        this.id = id_counter++;
        this.components = {};
    }
}


export class BaseSystem {
    requires = [];
    dependsOn = [];

    addToEntity(entity, ...args) {
        let component = this.component(...args);
        entity.components[this.slug] = component;
        this.onAdded(entity, component);
    }

    onAdded(entity, component) {

    }

    onRemoved(entity, component) {

    }

    update(entities) {
        for (let entity of entities) {
            this.updateEntity(entity, entity.components[this.slug]);
        }
    }

    updateEntity(entity, component) {

    }

    draw() {

    }
}


export class SystemManager {
    constructor() {
        this.systems = {};
        this.dependencies = tsort();
        this.tickOrder = [];

        this.entities = [];
    }

    register(system) {
        this.systems[system.slug] = system;
        for (let slug of system.dependsOn) {
            this.dependencies.add(slug, system.slug);
        }
        this.tickOrder = this.dependencies.sort();
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        let index = this.entities.findIndex((e) => e.id === entity.id);
        this.entities.splice(index, 1);
    }

    update() {
        for (let slug of this.tickOrder) {
            let entities = this.entities.filter((e) => slug in e.components);
            this.systems[slug].update(entities);
        }
    }

    draw() {
        for (let slug of this.tickOrder) {
            this.systems[slug].draw();
        }
    }
}
