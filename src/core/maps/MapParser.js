import WorldMap from './WorldMap';
import Block from "./Block";

const _parseBlock = function (rawBlock, blockWidth, blockHeight, blockDepth) {
    const position = {
        x: rawBlock.position.x * blockWidth,
        y: rawBlock.position.y * blockHeight,
        z: rawBlock.position.z * blockDepth
    };

    const blockOptions = {
        walls: rawBlock.walls,
        type: rawBlock.type,
        collidable: rawBlock.collidable
    };

    const block = new Block(position, blockWidth, blockHeight, blockDepth, blockOptions);

    block.collidable = rawBlock.collidable || false;

    return block;
};

const _createEmptyLayers = function (mapWidth, mapHeight, mapDepth) {
    const layers = [];

    for (let z = 0; z < mapDepth; z++) {
        const layer = [];

        for (let y = 0; y < mapHeight; y++) {
            const row = [];

            for (let x = 0; x < mapDepth; x++) {
                row.push(null);
            }

            layer.push(row);
        }

        layers.push(layer);
    }

    return layers;
};

const _parseRawMap = function (rawMap) {
    // TODO validate map
    const rawBlocks = rawMap.blocks;

    const blockWidth = rawMap.blockWidth;
    const blockHeight = rawMap.blockHeight;
    const blockDepth = rawMap.blockDepth;

    const mapWidth = rawMap.width;
    const mapHeight = rawMap.height;
    const mapDepth = rawMap.depth;

    const layers = _createEmptyLayers(mapWidth, mapHeight, mapDepth);

    for (const rawBlock of rawBlocks) {
        const block = _parseBlock(rawBlock, blockWidth, blockHeight, blockDepth);

        const position = rawBlock.position;

        // TODO check for out of bounds
        layers[position.z][position.y][position.x] = block;
    }

    const worldMap = new WorldMap(layers, mapWidth, mapHeight, mapDepth, blockWidth, blockHeight, blockDepth);

    worldMap.name = rawMap.name;
    worldMap.respawns = [];

    for (const respawn of rawMap.respawns) {
        worldMap.respawns.push(respawn);
    }

    return worldMap;
};

const MapParser = {
    parse: function (rawMap) {
        return _parseRawMap(rawMap);
    }
};

export default MapParser;
