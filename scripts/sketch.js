
var sk = {
  title: 'Oscillations'
};

var doLoop = true;
var ds = Drift.Seedy;
var dc = Drift.Cycles;
var hw, hh, fr, gl = 0, pal, drawingColors, orbiters;

function setup() {
  pixelDensity(1);
  theCanvas = createCanvas(windowWidth, windowHeight);
  theCanvas.parent('canvas-container');
  hw = width / 2;
  hh = height / 2;
  colorMode(HSB, 360, 100, 100, 1);
  angleMode(DEGREES);
  if (!doLoop) { noLoop(); }
  frameRate(15);
  ds.init(1);
  fr = new Frame();
  initSketch();
  createDrawing();
  orbiters = OrbiterFactory.create(30, pal, drawingColors);
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
    var cycle = dc.sin(0.01 * i/10,0,true);
    var factor = i/w * 1.5 * cycle;
    var sz = Math.pow((2 - factor),3);
    d.push();
    d.fill(item.drawCol.setAlpha(factor/2).toHslString());
    d.ellipse(item.loc.x, item.loc.y,sz,sz);
    d.pop();
    item.update();
  });
  var lozSize = rri(40,500);
  pop();
  // Occasional lozenges:
  if (coin(0.04)) {
    d.push();
    d.rectMode(CENTER);
    d.angleMode(DEGREES);
    d.fill(choose([0,255]),rr(0.05,0.2));
    d.translate(rr(width),rr(height));
    d.rotate(choose([0,45]));
    d.rect(0,0,lozSize,lozSize);
    d.pop();
  }
}
