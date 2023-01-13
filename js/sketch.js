let particles = [];
let planets = [];
let vx1, vx2, vy1, vy2, d = 5;

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("p5container");
    noCursor()
}

function draw() {
    background(8, 0, 15, 10);

    //iterates to generate new particles adding them to the array
    for(let j = 0; j < 10; j++){
        let p = new Particle();
        particles.push(p)

        //updates and shows particles
        for(let i = 0; i < particles.length; i++){
            particles[i].update();
            particles[i].show();
        }
    }

    //shows planets
    for(let n = 0; n < planets.length; n++){
            planets[n].show();
    }

    //creates center circles and layers their opacity
    //generates their opacity and diameter
    for(let c = 1; c < 10; c++){
        createCircle(230/c, 100 + 5*c)
    }

    //iterating over all elements in particles array
    for(let p = 0; p < particles.length; p++){
        //checks if particle's position is outside the window
        if(particles[p].x > width ||particles[p].x < 0 || particles[p].y > height || particles[p].y < 0){
            //removes the current particle from the particles list
            particles.splice(p,1)
        }
        
        for(let l = 0; l < planets.length; l++){
            try {
                if(((particles[p].x - planets[l].x)**2 + (particles[p].y - planets[l].y)**2) <= planets[l].radius**2){
                    particles.splice(p,1)
                    break
                 }
            } catch (error) {
                continue
            } 
        }
    }
}

//When left clicking, planets are made and added to the appropriate array
function mousePressed(){
    let planet = new Planets();
    planets.push(planet)
}

//returns a random number of random polarity between lower and upper
function createRandom(lower, upper){
    num = random(lower,upper)
    pol = random(1)
    if(pol <= 0.5){
        num = -num
    }
    return num
}

//creates center circles
function createCircle(alpha, diameter){
    noStroke()
    let centerCircle = color(8, 0, 15)
    centerCircle.setAlpha(alpha)
    fill(centerCircle)
    circle(mouseX, mouseY, diameter)
}

class Particle{

    constructor(){
        this.time = 0
        this.x = mouseX;
        this.y = mouseY;
        this.vx = createRandom(0,5)
        this.vy = createRandom(0,5)
        this.color = [random(100, 255), random(190, 255), 255]  //randomises color within limits
        //diameter of particles at origin
        this.d = 1
    }

    update(){
        this.time += 0.0065
        this.x += this.time * this.vx
        this.y += this.time * this.vy
        this.d += 0.01
    }

    show(){
        noStroke()
        stroke(this.color[0], this.color[1], this.color[2], this.alpha); // set color and transparency of the stroke
        fill(255, 150);
        ellipse(this.x, this.y, this.d);

        //an attempt at making my code 3d, using red and blue
        // fill(255, 0, 0, 50);
        // ellipse(this.x - d, this.y, d);
        // fill(0, 0, 255, 50);
        // ellipse(this.x + d, this.y, d);
    }
}

class Planets{
    
    constructor(){
        this.radius = 50
        this.x = mouseX
        this.y = mouseY
    }

    update(){
        this.show()
    }

    show(){
        noStroke()
        let planetpoint = color(255, 255, 255)
        planetpoint.setAlpha(100)
        fill(planetpoint)
        circle(this.x, this.y, this.radius*2)
    }
}