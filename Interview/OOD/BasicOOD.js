/* Basic OOD showing how Object in Javascript works */
class Vechile {
    constructor() {
        this.type = "Ford";
    }
    run() {
        console.log("Run");
        console.log(this);
        
    }
}


let vechile = new Vechile();
vechile.run();

