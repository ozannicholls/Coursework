let particles = [];
let d = 1;

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("p5container");
}

function draw() {
    background(8, 0, 15, 25);

    let p = new Particle();
    particles.push(p)
    p.show()

    // fill(255, 255, 255);
    // ellipse(400, 400, 200);
}

class Particle{
    constructor(){
        this.x = MouseX;
        this.y = MouseY;
        this.vx = random(3, -3);
        this.vy = random(2, -2);
    }
    update(){
        this.x += this.vx
        this.y += this.vy
    }
    show(){
        noStroke()
        fill(255, 150);
        ellipse(this.x, this.y, d);
    }
}