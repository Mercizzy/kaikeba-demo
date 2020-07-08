class Coll {
  constructor() {
    this.colls = []
  }

  addColl(coll) {
    this.colls.push(coll)
  }

  showColl() {
    console.log(this.colls);
  }
}

let c1 = new Coll()
c1.addColl("c1")

let c2 = new Coll()
c2.addColl("c2")
c2.showColl()