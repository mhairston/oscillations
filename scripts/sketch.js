
var sk = {
  title: 'Oscillations'
};

var doLoop = true;
var ds = Drift.Seedy;
var dc = Drift.Cycles;
var hw, hh, fr, gl = 0, col = 0;
var drawingColors, drawingLayer, orbiters;

function setup() {
  var loc, col1;
  pixelDensity(1);
  theCanvas = createCanvas(windowWidth, windowHeight);
  theCanvas.parent('canvas-container');
  colorMode(HSB, 360, 100, 100, 1);
  angleMode(DEGREES);
  if (!doLoop) { noLoop(); }
  ds.init();
  hw = width / 2;
  hh = height / 2;
  fr = new Frame();
  loc = new p5.Vector(hw,hh);
  initSketch();
  createDrawing();
  col1 = choose(drawingColors);
  //orbiters = OrbiterFactory.create(30, pal, drawingColors, layer);
  orbiters = [
    new Orbiter(loc, 30, col1, col1, drawingLayer, 0.75, 0.75, 100, 100),
    new Orbiter(loc, 30, col1, col1, drawingLayer, 0.5, 0.25, 100, 200),
    new Orbiter(loc, 30, col1, col1, drawingLayer, 0.25, 0.125, 200, 100)
  ];
}

function draw() {
  background(50);
  updateAll();
}

function initSketch() {
  var baseHue = rr(360);
  pal = Drift.Color.choosePalette().map((col) => {
    return tinycolor(col);
  });
  drawingColors = [choose(pal)];
}

function keyPressed(evt) {
  ds.respondToKeys(keyCode, evt);
}

function createDrawing() {
  drawingLayer = createGraphics(width,height);
  drawingLayer.colorMode(HSB, 360, 100, 100, 1);
  drawingLayer.fill(255);
  drawingLayer.noStroke();
}

function updateAll() {
  var w = orbiters.length;
  var d = drawingLayer;
  translate(hw,hh);
  scale(1.3);
  translate(-hw,-hh);
  tint(255, 0.8);
  image(d,0,0,d.width,d.height);
  // Draw orbiters & trails:
  push();
  noStroke();
  orbiters.forEach((item, i) => {
    item.update();
    var cycle = dc.sin(0.01 * i/10,0,true);
    var factor = i/w * 1.5 * cycle;
    var sz = Math.pow((2 - factor),3);
    d.push();
    d.fill(item.drawCol.toHslString());
    d.ellipse(item.loc.x, item.loc.y,sz,sz);
    drawChiaroscuro(d);
    d.pop();
  });
  pop();
}

function drawConnections(d) {
  d.strokeWeight(1);
  d.stroke(255,0.07);
  d.line(
    orbiters[0].loc.x + orbiters[0].offset().x,
    orbiters[0].loc.y + orbiters[0].offset().y,
    orbiters[1].loc.x + orbiters[1].offset().x,
    orbiters[1].loc.y + orbiters[1].offset().y
  );
  d.stroke(0);
  d.line(
    orbiters[0].loc.x + orbiters[0].offset().x,
    orbiters[0].loc.y + orbiters[0].offset().y,
    orbiters[2].loc.x + orbiters[2].offset().x,
    orbiters[2].loc.y + orbiters[2].offset().y
  );
}

function drawChiaroscuro(d) {
  if (coin(0.04)) {
    col = (col === 0) ? 255 : 0;
  }
  d.noStroke();
  d.fill(col,0.07);
  d.triangle(
    orbiters[0].currentPosition().x,
    orbiters[0].currentPosition().y,
    orbiters[1].currentPosition().x,
    orbiters[1].currentPosition().y,
    orbiters[2].currentPosition().x,
    orbiters[2].currentPosition().y
  );
}
