class Orbiter {
  constructor(loc, size, col, drawCol, layer,
              ofx = 1, ofy = 1, omx = 100, omy = 100) {
    this.loc = loc;
    this.size = size;
    this.col = col;
    this.drawCol = drawCol;
    this.layer = layer;
    this.orbitalFreqX = ofx;
    this.orbitalFreqY = ofy;
    this.orbitalMagX = omx;
    this.orbitalMagY = omy;
  }

  render(showLoc = true, drawIt = true) {
    var d = this.layer;
    var where = this.currentPosition();
    var cx = where.x;
    var cy = where.y;
    if (showLoc) {
      push();
      fill(tinycolor(this.col).setAlpha(0.5).toHslString());
      translate(cx, cy);
      ellipse(0, 0, this.size, this.size);
      pop();
    }
    if (drawIt) {
      d.push();
      d.translate(cx, cy);
      d.fill(tinycolor(this.drawingCol).setAlpha(0.5).toHslString());
      d.ellipse(0, 0, this.size/10, this.size/10);
      d.pop();
    }
  }

  offset() {
    return new p5.Vector(
      Drift.Cycles.sin(this.orbitalFreqX, 0) * this.orbitalMagX,
      Drift.Cycles.cos(this.orbitalFreqY, 0) * this.orbitalMagY
    );
  }

  currentPosition() {
    return p5.Vector.add(this.loc, this.offset());
  }
}
