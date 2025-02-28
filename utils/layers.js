const FS_LAYERS = [
    "appLayer",
    "processes",
    "pages",
    "widgets",
    "features",
    "entities",
    "shared",
];

const FS_SEGMENTS = [
    "ui",
    "model",
    "lib",
    "api",
    "config",
    "assets"
];

const getLowerLayers = (layer) => FS_LAYERS.slice(FS_LAYERS.indexOf(layer) + 1);
const getUpperLayers = (layer) => FS_LAYERS.slice(0, FS_LAYERS.indexOf(layer));

module.exports.layersLib = { FS_LAYERS, FS_SEGMENTS, getLowerLayers, getUpperLayers } ;
