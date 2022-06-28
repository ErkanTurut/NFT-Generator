const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { layers } = require("./config.js");

const canvas = createCanvas(286, 286);
const ctx = canvas.getContext("2d");

const dir = "./output/";

const edition = 10;

const saveLayer = async (_canvas, _edition) => {
  fs.writeFileSync(`${dir}${_edition}.png`, _canvas.toBuffer("image/png"));
};

const drawLayer = async (_layer, _edition) => {
  let element =
    _layer.elements[Math.floor(Math.random() * _layer.elements.length)];

  const image = await loadImage(`${_layer.location}${element.fileName}`);

  ctx.drawImage(
    image,
    _layer.postition.x,
    _layer.postition.y,
    _layer.size.width,
    _layer.size.height
  );

  saveLayer(canvas, _edition);
};

const checkFile = async (_buffer) => {
  console.log(_buffer);
};

const readContent = async (checkFile) => {
  const buffer = [];
  fs.readdir(`${dir}`, function (err, fileNames) {
    if (err) {
      console.log(err);
      return;
    }
    fileNames.forEach(function (fileName) {
      fs.readFile(dir + fileName, "utf-8", function (err, content) {
        if (err) {
          console.log(err);
          return;
        }
        buffer.push(content);
        console.log(buffer.length);
      });
    });
  });
  checkFile(buffer);
};

for (let i = 1; i <= edition; i++) {
  layers.forEach((layer) => {
    drawLayer(layer, i);
  });
}

readContent();
