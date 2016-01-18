import PIXI from 'pixi.js';

import GameEngine from 'koholint/engine';


PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;


let engine = new GameEngine();
engine.start();
