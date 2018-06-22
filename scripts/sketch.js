
var sk = {
  title: 'Oscillations'
};

var doLoop = true;
var ds = Drift.Seedy;
var dc = Drift.Cycles;
var hw, hh, fr, gl = 0, col = 0, hue1 = 0;
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
    new Orbiter(loc, 10, col1, col1, drawingLayer,
      0.74, 0.76, 0, 0, -150, -150),
    new Orbiter(loc, 10, col1, col1, drawingLayer,
      0.96, 0.48, 0, 0, 150, 300),
    new Orbiter(loc, 10, col1, col1, drawingLayer,
      0.5, 1, 0, TAU/4, 300, 150)
  ];
  hue1 = rr(360);
  sat1 = rr(10,70);
  bri1 = rr(20,60);
}

function draw() {
  background(hue1,sat1,bri1);
  updateAll();
}

function initSketch() {
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
  var d = drawingLayer;
  tint(255, 0.8);
  image(d,0,0,d.width,d.height);
  // Draw orbiters & trails:
  push();
  noStroke();
  orbiters.forEach((item, i) => {
    item.render(true, true);
    d.push();
    drawChiaroscuro(d);
    drawConnections(d);
    d.pop();
  });
  pop();
}

function drawConnections(d) {
  if (orbiters.length > 1) {
    d.strokeWeight(1);
    d.stroke(255,0.07);
    d.line(
      orbiters[0].currentPosition().x,
      orbiters[0].currentPosition().y,
      orbiters[1].currentPosition().x,
      orbiters[1].currentPosition().y
    );
  }
  if (orbiters.length > 2) {
    d.stroke(0);
    d.line(
      orbiters[0].currentPosition().x,
      orbiters[0].currentPosition().y,
      orbiters[2].currentPosition().x,
      orbiters[2].currentPosition().y
    );
  }
}

function drawChiaroscuro(d) {
  if (orbiters.length > 2) {
    var t = dc.seconds();
    if (t % 16 < 0.2) {
      col = (col === 0) ? 255 : 0;
    }
    d.noStroke();
    d.fill(col,0.01);
    d.triangle(
      orbiters[0].currentPosition().x,
      orbiters[0].currentPosition().y,
      orbiters[1].currentPosition().x,
      orbiters[1].currentPosition().y,
      orbiters[2].currentPosition().x,
      orbiters[2].currentPosition().y
    );
  }
}
