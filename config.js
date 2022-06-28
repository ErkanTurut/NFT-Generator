const fs = require("fs");

const width = 286;
const height = 286;
const dir = __dirname;

const rarity = [
  { key: "", val: "original" },
  { key: "_r", val: "rare" },
  { key: "sr", val: "super_rare" },
];

const addRarity = (_str) => {
  let itemRarity;
  rarity.forEach((r) => {
    if (_str.includes(r.key)) {
      itemRarity = r.val;
    }
  });
  return itemRarity;
};

const cleanName = (_str) => {
  let name = _str.slice(0, -4);
  rarity.forEach((r) => {
    name = name.replace(r.key, "");
  });
  return name;
};

const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        name: cleanName(i),
        fileName: i,
        rarity: addRarity(i),
      };
    });
};

const layers = [
  {
    id: 1,
    name: "head",
    location: `${dir}/images_layers/heads/`,
    elements: getElements(`${dir}/images_layers/heads/`),
    length: getElements(`${dir}/images_layers/heads/`).length,
    postition: { x: 0, y: 0 },
    size: { width: 286, height: 286 },
  },
  {
    id: 2,
    name: "eye",
    location: `${dir}/images_layers/eyes/`,
    elements: getElements(`${dir}/images_layers/eyes/`),
    length: getElements(`${dir}/images_layers/heads/`).length,
    postition: { x: 103, y: 63 },
    size: { width: 80, height: 80 },
  },
  {
    id: 3,
    name: "mouth",
    location: `${dir}/images_layers/mouths/`,
    elements: getElements(`${dir}/images_layers/mouths/`),
    length: getElements(`${dir}/images_layers/heads/`).length,
    postition: { x: 108, y: 201 },
    size: { width: 71, height: 85 },
  },
];

module.exports = { layers };
