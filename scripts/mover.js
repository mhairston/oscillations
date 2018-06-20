class Mover extends Sprite {
  constructor(loc, size, vel) {
    super(loc, size);
    this.vel = vel;
  }

  render() {
    push();
    translate(this.loc.x, this.loc.y);
    ellipse(0, 0, this.size / 2, this.size / 2);
    pop();
  }

  update() {
    //super.update();
    this.loc.add(this.vel);
    this.render();
  }
}
