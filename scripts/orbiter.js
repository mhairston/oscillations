class Orbiter extends Sprite {
  constructor(loc, size, vel, col, drawCol, wangle) {
    super(loc, size);
    this.vel = vel;
    this.col = col;
    this.drawCol = drawCol;
    this.wangle = wangle;
  }

  render() {
    push();
    fill(this.col.toHslString());
    translate(this.loc.x, this.loc.y);
    ellipse(0, 0, this.size, this.size);
    pop();
  }

  update() {
    push();
    angleMode(DEGREES);
    this.vel.rotate(choose([0 - this.wangle, this.wangle]));
    this.loc.add(this.vel);
    this.render();
    this.wrap();
    pop();
  }

  wrap() {
    this.loc.x = this.loc.x % (width + this.size);
    this.loc.y = this.loc.y % (height + this.size);
  }
}
