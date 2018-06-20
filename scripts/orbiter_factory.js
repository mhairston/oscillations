class OrbiterFactory {
  static create(count,pal, drawCols) {
    let coll = [];
    for (var i = 0; i < count; i++) {
      let loc = createVector(wobble(hw, 400), wobble(hh, 300));
      let size = rr(8,64);
      let vel = createVector(choose([-4,-2,-1,1,2,4]),choose([-4,-2,-1,1,2,4]));
      let col = choose(pal).setAlpha(0.6);
      let drawCol = choose(drawCols);
      let wangle = choose([2,4,8,16,32]);
      let obj = new Orbiter(loc, size, vel, col,drawCol,wangle);
      coll.push(obj);
    }
    return coll;
  }
}
